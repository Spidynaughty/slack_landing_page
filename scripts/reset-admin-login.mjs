// Removes the admin login saved under Admin > Login & password, so the
// ADMIN_EMAIL / ADMIN_PASSWORD environment variables work again.
// Usage: npm run admin:reset-login
import { createClient } from "@libsql/client";

const url = process.env.DATABASE_URL || "file:.data/ktteams.db";
const client = createClient({ url, authToken: process.env.DATABASE_AUTH_TOKEN });

try {
  const res = await client.execute("DELETE FROM admin_credentials");
  console.log(
    res.rowsAffected
      ? "Saved admin login removed. Sign in with ADMIN_EMAIL and ADMIN_PASSWORD from your environment."
      : "No saved admin login. ADMIN_EMAIL and ADMIN_PASSWORD from your environment are already in use.",
  );
} catch (err) {
  if (String(err).includes("no such table")) console.log("No saved admin login yet. Nothing to reset.");
  else throw err;
} finally {
  client.close();
}
