import type { ReactNode } from "react";

/**
 * Transisi masuk halaman.
 * Memakai animasi CSS (hanya transform, tanpa fade) supaya konten sudah terlihat
 * pada render pertama — animasi berbasis JS akan menahan teks utama sampai
 * hydration selesai dan memperlambat Largest Contentful Paint.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  return <div className="animate-page-in">{children}</div>;
}
