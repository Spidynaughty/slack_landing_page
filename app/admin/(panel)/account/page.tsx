import type { Metadata } from "next";
import { LoginDetailsForm } from "@/components/admin/forms";
import { Card, PageHeader } from "@/components/admin/ui";
import { loginSource, MIN_PASSWORD, requireAdmin } from "@/lib/auth";

export const metadata: Metadata = { title: "Login & password" };

export default async function AccountPage() {
  const admin = await requireAdmin();
  const source = await loginSource();

  return (
    <>
      <PageHeader title="Login & password" description="The email and password you use to sign in to this admin." />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <Card title="Change your login">
          <LoginDetailsForm email={admin.email} minPassword={MIN_PASSWORD} />
        </Card>
        <div className="flex flex-col gap-6">
          <Card title="Good to know">
            <ul className="flex list-disc flex-col gap-2 pl-5 text-sm text-muted">
              <li>Saving signs out every other device that is signed in. You stay signed in here.</li>
              <li>Your password is stored as a secure hash, never as plain text.</li>
              {source === "environment" ? (
                <li>
                  Your login currently comes from the server&apos;s environment settings. Once you save here, the new login is used instead.
                </li>
              ) : (
                <li>Your login is saved in the site&apos;s database. The login in the environment settings is no longer used.</li>
              )}
            </ul>
          </Card>
          <Card title="Forgot your password?">
            <p className="text-sm text-muted">
              Whoever runs the server can run <code className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-[0.8rem] text-fg">npm run admin:reset-login</code>{" "}
              in the project folder. That removes the saved login, and the email and password from the environment settings work again.
            </p>
          </Card>
        </div>
      </div>
    </>
  );
}
