"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="font-heading text-[5rem] font-black leading-none text-stroke sm:text-[7rem]">
        OOPS
      </p>
      <h1 className="font-heading text-3xl font-black uppercase sm:text-4xl">
        Terjadi Kesalahan
      </h1>
      <p className="max-w-md text-base text-muted">
        Maaf, ada gangguan saat memuat halaman ini. Silakan coba muat ulang.
      </p>
      <button
        type="button"
        onClick={reset}
        className="nb-border-thick inline-flex items-center gap-2 rounded-brutal bg-secondary px-6 py-4 font-heading text-base font-bold uppercase tracking-wide text-ink shadow-brutal-md transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-brutal-lg"
      >
        Coba Lagi
      </button>
    </main>
  );
}
