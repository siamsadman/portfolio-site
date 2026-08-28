import Hero from "@/components/Hero";
import Experience from "@/components/Experience";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <Experience />
    </main>
  );
}
