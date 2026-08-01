import {
  Award,
  BadgeCheck,
  Clock,
  FileText,
  Flame,
  GraduationCap,
  HardHat,
  HeartHandshake,
  Lightbulb,
  MapPin,
  Mail,
  MessagesSquare,
  Phone,
  Presentation,
  Rocket,
  Ruler,
  ShieldCheck,
  Table2,
  Target,
  Warehouse,
  Zap,
} from "lucide-react";

import { mailtoLink, mapsLink, siteConfig, telLink } from "@/lib/site";
import type {
  CertificationItem,
  ContactChannel,
  ExperienceItem,
  HighlightItem,
  NavItem,
  Skill,
  StatItem,
  TimelineStep,
  TrainingModule,
} from "@/types";

export const navItems: NavItem[] = [
  { label: "Beranda", href: "#beranda" },
  { label: "Tentang", href: "#tentang" },
  { label: "Keahlian", href: "#keahlian" },
  { label: "Pengalaman", href: "#pengalaman" },
  { label: "Pelatihan", href: "#pelatihan" },
  { label: "Sertifikasi", href: "#sertifikasi" },
  { label: "Perjalanan", href: "#perjalanan" },
  { label: "Kontak", href: "#kontak" },
];

export const heroStats: StatItem[] = [
  { value: "6", label: "Posisi Las Dikuasai", color: "primary" },
  { value: "8", label: "Keahlian Inti", color: "secondary" },
  { value: "1", label: "Pengalaman Kerja", color: "blue" },
  { value: "100%", label: "Siap Kerja", color: "green" },
];

export const marqueeWords: string[] = [
  "FCAW WELDING",
  "K3 / HSE",
  "WAREHOUSE PIC",
  "MICROSOFT EXCEL",
  "DISIPLIN",
  "CEPAT BELAJAR",
  "KERJA SAMA TIM",
  "SIAP INDUSTRI",
];

export const aboutParagraphs: string[] = [
  "Saya Rafly Kurahman, lulusan SMK Negeri 1 Sangatta Utara jurusan Manajemen Perkantoran yang memiliki minat besar di bidang pengelasan (Welding) — pekerjaan yang menuntut ketelitian, kesabaran, dan standar keselamatan tinggi.",
  "Saya memiliki pengalaman pelatihan Welder FCAW yang mencakup praktik posisi 1F, 2F, 3F, 1G, 2G, dan 3G, pemahaman dasar Keselamatan dan Kesehatan Kerja (K3), serta persiapan Uji Kompetensi BNSP/LSP.",
  "Latar belakang administrasi perkantoran memberi saya nilai tambah: rapi dalam pencatatan data, terbiasa dengan Microsoft Office, dan terstruktur dalam bekerja. Kombinasi keterampilan teknis dan administratif ini saya terapkan langsung saat menjadi PIC Gudang di IAM Fashion Store Sangatta.",
  "Saya disiplin, cepat belajar, bertanggung jawab, dan siap bekerja dalam tim maupun individu.",
];

export const aboutHighlights: HighlightItem[] = [
  {
    title: "Fokus pada Welding",
    description:
      "Minat besar dan komitmen jangka panjang untuk menjadi welder profesional bersertifikat.",
    color: "primary",
    icon: Flame,
  },
  {
    title: "Sadar K3",
    description:
      "Memahami dasar Keselamatan dan Kesehatan Kerja serta penggunaan APD yang benar.",
    color: "secondary",
    icon: ShieldCheck,
  },
  {
    title: "Cepat Belajar",
    description:
      "Terbiasa menyerap instruksi baru dengan cepat dan langsung mempraktikkannya di lapangan.",
    color: "blue",
    icon: Lightbulb,
  },
  {
    title: "Disiplin & Bertanggung Jawab",
    description:
      "Tepat waktu, konsisten menyelesaikan pekerjaan, dan menjaga kualitas hasil kerja.",
    color: "green",
    icon: Target,
  },
  {
    title: "Kerja Individu & Tim",
    description:
      "Mampu bekerja mandiri tanpa pengawasan, sekaligus kooperatif dalam tim produksi.",
    color: "purple",
    icon: HeartHandshake,
  },
  {
    title: "Rapi Mengelola Data",
    description:
      "Berbekal jurusan Manajemen Perkantoran: pencatatan stok dan laporan yang tertib.",
    color: "surface",
    icon: Table2,
  },
];

export const education = {
  school: "SMK Negeri 1 Sangatta Utara",
  major: "Manajemen Perkantoran",
  location: "Sangatta Utara, Kutai Timur",
  status: "Lulus",
};

export const skills: Skill[] = [
  {
    name: "FCAW Welding",
    level: 85,
    category: "teknis",
    color: "primary",
    icon: Flame,
    description: "Flux-Cored Arc Welding posisi 1F, 2F, 3F, 1G, 2G, dan 3G.",
  },
  {
    name: "Microsoft Word",
    level: 88,
    category: "digital",
    color: "blue",
    icon: FileText,
    description: "Penyusunan dokumen, surat, dan laporan administrasi yang rapi.",
  },
  {
    name: "Microsoft Excel",
    level: 85,
    category: "digital",
    color: "green",
    icon: Table2,
    description: "Input data stok, rekap barang masuk/keluar, dan tabel laporan.",
  },
  {
    name: "Microsoft PowerPoint",
    level: 80,
    category: "digital",
    color: "purple",
    icon: Presentation,
    description: "Membuat materi presentasi yang jelas dan mudah dipahami.",
  },
  {
    name: "Disiplin",
    level: 95,
    category: "personal",
    color: "primary",
    icon: Clock,
    description: "Konsisten pada jadwal, target, dan standar prosedur kerja.",
  },
  {
    name: "Cepat Belajar",
    level: 92,
    category: "personal",
    color: "blue",
    icon: Zap,
    description: "Adaptif terhadap alat, sistem, dan lingkungan kerja baru.",
  },
  {
    name: "Komunikatif",
    level: 90,
    category: "personal",
    color: "secondary",
    icon: MessagesSquare,
    description: "Menyampaikan informasi dengan jelas kepada atasan maupun rekan kerja.",
  },
  {
    name: "Kerja Sama Tim",
    level: 90,
    category: "personal",
    color: "green",
    icon: HeartHandshake,
    description: "Kolaboratif, suportif, dan menjaga ritme kerja tim tetap stabil.",
  },
];

export const skillCategories = [
  { id: "teknis", label: "Teknis & Industri" },
  { id: "digital", label: "Digital & Administrasi" },
  { id: "personal", label: "Soft Skill" },
] as const;

export const experiences: ExperienceItem[] = [
  {
    role: "PIC Gudang",
    company: "IAM Fashion Store Sangatta",
    location: "Sangatta, Kutai Timur",
    period: "Pengalaman Kerja",
    type: "Full Time",
    color: "primary",
    responsibilities: [
      "Mengelola stok gudang agar jumlah fisik selalu sesuai dengan catatan sistem.",
      "Menata barang berdasarkan kategori sehingga proses pencarian lebih cepat dan area kerja rapi.",
      "Melakukan scanning barcode untuk barang masuk dan barang keluar secara akurat.",
      "Menginput dan merekap data persediaan menggunakan Microsoft Excel.",
    ],
    tools: ["Barcode Scanner", "Microsoft Excel", "Stock Opname", "Inventory Layout"],
  },
];

export const trainingModules: TrainingModule[] = [
  {
    code: "1F",
    label: "Fillet — Posisi Datar",
    detail: "Pengelasan sambungan T pada posisi flat, fondasi kestabilan ayunan elektroda.",
    color: "primary",
  },
  {
    code: "2F",
    label: "Fillet — Posisi Horizontal",
    detail: "Kontrol travel angle dan kecepatan agar hasil las tidak meleleh turun.",
    color: "secondary",
  },
  {
    code: "3F",
    label: "Fillet — Posisi Vertikal",
    detail: "Teknik vertikal naik dengan pengaturan ampere dan weaving yang presisi.",
    color: "blue",
  },
  {
    code: "1G",
    label: "Groove — Posisi Datar",
    detail: "Pengelasan kampuh pelat posisi flat, fokus pada penetrasi root yang penuh.",
    color: "green",
  },
  {
    code: "2G",
    label: "Groove — Posisi Horizontal",
    detail: "Menjaga bentuk jalur las tetap rata pada bidang horizontal.",
    color: "purple",
  },
  {
    code: "3G",
    label: "Groove — Posisi Vertikal",
    detail: "Posisi paling menantang: konsistensi root, filler, dan capping.",
    color: "primary",
  },
];

export const trainingExtras: HighlightItem[] = [
  {
    title: "Dasar K3",
    description:
      "Penggunaan APD lengkap, pengenalan potensi bahaya, penanganan gas dan percikan api, serta prosedur kerja aman di area pengelasan.",
    color: "secondary",
    icon: HardHat,
  },
  {
    title: "Persiapan Uji Kompetensi BNSP/LSP",
    description:
      "Latihan praktik sesuai standar penilaian asesor, pembacaan WPS sederhana, serta pemahaman kriteria hasil las yang layak uji.",
    color: "blue",
    icon: Award,
  },
  {
    title: "Kualitas Hasil Las",
    description:
      "Mengenali cacat las umum seperti undercut, porosity, dan spatter berlebih, lalu memperbaiki parameter pengelasan.",
    color: "green",
    icon: Ruler,
  },
];

export const trainingProgram = {
  title: "Pelatihan Welder FCAW",
  subtitle: "Flux-Cored Arc Welding",
  summary:
    "Program pelatihan pengelasan dengan praktik langsung pada posisi 1F, 2F, 3F, 1G, 2G, dan 3G, disertai pembekalan dasar Keselamatan dan Kesehatan Kerja serta persiapan menghadapi Uji Kompetensi BNSP/LSP.",
};

export const certifications: CertificationItem[] = [
  {
    title: "Sertifikat Kompetensi Welder",
    issuer: "BNSP (LSP) — Badan Nasional Sertifikasi Profesi",
    status: "proses",
    statusLabel: "Coming Soon",
    description:
      "Sertifikat Kompetensi Welder BNSP (LSP) yang saat ini sedang dalam proses penerbitan setelah rangkaian pelatihan dan uji kompetensi diselesaikan.",
    color: "primary",
  },
];

export const timelineSteps: TimelineStep[] = [
  {
    step: "01",
    title: "Pendidikan",
    subtitle: "SMK Negeri 1 Sangatta Utara",
    description:
      "Menyelesaikan pendidikan jurusan Manajemen Perkantoran — membentuk kebiasaan kerja yang rapi, tertib administrasi, dan disiplin.",
    color: "blue",
    icon: GraduationCap,
  },
  {
    step: "02",
    title: "Pelatihan Welding",
    subtitle: "Welder FCAW 1F – 3G",
    description:
      "Mengikuti pelatihan FCAW: praktik posisi 1F, 2F, 3F, 1G, 2G, 3G, dasar K3, dan persiapan Uji Kompetensi BNSP/LSP.",
    color: "primary",
    icon: Flame,
  },
  {
    step: "03",
    title: "Pengalaman Kerja",
    subtitle: "PIC Gudang — IAM Fashion Store",
    description:
      "Mengelola stok, menata barang, scanning barcode, dan input data Excel. Melatih ketelitian serta tanggung jawab operasional.",
    color: "green",
    icon: Warehouse,
  },
  {
    step: "04",
    title: "Sertifikasi",
    subtitle: "Sertifikat Kompetensi BNSP (LSP)",
    description:
      "Sertifikat Kompetensi Welder BNSP (LSP) sedang dalam proses penerbitan sebagai pengakuan resmi atas kemampuan teknis.",
    color: "secondary",
    icon: BadgeCheck,
  },
  {
    step: "05",
    title: "Siap Memasuki Dunia Industri",
    subtitle: "Welder & Warehouse Support",
    description:
      "Siap berkontribusi di lingkungan industri, workshop, fabrikasi, maupun operasional gudang dengan standar keselamatan kerja.",
    color: "purple",
    icon: Rocket,
  },
];

export const contactChannels: ContactChannel[] = [
  {
    label: "Email",
    value: siteConfig.email,
    href: mailtoLink,
    copyValue: siteConfig.email,
    color: "primary",
    icon: Mail,
    action: "Kirim Email",
    external: false,
  },
  {
    label: "Nomor HP",
    value: siteConfig.phoneDisplay,
    href: telLink,
    copyValue: siteConfig.phoneCopy,
    color: "green",
    icon: Phone,
    action: "Telepon",
    external: false,
  },
  {
    label: "Alamat",
    value: siteConfig.address,
    href: mapsLink,
    color: "blue",
    icon: MapPin,
    action: "Buka Google Maps",
    external: true,
  },
];
