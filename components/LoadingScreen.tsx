"use client";

import { Flame } from "lucide-react";
import { useEffect, useState } from "react";

import { siteConfig } from "@/lib/site";

/**
 * Loading screen saat halaman pertama dibuka.
 * Animasinya murni CSS sehingga tampil dan menghilang tanpa menunggu hydration —
 * penting agar konten utama tidak tertahan dan LCP tetap cepat.
 * React hanya bertugas melepas elemen dari DOM setelah animasi selesai.
 */
export function LoadingScreen() {
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    const timeout = window.setTimeout(() => setRemoved(true), 950);
    return () => window.clearTimeout(timeout);
  }, []);

  if (removed) return null;

  return (
    <div
      className="animate-loader-out fixed inset-0 z-[100] flex items-center justify-center bg-primary px-6"
      role="status"
      aria-live="polite"
      aria-label="Memuat halaman"
    >
      <div className="absolute inset-0 bg-dots opacity-40" aria-hidden="true" />

      <div className="relative flex w-full max-w-md flex-col items-center gap-7">
        <div className="nb-border-thick animate-float flex h-24 w-24 items-center justify-center rounded-brutal bg-ink text-primary shadow-brutal-lg">
          <Flame className="h-12 w-12" aria-hidden="true" />
        </div>

        <div className="text-center">
          <p className="font-heading text-3xl font-black uppercase tracking-tight text-ink sm:text-4xl">
            {siteConfig.name}
          </p>
          <p className="mt-1 font-heading text-xs font-bold uppercase tracking-[0.3em] text-ink/70">
            {siteConfig.role}
          </p>
        </div>

        <div className="nb-border-thick h-7 w-full overflow-hidden rounded-brutal bg-white shadow-brutal">
          <div className="animate-loader-bar h-full bg-ink" />
        </div>

        <p className="font-heading text-sm font-extrabold uppercase tracking-[0.25em] text-ink">
          Memuat…
        </p>
      </div>
    </div>
  );
}
