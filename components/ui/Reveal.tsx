"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

import { fadeIn, slideLeft, slideRight, slideUp, viewportOnce, zoomIn } from "@/lib/motion";

type RevealVariant = "up" | "left" | "right" | "fade" | "zoom";

const variantMap: Record<RevealVariant, Variants> = {
  up: slideUp,
  left: slideLeft,
  right: slideRight,
  fade: fadeIn,
  zoom: zoomIn,
};

export interface RevealProps {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "span";
}

/** Pembungkus animasi scroll-reveal yang dapat dipakai ulang di seluruh section. */
export function Reveal({
  children,
  variant = "up",
  delay = 0,
  className,
  as = "div",
}: RevealProps) {
  const MotionTag =
    as === "section" ? motion.section : as === "li" ? motion.li : as === "span" ? motion.span : motion.div;

  return (
    <MotionTag
      className={className}
      variants={variantMap[variant]}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}
