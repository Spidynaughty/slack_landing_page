export type ThemePreference = "light" | "dark" | "system";

export const THEME_KEY = "yb-theme";

/** Runs in <head> before first paint so the page never flashes the wrong theme. */
export const themeScript = `(function(){try{var t=localStorage.getItem("${THEME_KEY}");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;

const EVENT = "yb-theme-change";

export function readPreference(): ThemePreference {
  try {
    const t = localStorage.getItem(THEME_KEY);
    return t === "light" || t === "dark" ? t : "system";
  } catch {
    return "system";
  }
}

function resolve(pref: ThemePreference): "light" | "dark" {
  if (pref !== "system") return pref;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function applyPreference(pref: ThemePreference) {
  try {
    if (pref === "system") localStorage.removeItem(THEME_KEY);
    else localStorage.setItem(THEME_KEY, pref);
  } catch {
    /* storage unavailable: still apply for this page view */
  }
  document.documentElement.setAttribute("data-theme", resolve(pref));
  window.dispatchEvent(new Event(EVENT));
}

export function subscribeTheme(callback: () => void) {
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  const onSystem = () => {
    if (readPreference() === "system") {
      document.documentElement.setAttribute("data-theme", resolve("system"));
    }
    callback();
  };
  window.addEventListener(EVENT, callback);
  window.addEventListener("storage", callback);
  mq.addEventListener("change", onSystem);
  return () => {
    window.removeEventListener(EVENT, callback);
    window.removeEventListener("storage", callback);
    mq.removeEventListener("change", onSystem);
  };
}
