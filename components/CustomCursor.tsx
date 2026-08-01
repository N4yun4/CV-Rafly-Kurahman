"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

import { useHasFinePointer, usePrefersReducedMotion } from "@/hooks/useMediaQuery";

/**
 * Custom cursor: kotak outline besar + titik pengikut.
 * Hanya aktif pada perangkat dengan mouse dan saat reduce-motion tidak aktif.
 */
export function CustomCursor() {
  const finePointer = useHasFinePointer();
  const reduced = usePrefersReducedMotion();
  const enabled = finePointer && !reduced;

  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [visible, setVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const ringX = useSpring(mouseX, { stiffness: 260, damping: 26, mass: 0.5 });
  const ringY = useSpring(mouseY, { stiffness: 260, damping: 26, mass: 0.5 });

  useEffect(() => {
    if (!enabled) {
      document.documentElement.classList.remove("cursor-hidden");
      return;
    }

    document.documentElement.classList.add("cursor-hidden");

    const interactiveSelector = "a, button, [role='button'], input, textarea, select, summary";

    const onMove = (event: MouseEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
      if (!visible) setVisible(true);
      const target = event.target as HTMLElement | null;
      setHovering(Boolean(target?.closest(interactiveSelector)));
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      document.documentElement.classList.remove("cursor-hidden");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, [enabled, mouseX, mouseY, visible]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[90] hidden md:block" aria-hidden="true">
      <motion.div
        className="absolute left-0 top-0 h-2.5 w-2.5 rounded-full bg-secondary"
        style={{ x: mouseX, y: mouseY, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: visible ? 1 : 0 }}
      />
      <motion.div
        className="nb-border-thick absolute left-0 top-0 h-9 w-9 rounded-brutal bg-primary/25 backdrop-blur-[1px]"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          scale: pressed ? 0.75 : hovering ? 1.7 : 1,
          rotate: hovering ? 45 : 0,
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 320, damping: 22 }}
      />
    </div>
  );
}
