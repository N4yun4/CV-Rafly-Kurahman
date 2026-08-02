"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * Shape parallax di belakang hero.
 *
 * Dipisah dari `Hero` supaya `useScroll` beserta motion value-nya hanya hidup di
 * perangkat yang memang menjalankan efek dekoratif. Di ponsel komponen ini tidak
 * pernah dipasang, jadi tidak ada perhitungan scroll sama sekali.
 */
export function HeroParallax() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const slow = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const fast = useTransform(scrollYProgress, [0, 1], [0, 230]);
  const up = useTransform(scrollYProgress, [0, 1], [0, -140]);

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0" aria-hidden="true">
      <motion.div
        style={{ y: fast }}
        className="nb-border-thick absolute -right-10 top-24 hidden h-40 w-40 rotate-12 rounded-full bg-secondary/80 md:block"
      />
      <motion.div
        style={{ y: slow }}
        className="nb-border-thick absolute bottom-24 left-[-3rem] hidden h-48 w-48 -rotate-6 bg-blue/70 md:block"
      />
      <motion.div
        style={{ y: up }}
        className="nb-border-thick absolute right-1/3 top-16 hidden h-16 w-16 rotate-45 bg-green lg:block"
      />
    </div>
  );
}
