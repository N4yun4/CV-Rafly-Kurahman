import { GraduationCap, MapPin, Quote, User } from "lucide-react";

import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { aboutHighlights, aboutParagraphs, education } from "@/lib/data";
import { cn, colorMap } from "@/lib/utils";

export function About() {
  return (
    <section id="tentang" className="nb-section" aria-labelledby="tentang-heading">
      <div className="nb-container flex flex-col gap-12">
        <SectionTitle
          eyebrow="Tentang Saya"
          titleId="tentang-heading"
          title="Kenali"
          highlight="Saya"
          description="Profil singkat mengenai latar belakang, karakter kerja, dan arah karier yang sedang saya bangun."
          color="primary"
          icon={User}
        />

        <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr]">
          {/* Narasi utama */}
          <Reveal variant="right">
            <Card className="h-full p-6 sm:p-8" hover={false}>
              <Quote className="h-10 w-10 text-secondary" aria-hidden="true" />
              <div className="mt-4 flex flex-col gap-4">
                {aboutParagraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className={cn(
                      "leading-relaxed text-body",
                      index === 0 ? "text-lg font-semibold sm:text-xl" : "text-base text-muted",
                    )}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="nb-border-thick mt-7 flex flex-wrap items-center gap-3 rounded-brutal bg-primary px-4 py-4 text-ink shadow-brutal">
                <GraduationCap className="h-7 w-7 shrink-0" aria-hidden="true" />
                <div className="min-w-0">
                  <p className="font-heading text-base font-black uppercase leading-tight">
                    {education.school}
                  </p>
                  <p className="text-sm font-semibold">
                    Jurusan {education.major} — {education.status}
                  </p>
                </div>
                <span className="nb-border ml-auto inline-flex items-center gap-1.5 rounded-brutal bg-white px-2.5 py-1 text-xs font-bold uppercase">
                  <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                  {education.location}
                </span>
              </div>
            </Card>
          </Reveal>

          {/* Grid nilai diri */}
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {aboutHighlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <Card
                  key={item.title}
                  as="li"
                  reveal="pop"
                  delay={index * 0.07}
                  className={cn("flex flex-col gap-2.5 p-5", colorMap[item.color])}
                >
                  <span className="nb-border flex h-11 w-11 items-center justify-center rounded-brutal bg-surface text-body shadow-brutal">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="font-heading text-lg font-black uppercase leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed opacity-90">{item.description}</p>
                </Card>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
