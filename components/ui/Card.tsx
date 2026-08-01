"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface CardProps {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  hover?: boolean;
  tilt?: number;
  as?: "div" | "article" | "li";
}

/**
 * Card Neubrutalism: border tebal, shadow solid, dan hover yang mengangkat kartu.
 */
export function Card({
  children,
  className,
  variants,
  hover = true,
  tilt = 0,
  as = "div",
}: CardProps) {
  const MotionTag = as === "article" ? motion.article : as === "li" ? motion.li : motion.div;
  // Latar bawaan hanya dipakai bila pemanggil tidak menentukan warna sendiri,
  // sebab urutan class di CSS tidak mengikuti urutan penulisan.
  const hasCustomBg = Boolean(className && /(^|\s)(bg-|dark:bg-)/.test(className));

  return (
    <MotionTag
      variants={variants}
      style={tilt ? { rotate: tilt } : undefined}
      whileHover={
        hover
          ? { x: -5, y: -5, rotate: 0, transition: { type: "spring", stiffness: 300, damping: 20 } }
          : undefined
      }
      className={cn(
        "nb-border-thick relative rounded-brutal shadow-brutal-md transition-shadow duration-200",
        !hasCustomBg && "bg-surface",
        hover && "hover:shadow-brutal-xl",
        className,
      )}
    >
      {children}
    </MotionTag>
  );
}
