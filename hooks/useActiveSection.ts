"use client";

import { useEffect, useState } from "react";

/** Mengembalikan id section yang sedang terlihat di viewport. */
export function useActiveSection(ids: string[], offset = 140): string {
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    const handler = () => {
      let current = ids[0] ?? "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top - offset <= 0) current = id;
      }
      const nearBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 120;
      setActive(nearBottom ? (ids[ids.length - 1] ?? current) : current);
    };

    handler();
    window.addEventListener("scroll", handler, { passive: true });
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("scroll", handler);
      window.removeEventListener("resize", handler);
    };
  }, [ids, offset]);

  return active;
}
