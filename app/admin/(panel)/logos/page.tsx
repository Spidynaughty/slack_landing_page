import type { Metadata } from "next";
import { resetSetting } from "@/app/admin/actions";
import { InlineAction } from "@/components/admin/form-kit";
import { LogosForm } from "@/components/admin/forms";
import { Card, PageHeader } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/auth";
import { readSetting } from "@/lib/content";

export const metadata: Metadata = { title: "Customer logos" };

// Every admin page checks the session first, so navigations here wait for the server
export const instant = false;

export default async function LogosPage({ searchParams }: PageProps<"/admin/logos">) {
  await requireAdmin();
  const [{ reset }, logos] = await Promise.all([searchParams, readSetting("logos")]);
  return (
    <>
      <PageHeader
        title="Customer logos"
        description="The scrolling strip of company names on the home, pricing, solutions, enterprise and customer stories pages. Only list companies that have agreed to be shown."
      />
      <Card
        actions={
          <InlineAction action={resetSetting} fields={{ key: "logos", back: "/admin/logos" }} confirm="Go back to the original list of names?">
            Reset to original
          </InlineAction>
        }
      >
        <LogosForm key={typeof reset === "string" ? reset : "logos"} value={logos} />
      </Card>
    </>
  );
}
