/**
 * Site text overrides, applied as JSX is created.
 *
 * tsconfig points `jsxImportSource` at this folder, so every element in the app
 * goes through `withTextOverrides()`. Plain-text children are swapped for the
 * wording the admin saved (see lib/text-overrides.ts and /admin/text). This lets
 * the admin change any visible text without each page knowing about it.
 *
 * The rules live on globalThis: the server keeps them in sync with the database,
 * and the browser gets the same rules from an inline script in the root layout.
 */

export type TextRules = {
  /** Whole-text replacements: original (trimmed) -> new text */
  exact: Record<string, string>;
  /** Replace-everywhere rules, applied inside any text */
  contains: [string, string][];
  /** Version counter, so the browser can tell rules apart */
  v: number;
  active: boolean;
};

declare global {
  var __ktText: TextRules | undefined;
}

// Kept current by lib/text-overrides.ts on the server; never reads the clock or
// the database here, because rendering must stay deterministic for prerendering
function rules(): TextRules | undefined {
  const r = globalThis.__ktText;
  return r?.active ? r : undefined;
}

export function swapText(text: string, r: TextRules): string {
  const trimmed = text.trim();
  if (!trimmed) return text;
  const direct = r.exact[trimmed];
  if (direct !== undefined) return text.replace(trimmed, () => direct);
  let out = text;
  for (const [from, to] of r.contains) {
    if (out.includes(from)) out = out.split(from).join(to);
  }
  if (out !== text) {
    // An exact rule may have been saved for the already-replaced wording
    const t2 = out.trim();
    const second = r.exact[t2];
    if (second !== undefined) return out.replace(t2, () => second);
  }
  return out;
}

/** Text children are swapped; numbers (prices, counts) only by an exact rule for that number. */
function swapChild(child: unknown, r: TextRules) {
  if (typeof child === "string") return swapText(child, r);
  if (typeof child === "number") {
    const hit = r.exact[String(child)];
    return hit === undefined ? child : hit;
  }
  return child;
}

const SKIP = new Set(["script", "style", "title"]);

export function withTextOverrides<P>(type: unknown, props: P): P {
  const r = rules();
  if (!r || props == null || typeof props !== "object") return props;
  if (typeof type === "string" && SKIP.has(type)) return props;
  const p = props as Record<string, unknown>;
  // Admin screens show the stored text as-is
  if (p["data-raw-text"] !== undefined) return props;
  const children = p.children;
  if (typeof children === "string" || typeof children === "number") {
    const next = swapChild(children, r);
    return next === children ? props : ({ ...p, children: next } as P);
  }
  if (Array.isArray(children)) {
    let changed = false;
    const next = children.map((c) => {
      const s = swapChild(c, r);
      if (s !== c) changed = true;
      return s;
    });
    return changed ? ({ ...p, children: next } as P) : props;
  }
  return props;
}
