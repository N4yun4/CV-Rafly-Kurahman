import { Flame, Layers, Sparkles } from "lucide-react";

import { WeldIllustration } from "@/components/illustrations/WeldIllustration";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { trainingExtras, trainingModules, trainingProgram } from "@/lib/data";
import { cn, colorMap } from "@/lib/utils";

export function Training() {
  return (
    <section id="pelatihan" className="nb-section" aria-labelledby="pelatihan-heading">
      <div className="nb-container flex flex-col gap-12">
        <SectionTitle
          eyebrow="Pelatihan"
          titleId="pelatihan-heading"
          title="Welder"
          highlight="FCAW"
          description="Pelatihan pengelasan intensif dengan praktik langsung pada enam posisi, dasar K3, dan persiapan Uji Kompetensi BNSP."
          color="green"
          icon={Flame}
        />

        {/* Kartu program */}
        <Reveal variant="zoom">
          <Card className="overflow-hidden" hover={false}>
            <div className="grid gap-0 md:grid-cols-[1.4fr_1fr]">
              <div className="flex flex-col gap-4 p-6 sm:p-8">
                <span className="nb-border inline-flex w-fit items-center gap-2 rounded-brutal bg-secondary px-3 py-1.5 font-heading text-xs font-extrabold uppercase tracking-widest text-ink shadow-brutal">
                  <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                  Program Pelatihan
                </span>
                <h3 className="font-heading text-3xl font-black uppercase leading-none sm:text-4xl">
                  {trainingProgram.title}
                </h3>
                <p className="font-heading text-base font-bold uppercase tracking-wide text-muted">
                  {trainingProgram.subtitle}
                </p>
                <p className="text-base leading-relaxed text-body">{trainingProgram.summary}</p>

                <div className="mt-2 flex flex-wrap gap-2">
                  {["6 Posisi Las", "Dasar K3", "Praktik Langsung", "Persiapan BNSP"].map(
                    (tag, index) => (
                      <span
                        key={tag}
                        className={cn(
                          "nb-border rounded-brutal px-3 py-1.5 font-heading text-xs font-extrabold uppercase shadow-brutal",
                          [colorMap.primary, colorMap.blue, colorMap.green, colorMap.purple][
                            index % 4
                          ],
                        )}
                      >
                        {tag}
                      </span>
                    ),
                  )}
                </div>
              </div>

              <div className="relative flex items-center justify-center overflow-hidden bg-primary p-8">
                <div className="absolute inset-0 bg-dots opacity-40" aria-hidden="true" />
                <div className="decor-loop animate-float-photo relative w-full max-w-[240px]">
                  <WeldIllustration code="3G" />
                </div>
              </div>
            </div>
          </Card>
        </Reveal>

        {/* Grid posisi pengelasan */}
        <div className="flex flex-col gap-5">
          <h3 className="flex items-center gap-2.5 font-heading text-xl font-black uppercase tracking-tight sm:text-2xl">
            <Layers className="h-6 w-6 text-blue" aria-hidden="true" />
            Materi Posisi Pengelasan
          </h3>

          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {trainingModules.map((module, index) => (
              <Card
                key={module.code}
                as="li"
                reveal="pop"
                delay={Math.min(index, 5) * 0.06}
                className="group flex flex-col overflow-hidden"
              >
                <div
                  className={cn(
                    "nb-border-thick relative flex h-32 items-center justify-center overflow-hidden border-x-0 border-t-0 p-4",
                    colorMap[module.color],
                  )}
                >
                  <div className="absolute inset-0 bg-dots opacity-30" aria-hidden="true" />
                  <div className="relative h-full w-full max-w-[150px] transition-transform duration-300 group-hover:scale-110">
                    <WeldIllustration code={module.code} />
                  </div>
                  <span className="nb-border absolute left-3 top-3 rounded-brutal bg-surface px-2.5 py-1 font-heading text-sm font-black text-body">
                    {module.code}
                  </span>
                </div>

                <div className="flex flex-1 flex-col gap-2 p-5">
                  <h4 className="font-heading text-lg font-black uppercase leading-tight">
                    {module.label}
                  </h4>
                  <p className="text-sm leading-relaxed text-muted">{module.detail}</p>
                </div>
              </Card>
            ))}
          </ul>
        </div>

        {/* Materi pendukung */}
        <ul className="grid gap-5 md:grid-cols-3">
          {trainingExtras.map((extra, index) => {
            const Icon = extra.icon;
            return (
              <Card
                key={extra.title}
                as="li"
                reveal="pop"
                delay={index * 0.08}
                className="flex flex-col gap-3 p-6"
              >
                <span
                  className={cn(
                    "nb-border flex h-14 w-14 items-center justify-center rounded-brutal shadow-brutal",
                    colorMap[extra.color],
                  )}
                >
                  <Icon className="h-7 w-7" aria-hidden="true" />
                </span>
                <h4 className="font-heading text-xl font-black uppercase leading-tight">
                  {extra.title}
                </h4>
                <p className="text-sm leading-relaxed text-muted">{extra.description}</p>
              </Card>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
