import { Suspense, type ReactNode } from "react";
import { AdminNav } from "@/components/admin/nav";
import { requireAdmin } from "@/lib/auth";
import { db } from "@/lib/db";

// Every admin page reads the session, so navigations here wait for the server
export const instant = false;

export default function PanelLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<PanelSkeleton />}>
      <Panel>{children}</Panel>
    </Suspense>
  );
}

async function Panel({ children }: { children: ReactNode }) {
  const admin = await requireAdmin();
  const client = await db();
  const res = await client.execute("SELECT COUNT(*) AS n FROM submissions WHERE status = 'new'");
  return (
    <div className="min-h-dvh bg-bg lg:grid lg:grid-cols-[15.5rem_minmax(0,1fr)]">
      <AdminNav email={admin.email} newCount={Number(res.rows[0].n)} />
      <main id="main" className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-8 lg:px-10 lg:py-10">
        {children}
      </main>
    </div>
  );
}

function PanelSkeleton() {
  return (
    <div role="status" aria-label="Loading admin" className="min-h-dvh bg-bg lg:grid lg:grid-cols-[15.5rem_minmax(0,1fr)]">
      <div className="hidden border-r border-line bg-surface lg:block" />
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-8 lg:px-10">
        <div className="h-8 w-48 animate-pulse-soft rounded-full bg-surface-3" />
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-28 animate-pulse-soft rounded-2xl bg-surface-2" />
          ))}
        </div>
      </div>
    </div>
  );
}
