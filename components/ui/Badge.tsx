import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { cn, colorMap } from "@/lib/utils";
import type { BrutalColor } from "@/types";

export interface BadgeProps {
  children: ReactNode;
  color?: BrutalColor;
  icon?: LucideIcon;
  className?: string;
  pulse?: boolean;
}

export function Badge({ children, color = "primary", icon: Icon, className, pulse }: BadgeProps) {
  return (
    <span
      className={cn(
        "nb-border inline-flex items-center gap-2 rounded-brutal px-3 py-1.5 font-heading text-xs font-extrabold uppercase tracking-widest shadow-brutal",
        colorMap[color],
        className,
      )}
    >
      {pulse ? (
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ink opacity-70" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-ink" />
        </span>
      ) : null}
      {Icon ? <Icon className="h-3.5 w-3.5" aria-hidden="true" /> : null}
      {children}
    </span>
  );
}
