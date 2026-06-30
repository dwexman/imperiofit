import Hero from "./components/Hero";
import ServicesSection from "./components/ServicesSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Hero />
      <ServicesSection />
    </main>
  );
}