import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProjectGrid } from "@/components/ProjectGrid";

export default function HomePage() {
  return (
    <div id="top">
      <Header />
      <main>
        <Hero />
        <ProjectGrid />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
