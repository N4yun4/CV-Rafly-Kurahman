import type { CSSProperties } from "react";

interface Shape {
  id: string;
  className: string;
  style: CSSProperties;
}

/**
 * Setiap shape memakai keyframe CSS yang sama (`drift`) dengan arah dan durasi
 * berbeda lewat custom property, sehingga tidak perlu satu animasi per elemen.
 */
const shapes: Shape[] = [
  {
    id: "square-1",
    className: "nb-border-thick bg-primary",
    style: {
      top: "12%",
      left: "6%",
      width: 78,
      height: 78,
      "--dx": "18px",
      "--dy": "-26px",
      "--dr": "14deg",
      animationDuration: "13s",
    } as CSSProperties,
  },
  {
    id: "circle-1",
    className: "nb-border-thick rounded-full bg-secondary",
    style: {
      top: "24%",
      right: "8%",
      width: 96,
      height: 96,
      "--dx": "-22px",
      "--dy": "24px",
      "--dr": "-12deg",
      animationDuration: "16s",
      animationDelay: "-1.2s",
    } as CSSProperties,
  },
  {
    id: "square-2",
    className: "nb-border-thick bg-blue",
    style: {
      top: "58%",
      left: "4%",
      width: 56,
      height: 56,
      "--dx": "-20px",
      "--dy": "18px",
      "--dr": "-18deg",
      animationDuration: "11s",
      animationDelay: "-0.6s",
    } as CSSProperties,
  },
  {
    id: "circle-2",
    className: "nb-border-thick rounded-full bg-green",
    style: {
      top: "72%",
      right: "12%",
      width: 64,
      height: 64,
      "--dx": "24px",
      "--dy": "-20px",
      "--dr": "16deg",
      animationDuration: "15s",
      animationDelay: "-2s",
    } as CSSProperties,
  },
  {
    id: "square-3",
    className: "nb-border-thick bg-purple",
    style: {
      top: "42%",
      right: "26%",
      width: 44,
      height: 44,
      "--dx": "20px",
      "--dy": "22px",
      "--dr": "24deg",
      animationDuration: "18s",
      animationDelay: "-0.9s",
    } as CSSProperties,
  },
  {
    id: "stripe-1",
    className: "nb-border-thick bg-stripes opacity-40",
    style: {
      top: "86%",
      left: "22%",
      width: 110,
      height: 44,
      "--dx": "-16px",
      "--dy": "-18px",
      "--dr": "-8deg",
      animationDuration: "14s",
      animationDelay: "-1.6s",
    } as CSSProperties,
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
 *
 * Hanya dipasang pada perangkat yang sanggup (lihat `useDecorativeMotion`) dan
 * seluruh animasinya berbasis CSS — hanya `transform` dan `opacity` — sehingga
 * dijalankan compositor tanpa membebani main thread. Blob sengaja tidak memakai
 * animasi `scale` karena mengubah skala elemen ber-blur memaksa raster ulang
 * setiap frame.
 */
export function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {/* Blob warna lembut */}
      <div className="animate-blob absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full bg-primary/25 blur-3xl" />
      <div
        className="animate-blob absolute -right-40 top-1/3 h-[460px] w-[460px] rounded-full bg-blue/20 blur-3xl"
        style={{ animationDuration: "15s", animationDelay: "-5s" }}
      />
      <div
        className="animate-blob absolute -bottom-40 left-1/3 h-[400px] w-[400px] rounded-full bg-secondary/20 blur-3xl"
        style={{ animationDuration: "18s", animationDelay: "-9s" }}
      />

      {/* Shape mengambang */}
      {shapes.map((shape) => (
        <div
          key={shape.id}
          className={`animate-drift absolute opacity-70 ${shape.className}`}
          style={shape.style}
        />
      ))}

      {/* Garis vertikal dekoratif */}
      <div className="absolute inset-y-0 left-[12%] hidden w-px bg-[var(--nb-grid)] lg:block" />
      <div className="absolute inset-y-0 right-[12%] hidden w-px bg-[var(--nb-grid)] lg:block" />
    </div>
  );
}
