import type { CustomerLogo as Logo, LogoShape } from "@/data/customers";
import { CustomerLogo } from "@/components/ui/customer-logo";
import { Marquee } from "@/components/ui/marquee";
import { getSetting } from "@/lib/content";
import { cn } from "@/lib/utils";

const shapes: LogoShape[] = ["triangle", "bolt", "diamond", "circle", "ring", "wave", "square", "hex"];
const styles: Logo["style"][] = ["bold", "wide", "mono", "serif", "bold", "italic", "wide", "serif"];

/** Two rows of customer names gliding past. The names and heading are managed in the admin. */
export async function LogoCloud({ title, className }: { title?: string; className?: string }) {
  const logos = await getSetting("logos");
  if (!logos.names.length) return null;
  const items: Logo[] = logos.names.map((name, i) => ({ name, shape: shapes[i % shapes.length], style: styles[i % styles.length] }));
  const half = Math.ceil(items.length / 2);
  const rows = items.length > 5 ? [items.slice(0, half), items.slice(half)] : [items];
  return (
    <section aria-label="Customers" className={cn("bg-bg py-12", className)}>
      <div className="container-page mb-8 flex items-center gap-4">
        <span className="h-px flex-1 bg-gradient-to-r from-transparent to-line-strong" />
        <p className="text-center text-sm font-semibold text-muted">{title ?? logos.title}</p>
        <span className="h-px flex-1 bg-gradient-to-l from-transparent to-line-strong" />
      </div>
      <div className="flex flex-col gap-6">
        {rows.map((row, i) => (
          <Marquee key={i} duration={38 + i * 8} reverse={i === 1}>
            {row.map((l) => (
              <span key={l.name} className="mx-3 inline-flex items-center rounded-full border border-line bg-surface px-6 py-3 shadow-soft">
                <CustomerLogo logo={l} className="text-base text-fg/75" />
              </span>
            ))}
          </Marquee>
        ))}
      </div>
    </section>
  );
}
