import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import ProofPoints from "@/components/ProofPoints";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import CertificationsEducation from "@/components/CertificationsEducation";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <Experience />
      <ProofPoints />
      <Projects />
      <Skills />
      <CertificationsEducation />
      <Contact />
    </main>
  );
}
