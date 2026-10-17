import { saveSubmission, SubmissionError } from "@/lib/submissions";

const MAX_BYTES = 64 * 1024;

/**
 * POST /api/submissions
 * Body: { form: string, page?: string, fields: Record<string, string | boolean | string[]>, website?: string }
 * Stores a form entry for the admin inbox. `website` is a hidden honeypot field: bots fill it, people don't.
 */
export async function POST(request: Request) {
  // Only accept posts from this site's own pages
  const origin = request.headers.get("origin");
  if (origin && new URL(origin).host !== new URL(request.url).host) {
    return Response.json({ ok: false, error: "Cross-site submissions are not allowed" }, { status: 403 });
  }
  if (Number(request.headers.get("content-length") ?? 0) > MAX_BYTES) {
    return Response.json({ ok: false, error: "That submission is too large" }, { status: 413 });
  }

  let body: { form?: unknown; page?: unknown; fields?: unknown; website?: unknown };
  try {
    body = await request.json();
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
