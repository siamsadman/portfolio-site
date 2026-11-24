import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import CertificationsEducation from "@/components/CertificationsEducation";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Skills />
      <CertificationsEducation />
      <Contact />
    </main>
  );
}
