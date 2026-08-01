import type { LucideIcon } from "lucide-react";

export type BrutalColor = "primary" | "secondary" | "blue" | "green" | "purple" | "surface";

export interface NavItem {
  label: string;
  href: string;
}

export interface Skill {
  name: string;
  level: number;
  category: "teknis" | "digital" | "personal";
  color: BrutalColor;
  icon: LucideIcon;
  description: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  period: string;
  type: string;
  color: BrutalColor;
  responsibilities: string[];
  tools: string[];
}

export interface TrainingModule {
  code: string;
  label: string;
  detail: string;
  color: BrutalColor;
}

export interface CertificationItem {
  title: string;
  issuer: string;
  status: "proses" | "terbit";
  statusLabel: string;
  description: string;
  color: BrutalColor;
}

export interface TimelineStep {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  color: BrutalColor;
  icon: LucideIcon;
}

export interface HighlightItem {
  title: string;
  description: string;
  color: BrutalColor;
  icon: LucideIcon;
}

export interface ContactChannel {
  label: string;
  value: string;
  href: string;
  copyValue?: string;
  color: BrutalColor;
  icon: LucideIcon;
  action: string;
  /** True bila tautan dibuka di tab baru (mis. Google Maps). */
  external: boolean;
}

export interface StatItem {
  value: string;
  label: string;
  color: BrutalColor;
}
