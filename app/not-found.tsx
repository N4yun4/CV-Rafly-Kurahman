import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Halaman Tidak Ditemukan",
  description: "Halaman yang Anda cari tidak tersedia.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="font-heading text-[7rem] font-black leading-none text-stroke sm:text-[10rem]">
        404
      </p>
      <h1 className="font-heading text-3xl font-black uppercase sm:text-4xl">
        Halaman Tidak Ditemukan
      </h1>
      <p className="max-w-md text-base text-muted">
        Sepertinya halaman yang Anda tuju sudah dipindahkan atau tidak pernah ada.
      </p>
      <Link
        href="/"
        className="nb-border-thick inline-flex items-center gap-2 rounded-brutal bg-primary px-6 py-4 font-heading text-base font-bold uppercase tracking-wide text-ink shadow-brutal-md transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-brutal-lg"
      >
        Kembali ke Beranda
      </Link>
    </main>
  );
}
