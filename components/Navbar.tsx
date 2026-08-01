"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { ThemeToggle } from "@/components/ThemeToggle";
import { useActiveSection } from "@/hooks/useActiveSection";
import { navItems } from "@/lib/data";
import { siteConfig } from "@/lib/site";
import { cn, scrollToSection } from "@/lib/utils";

const sectionIds = navItems.map((item) => item.href.replace("#", ""));

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
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
      <motion.header
        initial={{ y: -110 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className={cn(
          "fixed inset-x-0 top-1.5 z-[80] px-3 sm:px-5",
          scrolled ? "py-2" : "py-3",
        )}
      >
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
            title="Kembali ke beranda"
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
                    className={cn(
                      "relative rounded-brutal px-3 py-2 font-heading text-sm font-bold uppercase tracking-wide transition-opacity",
                      isActive ? "text-ink" : "text-body hover:opacity-70",
                    )}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="nav-active-pill"
                        className="nb-border absolute inset-0 rounded-brutal bg-primary"
                        transition={{ type: "spring", stiffness: 340, damping: 28 }}
                        aria-hidden="true"
                      />
                    ) : null}
                    <span className="relative">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="flex shrink-0 items-center gap-2">
            <a
              href={siteConfig.cvPath}
              download
              className="nb-border-thick hidden items-center gap-2 rounded-brutal bg-secondary px-4 py-2.5 font-heading text-sm font-bold uppercase text-ink shadow-brutal transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal-md md:inline-flex"
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
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[75] lg:hidden"
          >
            <button
              type="button"
              aria-label="Tutup menu"
              onClick={() => setOpen(false)}
              className="absolute inset-0 h-full w-full bg-ink/50 backdrop-blur-sm"
            />

            <motion.nav
              aria-label="Navigasi mobile"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              className="nb-border-thick absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col gap-6 overflow-y-auto bg-canvas px-6 pb-10 pt-24"
            >
              <p className="font-heading text-xs font-extrabold uppercase tracking-[0.3em] text-muted">
                Menu
              </p>

              <ul className="flex flex-col gap-3">
                {navItems.map((item, index) => {
                  const id = item.href.replace("#", "");
                  const isActive = active === id;
                  return (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.06 * index + 0.1 }}
                    >
                      <button
                        type="button"
                        onClick={() => handleNav(item.href)}
                        className={cn(
                          "nb-border-thick flex w-full items-center justify-between rounded-brutal px-4 py-3.5 text-left font-heading text-lg font-bold uppercase shadow-brutal transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-brutal-md",
                          isActive ? "bg-primary text-ink" : "bg-surface text-body",
                        )}
                      >
                        {item.label}
                        <span className="font-heading text-sm text-muted">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </button>
                    </motion.li>
                  );
                })}
              </ul>

              <a
                href={siteConfig.cvPath}
                download
                onClick={() => setOpen(false)}
                className="nb-border-thick mt-2 inline-flex items-center justify-center gap-2 rounded-brutal bg-secondary px-5 py-4 font-heading text-base font-bold uppercase text-ink shadow-brutal-md"
              >
                <Download className="h-5 w-5" aria-hidden="true" />
                Download CV
              </a>
            </motion.nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
