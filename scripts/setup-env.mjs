#!/usr/bin/env node
/**
 * Runs before `npm run dev` (and on `npm run setup`).
 *
 * A fresh clone has no .env.local, because Git leaves it out on purpose: it
 * holds the admin password. This creates one from .env.example with a random
 * admin password and session secret, and prints the login once. If .env.local
 * already exists it is never changed; the script only warns about values that
 * stop the admin from working.
 */
import { randomBytes } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";

const FILE = ".env.local";
const EXAMPLE = ".env.example";

function parse(text) {
  return Object.fromEntries(
    text
      .split(/\r?\n/)
      .filter((l) => /^\s*[A-Z_][A-Z0-9_]*=/.test(l))
      .map((l) => {
        const i = l.indexOf("=");
        return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^["']|["']$/g, "")];
      }),
  );
}

// Letters and digits only, so the value is safe in .env files (no $, # or quotes)
const random = (bytes) => randomBytes(bytes).toString("base64url").replace(/[-_]/g, "x");

// Deployments set these as real environment variables; leave them alone
if (process.env.ADMIN_PASSWORD && process.env.SESSION_SECRET) process.exit(0);

const example = existsSync(EXAMPLE) ? parse(readFileSync(EXAMPLE, "utf8")) : {};

if (!existsSync(FILE)) {
  const password = random(15);
  const template = existsSync(EXAMPLE)
    ? readFileSync(EXAMPLE, "utf8")
    : "ADMIN_EMAIL=admin@ktteams.example\nADMIN_PASSWORD=\nSESSION_SECRET=\n";
  const filled = template
    .replace(/^ADMIN_PASSWORD=.*$/m, `ADMIN_PASSWORD=${password}`)
    .replace(/^SESSION_SECRET=.*$/m, `SESSION_SECRET=${random(48)}`);
  writeFileSync(FILE, filled);
  const email = parse(filled).ADMIN_EMAIL || "admin@ktteams.example";
  console.log(
    [
      "",
      "  Created .env.local with your admin login (shown only this once):",
      `    Email:    ${email}`,
      `    Password: ${password}`,
      "  Sign in at http://localhost:3000/admin",
      "  Change it any time in .env.local (then restart) or in Admin > Login & password.",
      "",
    ].join("\n"),
  );
  process.exit(0);
}

const env = parse(readFileSync(FILE, "utf8"));
const problems = [];
if (!env.ADMIN_EMAIL) problems.push("ADMIN_EMAIL is empty");
if (!env.ADMIN_PASSWORD) problems.push("ADMIN_PASSWORD is empty");
else if (example.ADMIN_PASSWORD && env.ADMIN_PASSWORD === example.ADMIN_PASSWORD)
  problems.push("ADMIN_PASSWORD is still the example value from .env.example, which anyone can read on GitHub");
if (!env.SESSION_SECRET || env.SESSION_SECRET.length < 32) problems.push("SESSION_SECRET needs at least 32 characters");
else if (example.SESSION_SECRET && env.SESSION_SECRET === example.SESSION_SECRET)
  problems.push("SESSION_SECRET is still the example value from .env.example");
for (const k of ["ADMIN_PASSWORD", "SESSION_SECRET"]) {
  if (env[k]?.includes("$")) problems.push(`${k} contains "$", which Next.js treats as a variable and removes`);
}
if (problems.length) {
  console.log(["", "  Check .env.local before signing in to /admin:", ...problems.map((p) => `    - ${p}`), "  Edit it, then restart the server.", ""].join("\n"));
}
