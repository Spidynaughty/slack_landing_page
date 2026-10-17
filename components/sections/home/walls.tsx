import type { CSSProperties } from "react";
import type { App } from "@/data/integrations";
import type { Testimonial } from "@/data/stories";
import { AppIcon } from "@/components/sections/apps";
import { TestimonialCard } from "@/components/sections/common";
import { Marquee } from "@/components/ui/marquee";
import { cn } from "@/lib/utils";

/** Three columns of testimonials drifting vertically at different speeds. Pauses on hover. */
export function WallOfLove({ items }: { items: Testimonial[] }) {
  const cols = [0, 1, 2].map((c) => items.filter((_, i) => i % 3 === c));
  return (
    <div className="relative h-[42rem] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,#000_12%,#000_88%,transparent)]">
      <div className="grid h-full gap-5 md:grid-cols-2 lg:grid-cols-3">
        {cols.map((col, c) => (
          <div key={c} className={cn("group overflow-hidden", c === 2 && "hidden lg:block", c === 1 && "hidden md:block")}>
            <div
              className="flex animate-marquee-y flex-col gap-5 group-hover:[animation-play-state:paused]"
              style={{ "--marquee-duration": `${36 + c * 10}s`, animationDirection: c === 1 ? "reverse" : "normal" } as CSSProperties}
            >
              {[...col, ...col].map((t, i) => (
                <div key={`${t.name}-${i}`} aria-hidden={i >= col.length ? true : undefined}>
                  <TestimonialCard t={t} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Rows of app icons gliding in opposite directions. */
export function AppWall({ apps }: { apps: App[] }) {
  const rows = [apps.slice(0, 8), apps.slice(8, 16), apps.slice(16, 24)];
  return (
    <div aria-hidden="true" className="flex flex-col gap-4">
      {rows.map((row, r) => (
        <Marquee key={r} duration={30 + r * 6} reverse={r === 1}>
          {row.map((a) => (
            <span key={a.slug} className="mx-2 inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 py-2.5 pr-5 pl-2.5">
              <AppIcon app={a} size="sm" />
              <span className="text-sm font-semibold text-white">{a.name}</span>
            </span>
          ))}
        </Marquee>
      ))}
    </div>
  );
}
