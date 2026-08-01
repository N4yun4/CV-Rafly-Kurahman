/**
 * Konfigurasi pusat website.
 * Ubah nilai di file ini untuk memperbarui identitas, kontak, dan URL produksi.
 */

/**
 * Prefix URL saat situs di-host pada sub-path (GitHub Pages).
 * Diisi otomatis oleh workflow deploy; kosong saat dijalankan lokal.
 * Catatan: `next/image` dan `next/link` sudah menambahkan basePath sendiri,
 * jadi prefix ini hanya dipakai untuk tautan aset biasa seperti file PDF.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://n4yun4.github.io/CV-Rafly-Kurahman";

export const siteConfig = {
  name: "Rafly Kurahman",
  shortName: "Rafly K.",
  role: "Future Professional Welder",
  secondaryRoles: ["Warehouse PIC", "Welding Enthusiast"],
  tagline:
    "Lulusan SMK yang memiliki minat besar di bidang pengelasan (Welding), berpengalaman pelatihan FCAW, memahami dasar K3, dan siap bekerja secara tim maupun individu.",
  description:
    "Portofolio Rafly Kurahman — lulusan SMK Negeri 1 Sangatta Utara, alumni pelatihan Welder FCAW (1F–3G), berpengalaman sebagai PIC Gudang. Disiplin, cepat belajar, bertanggung jawab, dan siap memasuki dunia industri.",
  url: siteUrl,
  locale: "id_ID",
  email: "himlixzr@gmail.com",
  phoneDisplay: "0853-8613-1475",
  phoneRaw: "+6285386131475",
  phoneCopy: "085386131475",
  address: "Sangatta Selatan, Kutai Timur, Kalimantan Timur",
  mapsQuery: "Sangatta Selatan, Kutai Timur, Kalimantan Timur",
  // Aset di folder public tidak otomatis mendapat basePath, jadi ditambahkan manual.
  cvPath: `${basePath}/CV-Rafly-Kurahman.pdf`,
  photo: `${basePath}/profile.jpg`,
  ogImage: `${siteUrl}/og-image.png`,
  photoWidth: 1086,
  photoHeight: 1448,
} as const;

export const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  siteConfig.mapsQuery,
)}`;

export const mailtoLink = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
  "Peluang Kerja / Kolaborasi",
)}`;

export const telLink = `tel:${siteConfig.phoneRaw}`;
