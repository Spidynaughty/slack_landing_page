import { clientAddress, rateLimiter } from "@/lib/rate-limit";
import { isSameOrigin } from "@/lib/same-origin";
import { saveSubmission, SubmissionError } from "@/lib/submissions";

const MAX_BYTES = 64 * 1024;
const perAddress = rateLimiter("submissions", 20, 10 * 60 * 1000);
// Addresses can be made up, so all senders together are capped as well
const everyone = rateLimiter("submissions-all", 300, 60 * 60 * 1000);

/** Reads the body as text, or null once it passes `max` bytes (a missing or false Content-Length doesn't get around it). */
async function readBody(request: Request, max: number) {
  if (!request.body) return "";
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > max) {
      await reader.cancel();
      return null;
    }
    chunks.push(value);
  }
  return Buffer.concat(chunks).toString("utf8");
}

/**
 * POST /api/submissions
 * Body: { form: string, page?: string, fields: Record<string, string | boolean | string[]>, website?: string }
 * Stores a form entry for the admin inbox. `website` is a hidden honeypot field: bots fill it, people don't.
 */
export async function POST(request: Request) {
  // Only accept posts from this site's own pages
  if (!isSameOrigin(request)) {
    return Response.json({ ok: false, error: "Cross-site submissions are not allowed" }, { status: 403 });
  }

  const ip = clientAddress(request.headers);
  if (perAddress.limited(ip) || everyone.limited("all")) {
    return Response.json(
      { ok: false, error: "You've sent a lot of forms in a short time. Please wait a few minutes and try again." },
      { status: 429, headers: { "Retry-After": "600" } },
    );
  }
  perAddress.count(ip);
  everyone.count("all");

  if (Number(request.headers.get("content-length") ?? 0) > MAX_BYTES) {
    return Response.json({ ok: false, error: "That submission is too large" }, { status: 413 });
  }
  const raw = await readBody(request, MAX_BYTES);
  if (raw === null) return Response.json({ ok: false, error: "That submission is too large" }, { status: 413 });

  let body: { form?: unknown; page?: unknown; fields?: unknown; website?: unknown };
  try {
    body = JSON.parse(raw);
    if (!body || typeof body !== "object") throw new Error("not an object");
  } catch {
    return Response.json({ ok: false, error: "Send the form as JSON" }, { status: 400 });
  }

  if (typeof body.website === "string" && body.website.trim()) {
    return Response.json({ ok: true }, { status: 201 });
  }

  try {
    const id = await saveSubmission(body);
    return Response.json({ ok: true, id }, { status: 201 });
  } catch (err) {
    if (err instanceof SubmissionError) return Response.json({ ok: false, error: err.message }, { status: 422 });
    console.error("Failed to save submission", err);
    return Response.json({ ok: false, error: "We couldn't save that right now. Please try again." }, { status: 500 });
  }
}
