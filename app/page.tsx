import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import ProofPoints from "@/components/ProofPoints";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <Experience />
      <ProofPoints />
      <Projects />
    </main>
  );
}
