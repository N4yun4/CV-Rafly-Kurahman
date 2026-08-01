"use client";

import { motion } from "framer-motion";
import { Barcode, Boxes, Briefcase, CalendarDays, CheckCircle2, MapPin, Warehouse } from "lucide-react";

import { Card } from "@/components/ui/Card";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { experiences } from "@/lib/data";
import { slideLeft, slideUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { cn, colorMap } from "@/lib/utils";

export function Experience() {
  return (
    <section id="pengalaman" className="nb-section" aria-labelledby="pengalaman-heading">
      <div className="nb-container flex flex-col gap-12">
        <SectionTitle
          eyebrow="Pengalaman"
          titleId="pengalaman-heading"
          title="Rekam Jejak"
          highlight="Kerja"
          description="Pengalaman kerja nyata yang membentuk ketelitian, tanggung jawab, dan pemahaman alur operasional."
          color="blue"
          icon={Briefcase}
        />

        <div className="relative">
          {/* Garis timeline */}
          <div
            className="absolute left-[26px] top-3 hidden h-[calc(100%-1.5rem)] w-1 bg-[var(--nb-line)] sm:block"
            aria-hidden="true"
          />

          <motion.ol
            variants={staggerContainer(0.14)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="flex flex-col gap-8"
          >
            {experiences.map((item) => (
              <motion.li key={item.role} variants={slideUp} className="relative sm:pl-[72px]">
                {/* Titik timeline */}
                <motion.span
                  variants={slideUp}
                  className={cn(
                    "nb-border-thick absolute left-0 top-2 hidden h-14 w-14 items-center justify-center rounded-brutal shadow-brutal sm:flex",
                    colorMap[item.color],
                  )}
                  aria-hidden="true"
                >
                  <Warehouse className="h-6 w-6" />
                </motion.span>

                <Card className="overflow-hidden">
                  <div className="nb-border-thick flex flex-wrap items-start justify-between gap-3 border-x-0 border-t-0 bg-primary px-5 py-4 text-ink sm:px-6">
                    <div className="min-w-0">
                      <h3 className="font-heading text-2xl font-black uppercase leading-tight sm:text-3xl">
                        {item.role}
                      </h3>
                      <p className="mt-1 font-heading text-base font-bold">{item.company}</p>
                    </div>
                    <span className="nb-border shrink-0 rounded-brutal bg-white px-3 py-1.5 font-heading text-xs font-extrabold uppercase tracking-wide">
                      {item.type}
                    </span>
                  </div>

                  <div className="flex flex-col gap-5 px-5 py-5 sm:px-6 sm:py-6">
                    <div className="flex flex-wrap gap-2.5">
                      <span className="nb-border inline-flex items-center gap-1.5 rounded-brutal bg-surface px-3 py-1.5 text-xs font-bold uppercase text-body">
                        <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                        {item.location}
                      </span>
                      <span className="nb-border inline-flex items-center gap-1.5 rounded-brutal bg-surface px-3 py-1.5 text-xs font-bold uppercase text-body">
                        <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                        {item.period}
                      </span>
                    </div>

                    <div>
                      <h4 className="flex items-center gap-2 font-heading text-sm font-extrabold uppercase tracking-[0.15em] text-muted">
                        <Boxes className="h-4 w-4" aria-hidden="true" />
                        Tanggung Jawab
                      </h4>
                      <ul className="mt-3 flex flex-col gap-3">
                        {item.responsibilities.map((task) => (
                          <motion.li
                            key={task}
                            variants={slideLeft}
                            className="flex items-start gap-3 text-sm leading-relaxed text-body sm:text-base"
                          >
                            <CheckCircle2
                              className="mt-0.5 h-5 w-5 shrink-0 text-green"
                              aria-hidden="true"
                            />
                            {task}
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="flex items-center gap-2 font-heading text-sm font-extrabold uppercase tracking-[0.15em] text-muted">
                        <Barcode className="h-4 w-4" aria-hidden="true" />
                        Alat & Sistem
                      </h4>
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {item.tools.map((tool, index) => (
                          <li
                            key={tool}
                            className={cn(
                              "nb-border rounded-brutal px-3 py-1.5 font-heading text-xs font-extrabold uppercase shadow-brutal transition-transform hover:-translate-y-1",
                              [colorMap.blue, colorMap.green, colorMap.secondary, colorMap.purple][
                                index % 4
                              ],
                            )}
                          >
                            {tool}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </div>
    </section>
  );
}
