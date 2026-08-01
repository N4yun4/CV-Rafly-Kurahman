"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Check, Copy, Mail, Phone, Send } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { contactChannels } from "@/lib/data";
import { popIn, staggerContainer, viewportOnce } from "@/lib/motion";
import { mailtoLink, siteConfig, telLink } from "@/lib/site";
import { cn, colorMap } from "@/lib/utils";

export function Contact() {
  const { copied, copy } = useCopyToClipboard();

  return (
    <section id="kontak" className="nb-section" aria-labelledby="kontak-heading">
      <div className="nb-container flex flex-col gap-12">
        <SectionTitle
          eyebrow="Kontak"
          titleId="kontak-heading"
          title="Mari"
          highlight="Terhubung"
          description="Terbuka untuk peluang kerja di bidang pengelasan, workshop fabrikasi, maupun operasional gudang."
          color="secondary"
          icon={Send}
        />

        <motion.ul
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid gap-5 md:grid-cols-3"
        >
          {contactChannels.map((channel) => {
            const Icon = channel.icon;
            const isCopied = copied === channel.label;

            return (
              <Card key={channel.label} as="li" variants={popIn} className="flex flex-col gap-4 p-6">
                <span
                  className={cn(
                    "nb-border flex h-14 w-14 items-center justify-center rounded-brutal shadow-brutal",
                    colorMap[channel.color],
                  )}
                >
                  <Icon className="h-7 w-7" aria-hidden="true" />
                </span>

                <div className="min-w-0">
                  <h3 className="font-heading text-sm font-extrabold uppercase tracking-[0.2em] text-muted">
                    {channel.label}
                  </h3>
                  <p className="mt-1.5 break-words font-heading text-lg font-black leading-snug">
                    {channel.value}
                  </p>
                </div>

                <div className="mt-auto flex flex-wrap gap-2.5">
                  <motion.a
                    href={channel.href}
                    target={channel.external ? "_blank" : undefined}
                    rel={channel.external ? "noopener noreferrer" : undefined}
                    whileHover={{ x: -2, y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    className={cn(
                      "nb-border inline-flex flex-1 items-center justify-center gap-2 rounded-brutal px-3.5 py-2.5 font-heading text-xs font-extrabold uppercase tracking-wide shadow-brutal transition-shadow hover:shadow-brutal-md",
                      colorMap[channel.color],
                    )}
                  >
                    {channel.action}
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </motion.a>

                  {channel.copyValue ? (
                    <motion.button
                      type="button"
                      onClick={() => copy(channel.copyValue as string, channel.label)}
                      whileHover={{ x: -2, y: -2 }}
                      whileTap={{ scale: 0.96 }}
                      aria-label={`Salin ${channel.label}`}
                      className="nb-border inline-flex items-center justify-center gap-2 rounded-brutal bg-surface px-3.5 py-2.5 font-heading text-xs font-extrabold uppercase tracking-wide text-body shadow-brutal transition-shadow hover:shadow-brutal-md"
                    >
                      {isCopied ? (
                        <>
                          <Check className="h-4 w-4 text-green" aria-hidden="true" />
                          Tersalin
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" aria-hidden="true" />
                          Salin
                        </>
                      )}
                    </motion.button>
                  ) : null}
                </div>
              </Card>
            );
          })}
        </motion.ul>

        {/* CTA besar */}
        <Reveal variant="zoom">
          <Card
            className="relative overflow-hidden bg-primary p-7 text-ink sm:p-10"
            hover={false}
          >
            <div className="absolute inset-0 bg-dots opacity-35" aria-hidden="true" />
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="nb-border-thick absolute -right-16 -top-16 hidden h-52 w-52 rounded-full bg-secondary/70 sm:block"
              aria-hidden="true"
            />

            <div className="relative flex flex-col gap-6">
              <div className="max-w-2xl">
                <h3 className="font-heading text-3xl font-black uppercase leading-none sm:text-5xl">
                  Siap Bergabung dengan Tim Anda
                </h3>
                <p className="mt-4 text-base font-semibold leading-relaxed sm:text-lg">
                  Saya siap belajar cepat, mengikuti standar keselamatan kerja, dan memberikan hasil
                  kerja yang rapi. Silakan hubungi melalui email atau telepon untuk berdiskusi lebih
                  lanjut.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 sm:gap-4">
                <Button variant="outline" size="lg" href={mailtoLink} icon={Mail}>
                  Kirim Email
                </Button>

                <Button variant="green" size="lg" href={telLink} icon={Phone}>
                  Telepon
                </Button>

                <Button
                  variant="blue"
                  size="lg"
                  href={siteConfig.cvPath}
                  download
                  icon={ArrowUpRight}
                >
                  Lihat CV
                </Button>
              </div>
            </div>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
