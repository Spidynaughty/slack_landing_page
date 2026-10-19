/**
 * Admin sign-in. One admin account comes from environment variables
 * (ADMIN_EMAIL, ADMIN_PASSWORD, SESSION_SECRET); see .env.example.
 *
 * The session is a signed, httpOnly cookie. Its signing key includes a hash of
 * the password, so changing the password signs every session out.
 */
import "server-only";
import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

export const SESSION_COOKIE = "kt_admin";
const MAX_AGE = 60 * 60 * 8; // 8 hours

type Session = { email: string };

function env() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  const secret = process.env.SESSION_SECRET;
  if (!email || !password || !secret || secret.length < 32) return null;
  return { email, password, key: secret + createHash("sha256").update(password).digest("hex") };
}

/** True when the admin login has been configured in the environment. */
export function adminConfigured() {
  return env() !== null;
}

function sameText(a: string, b: string) {
  const ha = createHash("sha256").update(a).digest();
  const hb = createHash("sha256").update(b).digest();
  return timingSafeEqual(ha, hb);
}

export function checkCredentials(email: string, password: string) {
  const cfg = env();
  if (!cfg) return false;
  // Compare both before deciding, so timing doesn't reveal which one was wrong
  const emailOk = sameText(email.trim().toLowerCase(), cfg.email);
  const passwordOk = sameText(password, cfg.password);
  return emailOk && passwordOk;
}

function sign(payload: string, key: string) {
  return createHmac("sha256", key).update(payload).digest("base64url");
}

function createToken(email: string, key: string) {
  const payload = Buffer.from(JSON.stringify({ sub: email, exp: Math.floor(Date.now() / 1000) + MAX_AGE })).toString("base64url");
  return `${payload}.${sign(payload, key)}`;
}

function verifyToken(token: string): Session | null {
  const cfg = env();
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
  const cfg = env();
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
const attempts = new Map<string, { count: number; until: number }>();
const LIMIT = 5;
const WINDOW = 15 * 60 * 1000;

export function loginLocked(ip: string) {
  const a = attempts.get(ip);
  if (!a) return false;
  if (a.until < Date.now()) {
    attempts.delete(ip);
    return false;
  }
  return a.count >= LIMIT;
}

export function recordLoginFailure(ip: string) {
  const a = attempts.get(ip);
  if (!a || a.until < Date.now()) attempts.set(ip, { count: 1, until: Date.now() + WINDOW });
  else a.count += 1;
}

export function clearLoginFailures(ip: string) {
  attempts.delete(ip);
}
