"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";

import { StaticBackground } from "@/components/AnimatedBackground";
import { BackToTop } from "@/components/BackToTop";
import { LoadingScreen } from "@/components/LoadingScreen";
import { ScrollProgress } from "@/components/ScrollProgress";
import { ThemeProvider } from "@/hooks/useTheme";

// Lapisan murni dekoratif: dimuat setelah render pertama agar HTML awal ringan.
const AnimatedBackground = dynamic(
  () => import("@/components/AnimatedBackground").then((m) => m.AnimatedBackground),
  { ssr: false },
);

const CustomCursor = dynamic(
  () => import("@/components/CustomCursor").then((m) => m.CustomCursor),
  { ssr: false },
);

/** Membungkus seluruh aplikasi dengan tema dan lapisan UI global. */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <LoadingScreen />
      <StaticBackground />
      <ScrollProgress />
      <CustomCursor />
      <AnimatedBackground />
      {children}
      <BackToTop />
    </ThemeProvider>
  );
}
