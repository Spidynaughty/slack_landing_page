/**
 * Shown inside the admin panel while a page checks the session and loads its data.
 * It also gives Next.js an instant placeholder for admin navigations, which the
 * dev-mode instant check asks for.
 */
export default function AdminLoading() {
  return (
    <div role="status" aria-label="Loading">
      <div className="h-8 w-48 animate-pulse-soft rounded-full bg-surface-3" />
      <div className="mt-3 h-4 w-72 max-w-full animate-pulse-soft rounded-full bg-surface-2" />
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-28 animate-pulse-soft rounded-2xl bg-surface-2" />
        ))}
      </div>
      <div className="mt-6 h-64 animate-pulse-soft rounded-2xl bg-surface-2" />
    </div>
  );
}
