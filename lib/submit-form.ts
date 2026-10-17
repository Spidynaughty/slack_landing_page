/** Browser helper: sends a form to the backend so it lands in the admin inbox. */
export async function submitForm(form: string, fields: Record<string, string | boolean | string[]>, website = "") {
  const res = await fetch("/api/submissions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ form, page: window.location.pathname, fields, website }),
  });
  if (!res.ok) {
    const body = (await res.json().catch(() => null)) as { error?: string } | null;
    throw new Error(body?.error ?? "Something went wrong. Please try again.");
  }
}
