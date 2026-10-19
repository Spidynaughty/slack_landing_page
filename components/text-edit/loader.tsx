"use client";

import { useEffect, useState, type ComponentType } from "react";

const KEY = "kt-text-edit";

function readFlag() {
  try {
    const p = new URLSearchParams(window.location.search).get("edit");
    if (p === "1") sessionStorage.setItem(KEY, "1");
    if (p === "0") sessionStorage.removeItem(KEY);
    return sessionStorage.getItem(KEY) === "1";
  } catch {
    return new URLSearchParams(window.location.search).get("edit") === "1";
  }
}

/**
 * Turns on the on-page text editor when the site is opened with ?edit=1 (the
 * admin's "Edit on the site" button). Visitors never download the editor.
 */
export function TextEditLoader() {
  const [Editor, setEditor] = useState<ComponentType<{ onExit: () => void }> | null>(null);

  useEffect(() => {
    if (!readFlag()) return;
    import("./editor").then((m) => setEditor(() => m.TextEditor));
  }, []);

  if (!Editor) return null;
  return (
    <Editor
      onExit={() => {
        try {
          sessionStorage.removeItem(KEY);
        } catch {}
        const url = new URL(window.location.href);
        url.searchParams.delete("edit");
        window.location.replace(url.toString());
      }}
    />
  );
}
