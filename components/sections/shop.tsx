"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { useRef, useState } from "react";
import { LogoMark } from "@/components/ui/logo";
import { useDialog } from "@/components/ui/use-dialog";
import { toneStyles, type Tone } from "@/lib/tones";
import { cn } from "@/lib/utils";

type Product = { id: string; name: string; price: number; tone: Tone; shape: "hoodie" | "tee" | "cap" | "mug" | "notebook" | "stickers" | "bottle" | "tote"; note: string };

const products: Product[] = [
  { id: "hoodie", name: "Cozy Channel Hoodie", price: 64, tone: "violet", shape: "hoodie", note: "Organic cotton fleece" },
  { id: "tee", name: "Typing Dots Tee", price: 28, tone: "coral", shape: "tee", note: "Soft-washed jersey" },
  { id: "cap", name: "Huddle Up Cap", price: 26, tone: "mint", shape: "cap", note: "Embroidered dad cap" },
  { id: "mug", name: "Async Mug", price: 18, tone: "sun", shape: "mug", note: "12 oz ceramic" },
  { id: "notebook", name: "Canvas Notebook", price: 16, tone: "sky", shape: "notebook", note: "Dot grid, 160 pages" },
  { id: "stickers", name: "Emoji Sticker Pack", price: 9, tone: "pink", shape: "stickers", note: "12 vinyl stickers" },
  { id: "bottle", name: "Focus Mode Bottle", price: 32, tone: "mint", shape: "bottle", note: "Insulated steel, 20 oz" },
  { id: "tote", name: "Ship It Tote", price: 22, tone: "violet", shape: "tote", note: "Heavy canvas" },
];

function ProductArt({ p }: { p: Product }) {
  const t = toneStyles[p.tone];
  const base = cn("relative flex items-center justify-center shadow-card", t.solid);
  const art = {
    hoodie: <div className={cn(base, "h-28 w-32 rounded-t-[3rem] rounded-b-2xl")}><LogoMark className="size-10" /></div>,
    tee: <div className={cn(base, "h-28 w-32 rounded-2xl [clip-path:polygon(20%_0,80%_0,100%_18%,88%_32%,82%_28%,82%_100%,18%_100%,18%_28%,12%_32%,0_18%)]")}><LogoMark className="size-10" /></div>,
    cap: <div className={cn(base, "h-20 w-32 rounded-t-full rounded-b-lg")}><LogoMark className="size-9" /></div>,
    mug: <div className="relative"><div className={cn(base, "h-28 w-24 rounded-b-3xl rounded-t-lg")}><LogoMark className="size-10" /></div><span className={cn("absolute top-6 -right-6 h-14 w-9 rounded-r-full border-[7px] border-l-0", "border-current", t.ink)} /></div>,
    notebook: <div className={cn(base, "h-32 w-24 rounded-r-2xl rounded-l-md")}><LogoMark className="size-10" /><span className="absolute inset-y-0 left-2 w-1 bg-black/15" /></div>,
    stickers: <div className="relative h-28 w-32">{[0, 1, 2].map((i) => <span key={i} className={cn("absolute flex size-16 items-center justify-center rounded-2xl shadow-card", toneStyles[(["pink", "sun", "mint"] as Tone[])[i]].solid)} style={{ left: i * 28, top: i % 2 ? 26 : 4, transform: `rotate(${(i - 1) * 12}deg)` }}><LogoMark className="size-8" /></span>)}</div>,
    bottle: <div className="flex flex-col items-center"><span className="h-5 w-10 rounded-t-lg bg-fg/70" /><div className={cn(base, "h-28 w-16 rounded-3xl")}><LogoMark className="size-8" /></div></div>,
    tote: <div className="relative"><span className="absolute -top-8 left-1/2 h-12 w-16 -translate-x-1/2 rounded-t-full border-[6px] border-b-0 border-fg/60" /><div className={cn(base, "h-28 w-28 rounded-b-2xl rounded-t-md")}><LogoMark className="size-10" /></div></div>,
  };
  return <div className={cn("flex h-56 items-center justify-center", t.tint)} aria-hidden="true">{art[p.shape]}</div>;
}

/** Product grid with a UI-only cart drawer. */
export function Shop() {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [open, setOpen] = useState(false);
  const [checkedOut, setCheckedOut] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  useDialog(open, () => setOpen(false), drawerRef);

  const count = Object.values(cart).reduce((a, b) => a + b, 0);
  const subtotal = Object.entries(cart).reduce((s, [id, q]) => s + (products.find((p) => p.id === id)?.price ?? 0) * q, 0);
  const add = (id: string, d = 1) =>
    setCart((c) => {
      const q = (c[id] ?? 0) + d;
      const next = { ...c };
      if (q <= 0) delete next[id];
      else next[id] = q;
      return next;
    });

  return (
    <div>
      <div className="mb-8 flex items-center justify-between gap-4">
        <p className="text-muted">{products.length} products · Free shipping over $75</p>
        <button
          type="button"
          onClick={() => {
            setCheckedOut(false);
            setOpen(true);
          }}
          className="relative inline-flex h-11 items-center gap-2 rounded-full border border-line-strong bg-surface px-5 font-semibold text-fg shadow-soft hover:bg-surface-2"
          aria-label={`Open cart, ${count} item${count === 1 ? "" : "s"}`}
        >
          <ShoppingBag className="size-4" aria-hidden="true" /> Cart
          {count > 0 && <span className="inline-flex min-w-6 items-center justify-center rounded-full bg-primary px-1.5 text-xs font-bold text-primary-fg">{count}</span>}
        </button>
      </div>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((p) => (
          <li key={p.id} className="group overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface shadow-soft transition-shadow hover:shadow-card">
            <div className="transition-transform duration-500 group-hover:scale-[1.03]">
              <ProductArt p={p} />
            </div>
            <div className="p-5">
              <h3 className="font-display text-lg font-bold text-fg">{p.name}</h3>
              <p className="text-sm text-muted">{p.note}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="font-display text-xl font-bold text-fg">${p.price}</span>
                <button type="button" onClick={() => add(p.id)} className="inline-flex h-10 items-center gap-1.5 rounded-full bg-primary px-4 text-sm font-semibold text-primary-fg hover:bg-primary-hover" aria-label={`Add ${p.name} to cart`}>
                  <Plus className="size-4" aria-hidden="true" /> Add
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-[85] flex justify-end" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-deep/50 backdrop-blur-sm" onClick={() => setOpen(false)} aria-hidden="true" />
            <motion.div
              ref={drawerRef}
              role="dialog"
              aria-modal="true"
              aria-label="Shopping cart"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              className="relative flex h-full w-full max-w-md flex-col bg-surface shadow-float"
            >
              <div className="flex items-center justify-between border-b border-line p-5">
                <h2 className="font-display text-xl font-bold text-fg">Your cart</h2>
                <button type="button" onClick={() => setOpen(false)} className="inline-flex size-9 items-center justify-center rounded-full hover:bg-surface-2" aria-label="Close cart">
                  <X className="size-4" aria-hidden="true" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-5">
                {checkedOut ? (
                  <div role="status" className="py-16 text-center">
                    <p className="font-display text-2xl font-bold text-fg">Thanks for shopping!</p>
                    <p className="mt-2 text-muted">This is a demo store, so no order was placed and no payment was taken.</p>
                  </div>
                ) : count === 0 ? (
                  <p className="py-16 text-center text-muted">Your cart is empty.</p>
                ) : (
                  <ul className="flex flex-col gap-4">
                    {Object.entries(cart).map(([id, q]) => {
                      const p = products.find((x) => x.id === id)!;
                      return (
                        <li key={id} className="flex items-center gap-4">
                          <span className={cn("inline-flex size-14 shrink-0 items-center justify-center rounded-xl", toneStyles[p.tone].solid)}>
                            <LogoMark className="size-7" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate font-semibold text-fg">{p.name}</span>
                            <span className="text-sm text-muted">${p.price}</span>
                          </span>
                          <span className="flex items-center gap-1 rounded-full border border-line">
                            <button type="button" onClick={() => add(id, -1)} className="inline-flex size-8 items-center justify-center" aria-label={`Remove one ${p.name}`}>
                              <Minus className="size-3.5" aria-hidden="true" />
                            </button>
                            <span className="w-5 text-center text-sm font-semibold tabular-nums">{q}</span>
                            <button type="button" onClick={() => add(id)} className="inline-flex size-8 items-center justify-center" aria-label={`Add one ${p.name}`}>
                              <Plus className="size-3.5" aria-hidden="true" />
                            </button>
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
              {!checkedOut && count > 0 && (
                <div className="border-t border-line p-5">
                  <div className="mb-4 flex justify-between font-semibold text-fg">
                    <span>Subtotal</span>
                    <span className="tabular-nums">${subtotal.toFixed(2)}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setCheckedOut(true);
                      setCart({});
                    }}
                    className="h-12 w-full rounded-full bg-primary font-semibold text-primary-fg hover:bg-primary-hover"
                  >
                    Checkout (demo)
                  </button>
                  <p className="mt-2 text-center text-xs text-subtle">Demo store: no payment details are collected.</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
