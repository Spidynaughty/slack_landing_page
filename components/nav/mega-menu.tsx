import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { CardsMenu, FeaturedCard, MegaMenu, NavLink } from "@/data/nav";
import { Icon } from "@/components/ui/icon";
import { toneStyles } from "@/lib/tones";
import { cn } from "@/lib/utils";

type CloseProps = { onNavigate: () => void };

function MenuLink({ link, onNavigate, compact }: { link: NavLink; compact?: boolean } & CloseProps) {
  return (
    <Link
      href={link.href}
      onClick={onNavigate}
      className="group/ml flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-surface-2 focus-visible:bg-surface-2"
    >
      {link.icon && (
        <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary transition-transform group-hover/ml:scale-110">
          <Icon name={link.icon} className="size-4" />
        </span>
      )}
      <span className="min-w-0">
        <span className="flex items-center gap-2 text-[0.95rem] font-semibold text-fg">
          {link.label}
          {link.badge && (
            <span className="rounded-full bg-mint/15 px-2 py-0.5 text-[0.65rem] font-bold tracking-wide text-mint-ink uppercase">
              {link.badge}
            </span>
          )}
        </span>
        {link.description && !compact && (
          <span className="mt-0.5 block text-[0.825rem] leading-snug text-muted">{link.description}</span>
        )}
      </span>
    </Link>
  );
}

export function FeaturedCardView({ card, onNavigate }: { card: FeaturedCard } & CloseProps) {
  const t = toneStyles[card.tone];
  return (
    <Link
      href={card.href}
      onClick={onNavigate}
      className={cn(
        "group/fc relative flex flex-col overflow-hidden rounded-2xl border border-line p-5 transition-shadow hover:shadow-card",
        t.tint,
      )}
    >
      <span className={cn("mb-4 inline-flex size-10 items-center justify-center rounded-xl", t.solid)}>
        <Icon name={card.icon} className="size-5" />
      </span>
      <span className={cn("text-xs font-bold tracking-[0.12em] uppercase", t.ink)}>{card.eyebrow}</span>
      <span className="mt-1 font-display text-lg leading-snug font-bold text-fg">{card.title}</span>
      <span className="mt-1.5 text-sm text-muted">{card.description}</span>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-fg">
        {card.cta}
        <ArrowRight className="size-4 transition-transform group-hover/fc:translate-x-1" aria-hidden="true" />
      </span>
    </Link>
  );
}

export function MegaPanel({ menu, onNavigate }: { menu: MegaMenu } & CloseProps) {
  const cols = menu.groups.length;
  // Solutions lists industries without descriptions; render them compactly in two columns.
  return (
    <div className="grid gap-8 p-6 lg:grid-cols-[1fr_17rem] lg:p-8 xl:grid-cols-[1fr_19rem]">
      <div>
        <div
          className={cn(
            "grid gap-x-6 gap-y-6",
            cols >= 4 ? "lg:grid-cols-4" : cols === 3 ? "lg:grid-cols-3" : "lg:grid-cols-[1fr_1.15fr]",
          )}
        >
          {menu.groups.map((group) => {
            const compact = group.links.every((l) => !l.description);
            return (
              <div key={group.title}>
                <p className="mb-2 px-2.5 text-xs font-bold tracking-[0.14em] text-subtle uppercase">{group.title}</p>
                <ul className={cn("flex flex-col gap-0.5", compact && "lg:grid lg:grid-cols-2 lg:gap-x-2")}>
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <MenuLink link={link} onNavigate={onNavigate} compact={compact} />
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
        {(menu.quickLinks || menu.footerLink) && (
          <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-line pt-5">
            {menu.quickLinks?.map((q) => (
              <Link
                key={q.href}
                href={q.href}
                onClick={onNavigate}
                className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm font-semibold text-fg transition-colors hover:border-primary/50 hover:text-primary"
              >
                {q.icon && <Icon name={q.icon} className="size-4" />}
                {q.label}
              </Link>
            ))}
            {menu.footerLink && (
              <Link
                href={menu.footerLink.href}
                onClick={onNavigate}
                className="group/fl inline-flex items-center gap-1.5 px-2.5 text-sm font-semibold text-primary"
              >
                {menu.footerLink.label}
                <ArrowRight className="size-4 transition-transform group-hover/fl:translate-x-1" aria-hidden="true" />
              </Link>
            )}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-4">
        {menu.featured.map((card) => (
          <FeaturedCardView key={card.href} card={card} onNavigate={onNavigate} />
        ))}
      </div>
    </div>
  );
}

export function CardsPanel({ menu, onNavigate }: { menu: CardsMenu } & CloseProps) {
  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <p className="max-w-xl text-lead text-muted">{menu.intro}</p>
        <Link
          href={menu.footerLink.href}
          onClick={onNavigate}
          className="group/fl inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
        >
          {menu.footerLink.label}
          <ArrowUpRight className="size-4 transition-transform group-hover/fl:-translate-y-0.5 group-hover/fl:translate-x-0.5" aria-hidden="true" />
        </Link>
      </div>
      <ul className="grid gap-4 lg:grid-cols-4">
        {menu.cards.map((card) => {
          const t = toneStyles[card.tone];
          return (
            <li key={card.href}>
              <Link
                href={card.href}
                onClick={onNavigate}
                className={cn(
                  "group/cc flex h-full flex-col rounded-2xl border border-line p-5 transition-all hover:-translate-y-1 hover:shadow-card",
                  t.tint,
                )}
              >
                <span className={cn("mb-6 inline-flex size-11 items-center justify-center rounded-xl", t.solid)}>
                  <Icon name={card.icon} className="size-5" />
                </span>
                <span className="font-display text-lg leading-snug font-bold text-fg">{card.label}</span>
                <span className="mt-2 text-sm text-muted">{card.description}</span>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-fg">
                  Learn more
                  <ArrowRight className="size-4 transition-transform group-hover/cc:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
