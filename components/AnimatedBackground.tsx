"use client";

import { motion } from "framer-motion";

import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

interface Shape {
  id: string;
  className: string;
  style: React.CSSProperties;
  duration: number;
  delay: number;
  drift: [number, number];
  rotate: number;
}

const shapes: Shape[] = [
  {
    id: "square-1",
    className: "nb-border-thick bg-primary",
    style: { top: "12%", left: "6%", width: 78, height: 78 },
    duration: 13,
    delay: 0,
    drift: [-26, 18],
    rotate: 14,
  },
  {
    id: "circle-1",
    className: "nb-border-thick rounded-full bg-secondary",
    style: { top: "24%", right: "8%", width: 96, height: 96 },
    duration: 16,
    delay: 1.2,
    drift: [24, -22],
    rotate: -12,
  },
  {
    id: "square-2",
    className: "nb-border-thick bg-blue",
    style: { top: "58%", left: "4%", width: 56, height: 56 },
    duration: 11,
    delay: 0.6,
    drift: [18, -20],
    rotate: -18,
  },
  {
    id: "circle-2",
    className: "nb-border-thick rounded-full bg-green",
    style: { top: "72%", right: "12%", width: 64, height: 64 },
    duration: 15,
    delay: 2,
    drift: [-20, 24],
    rotate: 16,
  },
  {
    id: "square-3",
    className: "nb-border-thick bg-purple",
    style: { top: "42%", right: "26%", width: 44, height: 44 },
    duration: 18,
    delay: 0.9,
    drift: [22, 20],
    rotate: 24,
  },
  {
    id: "stripe-1",
    className: "nb-border-thick bg-stripes opacity-40",
    style: { top: "86%", left: "22%", width: 110, height: 44 },
    duration: 14,
    delay: 1.6,
    drift: [-18, -16],
    rotate: -8,
  },
];

/**
 * Lapisan latar statis (dot pattern + grid).
 * Dirender di server agar latar sudah benar sejak paint pertama.
 */
export function StaticBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-20 bg-canvas" aria-hidden="true">
      <div className="absolute inset-0 bg-grid opacity-70" />
      <div className="absolute inset-0 bg-dots opacity-60" />
    </div>
  );
}

/**
 * Lapisan dekoratif bergerak: blob warna dan shape mengambang.
 * Dimuat hanya di sisi klien supaya tidak menambah beban render awal,
 * dan berhenti bergerak saat pengguna memilih reduce-motion.
 */
export function AnimatedBackground() {
  const reduced = usePrefersReducedMotion();

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {/* Blob warna lembut */}
      <motion.div
        className="absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full bg-primary/25 blur-3xl"
        animate={reduced ? undefined : { scale: [1, 1.18, 1], opacity: [0.5, 0.75, 0.5] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-40 top-1/3 h-[460px] w-[460px] rounded-full bg-blue/20 blur-3xl"
        animate={reduced ? undefined : { scale: [1.1, 1, 1.1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-40 left-1/3 h-[400px] w-[400px] rounded-full bg-secondary/20 blur-3xl"
        animate={reduced ? undefined : { scale: [1, 1.15, 1], opacity: [0.45, 0.7, 0.45] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Shape mengambang */}
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className={`absolute hidden opacity-70 md:block ${shape.className}`}
          style={shape.style}
          animate={
            reduced
              ? undefined
              : {
                  y: [0, shape.drift[0], 0],
                  x: [0, shape.drift[1], 0],
                  rotate: [0, shape.rotate, 0],
                }
          }
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: shape.delay,
          }}
        />
      ))}

      {/* Garis vertikal dekoratif */}
      <div className="absolute inset-y-0 left-[12%] hidden w-px bg-[var(--nb-grid)] lg:block" />
      <div className="absolute inset-y-0 right-[12%] hidden w-px bg-[var(--nb-grid)] lg:block" />
    </div>
  );
}
