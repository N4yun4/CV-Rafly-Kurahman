"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "blue" | "green" | "ink" | "outline";
type ButtonSize = "sm" | "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-primary text-ink",
  secondary: "bg-secondary text-ink",
  blue: "bg-blue text-ink",
  green: "bg-green text-ink",
  ink: "bg-[var(--nb-fg)] text-[var(--nb-canvas)]",
  outline: "bg-surface text-body",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-3 text-base",
  lg: "px-7 py-4 text-base sm:text-lg",
};

export interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  download?: boolean;
  external?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
  icon?: LucideIcon;
  iconRight?: LucideIcon;
  ariaLabel?: string;
  fullWidth?: boolean;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  download,
  external,
  onClick,
  type = "button",
  className,
  icon: Icon,
  iconRight: IconRight,
  ariaLabel,
  fullWidth,
}: ButtonProps) {
  const classes = cn(
    "nb-border-thick group relative inline-flex items-center justify-center gap-2.5 rounded-brutal font-heading font-bold uppercase tracking-wide shadow-brutal-md transition-shadow duration-200 hover:shadow-brutal-lg",
    variantClasses[variant],
    sizeClasses[size],
    fullWidth && "w-full",
    className,
  );

  const content = (
    <>
      {Icon ? <Icon className="h-5 w-5 shrink-0" aria-hidden="true" /> : null}
      <span>{children}</span>
      {IconRight ? (
        <IconRight
          className="h-5 w-5 shrink-0 transition-transform duration-200 group-hover:translate-x-1"
          aria-hidden="true"
        />
      ) : null}
    </>
  );

  const motionProps = {
    whileHover: { x: -3, y: -3 },
    whileTap: { x: 2, y: 2, scale: 0.98 },
    transition: { type: "spring" as const, stiffness: 420, damping: 22 },
  };

  if (href) {
    return (
      <motion.a
        href={href}
        onClick={onClick}
        aria-label={ariaLabel}
        className={classes}
        download={download}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        {...motionProps}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      className={classes}
      {...motionProps}
    >
      {content}
    </motion.button>
  );
}
