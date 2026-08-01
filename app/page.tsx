import dynamic from "next/dynamic";

import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { PageTransition } from "@/components/PageTransition";
import { StructuredData } from "@/components/StructuredData";

// Section di bawah lipatan dimuat terpisah agar bundle awal tetap ringan.
const About = dynamic(() => import("@/components/About").then((m) => m.About));
const Skills = dynamic(() => import("@/components/Skills").then((m) => m.Skills));
const Experience = dynamic(() => import("@/components/Experience").then((m) => m.Experience));
const Training = dynamic(() => import("@/components/Training").then((m) => m.Training));
const Certification = dynamic(() =>
  import("@/components/Certification").then((m) => m.Certification),
);
const Timeline = dynamic(() => import("@/components/Timeline").then((m) => m.Timeline));
const Contact = dynamic(() => import("@/components/Contact").then((m) => m.Contact));
const Footer = dynamic(() => import("@/components/Footer").then((m) => m.Footer));

export default function HomePage() {
  return (
    <>
      <StructuredData />
      <Navbar />
      <PageTransition>
        <main id="konten-utama">
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Training />
          <Certification />
          <Timeline />
          <Contact />
        </main>
        <Footer />
      </PageTransition>
    </>
  );
}
