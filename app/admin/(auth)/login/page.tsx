import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { LoginForm } from "@/components/admin/forms";
import { LogoMark, Wordmark } from "@/components/ui/logo";
import { adminConfigured } from "@/lib/auth";

export const metadata: Metadata = { title: "Sign in" };

export default function LoginPage({ searchParams }: PageProps<"/admin/login">) {
  return (
    <div className="grid min-h-dvh place-items-center bg-bg px-4 py-12">
      <div className="w-full max-w-sm">
        <Link href="/" className="mx-auto mb-8 flex w-fit items-center gap-2">
          <LogoMark className="size-9" />
          <Wordmark className="text-2xl" />
        </Link>
        <div className="rounded-3xl border border-line bg-surface p-7 shadow-card sm:p-8">
          <h1 className="text-xl font-bold text-fg">Sign in to the admin</h1>
          <p className="mt-1 mb-6 text-sm text-muted">Manage reviews, home page content, FAQs and form submissions.</p>
          {adminConfigured() ? (
            <Suspense fallback={<LoginForm next="/admin" />}>
              <LoginWithRedirect searchParams={searchParams} />
            </Suspense>
          ) : (
            <p role="alert" className="rounded-xl bg-tint-sun p-4 text-sm text-sun-ink">
              Admin login isn&apos;t set up yet. Add <code className="font-mono">ADMIN_EMAIL</code>, <code className="font-mono">ADMIN_PASSWORD</code>{" "}
              and <code className="font-mono">SESSION_SECRET</code> to your environment (see <code className="font-mono">.env.example</code>), then restart the
              server.
            </p>
          )}
        </div>
        <p className="mt-6 text-center text-sm text-muted">
          <Link href="/" className="font-semibold text-primary hover:underline">
            Back to the site
          </Link>
        </p>
      </div>
    </div>
  );
}

async function LoginWithRedirect({ searchParams }: { searchParams: PageProps<"/admin/login">["searchParams"] }) {
  const { next } = await searchParams;
  return <LoginForm next={typeof next === "string" ? next : "/admin"} />;
}
