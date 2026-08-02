import { Route } from "lucide-react";

import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { timelineSteps } from "@/lib/data";
import { cn, colorMap } from "@/lib/utils";

export function Timeline() {
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

        <div className="relative">
          {/* Rel timeline */}
          <div
            className="absolute left-[27px] top-0 h-full w-1.5 bg-[var(--nb-grid)] md:left-1/2 md:-translate-x-1/2"
            aria-hidden="true"
          />
          {/* Garis terisi: tumbuh sekali lewat animasi CSS ketika masuk layar,
              menggantikan animasi yang terikat posisi scroll. */}
          <Reveal
            variant="fade"
            className="absolute left-[27px] top-0 h-full w-1.5 md:left-1/2 md:-translate-x-1/2"
          >
            <div
              className="timeline-fill h-full w-full origin-top bg-[var(--nb-line)]"
              aria-hidden="true"
            />
          </Reveal>

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
                  {/* Node — pembungkus mengatur posisi, elemen di dalamnya
                      mengatur animasi agar transform tidak saling menimpa. */}
                  <span
                    className="absolute left-0 top-4 z-10 md:left-1/2 md:-translate-x-1/2"
                    aria-hidden="true"
                  >
                    <Reveal
                      as="span"
                      variant="pop"
                      className={cn(
                        "nb-border-thick flex h-14 w-14 items-center justify-center rounded-brutal shadow-brutal",
                        colorMap[step.color],
                      )}
                    >
                      <Icon className="h-6 w-6" />
                    </Reveal>
                  </span>

                  <Reveal
                    variant={isLeft ? "right" : "left"}
                    className="w-full md:w-[calc(50%-3rem)]"
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
                  </Reveal>
                </li>
              );
            })}
          </ol>

          {/* Penanda akhir */}
          <Reveal variant="pop" className="relative mt-10 flex justify-center">
            <span className="nb-border-thick rounded-brutal bg-green px-6 py-3 font-heading text-sm font-black uppercase tracking-[0.2em] text-ink shadow-brutal-md">
              Siap Berkontribusi 🚀
            </span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
