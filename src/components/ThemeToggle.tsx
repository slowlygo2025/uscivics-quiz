"use client";

import { useSyncExternalStore } from "react";

export const THEME_KEY = "uscivics-theme";

export type Theme = "light" | "dark";

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
}

export function getPreferredTheme(): Theme {
  try {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    // ignore
  }
  if (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return "dark";
  }
  return "light";
}

export function setTheme(theme: Theme) {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    // ignore
  }
  applyTheme(theme);
  window.dispatchEvent(new Event("uscivics-theme"));
}

function subscribe(onStoreChange: () => void) {
  window.addEventListener("uscivics-theme", onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    window.removeEventListener("uscivics-theme", onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

/** Inline boot script — keep in sync with getPreferredTheme(). */
export const themeBootScript = `(function(){try{var k=${JSON.stringify(THEME_KEY)};var t=localStorage.getItem(k);var d=t==='dark'||(t!=='light'&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',d);document.documentElement.style.colorScheme=d?'dark':'light';}catch(e){}})();`;

export default function ThemeToggle({
  labelLight,
  labelDark,
  variant = "default",
}: {
  labelLight: string;
  labelDark: string;
  variant?: "default" | "header";
}) {
  // Server snapshot always "light" so SSR HTML is stable; client reads real theme.
  const theme = useSyncExternalStore(
    subscribe,
    getPreferredTheme,
    () => "light" as Theme
  );
  const ready = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  function toggle() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  const isDark = theme === "dark";
  const label = isDark ? labelLight : labelDark;
  const header = variant === "header";

  return (
    <button
      type="button"
      onClick={toggle}
      className={
        header
          ? "inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius)] text-ink-soft touch-manipulation transition-colors hover:bg-mist hover:text-ink"
          : "inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius)] border border-white/40 bg-white/15 text-white touch-manipulation transition-colors hover:bg-white/25"
      }
      aria-label={label}
      title={label}
      suppressHydrationWarning
    >
      <span className="sr-only" suppressHydrationWarning>
        {label}
      </span>
      {!ready ? (
        <span aria-hidden className="h-4 w-4 rounded-full bg-mist" />
      ) : isDark ? (
        <SunIcon />
      ) : (
        <MoonIcon />
      )}
    </button>
  );
}

function SunIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="h-[1.125rem] w-[1.125rem]"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="h-[1.125rem] w-[1.125rem]"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 14.3A8.5 8.5 0 0 1 9.7 3a7 7 0 1 0 11.3 11.3z" />
    </svg>
  );
}
