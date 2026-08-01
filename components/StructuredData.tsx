import { certifications, education, experiences, skills } from "@/lib/data";
import { siteConfig } from "@/lib/site";

/** Structured data (JSON-LD) untuk Person, WebSite, dan ProfilePage. */
export function StructuredData() {
  const person = {
    "@type": "Person",
    "@id": `${siteConfig.url}/#person`,
    name: siteConfig.name,
    jobTitle: siteConfig.role,
    description: siteConfig.description,
    url: siteConfig.url,
    email: `mailto:${siteConfig.email}`,
    telephone: siteConfig.phoneRaw,
    image: siteConfig.ogImage,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Sangatta Selatan",
      addressRegion: "Kalimantan Timur",
      addressCountry: "ID",
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: education.school,
      address: {
        "@type": "PostalAddress",
        addressLocality: education.location,
        addressCountry: "ID",
      },
    },
    knowsAbout: skills.map((skill) => skill.name),
    worksFor: experiences.map((item) => ({
      "@type": "Organization",
      name: item.company,
      address: {
        "@type": "PostalAddress",
        addressLocality: item.location,
        addressCountry: "ID",
      },
    })),
    hasCredential: certifications.map((cert) => ({
      "@type": "EducationalOccupationalCredential",
      name: cert.title,
      credentialCategory: "certificate",
      recognizedBy: {
        "@type": "Organization",
        name: "Badan Nasional Sertifikasi Profesi (BNSP) / LSP",
      },
    })),
    seeks: {
      "@type": "Demand",
      name: "Peluang kerja bidang pengelasan dan pergudangan",
    },
  };

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      person,
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: `Portofolio ${siteConfig.name}`,
        description: siteConfig.description,
        inLanguage: "id-ID",
        publisher: { "@id": `${siteConfig.url}/#person` },
      },
      {
        "@type": "ProfilePage",
        "@id": `${siteConfig.url}/#profilepage`,
        url: siteConfig.url,
        name: `${siteConfig.name} — ${siteConfig.role}`,
        isPartOf: { "@id": `${siteConfig.url}/#website` },
        about: { "@id": `${siteConfig.url}/#person` },
        inLanguage: "id-ID",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
