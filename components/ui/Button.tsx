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

/**
 * Tombol Neubrutalism.
 *
 * Interaksi hover dan tekan sepenuhnya memakai CSS sehingga tombol tetap ringan
 * dan tidak memerlukan JavaScript animasi apa pun saat dirender.
 */
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
    "nb-border-thick nb-hover-lift group relative inline-flex items-center justify-center gap-2.5 rounded-brutal font-heading font-bold uppercase tracking-wide shadow-brutal-md hover:shadow-brutal-lg",
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

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        aria-label={ariaLabel}
        className={classes}
        download={download}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} aria-label={ariaLabel} className={classes}>
      {content}
    </button>
  );
}
