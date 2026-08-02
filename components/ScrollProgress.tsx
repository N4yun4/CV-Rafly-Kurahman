"use client";

import { useEffect, useRef } from "react";

/**
 * Bar progres scroll di bagian paling atas halaman.
 *
 * Ditulis langsung ke DOM lewat satu callback requestAnimationFrame, bukan lewat
 * state React maupun spring Framer Motion. Dengan begitu scroll tidak memicu
 * render ulang React dan tidak ada loop animasi yang terus berjalan setelah
 * scroll berhenti — dua hal yang paling terasa di ponsel kelas bawah.
 */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    let frame = 0;
    let lastValue = -1;

    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      // Abaikan perubahan sangat kecil agar tidak menulis style tanpa perlu.
      if (Math.abs(progress - lastValue) < 0.001) return;
      lastValue = progress;
      bar.style.transform = `scaleX(${progress})`;
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      ref={barRef}
      className="fixed inset-x-0 top-0 z-[70] h-1.5 origin-left bg-secondary"
      style={{ transform: "scaleX(0)" }}
      aria-hidden="true"
    />
  );
}
