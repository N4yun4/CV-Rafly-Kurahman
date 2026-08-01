"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Download, Flame, HardHat, MapPin, MousePointerClick, Sparkles } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/Button";
import { Marquee } from "@/components/ui/Marquee";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { heroStats, marqueeWords } from "@/lib/data";
import { easeOutExpo } from "@/lib/motion";
import { siteConfig } from "@/lib/site";
import { cn, colorMap, scrollToSection } from "@/lib/utils";

const roles = [siteConfig.role, ...siteConfig.secondaryRoles];

export function Hero() {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = usePrefersReducedMotion();
  const [roleIndex, setRoleIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const parallaxSlow = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const parallaxFast = useTransform(scrollYProgress, [0, 1], [0, 230]);
  const parallaxUp = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  useEffect(() => {
    if (reduced) return;
    const interval = window.setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2600);
    return () => window.clearInterval(interval);
  }, [reduced]);

  return (
    <section
      id="beranda"
      ref={ref}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-5 pb-28 pt-28 sm:px-8 sm:pb-32 md:pt-32"
      aria-label="Perkenalan"
    >
      {/* Shape parallax dekoratif */}
      <motion.div
        style={{ y: parallaxFast }}
        className="nb-border-thick pointer-events-none absolute -right-10 top-24 hidden h-40 w-40 rotate-12 rounded-full bg-secondary/80 md:block"
        aria-hidden="true"
      />
      <motion.div
        style={{ y: parallaxSlow }}
        className="nb-border-thick pointer-events-none absolute bottom-24 left-[-3rem] hidden h-48 w-48 -rotate-6 bg-blue/70 md:block"
        aria-hidden="true"
      />
      <motion.div
        style={{ y: parallaxUp }}
        className="nb-border-thick pointer-events-none absolute right-1/3 top-16 hidden h-16 w-16 rotate-45 bg-green lg:block"
        aria-hidden="true"
      />

      <motion.div
        style={{ opacity: heroOpacity }}
        className="nb-container relative grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10"
      >
        {/* Kolom teks — animasi masuk memakai CSS agar tidak menunggu hydration */}
        <div className="flex flex-col items-start gap-6">
          <div className="animate-rise" style={{ animationDelay: "0.05s" }}>
            <span className="nb-border inline-flex items-center gap-2 rounded-brutal bg-surface px-4 py-2 font-heading text-xs font-extrabold uppercase tracking-[0.2em] shadow-brutal">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green" />
              </span>
              Terbuka untuk peluang kerja
            </span>
          </div>

          <p
            className="animate-rise font-heading text-2xl font-bold uppercase tracking-tight sm:text-3xl"
            style={{ animationDelay: "0.1s" }}
          >
            Halo, Saya{" "}
            <motion.span
              className="inline-block"
              animate={reduced ? undefined : { rotate: [0, 18, -8, 18, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 2.6 }}
            >
              👋
            </motion.span>
          </p>

          <h1
            className="animate-rise-solid text-[3.1rem] font-black uppercase leading-[0.86] tracking-tighter xs:text-6xl sm:text-7xl lg:text-[5.6rem]"
            style={{ animationDelay: "0.05s" }}
          >
            <span className="block">Rafly</span>
            <span className="relative block">
              <span className="relative z-10">Kurahman</span>
              <motion.span
                className="absolute inset-x-0 bottom-1 -z-0 h-5 bg-primary sm:h-7"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.9, ease: easeOutExpo, delay: 1 }}
                style={{ originX: 0 }}
                aria-hidden="true"
              />
            </span>
          </h1>

          <div
            className="animate-rise min-h-[3.6rem] w-full"
            style={{ animationDelay: "0.2s" }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={roles[roleIndex]}
                initial={{ opacity: 0, y: 18, rotate: -2 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                exit={{ opacity: 0, y: -18, rotate: 2 }}
                transition={{ duration: 0.4, ease: easeOutExpo }}
                className={cn(
                  "nb-border-thick inline-flex items-center gap-2.5 rounded-brutal px-4 py-3 font-heading text-lg font-black uppercase tracking-tight shadow-brutal-md sm:text-2xl",
                  roleIndex === 0
                    ? "bg-secondary text-ink"
                    : roleIndex === 1
                      ? "bg-blue text-ink"
                      : "bg-green text-ink",
                )}
              >
                {roleIndex === 0 ? (
                  <Flame className="h-6 w-6" aria-hidden="true" />
                ) : roleIndex === 1 ? (
                  <HardHat className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <Sparkles className="h-6 w-6" aria-hidden="true" />
                )}
                {roles[roleIndex]}
              </motion.div>
            </AnimatePresence>
          </div>

          <p
            className="animate-rise-solid max-w-xl text-base leading-relaxed text-muted sm:text-lg"
            style={{ animationDelay: "0.14s" }}
          >
            {siteConfig.tagline}
          </p>

          <div
            className="animate-rise flex flex-wrap items-center gap-3 sm:gap-4"
            style={{ animationDelay: "0.3s" }}
          >
            <Button href={siteConfig.cvPath} download size="lg" icon={Download}>
              Download CV
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={() => scrollToSection("#kontak")}
              iconRight={ArrowRight}
            >
              Hubungi Saya
            </Button>
          </div>

          <dl
            className="animate-rise mt-2 grid w-full max-w-xl grid-cols-2 gap-3 sm:grid-cols-4"
            style={{ animationDelay: "0.36s" }}
          >
            {heroStats.map((stat) => (
              <div
                key={stat.label}
                className={cn(
                  "nb-border flex flex-col-reverse gap-1.5 rounded-brutal px-3 py-3 shadow-brutal transition-transform duration-200 hover:-translate-y-1",
                  colorMap[stat.color],
                )}
              >
                <dt className="text-[0.68rem] font-bold uppercase leading-tight tracking-wide">
                  {stat.label}
                </dt>
                <dd className="font-heading text-2xl font-black leading-none sm:text-3xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Kolom foto */}
        <div
          className="animate-rise relative mx-auto w-full max-w-sm lg:max-w-md"
          style={{ animationDelay: "0.28s" }}
        >
          {/* Layer offset di belakang foto */}
          <div
            className="nb-border-thick absolute inset-0 translate-x-4 translate-y-4 rounded-brutal bg-blue"
            aria-hidden="true"
          />
          <div
            className="nb-border-thick absolute inset-0 translate-x-2 translate-y-2 rounded-brutal bg-secondary"
            aria-hidden="true"
          />

          <motion.div
            animate={reduced ? undefined : { y: [0, -12, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="nb-border-thick relative overflow-hidden rounded-brutal bg-primary"
          >
            <div className="absolute inset-0 bg-dots opacity-40" aria-hidden="true" />
            <Image
              src={siteConfig.photo}
              alt={`Foto profil ${siteConfig.name}, ${siteConfig.role}`}
              width={siteConfig.photoWidth}
              height={siteConfig.photoHeight}
              priority
              fetchPriority="high"
              quality={85}
              sizes="(max-width: 1024px) 90vw, 440px"
              className="relative h-auto w-full object-cover"
            />

            <div className="nb-border-thick relative flex items-center justify-between gap-3 border-x-0 border-b-0 bg-surface px-4 py-3">
              <div className="min-w-0">
                <p className="truncate font-heading text-sm font-black uppercase">
                  {siteConfig.name}
                </p>
                <p className="flex items-center gap-1.5 truncate text-xs font-semibold text-muted">
                  <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  Sangatta Selatan, Kutai Timur
                </p>
              </div>
              <span className="nb-border shrink-0 rounded-brutal bg-green px-2.5 py-1 font-heading text-[0.65rem] font-extrabold uppercase text-ink">
                Welder
              </span>
            </div>
          </motion.div>

          {/* Sticker melayang */}
          <motion.div
            animate={reduced ? undefined : { rotate: [0, 360] }}
            transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
            className="nb-border-thick absolute -left-6 -top-6 flex h-20 w-20 items-center justify-center rounded-full bg-surface shadow-brutal sm:-left-8 sm:-top-8 sm:h-24 sm:w-24"
            aria-hidden="true"
          >
            <Flame className="h-8 w-8 text-secondary" />
          </motion.div>

          <motion.div
            animate={reduced ? undefined : { y: [0, 14, 0], rotate: [-4, 4, -4] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="nb-border-thick absolute -bottom-7 -right-4 rounded-brutal bg-primary px-3.5 py-2.5 shadow-brutal-md sm:-right-8"
            aria-hidden="true"
          >
            <p className="font-heading text-xs font-black uppercase leading-tight text-ink">
              FCAW
              <br />
              1F — 3G
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <button
        type="button"
        onClick={() => scrollToSection("#tentang")}
        aria-label="Scroll ke bagian tentang saya"
        className="animate-rise group relative z-10 mx-auto mt-12 flex flex-col items-center gap-2 lg:mt-14"
        style={{ animationDelay: "0.45s" }}
      >
        <span className="font-heading text-[0.65rem] font-extrabold uppercase tracking-[0.3em] text-muted">
          Scroll
        </span>
        <motion.span
          animate={reduced ? undefined : { y: [0, 9, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="nb-border-thick flex h-11 w-7 items-start justify-center rounded-full bg-surface p-1.5 shadow-brutal"
        >
          <motion.span
            animate={reduced ? undefined : { y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="h-2 w-2 rounded-full bg-secondary"
          />
        </motion.span>
        <MousePointerClick
          className="h-4 w-4 text-muted opacity-0 transition-opacity group-hover:opacity-100"
          aria-hidden="true"
        />
      </button>

      <div className="absolute inset-x-0 bottom-0 -rotate-1">
        <Marquee items={marqueeWords} />
      </div>
    </section>
  );
}
