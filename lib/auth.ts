/**
 * Admin sign-in.
 *
 * The first login comes from environment variables (ADMIN_EMAIL,
 * ADMIN_PASSWORD; see .env.example). Once the admin changes it under
 * Admin > Login & password, the new email and a scrypt hash of the password
 * are stored in the database and take over from the environment.
 * `npm run admin:reset-login` removes the saved login if it is ever lost.
 *
 * The session is a signed, httpOnly cookie. Its signing key includes a hash of
 * the password, so changing the password signs every other session out.
 */
import "server-only";
import { createHash, createHmac, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { db } from "@/lib/db";
import { rateLimiter } from "@/lib/rate-limit";

export const SESSION_COOKIE = "kt_admin";
const MAX_AGE = 60 * 60 * 8; // 8 hours

type Session = { email: string };
type Credentials = {
  email: string;
  source: "database" | "environment";
  verify: (password: string) => boolean;
  /** Signs session cookies; changes whenever the password does */
  key: string;
};

function sha256(text: string) {
  return createHash("sha256").update(text).digest("hex");
}

function sameText(a: string, b: string) {
  return timingSafeEqual(createHash("sha256").update(a).digest(), createHash("sha256").update(b).digest());
}

/* ------------------------------------------------------------------ */
/* Password hashing                                                    */
/* ------------------------------------------------------------------ */

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `scrypt$${salt}$${hash}`;
}

export function verifyPassword(password: string, stored: string) {
  const [scheme, salt, hash] = stored.split("$");
  if (scheme !== "scrypt" || !salt || !hash) return false;
  const expected = Buffer.from(hash, "hex");
  const actual = scryptSync(password, salt, expected.length);
  return timingSafeEqual(actual, expected);
}

/* ------------------------------------------------------------------ */
/* Current login                                                       */
/* ------------------------------------------------------------------ */

async function credentials(): Promise<Credentials | null> {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) return null;

  const client = await db();
  const res = await client.execute("SELECT email, password_hash FROM admin_credentials WHERE id = 1");
  const row = res.rows[0];
  if (row) {
    const hash = String(row.password_hash);
    return { email: String(row.email), source: "database", verify: (pw) => verifyPassword(pw, hash), key: secret + sha256(hash) };
  }

  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) return null;
  return { email, source: "environment", verify: (pw) => sameText(pw, password), key: secret + sha256(password) };
}

/** True when an admin login exists (saved in the admin, or set in the environment). */
export async function adminConfigured() {
  return (await credentials()) !== null;
}

/** Where the current login comes from, for the Login & password page. */
export async function loginSource() {
  return (await credentials())?.source ?? null;
}

export async function checkCredentials(email: string, password: string) {
  const cfg = await credentials();
  if (!cfg) return false;
  // Check both before deciding, so timing doesn't reveal which one was wrong
  const emailOk = sameText(email.trim().toLowerCase(), cfg.email);
  const passwordOk = cfg.verify(password);
  return emailOk && passwordOk;
}

/** Saves a new admin login. From now on it is used instead of the environment variables. */
export async function saveCredentials(email: string, password: string) {
  const client = await db();
  await client.execute({
    sql: `INSERT INTO admin_credentials (id, email, password_hash) VALUES (1, ?, ?)
          ON CONFLICT (id) DO UPDATE SET email = excluded.email, password_hash = excluded.password_hash, updated_at = datetime('now')`,
    args: [email.trim().toLowerCase(), hashPassword(password)],
  });
}

/* ------------------------------------------------------------------ */
/* Sessions                                                            */
/* ------------------------------------------------------------------ */

function sign(payload: string, key: string) {
  return createHmac("sha256", key).update(payload).digest("base64url");
}

function createToken(email: string, key: string) {
  const payload = Buffer.from(JSON.stringify({ sub: email, exp: Math.floor(Date.now() / 1000) + MAX_AGE })).toString("base64url");
  return `${payload}.${sign(payload, key)}`;
}

async function verifyToken(token: string): Promise<Session | null> {
  const cfg = await credentials();
  if (!cfg) return null;
  const [payload, signature] = token.split(".");
  if (!payload || !signature || !sameText(signature, sign(payload, cfg.key))) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString()) as { sub?: string; exp?: number };
    if (!data.sub || !data.exp || data.exp < Date.now() / 1000 || data.sub !== cfg.email) return null;
    return { email: data.sub };
  } catch {
    return null;
  }
}

export async function startSession(email: string) {
  const cfg = await credentials();
  if (!cfg) throw new Error("Admin login is not configured");
  // Secure-only on HTTPS. Plain http (e.g. testing from a phone on the local
  // network) would otherwise drop the cookie and the admin could never sign in.
  const h = await headers();
  const https = h.get("x-forwarded-proto") === "https" || (h.get("origin") ?? "").startsWith("https://");
  (await cookies()).set(SESSION_COOKIE, createToken(email.trim().toLowerCase(), cfg.key), {
    httpOnly: true,
    sameSite: "lax",
    secure: https,
    path: "/admin",
    maxAge: MAX_AGE,
  });
}

export async function endSession() {
  (await cookies()).delete({ name: SESSION_COOKIE, path: "/admin" });
}

/** The signed-in admin, or null. Reads the request, so call it inside a Suspense boundary. */
export async function getAdmin(): Promise<Session | null> {
  // Wait for a real request: the expiry check reads the clock, and the dev-mode
  // prefetch check would otherwise report it (and the sign-in redirect) as errors.
  await connection();
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  return token ? verifyToken(token) : null;
}

/** Use at the top of every admin page and Server Action: sends signed-out visitors to the login page. */
export async function requireAdmin(): Promise<Session> {
  const admin = await getAdmin();
  if (!admin) redirect("/admin/login");
  return admin;
}

/* ------------------------------------------------------------------ */
/* Login throttling: 5 failed attempts locks an address for 15 minutes  */
/* ------------------------------------------------------------------ */
const WINDOW = 15 * 60 * 1000;
const perAddress = rateLimiter("login", 5, WINDOW);
// The address comes from x-forwarded-for, which can be made up, so failures
// from all addresses together are capped too.
const everyone = rateLimiter("login-all", 50, WINDOW);

export function loginLocked(ip: string) {
  return perAddress.limited(ip) || everyone.limited("all");
}

export function recordLoginFailure(ip: string) {
  perAddress.count(ip);
  everyone.count("all");
}

export function clearLoginFailures(ip: string) {
  perAddress.clear(ip);
}

/* ------------------------------------------------------------------ */
/* Changing the login                                                  */
/* ------------------------------------------------------------------ */

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const MIN_PASSWORD = 10;

export type LoginChange = { ok?: boolean; message?: string; errors?: Record<string, string> };

/**
 * Validates and saves a new admin email and/or password for the signed-in
 * admin. The current password is always required. Leave `password` empty to
 * keep the current one.
 */
export async function changeLogin(
  adminEmail: string,
  input: { current: string; email: string; password: string; confirm: string },
  ip: string,
): Promise<LoginChange> {
  if (loginLocked(ip)) return { message: "Too many wrong passwords. Try again in 15 minutes." };

  const email = input.email.trim().toLowerCase().slice(0, 200);
  const errors: Record<string, string> = {};
  if (!input.current) errors.current = "Enter your current password";
  if (!EMAIL.test(email)) errors.email = "Enter a valid email address";
  if (input.password) {
    if (input.password.length < MIN_PASSWORD) errors.password = `Use at least ${MIN_PASSWORD} characters`;
    else if (input.password.length > 200) errors.password = "That password is too long";
    else if (input.password.toLowerCase() === email) errors.password = "Don't use your email as the password";
    if (input.password !== input.confirm) errors.confirm = "The two passwords don't match";
  } else if (input.confirm) {
    errors.password = "Type the new password here too";
  }
  if (Object.keys(errors).length) return { errors, message: "Check the highlighted fields." };

  if (!(await checkCredentials(adminEmail, input.current))) {
    recordLoginFailure(ip);
    return { errors: { current: "That isn't your current password" }, message: "Check the highlighted fields." };
  }
  clearLoginFailures(ip);

  if (email === adminEmail && !input.password) return { message: "Nothing has changed." };
  await saveCredentials(email, input.password || input.current);
  return { ok: true };
}
