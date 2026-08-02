"use client";

import { Zap } from "lucide-react";
import { useState } from "react";

import { Card } from "@/components/ui/Card";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { skillCategories, skills } from "@/lib/data";
import { cn, colorMap } from "@/lib/utils";

type Filter = "semua" | (typeof skillCategories)[number]["id"];

const filters: { id: Filter; label: string }[] = [
  { id: "semua", label: "Semua" },
  ...skillCategories.map((category) => ({ id: category.id as Filter, label: category.label })),
];

export function Skills() {
  const [filter, setFilter] = useState<Filter>("semua");
  const visible = filter === "semua" ? skills : skills.filter((s) => s.category === filter);

  return (
    <section id="keahlian" className="nb-section" aria-labelledby="keahlian-heading">
      <div className="nb-container flex flex-col gap-10">
        <SectionTitle
          eyebrow="Keahlian"
          titleId="keahlian-heading"
          title="Kemampuan"
          highlight="Saya"
          description="Kombinasi keterampilan teknis pengelasan, kemampuan administrasi digital, dan sikap kerja yang dibutuhkan industri."
          color="secondary"
          icon={Zap}
        />

        {/* Filter kategori */}
        <div className="flex flex-wrap gap-2.5" role="tablist" aria-label="Filter kategori keahlian">
          {filters.map((item) => {
            const isActive = filter === item.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setFilter(item.id)}
                className={cn(
                  "nb-border nb-hover-lift rounded-brutal px-4 py-2.5 font-heading text-sm font-bold uppercase tracking-wide shadow-brutal transition-colors",
                  isActive ? "bg-ink text-cream dark:bg-cream dark:text-ink" : "bg-surface text-body",
                )}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <Card
                key={skill.name}
                as="li"
                reveal="pop"
                delay={Math.min(index, 5) * 0.05}
                className="group flex flex-col gap-4 p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <span
                    className={cn(
                      "nb-border flex h-12 w-12 shrink-0 items-center justify-center rounded-brutal shadow-brutal transition-transform duration-300 group-hover:rotate-12",
                      colorMap[skill.color],
                    )}
                  >
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <span className="nb-border rounded-brutal bg-surface px-2 py-1 font-heading text-xs font-black">
                    {skill.level}%
                  </span>
                </div>

                <div>
                  <h3 className="font-heading text-xl font-black uppercase leading-tight">
                    {skill.name}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{skill.description}</p>
                </div>

                <div className="mt-auto">
                  <div
                    className="nb-border h-5 w-full overflow-hidden rounded-brutal bg-surface"
                    role="progressbar"
                    aria-valuenow={skill.level}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`Tingkat penguasaan ${skill.name}`}
                  >
                    {/* Batang terisi memakai animasi CSS yang baru berjalan ketika
                        kartu induknya masuk ke layar (lihat kelas `.progress-fill`). */}
                    <div
                      className={cn(
                        "progress-fill h-full origin-left",
                        colorMap[skill.color].split(" ")[0],
                      )}
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              </Card>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
