# Portofolio Rafly Kurahman

Website portofolio pribadi bergaya **Neubrutalism** untuk Rafly Kurahman — *Future Professional Welder*, *Warehouse PIC*, dan *Welding Enthusiast*.

## Teknologi

| Bagian | Teknologi |
| --- | --- |
| Framework | Next.js 15 (App Router) |
| Bahasa | TypeScript |
| Styling | Tailwind CSS 3.4 |
| Animasi | Framer Motion 12 |
| Ikon | Lucide React |
| Font | Space Grotesk (heading) + Inter (body) |
| Deployment | Vercel |

## Menjalankan Project

```bash
npm install       # pasang dependency
npm run dev       # mode pengembangan  -> http://localhost:3000
npm run build     # build produksi (menghasilkan folder out/)
npm run preview   # pratinjau hasil build -> http://localhost:3000
npm run lint      # ESLint
npm run typecheck # pemeriksaan TypeScript
```

## Struktur Folder

```
app/                  Route App Router, metadata, sitemap, robots, manifest, OG image
components/           Komponen section & UI (Navbar, Hero, About, Skills, ...)
components/ui/        Komponen reusable (Button, Card, Badge, SectionTitle, Reveal, Marquee)
components/illustrations/  Ilustrasi SVG posisi pengelasan
hooks/                Custom hooks (tema, media query, clipboard, active section)
lib/                  Data CV, konfigurasi situs, util, preset animasi
styles/               Global CSS + token Neubrutalism
types/                Tipe TypeScript bersama
public/               Aset statis (foto placeholder, CV PDF)
```

## Data Pribadi

Seluruh data kontak dan identitas terpusat di [`lib/site.ts`](lib/site.ts) — sudah terisi sesuai CV:

| Field | Nilai saat ini |
| --- | --- |
| `email` | `himlixzr@gmail.com` |
| `phoneDisplay` / `phoneRaw` / `phoneCopy` | `0853-8613-1475` |
| `address` / `mapsQuery` | Sangatta Selatan, Kutai Timur, Kalimantan Timur |
| `photo` | `/profile.jpg` |
| `cvPath` | `/CV-Rafly-Kurahman.pdf` |
| `url` | **Perlu diganti** ke domain produksi setelah deploy (dipakai canonical, sitemap, Open Graph) |

> Alamat sengaja ditampilkan sampai tingkat kecamatan saja (tanpa nama jalan) demi privasi,
> meski CV memuat alamat lengkap. Website tidak memuat tautan WhatsApp maupun media sosial.

Isi CV (profil, pendidikan, pengalaman, pelatihan, sertifikasi, keahlian) ada di [`lib/data.ts`](lib/data.ts).

### Mengganti Foto Profil

Timpa `public/profile.jpg` dengan foto baru (rasio potret). Bila dimensinya berbeda, sesuaikan
`photoWidth` dan `photoHeight` di `lib/site.ts` agar tidak terjadi pergeseran layout.

### Mengganti File CV

Ganti `public/CV-Rafly-Kurahman.pdf` dengan file PDF terbaru menggunakan nama yang sama, atau sesuaikan `cvPath` di `lib/site.ts`.

## Fitur

- Hero dengan animasi masuk, parallax scroll, shape mengambang, rotasi peran, dan scroll indicator
- Section: Tentang, Keahlian (dengan filter kategori + progress animation), Pengalaman, Pelatihan (ilustrasi 6 posisi las), Sertifikasi, Timeline perjalanan, Kontak, Footer
- Dark mode dengan penyimpanan preferensi dan tanpa flash saat memuat
- Loading screen, scroll progress bar, back to top, smooth scroll, custom cursor, page transition
- Responsif penuh (mobile, tablet, laptop, desktop)
- Menghormati `prefers-reduced-motion`
- SEO: metadata lengkap, Open Graph & Twitter Card, `sitemap.xml`, `robots.txt`, canonical URL, JSON-LD (Person, WebSite, ProfilePage), web manifest, OG image & favicon yang dibuat otomatis
- Performa: dynamic import per section, CSS di-inline (tanpa render-blocking), optimasi gambar, `optimizePackageImports`, animasi hero berbasis CSS agar konten tampil sebelum hydration, lapisan latar dekoratif dimuat khusus di klien

## Hasil Lighthouse (build produksi lokal)

| Kategori | Desktop | Mobile |
| --- | --- | --- |
| Performance | 99 | 93 |
| Accessibility | 100 | 100 |
| Best Practices | 100 | 100 |
| SEO | 100 | 100 |

Desktop: LCP 0,6 s · TBT 0 ms · CLS 0,008. Skor mobile diukur dengan throttling 4G + CPU 4×;
angkanya dapat berfluktuasi tergantung beban mesin saat pengujian. Jika ingin menaikkan skor
Performance mobile lebih tinggi lagi, komponen `LoadingScreen` di [`app/providers.tsx`](app/providers.tsx)
dapat dihapus — bagian itu yang paling menahan metrik Speed Index.

## Deploy — GitHub Pages

Website di-build sebagai **situs statis** (`output: "export"`) dan diterbitkan otomatis oleh
GitHub Actions setiap ada push ke branch `main`.

**URL produksi:** https://n4yun4.github.io/CV-Rafly-Kurahman/

### Sekali saja: aktifkan GitHub Pages

Buka **Settings → Pages** pada repository, lalu pilih **Source: GitHub Actions**.
Workflow juga mencoba mengaktifkannya otomatis, tetapi bila deploy gagal dengan pesan
"Pages is not enabled", lakukan langkah ini secara manual lalu jalankan ulang workflow.

### Alur workflow

Berkas [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) menjalankan:
`npm ci` → ESLint → TypeScript → `npm run build` → unggah folder `out/` → deploy ke Pages.
Bila lint atau typecheck gagal, deploy dibatalkan sehingga versi rusak tidak pernah tayang.

### Sub-path & basePath

Karena situs berada di `https://<user>.github.io/<repo>/`, semua tautan aset perlu prefix nama
repository. Prefix ini diambil dari environment variable yang diisi otomatis oleh workflow:

| Variable | Nilai di CI | Nilai lokal |
| --- | --- | --- |
| `NEXT_PUBLIC_BASE_PATH` | `/CV-Rafly-Kurahman` | kosong |
| `NEXT_PUBLIC_SITE_URL` | `https://n4yun4.github.io/CV-Rafly-Kurahman` | nilai bawaan di `lib/site.ts` |

Jadi `npm run dev` lokal tetap berjalan di `/` tanpa konfigurasi tambahan.

### Pindah ke domain sendiri

Bila nanti memakai domain kustom (atau pindah ke Vercel), kosongkan `NEXT_PUBLIC_BASE_PATH`
dan sesuaikan `NEXT_PUBLIC_SITE_URL` — tidak ada URL yang di-hardcode di dalam komponen.

---

© Rafly Kurahman.
