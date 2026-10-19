import { getAdmin } from "@/lib/auth";
import { isSameOrigin } from "@/lib/same-origin";
import { saveVisualEdit } from "@/lib/text-overrides";

/**
 * Used by the on-page text editor (components/text-edit). It lives under /admin
 * so the admin session cookie, which is scoped to /admin, is sent with it.
 */

/** GET /admin/api/text: is the visitor a signed-in admin? */
export async function GET() {
  const admin = await getAdmin();
  return Response.json({ admin: Boolean(admin) }, { status: admin ? 200 : 401, headers: { "Cache-Control": "no-store" } });
}

/** POST /admin/api/text: { current, replacement } saves new wording; { current, reset: true } restores the original. */
export async function POST(request: Request) {
  if (!(await getAdmin())) return Response.json({ error: "Sign in to the admin first." }, { status: 401 });
  if (!isSameOrigin(request)) {
    return Response.json({ error: "Cross-site requests are not allowed" }, { status: 403 });
  }

  let body: { current?: unknown; replacement?: unknown; reset?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Send JSON" }, { status: 400 });
  }
  const current = typeof body.current === "string" ? body.current.trim() : "";
  if (!current || current.length > 2000) return Response.json({ error: "Pick some text to change." }, { status: 422 });

  if (body.reset === true) {
    return Response.json(await saveVisualEdit(current, null));
  }
  const replacement = typeof body.replacement === "string" ? body.replacement.trim() : "";
  if (replacement.length > 2000) return Response.json({ error: "That text is too long." }, { status: 422 });
  return Response.json(await saveVisualEdit(current, replacement));
}
