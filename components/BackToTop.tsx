"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * Tombol kembali ke atas yang muncul setelah pengguna menggulir.
 *
 * Listener scroll hanya mengubah state ketika ambang batas benar-benar
 * terlampaui, jadi menggulir tidak memicu render ulang berkali-kali.
 * Animasi muncul/hilang ditangani transisi CSS.
 */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const evaluate = () => {
      ticking = false;
      const shouldShow = window.scrollY > 600;
      setVisible((prev) => (prev === shouldShow ? prev : shouldShow));
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(evaluate);
    };

    evaluate();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Kembali ke atas halaman"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`nb-border-thick nb-hover-lift fixed bottom-6 right-5 z-[65] flex h-14 w-14 items-center justify-center rounded-brutal bg-primary text-ink shadow-brutal-md hover:shadow-brutal-lg sm:right-8 sm:h-16 sm:w-16 ${
        visible
          ? "scale-100 opacity-100"
          : "pointer-events-none scale-50 opacity-0"
      } transition-[opacity,transform,translate,box-shadow] duration-300`}
    >
      <ArrowUp className="h-6 w-6" aria-hidden="true" />
    </button>
  );
}
