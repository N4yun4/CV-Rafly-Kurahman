"use client";

import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";

/**
 * Tombol ganti tema. Kedua ikon selalu ada di DOM dan hanya digeser dengan
 * transisi CSS, sehingga tidak perlu pustaka animasi untuk pergantiannya.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Aktifkan mode terang" : "Aktifkan mode gelap"}
      aria-pressed={isDark}
      className={cn(
        "nb-border-thick nb-hover-lift relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-brutal shadow-brutal hover:shadow-brutal-md",
        isDark ? "bg-blue text-ink" : "bg-primary text-ink",
        className,
      )}
    >
      <Sun
        className={cn(
          "absolute h-5 w-5 transition-[opacity,transform] duration-300",
          isDark ? "-translate-y-5 rotate-45 opacity-0" : "translate-y-0 rotate-0 opacity-100",
        )}
        aria-hidden="true"
      />
      <Moon
        className={cn(
          "absolute h-5 w-5 transition-[opacity,transform] duration-300",
          isDark ? "translate-y-0 rotate-0 opacity-100" : "translate-y-5 -rotate-45 opacity-0",
        )}
        aria-hidden="true"
      />
    </button>
  );
}
