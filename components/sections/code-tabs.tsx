"use client";

import { Check, Copy } from "lucide-react";
import { useId, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type CodeSample = { label: string; language: string; code: string };

const KEYWORDS =
  /\b(import|from|const|let|await|async|function|return|export|def|print|if|else|new|for|in|true|false|None|True|False)\b/;

/** Tiny tokenizer: comments, strings and keywords get colour; everything else stays plain. */
function highlight(code: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /(\/\/.*|#(?!!).*)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)|(\b[A-Za-z_]+\b)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = re.exec(code))) {
    if (m.index > last) out.push(code.slice(last, m.index));
    if (m[1]) out.push(<span key={k++} className="text-on-deep-muted/70 italic">{m[1]}</span>);
    else if (m[2]) out.push(<span key={k++} className="text-[#7ee2b8]">{m[2]}</span>);
    else if (m[3] && KEYWORDS.test(m[3])) out.push(<span key={k++} className="text-[#f9a8d4]">{m[3]}</span>);
    else out.push(m[0]);
    last = m.index + m[0].length;
  }
  if (last < code.length) out.push(code.slice(last));
  return out;
}

export function CodeTabs({ samples, title }: { samples: CodeSample[]; title?: string }) {
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const id = useId();
  const current = samples[active];
  return (
    <div className="overflow-hidden rounded-[var(--radius-card)] border border-white/10 bg-[#120e2e] text-on-deep shadow-float">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-3">
        <div role="tablist" aria-label={title ?? "Code samples"} className="scrollbar-none flex overflow-x-auto">
          {samples.map((s, i) => (
            <button
              key={s.label}
              type="button"
              role="tab"
              id={`${id}-t${i}`}
              aria-selected={i === active}
              aria-controls={`${id}-p`}
              onClick={() => {
                setActive(i);
                setCopied(false);
              }}
              className={cn(
                "relative shrink-0 px-3 py-3 text-sm font-semibold transition-colors",
                i === active ? "text-white" : "text-on-deep-muted hover:text-white",
              )}
            >
              {s.label}
              {i === active && <span className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-sun" />}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(current.code);
              setCopied(true);
              setTimeout(() => setCopied(false), 1600);
            } catch {
              /* blocked */
            }
          }}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-on-deep-muted hover:bg-white/10 hover:text-white"
          aria-label="Copy code"
        >
          {copied ? <Check className="size-3.5 text-mint" aria-hidden="true" /> : <Copy className="size-3.5" aria-hidden="true" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre id={`${id}-p`} role="tabpanel" aria-labelledby={`${id}-t${active}`} tabIndex={0} className="overflow-x-auto p-5 font-mono text-[0.83rem] leading-relaxed">
        <code>{highlight(current.code)}</code>
      </pre>
    </div>
  );
}
