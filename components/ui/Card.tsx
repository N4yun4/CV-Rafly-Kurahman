"use client";

import type { CSSProperties, ReactNode } from "react";

import { useReveal } from "@/hooks/useReveal";
import { cn } from "@/lib/utils";
import type { RevealVariant } from "@/components/ui/Reveal";

export interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  tilt?: number;
  as?: "div" | "article" | "li";
  /** Animasi masuk saat kartu tergulir ke layar. */
  reveal?: RevealVariant;
  /** Jeda animasi masuk dalam detik. */
  delay?: number;
}

/**
 * Card Neubrutalism: border tebal, shadow solid, dan hover yang mengangkat kartu.
 *
 * Efek hover memakai transition CSS, bukan JavaScript. Selain lebih ringan, cara
 * ini juga menghindari pemasangan pointer listener pada puluhan kartu di halaman
 * — beban yang sama sekali tidak berguna di perangkat layar sentuh.
 */
export function Card({
  children,
  className,
  hover = true,
  tilt = 0,
  as: Tag = "div",
  reveal,
  delay = 0,
}: CardProps) {
  const ref = useReveal<HTMLElement>();
  // Latar bawaan hanya dipakai bila pemanggil tidak menentukan warna sendiri,
  // sebab urutan class di CSS tidak mengikuti urutan penulisan.
  const hasCustomBg = Boolean(className && /(^|\s)(bg-|dark:bg-)/.test(className));

  const style: CSSProperties = {};
  if (tilt) style.rotate = `${tilt}deg`;
  if (delay) (style as Record<string, string>)["--reveal-delay"] = `${delay}s`;

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={(reveal ? ref : undefined) as any}
      data-reveal={reveal}
      style={style}
      className={cn(
        "nb-border-thick relative rounded-brutal shadow-brutal-md",
        !hasCustomBg && "bg-surface",
        hover && "nb-hover-lift hover:shadow-brutal-xl",
        reveal && "reveal",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
