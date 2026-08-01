"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Route } from "lucide-react";
import { useRef } from "react";

import { Card } from "@/components/ui/Card";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { timelineSteps } from "@/lib/data";
import { viewportOnce } from "@/lib/motion";
import { cn, colorMap } from "@/lib/utils";

export function Timeline() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 65%", "end 60%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.001 });
  const lineScale = useTransform(progress, [0, 1], [0, 1]);

  return (
    <section id="perjalanan" className="nb-section" aria-labelledby="perjalanan-heading">
      <div className="nb-container flex flex-col gap-12">
        <SectionTitle
          eyebrow="Timeline"
          titleId="perjalanan-heading"
          title="Perjalanan"
          highlight="Karier"
          description="Alur perjalanan dari bangku sekolah hingga siap terjun ke dunia industri."
          color="blue"
          icon={Route}
          align="center"
          className="items-center text-center"
        />

        <div ref={containerRef} className="relative">
          {/* Rel timeline */}
          <div
            className="absolute left-[27px] top-0 h-full w-1.5 bg-[var(--nb-grid)] md:left-1/2 md:-translate-x-1/2"
            aria-hidden="true"
          />
          <motion.div
            className="absolute left-[27px] top-0 h-full w-1.5 origin-top bg-[var(--nb-line)] md:left-1/2 md:-translate-x-1/2"
            style={{ scaleY: lineScale }}
            aria-hidden="true"
          />

          <ol className="flex flex-col gap-10 md:gap-14">
            {timelineSteps.map((step, index) => {
              const Icon = step.icon;
              const isLeft = index % 2 === 0;

              return (
                <li
                  key={step.step}
                  className={cn(
                    "relative pl-20 md:flex md:pl-0",
                    isLeft ? "md:justify-start" : "md:justify-end",
                  )}
                >
                  {/* Node — pembungkus mengatur posisi, motion mengatur animasi
                      agar transform inline tidak menimpa -translate-x-1/2. */}
                  <span
                    className="absolute left-0 top-4 z-10 md:left-1/2 md:-translate-x-1/2"
                    aria-hidden="true"
                  >
                    <motion.span
                      initial={{ scale: 0, rotate: -90 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={viewportOnce}
                      transition={{ type: "spring", stiffness: 240, damping: 16, delay: 0.1 }}
                      className={cn(
                        "nb-border-thick flex h-14 w-14 items-center justify-center rounded-brutal shadow-brutal",
                        colorMap[step.color],
                      )}
                    >
                      <Icon className="h-6 w-6" />
                    </motion.span>
                  </span>

                  <motion.div
                    initial={{ opacity: 0, x: isLeft ? -50 : 50, y: 24 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={viewportOnce}
                    transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                    className={cn("w-full md:w-[calc(50%-3rem)]")}
                  >
                    <Card className="flex flex-col gap-3 p-6">
                      <div className="flex items-center justify-between gap-3">
                        <span
                          className={cn(
                            "nb-border rounded-brutal px-2.5 py-1 font-heading text-xs font-black uppercase tracking-widest shadow-brutal",
                            colorMap[step.color],
                          )}
                        >
                          Tahap {step.step}
                        </span>
                        <span className="font-heading text-4xl font-black leading-none text-stroke-thin">
                          {step.step}
                        </span>
                      </div>

                      <div>
                        <h3 className="font-heading text-2xl font-black uppercase leading-tight">
                          {step.title}
                        </h3>
                        <p className="mt-1 font-heading text-sm font-bold uppercase tracking-wide text-muted">
                          {step.subtitle}
                        </p>
                      </div>

                      <p className="text-sm leading-relaxed text-body sm:text-base">
                        {step.description}
                      </p>
                    </Card>
                  </motion.div>
                </li>
              );
            })}
          </ol>

          {/* Penanda akhir */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={viewportOnce}
            transition={{ type: "spring", stiffness: 220, damping: 16 }}
            className="relative mt-10 flex justify-center"
          >
            <span className="nb-border-thick rounded-brutal bg-green px-6 py-3 font-heading text-sm font-black uppercase tracking-[0.2em] text-ink shadow-brutal-md">
              Siap Berkontribusi 🚀
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
