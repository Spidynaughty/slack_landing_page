import { getAdmin } from "@/lib/auth";
import { db } from "@/lib/db";

function cell(value: unknown) {
  let s = typeof value === "string" ? value : Array.isArray(value) ? value.join("; ") : value == null ? "" : String(value);
  // Stop spreadsheet apps from running cell contents as formulas
  if (/^[=+\-@]/.test(s)) s = `'${s}`;
  return `"${s.replace(/"/g, '""')}"`;
}

/** GET /admin/inbox/export: every submission (optionally one form) as a CSV download. */
export async function GET(request: Request) {
  if (!(await getAdmin())) return new Response("Sign in to the admin first.", { status: 401 });

  const form = new URL(request.url).searchParams.get("form")?.slice(0, 80) ?? "";
  const client = await db();
  const res = await client.execute(
    form
      ? { sql: "SELECT * FROM submissions WHERE form = ? ORDER BY id DESC", args: [form] }
      : "SELECT * FROM submissions ORDER BY id DESC",
  );

  const rows = res.rows.map((r) => {
    let data: Record<string, unknown> = {};
    try {
      data = JSON.parse(String(r.data));
    } catch {}
    return { id: r.id, created_at: r.created_at, form: r.form, page: r.page, status: r.status, name: r.name, email: r.email, data };
  });
  const fieldKeys = [...new Set(rows.flatMap((r) => Object.keys(r.data)))];
  const header = ["id", "created_at", "form", "page", "status", "name", "email", ...fieldKeys];
  const lines = [header.map(cell).join(",")];
  for (const r of rows) {
    lines.push([r.id, r.created_at, r.form, r.page, r.status, r.name, r.email, ...fieldKeys.map((k) => r.data[k])].map(cell).join(","));
  }

  return new Response(lines.join("\r\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="submissions${form ? `-${form.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}` : ""}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
