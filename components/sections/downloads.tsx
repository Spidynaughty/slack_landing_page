"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Download, Globe, Laptop, Monitor, Smartphone, Tablet, Terminal } from "lucide-react";
import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

type Platform = {
  id: "mac" | "windows" | "linux" | "ios" | "android" | "web";
  name: string;
  detail: string;
  version: string;
  size: string;
  icon: typeof Laptop;
  requirements: string;
  formats: string[];
};

const platforms: Platform[] = [
  { id: "mac", name: "Mac", detail: "Apple silicon and Intel", version: "26.10.2", size: "182 MB", icon: Laptop, requirements: "macOS 12 or later", formats: ["Universal .dmg"] },
  { id: "windows", name: "Windows", detail: "64-bit and ARM", version: "26.10.2", size: "164 MB", icon: Monitor, requirements: "Windows 10 or later", formats: [".exe installer", ".msi for IT"] },
  { id: "linux", name: "Linux", detail: "Beta", version: "26.10.1", size: "151 MB", icon: Terminal, requirements: "Ubuntu 22.04+, Fedora 38+", formats: [".deb", ".rpm", "Snap"] },
  { id: "ios", name: "iPhone & iPad", detail: "App Store", version: "26.10", size: "96 MB", icon: Smartphone, requirements: "iOS 16 or later", formats: ["App Store"] },
  { id: "android", name: "Android", detail: "Phones and tablets", version: "26.10", size: "71 MB", icon: Tablet, requirements: "Android 10 or later", formats: ["Play Store", "APK for MDM"] },
  { id: "web", name: "Web browser", detail: "No install needed", version: "Always current", size: "—", icon: Globe, requirements: "Latest two browser versions", formats: ["Open in browser"] },
];

function detect(): Platform["id"] {
  const ua = navigator.userAgent.toLowerCase();
  if (/iphone|ipad|ipod/.test(ua)) return "ios";
  if (/android/.test(ua)) return "android";
  if (/mac os/.test(ua)) return "mac";
  if (/windows/.test(ua)) return "windows";
  if (/linux/.test(ua)) return "linux";
  return "web";
}

const noop = () => () => {};

/** Platform cards with OS detection and simulated downloads. */
export function Downloads() {
  const detected = useSyncExternalStore(noop, detect, () => null);
  const [started, setStarted] = useState<string | null>(null);
  const primary = platforms.find((p) => p.id === detected);

  return (
    <div>
      {primary && (
        <div className="mx-auto mb-12 flex max-w-2xl flex-col items-center gap-3 text-center">
          <p className="text-sm font-semibold text-muted">We detected you&apos;re on {primary.name}</p>
          <button
            type="button"
            onClick={() => setStarted(primary.id)}
            className="inline-flex h-14 items-center gap-2 rounded-full bg-primary px-8 text-lg font-semibold text-primary-fg shadow-glow transition-colors hover:bg-primary-hover"
          >
            <Download className="size-5" aria-hidden="true" />
            Download for {primary.name}
          </button>
          <p className="text-xs text-subtle">
            Version {primary.version} · {primary.requirements}
          </p>
        </div>
      )}
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {platforms.map((p) => (
          <li
            key={p.id}
            // Anchors for the home page's App Store and Google Play buttons (/downloads#ios, #android)
            id={p.id}
            className={cn(
              "flex scroll-mt-28 flex-col rounded-[var(--radius-card)] border bg-surface p-6 shadow-soft transition-shadow hover:shadow-card",
              p.id === detected ? "border-primary ring-1 ring-primary" : "border-line",
            )}
          >
            <div className="flex items-start justify-between">
              <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                <p.icon className="size-6" aria-hidden="true" />
              </span>
              {p.id === detected && <span className="rounded-full bg-primary px-2.5 py-1 text-xs font-bold text-primary-fg">Your device</span>}
            </div>
            <h2 className="mt-5 font-display text-xl font-bold text-fg">{p.name}</h2>
            <p className="text-sm text-muted">{p.detail}</p>
            <dl className="mt-4 grid grid-cols-2 gap-2 text-sm">
              <div>
                <dt className="text-xs text-subtle">Version</dt>
                <dd className="font-semibold text-fg">{p.version}</dd>
              </div>
              <div>
                <dt className="text-xs text-subtle">Size</dt>
                <dd className="font-semibold text-fg">{p.size}</dd>
              </div>
              <div className="col-span-2">
                <dt className="text-xs text-subtle">Requirements</dt>
                <dd className="font-semibold text-fg">{p.requirements}</dd>
              </div>
            </dl>
            <p className="mt-3 text-xs text-subtle">{p.formats.join(" · ")}</p>
            <div className="mt-auto pt-5">
              {p.id === "web" ? (
                <Link href="/signin" className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full border border-line-strong font-semibold text-fg hover:bg-surface-2">
                  <Globe className="size-4" aria-hidden="true" /> Open in browser
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => setStarted(p.id)}
                  className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full border border-line-strong font-semibold text-fg hover:bg-surface-2"
                >
                  {started === p.id ? <Check className="size-4 text-mint-ink" aria-hidden="true" /> : <Download className="size-4" aria-hidden="true" />}
                  {started === p.id ? "Download started" : "Download"}
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
      <AnimatePresence>
        {started && (
          <motion.div
            role="status"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            className="fixed inset-x-4 bottom-6 z-[65] mx-auto flex max-w-md items-center gap-3 rounded-2xl bg-deep p-4 text-on-deep shadow-float"
          >
            <span className="inline-flex size-9 items-center justify-center rounded-full bg-mint text-deep">
              <Check className="size-5" aria-hidden="true" />
            </span>
            <p className="flex-1 text-sm">
              <strong className="block text-white">Demo download</strong>
              This portfolio site doesn&apos;t host installers. In a real deployment your download would start now.
            </p>
            <button type="button" onClick={() => setStarted(null)} className="text-sm font-semibold text-white underline">
              Dismiss
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
