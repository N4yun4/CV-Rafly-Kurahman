"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

import { slideUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { cn, colorMap } from "@/lib/utils";
import type { BrutalColor } from "@/types";

export interface SectionTitleProps {
  eyebrow: string;
  title: string;
  titleId?: string;
  highlight?: string;
  description?: string;
  color?: BrutalColor;
  icon?: LucideIcon;
  align?: "left" | "center";
  className?: string;
}

export function SectionTitle({
  eyebrow,
  title,
  titleId,
  highlight,
  description,
  color = "primary",
  icon: Icon,
  align = "left",
  className,
}: SectionTitleProps) {
  return (
    <motion.header
      variants={staggerContainer(0.12)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <motion.div variants={slideUp}>
        <span
          className={cn(
            "nb-border inline-flex items-center gap-2 rounded-brutal px-4 py-2 font-heading text-xs font-extrabold uppercase tracking-[0.2em] shadow-brutal",
            colorMap[color],
          )}
        >
          {Icon ? <Icon className="h-4 w-4" aria-hidden="true" /> : null}
          {eyebrow}
        </span>
      </motion.div>

      <motion.h2
        id={titleId}
        variants={slideUp}
        className="max-w-3xl text-4xl font-black uppercase leading-[0.95] sm:text-5xl md:text-6xl"
      >
        {title}
        {highlight ? (
          <>
            {" "}
            <span className="relative inline-block">
              <span
                className={cn(
                  "absolute inset-x-0 bottom-1 -z-10 h-4 md:h-5",
                  color === "surface" ? "bg-primary" : colorMap[color].split(" ")[0],
                )}
                aria-hidden="true"
              />
              {highlight}
            </span>
          </>
        ) : null}
      </motion.h2>

      {description ? (
        <motion.p
          variants={slideUp}
          className={cn(
            "max-w-2xl text-base leading-relaxed text-muted sm:text-lg",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </motion.p>
      ) : null}

      <motion.div
        variants={slideUp}
        className={cn("h-1.5 w-24 bg-[var(--nb-line)]", align === "center" && "mx-auto")}
        aria-hidden="true"
      />
    </motion.header>
  );
}
