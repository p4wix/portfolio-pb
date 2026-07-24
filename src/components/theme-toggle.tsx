"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--toggle-bg)] text-[var(--toggle-fg)] shadow-sm transition-colors hover:bg-[var(--toggle-bg-hover)]"
    >
      {mounted ? (
        isDark ? (
          <Sun key="sun" className="animate-icon-in h-[18px] w-[18px]" />
        ) : (
          <Moon key="moon" className="animate-icon-in h-[18px] w-[18px]" />
        )
      ) : (
        <span className="h-[18px] w-[18px]" />
      )}
    </button>
  );
}
