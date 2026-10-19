"use client";

import { Check, Loader2, MousePointerClick, Pencil, RotateCcw, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { TextRules } from "@/lib/jsx/transform";
import { cn } from "@/lib/utils";

type Target = { text: string; rect: DOMRect };
type Status = "checking" | "ready" | "signed-out";

/** The visible text node under a point, if the point is really over its text. */
function textAt(x: number, y: number): Text | null {
  const doc = document as Document & {
    caretPositionFromPoint?: (x: number, y: number) => { offsetNode: Node } | null;
    caretRangeFromPoint?: (x: number, y: number) => Range | null;
  };
  const node = doc.caretPositionFromPoint?.(x, y)?.offsetNode ?? doc.caretRangeFromPoint?.(x, y)?.startContainer ?? null;
  if (!node || node.nodeType !== Node.TEXT_NODE || !node.nodeValue?.trim()) return null;
  const range = document.createRange();
  range.selectNodeContents(node);
  const hit = Array.from(range.getClientRects()).some((r) => x >= r.left - 2 && x <= r.right + 2 && y >= r.top - 2 && y <= r.bottom + 2);
  return hit ? (node as Text) : null;
}

function rectOf(node: Text) {
  const range = document.createRange();
  range.selectNodeContents(node);
  return range.getBoundingClientRect();
}

function rules(): TextRules {
  return (window.__ktText ??= { exact: {}, contains: [], v: 0, active: false });
}

export function TextEditor({ onExit }: { onExit: () => void }) {
  const [status, setStatus] = useState<Status>("checking");
  const [mode, setMode] = useState<"edit" | "browse">("edit");
  const [hover, setHover] = useState<DOMRect | null>(null);
  const [target, setTarget] = useState<Target | null>(null);
  const [draft, setDraft] = useState("");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");
  const [error, setError] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  /** The DOM text node being edited (kept outside state, since it is updated in place) */
  const nodeRef = useRef<Text | null>(null);

  useEffect(() => {
    fetch("/admin/api/text", { cache: "no-store" })
      .then((r) => setStatus(r.ok ? "ready" : "signed-out"))
      .catch(() => setStatus("signed-out"));
  }, []);

  const active = status === "ready" && mode === "edit" && !target;

  // Outline the text under the pointer
  useEffect(() => {
    if (!active) return;
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const el = e.target as Element | null;
        if (el?.closest?.("[data-kt-editor]")) return setHover(null);
        const node = textAt(e.clientX, e.clientY);
        setHover(node ? rectOf(node) : null);
      });
    };
    window.addEventListener("pointermove", onMove);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, [active]);

  // In edit mode a click picks text instead of following links or pressing buttons
  useEffect(() => {
    if (!active) return;
    const onClick = (e: MouseEvent) => {
      const el = e.target as Element | null;
      if (el?.closest?.("[data-kt-editor]")) return;
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      const node = textAt(e.clientX, e.clientY);
      if (!node) {
        setToast("Click directly on some text to change it.");
        return;
      }
      const text = node.nodeValue!.trim();
      nodeRef.current = node;
      setError("");
      setDraft(text);
      setTarget({ text, rect: rectOf(node) });
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [active]);

  useEffect(() => {
    if (target) textareaRef.current?.focus();
  }, [target]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 3500);
    return () => clearTimeout(t);
  }, [toast]);

  const close = useCallback(() => {
    setTarget(null);
    setError("");
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && target) close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [target, close]);

  const isChanged = target ? Object.values(rules().exact).includes(target.text) : false;

  async function send(body: { current: string; replacement?: string; reset?: boolean }) {
    if (!target) return;
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/admin/api/text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = (await res.json().catch(() => ({}))) as { original?: string; replacement?: string; error?: string };
      if (!res.ok || !data.original) throw new Error(data.error ?? "Couldn't save. Try again.");
      // Show the new wording right away, and keep client-side renders in step
      const node = nodeRef.current;
      if (node) node.nodeValue = (node.nodeValue ?? "").replace(target.text, data.replacement ?? data.original);
      const r = rules();
      if (data.replacement === data.original) delete r.exact[data.original];
      else r.exact[data.original] = data.replacement!;
      r.active = Object.keys(r.exact).length > 0 || r.contains.length > 0;
      setToast(body.reset ? "Back to the original text." : "Saved. Visitors see the new text now.");
      close();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Couldn't save. Try again.");
    } finally {
      setSaving(false);
    }
  }

  // Keep the popover on screen
  const pop = target
    ? (() => {
        const width = Math.min(448, window.innerWidth - 32);
        const left = Math.min(Math.max(16, target.rect.left), window.innerWidth - width - 16);
        const below = target.rect.bottom + 12;
        const top = below + 260 > window.innerHeight ? Math.max(16, target.rect.top - 272) : below;
        return { width, left, top };
      })()
    : null;

  return (
    <div data-kt-editor="" className="font-sans">
      {active && hover && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed z-[90] rounded-md bg-primary/10 ring-2 ring-primary"
          style={{ left: hover.left - 4, top: hover.top - 2, width: hover.width + 8, height: hover.height + 4 }}
        />
      )}

      {target && pop && (
        <div
          role="dialog"
          aria-label="Change this text"
          className="fixed z-[95] rounded-2xl border border-line bg-surface p-4 text-left shadow-float"
          style={{ left: pop.left, top: pop.top, width: pop.width }}
        >
          <div className="mb-2 flex items-center justify-between gap-2">
            <p className="text-sm font-bold text-fg">Change this text</p>
            <button type="button" onClick={close} className="inline-flex size-8 items-center justify-center rounded-full text-muted hover:bg-surface-2" aria-label="Cancel">
              <X className="size-4" aria-hidden="true" />
            </button>
          </div>
          <textarea
            ref={textareaRef}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) send({ current: target.text, replacement: draft });
            }}
            rows={Math.min(8, Math.max(2, Math.ceil(draft.length / 48)))}
            className="w-full rounded-xl border border-line-strong bg-bg px-3 py-2 text-[0.95rem] leading-relaxed text-fg outline-none focus:border-primary focus:ring-4 focus:ring-primary/15"
          />
          <p className="mt-1.5 text-xs text-subtle">Every place on the site showing exactly this text will change.</p>
          {error && (
            <p role="alert" className="mt-2 text-sm font-medium text-danger">
              {error}
            </p>
          )}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <button
              type="button"
              disabled={saving || !draft.trim() || draft.trim() === target.text}
              onClick={() => send({ current: target.text, replacement: draft })}
              className="inline-flex h-9 items-center gap-1.5 rounded-full bg-primary px-4 text-sm font-semibold text-primary-fg hover:bg-primary-hover disabled:opacity-50"
            >
              {saving ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : <Check className="size-4" aria-hidden="true" />}
              Save
            </button>
            {isChanged && (
              <button
                type="button"
                disabled={saving}
                onClick={() => send({ current: target.text, reset: true })}
                className="inline-flex h-9 items-center gap-1.5 rounded-full border border-line-strong px-4 text-sm font-semibold text-fg hover:bg-surface-2 disabled:opacity-50"
              >
                <RotateCcw className="size-4" aria-hidden="true" /> Undo my change
              </button>
            )}
            <button type="button" onClick={close} className="h-9 rounded-full px-3 text-sm font-semibold text-muted hover:text-fg">
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="fixed inset-x-0 bottom-4 z-[96] flex justify-center px-4">
        <div className="flex max-w-full flex-wrap items-center justify-center gap-2 rounded-full border border-white/10 bg-[#051121] py-2 pr-2 pl-4 text-sm text-white shadow-float">
          <span className="flex items-center gap-2 font-semibold">
            <Pencil className="size-4 text-[#5db8ff]" aria-hidden="true" />
            {status === "checking" ? "Starting editor…" : status === "signed-out" ? "Sign in to edit text" : mode === "edit" ? "Click any text to change it" : "Browse the site, then switch back to Edit"}
          </span>
          {status === "signed-out" ? (
            <a
              href={`/admin/login?next=${encodeURIComponent("/admin/text")}`}
              className="rounded-full bg-white px-3.5 py-1.5 text-sm font-semibold text-[#051121] hover:bg-white/90"
            >
              Sign in
            </a>
          ) : (
            status === "ready" && (
              <span className="flex rounded-full bg-white/10 p-0.5" role="radiogroup" aria-label="Editor mode">
                {(["edit", "browse"] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    role="radio"
                    aria-checked={mode === m}
                    onClick={() => {
                      setMode(m);
                      close();
                    }}
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold",
                      mode === m ? "bg-white text-[#051121]" : "text-white/75 hover:text-white",
                    )}
                  >
                    {m === "edit" ? <Pencil className="size-3" aria-hidden="true" /> : <MousePointerClick className="size-3" aria-hidden="true" />}
                    {m === "edit" ? "Edit" : "Browse"}
                  </button>
                ))}
              </span>
            )
          )}
          <a href="/admin/text" className="rounded-full px-3 py-1.5 text-xs font-semibold text-white/80 hover:bg-white/10 hover:text-white">
            All changes
          </a>
          <button type="button" onClick={onExit} className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold text-white/80 hover:bg-white/10 hover:text-white">
            <X className="size-3.5" aria-hidden="true" /> Exit
          </button>
        </div>
      </div>

      {toast && (
        <div role="status" className="fixed inset-x-0 bottom-20 z-[96] flex justify-center px-4">
          <p className="rounded-full bg-surface px-4 py-2 text-sm font-semibold text-fg shadow-float ring-1 ring-line">{toast}</p>
        </div>
      )}
    </div>
  );
}
