"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Bar progres scroll di bagian paling atas halaman. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[70] h-1.5 origin-left bg-secondary"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}
