"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";

import { StaticBackground } from "@/components/AnimatedBackground";
import { BackToTop } from "@/components/BackToTop";
import { LoadingScreen } from "@/components/LoadingScreen";
import { ScrollProgress } from "@/components/ScrollProgress";
import { useDecorativeMotion, useHasFinePointer } from "@/hooks/useMediaQuery";
import { ThemeProvider } from "@/hooks/useTheme";

// Lapisan murni dekoratif: dimuat setelah render pertama agar HTML awal ringan.
// Keduanya hanya di-import ketika perangkat memang sanggup menjalankannya,
// sehingga di ponsel kelas bawah chunk-nya tidak pernah diunduh maupun dieksekusi.
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
  const decorEnabled = useDecorativeMotion();
  const finePointer = useHasFinePointer();

  return (
    <ThemeProvider>
      <LoadingScreen />
      <StaticBackground />
      <ScrollProgress />
      {finePointer ? <CustomCursor /> : null}
      {decorEnabled ? <AnimatedBackground /> : null}
      {children}
      <BackToTop />
    </ThemeProvider>
  );
}
