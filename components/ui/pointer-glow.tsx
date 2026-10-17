"use client";

import { useEffect } from "react";

/** Feeds the pointer position to the hovered `.glow-card` so its border glow follows the cursor. */
export function PointerGlow() {
  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const card = (e.target as Element | null)?.closest?.(".glow-card") as HTMLElement | null;
        if (!card) return;
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - r.left}px`);
        card.style.setProperty("--my", `${e.clientY - r.top}px`);
      });
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", onMove);
    };
  }, []);
  return null;
}
