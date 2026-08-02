"use client";

import { useEffect, useState } from "react";

/**
 * Mengembalikan id section yang sedang terlihat di viewport.
 *
 * Memakai IntersectionObserver, bukan listener scroll. Versi berbasis scroll
 * memanggil `getBoundingClientRect()` untuk setiap section pada tiap event
 * sehingga memaksa layout ulang puluhan kali per detik — beban yang jelas terasa
 * di perangkat lambat. IntersectionObserver bekerja di luar main thread dan
 * hanya memberi kabar saat status perpotongan benar-benar berubah.
 */
export function useActiveSection(ids: string[], offset = 140): string {
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    const visible = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.set(entry.target.id, entry.intersectionRatio);
          } else {
            visible.delete(entry.target.id);
          }
        }

        // Section aktif = yang paling atas di antara yang sedang terlihat,
        // mengikuti urutan daftar id sehingga hasilnya stabil.
        let next = "";
        for (const id of ids) {
          if (visible.has(id)) {
            next = id;
            break;
          }
        }
        if (next) setActive(next);
      },
      {
        // Batas atas digeser sebesar tinggi navbar agar section dianggap aktif
        // tepat ketika judulnya lewat di bawah navbar.
        rootMargin: `-${offset}px 0px -55% 0px`,
        threshold: [0, 0.01],
      },
    );

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [ids, offset]);

  return active;
}
