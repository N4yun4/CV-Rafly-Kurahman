"use client";

import { motion } from "framer-motion";
import { Award, BadgeCheck, Clock3, ShieldCheck, Stamp } from "lucide-react";

import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { certifications } from "@/lib/data";
import { staggerContainer, viewportOnce } from "@/lib/motion";
import { cn, colorMap } from "@/lib/utils";

const processSteps = [
  { label: "Pelatihan Selesai", done: true },
  { label: "Uji Kompetensi", done: true },
  { label: "Penerbitan Sertifikat", done: false },
];

export function Certification() {
  return (
    <section id="sertifikasi" className="nb-section" aria-labelledby="sertifikasi-heading">
      <div className="nb-container flex flex-col gap-12">
        <SectionTitle
          eyebrow="Sertifikasi"
          titleId="sertifikasi-heading"
          title="Bukti"
          highlight="Kompetensi"
          description="Pengakuan resmi atas kemampuan teknis pengelasan sesuai standar nasional."
          color="purple"
          icon={Award}
        />

        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid gap-6 lg:grid-cols-[1.25fr_1fr]"
        >
          {certifications.map((cert) => (
            <Reveal key={cert.title} variant="right">
              <Card className="relative h-full overflow-hidden" hover={false}>
                {/* Pita status */}
                <div className="absolute -right-14 top-6 z-10 rotate-45">
                  <div className="nb-border bg-secondary px-14 py-1.5 text-center font-heading text-xs font-black uppercase tracking-widest text-ink shadow-brutal">
                    {cert.statusLabel}
                  </div>
                </div>

                <div
                  className={cn(
                    "nb-border-thick relative flex items-center gap-4 border-x-0 border-t-0 px-6 py-6",
                    colorMap[cert.color],
                  )}
                >
                  <div className="absolute inset-0 bg-dots opacity-30" aria-hidden="true" />
                  <motion.span
                    animate={{ rotate: [0, -6, 6, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="nb-border-thick relative flex h-16 w-16 shrink-0 items-center justify-center rounded-brutal bg-surface text-body shadow-brutal"
                  >
                    <Stamp className="h-8 w-8" aria-hidden="true" />
                  </motion.span>
                  <div className="relative min-w-0 pr-16">
                    <h3 className="font-heading text-2xl font-black uppercase leading-tight sm:text-3xl">
                      {cert.title}
                    </h3>
                    <p className="mt-1 text-sm font-bold">{cert.issuer}</p>
                  </div>
                </div>

                <div className="flex flex-col gap-6 px-6 py-6">
                  <p className="text-base leading-relaxed text-body">{cert.description}</p>

                  <div className="flex flex-wrap items-center gap-3">
                    <Badge color="secondary" pulse>
                      Dalam Proses Penerbitan
                    </Badge>
                    <Badge color="blue" icon={ShieldCheck}>
                      Standar BNSP
                    </Badge>
                  </div>

                  {/* Progres proses sertifikasi */}
                  <ol className="flex flex-col gap-3">
                    {processSteps.map((step, index) => (
                      <li key={step.label} className="flex items-center gap-3">
                        <span
                          className={cn(
                            "nb-border flex h-9 w-9 shrink-0 items-center justify-center rounded-brutal font-heading text-sm font-black shadow-brutal",
                            step.done ? "bg-green text-ink" : "bg-surface text-body",
                          )}
                        >
                          {step.done ? (
                            <BadgeCheck className="h-5 w-5" aria-hidden="true" />
                          ) : (
                            <Clock3 className="h-5 w-5" aria-hidden="true" />
                          )}
                        </span>
                        <div className="flex-1">
                          <p className="font-heading text-sm font-bold uppercase tracking-wide">
                            {step.label}
                          </p>
                          <div className="nb-border mt-1 h-2.5 w-full overflow-hidden rounded-brutal bg-surface">
                            <motion.div
                              className={cn("h-full", step.done ? "bg-green" : "bg-primary")}
                              initial={{ width: "0%" }}
                              whileInView={{ width: step.done ? "100%" : "65%" }}
                              viewport={{ once: true, amount: 0.6 }}
                              transition={{
                                duration: 0.9,
                                delay: 0.12 * index,
                                ease: [0.16, 1, 0.3, 1],
                              }}
                            />
                          </div>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </Card>
            </Reveal>
          ))}

          {/* Kartu pratinjau sertifikat */}
          <Reveal variant="left">
            <Card className="flex h-full flex-col items-center justify-center gap-5 bg-primary p-8 text-ink" hover={false}>
              <div className="absolute inset-0 bg-dots opacity-30" aria-hidden="true" />

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="nb-border-thick relative flex aspect-[4/3] w-full max-w-xs flex-col items-center justify-center gap-3 rounded-brutal bg-surface p-6 text-center shadow-brutal-lg"
              >
                <div className="nb-border flex h-16 w-16 items-center justify-center rounded-full bg-primary">
                  <Award className="h-8 w-8 text-ink" aria-hidden="true" />
                </div>
                <p className="font-heading text-lg font-black uppercase leading-tight text-body">
                  Sertifikat Kompetensi
                </p>
                <p className="font-heading text-xs font-bold uppercase tracking-[0.25em] text-muted">
                  Welder — BNSP
                </p>
                <div className="mt-2 flex w-full flex-col gap-2" aria-hidden="true">
                  <span className="h-2.5 w-full bg-[var(--nb-grid)]" />
                  <span className="h-2.5 w-3/4 self-center bg-[var(--nb-grid)]" />
                </div>
                <span className="nb-border mt-1 rounded-brutal bg-secondary px-3 py-1 font-heading text-[0.65rem] font-black uppercase tracking-widest text-ink">
                  Coming Soon
                </span>
              </motion.div>

              <p className="relative max-w-sm text-center text-sm font-semibold leading-relaxed">
                Dokumen sertifikat akan ditampilkan di halaman ini segera setelah proses penerbitan
                oleh BNSP selesai.
              </p>
            </Card>
          </Reveal>
        </motion.div>
      </div>
    </section>
  );
}
