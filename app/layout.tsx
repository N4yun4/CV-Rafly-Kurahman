import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";

import { Providers } from "@/app/providers";
import { basePath, siteConfig } from "@/lib/site";
import "@/styles/globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["500", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.role}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: `Portofolio ${siteConfig.name}`,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  keywords: [
    "Rafly Kurahman",
    "portofolio welder",
    "welder FCAW",
    "juru las",
    "welding Sangatta",
    "SMK Negeri 1 Sangatta Utara",
    "PIC gudang",
    "warehouse staff",
    "sertifikasi BNSP welder",
    "K3 pengelasan",
    "lowongan welder Kutai Timur",
    "portofolio profesional",
  ],
  category: "portfolio",
  alternates: {
    // URL absolut agar tetap benar walau situs berada di sub-path (GitHub Pages).
    canonical: siteConfig.url,
  },
  icons: {
    icon: [
      { url: `${basePath}/favicon.ico`, sizes: "any" },
      { url: `${basePath}/icon.png`, type: "image/png", sizes: "64x64" },
    ],
    apple: [{ url: `${basePath}/apple-icon.png`, sizes: "180x180" }],
  },
  openGraph: {
    type: "profile",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: `Portofolio ${siteConfig.name}`,
    title: `${siteConfig.name} — ${siteConfig.role}`,
    description: siteConfig.description,
    firstName: "Rafly",
    lastName: "Kurahman",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — ${siteConfig.role}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.role}`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFDF5" },
    { media: "(prefers-color-scheme: dark)", color: "#131311" },
  ],
  colorScheme: "light dark",
};

/** Script anti-flash: menerapkan tema sebelum React hydrate. */
const themeScript = `
(function(){try{var k='rafly-portfolio-theme';var s=localStorage.getItem(k);var d=window.matchMedia('(prefers-color-scheme: dark)').matches;var t=s||(d?'dark':'light');if(t==='dark'){document.documentElement.classList.add('dark');}document.documentElement.style.colorScheme=t;}catch(e){}})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen antialiased">
        <a
          href="#beranda"
          className="nb-border-thick sr-only rounded-brutal bg-primary px-4 py-2 font-heading font-bold uppercase text-ink focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[110]"
        >
          Lompat ke konten utama
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
