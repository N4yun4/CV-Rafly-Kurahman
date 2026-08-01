import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site";

// Dihasilkan sebagai file statis saat build (mode `output: "export"`).
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: siteConfig.url,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...[
      "tentang",
      "keahlian",
      "pengalaman",
      "pelatihan",
      "sertifikasi",
      "perjalanan",
      "kontak",
    ].map((section) => ({
      url: `${siteConfig.url}/#${section}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
