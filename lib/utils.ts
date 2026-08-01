import type { BrutalColor } from "@/types";

/** Menggabungkan className secara aman tanpa dependency tambahan. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** Peta warna Neubrutalism: background solid dengan teks kontras tinggi. */
export const colorMap: Record<BrutalColor, string> = {
  primary: "bg-primary text-ink",
  secondary: "bg-secondary text-ink",
  blue: "bg-blue text-ink",
  green: "bg-green text-ink",
  purple: "bg-purple text-ink",
  surface: "bg-surface text-body",
};

/** Smooth scroll ke elemen berdasarkan hash, dengan offset navbar. */
export function scrollToSection(hash: string, offset = 88): void {
  if (typeof window === "undefined") return;
  const id = hash.startsWith("#") ? hash.slice(1) : hash;
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
}
