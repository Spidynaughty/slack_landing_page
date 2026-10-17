"use client";

import { MotionConfig } from "framer-motion";
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

export type ConsentView = "preferences" | "choices" | null;

type UIState = {
  searchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  consentView: ConsentView;
  openConsent: (view: Exclude<ConsentView, null>) => void;
  closeConsent: () => void;
};

const UIContext = createContext<UIState | null>(null);

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used inside <Providers>");
  return ctx;
}

export function Providers({ children }: { children: ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [consentView, setConsentView] = useState<ConsentView>(null);

  const openSearch = useCallback(() => setSearchOpen(true), []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);
  const openConsent = useCallback((view: Exclude<ConsentView, null>) => setConsentView(view), []);
  const closeConsent = useCallback(() => setConsentView(null), []);

  const value = useMemo(
    () => ({ searchOpen, openSearch, closeSearch, consentView, openConsent, closeConsent }),
    [searchOpen, openSearch, closeSearch, consentView, openConsent, closeConsent],
  );

  return (
    <UIContext.Provider value={value}>
      {/* "user" honours prefers-reduced-motion for every Framer Motion animation */}
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </UIContext.Provider>
  );
}
