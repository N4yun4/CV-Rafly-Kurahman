"use client";

import { motion } from "framer-motion";
import { ArrowUp, Mail, MapPin, Phone } from "lucide-react";

import { navItems } from "@/lib/data";
import { mailtoLink, siteConfig, telLink } from "@/lib/site";
import { cn, scrollToSection } from "@/lib/utils";

const quickContacts = [
  { label: "Email", value: siteConfig.email, href: mailtoLink, icon: Mail, color: "bg-primary" },
  { label: "Telepon", value: siteConfig.phoneDisplay, href: telLink, icon: Phone, color: "bg-green" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-8 border-t-4 border-[var(--nb-line)] bg-surface">
      <div className="absolute inset-0 bg-dots opacity-40" aria-hidden="true" />

      <div className="nb-container relative px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Identitas */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="nb-border-thick flex h-12 w-12 items-center justify-center rounded-brutal bg-primary font-heading text-lg font-black text-ink shadow-brutal">
                RK
              </span>
              <div>
                <p className="font-heading text-xl font-black uppercase leading-none">
                  {siteConfig.name}
                </p>
                <p className="mt-1 font-heading text-xs font-bold uppercase tracking-[0.2em] text-muted">
                  {siteConfig.role}
                </p>
              </div>
            </div>

            <p className="max-w-sm text-sm leading-relaxed text-muted">
              Portofolio pribadi yang menampilkan latar belakang pendidikan, pelatihan pengelasan
              FCAW, pengalaman kerja, dan proses sertifikasi kompetensi.
            </p>

            <ul className="flex flex-wrap gap-2.5">
              {quickContacts.map((contact) => {
                const Icon = contact.icon;
                return (
                  <li key={contact.label}>
                    <motion.a
                      href={contact.href}
                      whileHover={{ x: -2, y: -2 }}
                      whileTap={{ scale: 0.94 }}
                      className={cn(
                        "nb-border inline-flex items-center gap-2 rounded-brutal px-3.5 py-2.5 font-heading text-xs font-extrabold uppercase tracking-wide text-ink shadow-brutal transition-shadow hover:shadow-brutal-md",
                        contact.color,
                      )}
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                      {contact.label}
                    </motion.a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Navigasi */}
          <nav aria-label="Navigasi footer">
            <h2 className="font-heading text-sm font-extrabold uppercase tracking-[0.2em] text-muted">
              Navigasi
            </h2>
            <ul className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(item.href)}
                    className="nb-link-underline font-heading text-sm font-bold uppercase text-body transition-opacity hover:opacity-70"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Kontak singkat */}
          <div>
            <h2 className="font-heading text-sm font-extrabold uppercase tracking-[0.2em] text-muted">
              Kontak
            </h2>
            <ul className="mt-4 flex flex-col gap-3 text-sm">
              <li>
                <a
                  href={mailtoLink}
                  className="nb-link-underline break-all font-semibold text-body"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a href={telLink} className="nb-link-underline font-semibold text-body">
                  {siteConfig.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-1.5 text-muted">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                {siteConfig.address}
              </li>
            </ul>

            <motion.button
              type="button"
              onClick={() => scrollToSection("#beranda", 0)}
              whileHover={{ x: -2, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="nb-border mt-5 inline-flex items-center gap-2 rounded-brutal bg-primary px-4 py-2.5 font-heading text-xs font-extrabold uppercase tracking-widest text-ink shadow-brutal transition-shadow hover:shadow-brutal-md"
            >
              <ArrowUp className="h-4 w-4" aria-hidden="true" />
              Back To Top
            </motion.button>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t-4 border-[var(--nb-line)] pt-6 sm:flex-row">
          <p className="text-center text-xs font-semibold uppercase tracking-wide text-muted sm:text-left">
            © {year} {siteConfig.name}. Seluruh hak cipta dilindungi.
          </p>
          <p className="text-center text-xs font-semibold uppercase tracking-wide text-muted sm:text-right">
            Dibangun dengan Next.js, Tailwind CSS & Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
