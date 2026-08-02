"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

export interface MarqueeProps {
  items: string[];
  className?: string;
  separator?: string;
  reverse?: boolean;
}

/**
 * Pita teks berjalan — aksen khas Neubrutalism.
 *
 * Animasinya murni CSS dan otomatis dijeda ketika pita keluar dari layar.
 * Animasi yang terus berputar di luar viewport tetap membebani compositor,
 * dan itu paling terasa di ponsel berspesifikasi rendah.
 */
export function Marquee({ items, className, separator = "✦", reverse }: MarqueeProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => setRunning(entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const loop = [...items, ...items];

  return (
    <div
      ref={ref}
      className={cn(
        "nb-border-thick relative flex w-full overflow-hidden border-x-0 bg-primary py-3 text-ink",
        className,
      )}
      aria-hidden="true"
    >
      <div
        className={cn(
          "flex min-w-full shrink-0 animate-marquee items-center gap-6 whitespace-nowrap pr-6",
          reverse && "[animation-direction:reverse]",
          !running && "[animation-play-state:paused]",
        )}
      >
        {loop.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="flex items-center gap-6 font-heading text-sm font-extrabold uppercase tracking-[0.2em] sm:text-base"
          >
            {item}
            <span className="text-lg">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
