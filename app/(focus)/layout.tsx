import { TextEditLoader } from "@/components/text-edit/loader";

/** Full-screen pages (like workspace sign-up) without the site header and footer. */
export default function FocusLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <main id="main" className="flex min-h-dvh flex-1 flex-col">
        {children}
      </main>
      <TextEditLoader />
    </>
  );
}
