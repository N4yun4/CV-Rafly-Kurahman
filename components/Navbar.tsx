"use client";

import { Download, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { ThemeToggle } from "@/components/ThemeToggle";
import { useActiveSection } from "@/hooks/useActiveSection";
import { navItems } from "@/lib/data";
import { siteConfig } from "@/lib/site";
import { cn, scrollToSection } from "@/lib/utils";

const sectionIds = navItems.map((item) => item.href.replace("#", ""));

/**
 * Navigasi utama.
 *
 * Seluruh animasinya — panel menu, overlay, dan penanda menu aktif — memakai
 * transisi CSS. Menu mobile tetap berada di DOM dan hanya digeser, sehingga
 * membuka/menutupnya tidak menuntut pekerjaan berat di perangkat lambat.
 */
export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(sectionIds);

  useEffect(() => {
    let ticking = false;
    const evaluate = () => {
      ticking = false;
      const next = window.scrollY > 24;
      setScrolled((prev) => (prev === next ? prev : next));
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(evaluate);
    };

    evaluate();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleNav = (href: string) => {
    setOpen(false);
    window.setTimeout(() => scrollToSection(href), open ? 220 : 0);
  };

  return (
    <>
      <header className={cn("fixed inset-x-0 top-1.5 z-[80] px-3 sm:px-5", scrolled ? "py-2" : "py-3")}>
        <nav
          aria-label="Navigasi utama"
          className={cn(
            "nb-border-thick mx-auto flex w-full max-w-6xl items-center justify-between gap-3 rounded-brutal bg-surface px-3 py-2.5 transition-shadow duration-300 sm:px-5",
            scrolled ? "shadow-brutal-md" : "shadow-brutal",
          )}
        >
          <button
            type="button"
            onClick={() => handleNav("#beranda")}
            className="group flex shrink-0 items-center gap-2.5"
            aria-label="Kembali ke beranda"
          >
            <span className="nb-border flex h-10 w-10 items-center justify-center rounded-brutal bg-primary font-heading text-lg font-black text-ink shadow-brutal transition-transform duration-200 group-hover:-rotate-6">
              RK
            </span>
            <span className="hidden font-heading text-base font-black uppercase tracking-tight sm:block">
              {siteConfig.name}
            </span>
          </button>

          <ul className="hidden items-center gap-0.5 lg:flex">
            {navItems.map((item) => {
              const id = item.href.replace("#", "");
              const isActive = active === id;
              return (
                <li key={item.href}>
                  <button
                    type="button"
                    onClick={() => handleNav(item.href)}
                    aria-current={isActive ? "true" : undefined}
                    /* Border transparan saat tidak aktif menjaga lebar tombol
                       tetap sama, sehingga menu tidak bergeser saat berpindah. */
                    className={cn(
                      "nb-border rounded-brutal px-3 py-2 font-heading text-sm font-bold uppercase tracking-wide transition-colors duration-200",
                      isActive
                        ? "bg-primary text-ink"
                        : "border-transparent text-body hover:opacity-70",
                    )}
                  >
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="flex shrink-0 items-center gap-2">
            <a
              href={siteConfig.cvPath}
              download
              className="nb-border-thick nb-hover-lift hidden items-center gap-2 rounded-brutal bg-secondary px-4 py-2.5 font-heading text-sm font-bold uppercase text-ink shadow-brutal hover:shadow-brutal-md md:inline-flex"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              CV
            </a>

            <ThemeToggle />

            <button
              type="button"
              onClick={() => setOpen((prev) => !prev)}
              aria-label={open ? "Tutup menu" : "Buka menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="nb-border-thick flex h-11 w-11 items-center justify-center rounded-brutal bg-blue text-ink shadow-brutal transition-shadow hover:shadow-brutal-md lg:hidden"
            >
              {open ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Overlay + panel menu mobile */}
      <div
        className={cn(
          "fixed inset-0 z-[75] lg:hidden",
          open ? "visible" : "invisible delay-300",
        )}
      >
        <button
          type="button"
          aria-label="Tutup menu"
          tabIndex={open ? 0 : -1}
          onClick={() => setOpen(false)}
          className={cn(
            "absolute inset-0 h-full w-full bg-ink/50 transition-opacity duration-300",
            open ? "opacity-100" : "opacity-0",
          )}
        />

        <nav
          id="mobile-menu"
          aria-label="Navigasi mobile"
          aria-hidden={!open}
          className={cn(
            "nb-border-thick absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col gap-6 overflow-y-auto bg-canvas px-6 pb-10 pt-24 transition-transform duration-300 ease-out",
            open ? "translate-x-0" : "translate-x-full",
          )}
        >
          <p className="font-heading text-xs font-extrabold uppercase tracking-[0.3em] text-muted">
            Menu
          </p>

          <ul className="flex flex-col gap-3">
            {navItems.map((item, index) => {
              const id = item.href.replace("#", "");
              const isActive = active === id;
              return (
                <li key={item.href}>
                  <button
                    type="button"
                    tabIndex={open ? 0 : -1}
                    onClick={() => handleNav(item.href)}
                    className={cn(
                      "nb-border-thick nb-hover-lift flex w-full items-center justify-between rounded-brutal px-4 py-3.5 text-left font-heading text-lg font-bold uppercase shadow-brutal hover:shadow-brutal-md",
                      isActive ? "bg-primary text-ink" : "bg-surface text-body",
                    )}
                  >
                    {item.label}
                    <span className="font-heading text-sm text-muted">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <a
            href={siteConfig.cvPath}
            download
            tabIndex={open ? 0 : -1}
            onClick={() => setOpen(false)}
            className="nb-border-thick mt-2 inline-flex items-center justify-center gap-2 rounded-brutal bg-secondary px-5 py-4 font-heading text-base font-bold uppercase text-ink shadow-brutal-md"
          >
            <Download className="h-5 w-5" aria-hidden="true" />
            Download CV
          </a>
        </nav>
      </div>
    </>
  );
}
