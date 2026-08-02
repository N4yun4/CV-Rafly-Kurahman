"use client";

import type { CSSProperties, ReactNode } from "react";

import { useReveal } from "@/hooks/useReveal";
import { cn } from "@/lib/utils";

export type RevealVariant = "up" | "left" | "right" | "fade" | "zoom" | "pop";

export interface RevealProps {
  children: ReactNode;
  variant?: RevealVariant;
  /** Jeda animasi dalam detik — dipakai untuk efek berurutan pada daftar. */
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "span" | "ul";
  style?: CSSProperties;
}

/**
 * Pembungkus animasi scroll-reveal yang dipakai ulang di seluruh section.
 * Animasi ditangani CSS; komponen ini hanya memasang penanda saat elemen
 * memasuki viewport.
 */
export function Reveal({
  children,
  variant = "up",
  delay = 0,
  className,
  as: Tag = "div",
  style,
}: RevealProps) {
  const ref = useReveal<HTMLElement>();

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      data-reveal={variant}
      className={cn("reveal", className)}
      style={delay ? { ...style, "--reveal-delay": `${delay}s` } as CSSProperties : style}
    >
      {children}
    </Tag>
  );
}
