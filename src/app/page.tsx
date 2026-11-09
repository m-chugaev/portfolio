import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { JsonLd } from "@/components/JsonLd";
import { ProjectGrid } from "@/components/ProjectGrid";
import { buildPageMetadata, getHomePageGraph, seo } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: seo.title,
  description: seo.description,
  path: "/",
});

export default function HomePage() {
  return (
    <div id="top">
      <JsonLd data={getHomePageGraph()} />
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
