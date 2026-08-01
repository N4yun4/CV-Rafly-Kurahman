import type { NextConfig } from "next";

/**
 * Website di-deploy sebagai situs statis ke GitHub Pages.
 * Karena URL-nya berada di sub-path (https://<user>.github.io/<repo>), basePath
 * diambil dari environment variable yang diisi oleh workflow GitHub Actions.
 * Saat pengembangan lokal nilainya kosong sehingga situs tetap berjalan di "/".
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // GitHub Pages hanya melayani file statis, jadi image optimizer Next dimatikan.
    unoptimized: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
    inlineCss: true,
  },
};

export default nextConfig;
