"use client";

import { useEffect, useState } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const update = () => setMatches(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [query]);

  return matches;
}

/** True bila pengguna mengaktifkan preferensi "reduce motion". */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/** True bila perangkat memiliki pointer presisi (mouse) — dipakai custom cursor. */
export function useHasFinePointer(): boolean {
  return useMediaQuery("(hover: hover) and (pointer: fine)");
}

interface LowEndNavigator extends Navigator {
  deviceMemory?: number;
  connection?: { saveData?: boolean };
}

/**
 * Menandai perangkat berspesifikasi rendah berdasarkan jumlah core CPU,
 * kapasitas memori, dan mode hemat data. Dievaluasi sekali saat mount.
 */
function isLowEndDevice(): boolean {
  if (typeof navigator === "undefined") return false;
  const nav = navigator as LowEndNavigator;

  // Pengguna meminta hemat data — hormati dengan menekan hiasan.
  if (nav.connection?.saveData) return true;
  // RAM 4 GB ke bawah praktis selalu perangkat kelas bawah.
  if (typeof nav.deviceMemory === "number" && nav.deviceMemory <= 4) return true;
  // Ambang core sengaja rendah agar laptop lawas 4-core tetap dapat hiasan penuh.
  if (typeof nav.hardwareConcurrency === "number" && nav.hardwareConcurrency <= 2) return true;

  return false;
}

/**
 * Menentukan apakah lapisan dekoratif yang berat (blob blur, shape mengambang,
 * parallax) boleh dijalankan.
 *
 * Semuanya dimatikan pada layar kecil, perangkat berspesifikasi rendah, dan saat
 * pengguna meminta reduce-motion — di sanalah animasi berbasis JavaScript paling
 * terasa memberatkan. Nilai awalnya `false` supaya render pertama selalu ringan.
 */
export function useDecorativeMotion(): boolean {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(
      "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
    );
    const update = () => setEnabled(mql.matches && !isLowEndDevice());
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  return enabled;
}
