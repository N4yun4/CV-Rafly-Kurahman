"use client";

import { useEffect, useRef } from "react";

/**
 * Satu IntersectionObserver dipakai bersama seluruh elemen reveal di halaman.
 * Membuat observer terpisah per elemen akan menghadirkan puluhan observer
 * sekaligus, sedangkan satu instance sudah cukup dan jauh lebih hemat.
 */
let sharedObserver: IntersectionObserver | null = null;

function getObserver(): IntersectionObserver | null {
  if (typeof window === "undefined" || !("IntersectionObserver" in window)) return null;

  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          el.classList.add("is-visible");

          // Setelah animasi selesai, kelasnya diganti menjadi status akhir biasa.
          // Animasi dengan fill-mode aktif akan terus memaksakan nilai transform
          // miliknya dan membuat efek hover pada kartu tidak berfungsi.
          el.addEventListener(
            "animationend",
            (event) => {
              if (event.target === el) el.classList.add("reveal-done");
            },
            { once: true },
          );

          // Animasi hanya sekali; berhenti mengamati agar tidak ada pekerjaan sisa.
          sharedObserver?.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0 },
    );
  }

  return sharedObserver;
}

/**
 * Memicu animasi masuk berbasis CSS saat elemen memasuki viewport.
 *
 * Animasinya dijalankan CSS (hanya transform + opacity), sehingga saat pengguna
 * menggulir tidak ada pekerjaan JavaScript per frame — berbeda dengan animasi
 * scroll berbasis JavaScript yang harus menghitung ulang di setiap frame.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = getObserver();
    if (!observer) {
      // Tanpa dukungan IntersectionObserver, tampilkan langsung tanpa animasi.
      el.classList.add("is-visible");
      return;
    }

    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);

  return ref;
}
