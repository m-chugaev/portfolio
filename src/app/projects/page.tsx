import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { ProjectsIndex } from "@/components/ProjectsIndex";
import { PROJECTS_INDEX_PATH } from "@/data/projects";
import { buildPageMetadata, getProjectsIndexGraph, seo } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: seo.projectsIndexTitle,
  description: seo.projectsIndexDescription,
  path: PROJECTS_INDEX_PATH,
  keywords: [...seo.keywords, "кейсы", "проекты"],
});

export default function ProjectsPage() {
  return (
    <div>
      <JsonLd data={getProjectsIndexGraph()} />
      <Header />
      <main className="pt-20 pb-12 sm:pt-24 sm:pb-16 md:pt-28 md:pb-20">
        <div className="mx-auto w-full max-w-6xl px-4">
          <ProjectsIndex />
        </div>
      </main>
      <Contact />
      <Footer />
    </div>
  );
}
