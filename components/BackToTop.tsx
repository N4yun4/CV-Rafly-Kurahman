"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

/** Tombol kembali ke atas yang muncul setelah pengguna menggulir. */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          type="button"
          onClick={handleClick}
          aria-label="Kembali ke atas halaman"
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ x: -3, y: -3 }}
          whileTap={{ scale: 0.92 }}
          className="nb-border-thick fixed bottom-6 right-5 z-[65] flex h-14 w-14 items-center justify-center rounded-brutal bg-primary text-ink shadow-brutal-md transition-shadow hover:shadow-brutal-lg sm:right-8 sm:h-16 sm:w-16"
        >
          <ArrowUp className="h-6 w-6" aria-hidden="true" />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
