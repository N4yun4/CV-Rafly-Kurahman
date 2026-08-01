import type { MetadataRoute } from "next";

import { basePath, siteConfig } from "@/lib/site";

// Dihasilkan sebagai file statis saat build (mode `output: "export"`).
export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `Portofolio ${siteConfig.name}`,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: `${basePath}/`,
    scope: `${basePath}/`,
    display: "standalone",
    background_color: "#FFFDF5",
    theme_color: "#FFD93D",
    lang: "id",
    categories: ["portfolio", "business"],
    icons: [
      { src: `${basePath}/icon.png`, sizes: "64x64", type: "image/png" },
      { src: `${basePath}/apple-icon.png`, sizes: "180x180", type: "image/png" },
    ],
  };
}
