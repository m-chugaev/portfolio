import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { ProjectCase } from "@/components/ProjectCase";
import { getProjectById, projectPath, projects } from "@/data/projects";
import { buildPageMetadata, getProjectPageGraph } from "@/lib/seo";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.id }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectById(slug);

  if (!project) {
    return {};
  }

  return buildPageMetadata({
    title: project.seoTitle,
    description: project.seoDescription,
    path: projectPath(project.id),
    keywords: [project.title, project.role, ...project.stack],
    ogType: "article",
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectById(slug);

  if (!project) {
    notFound();
  }

  return (
    <div>
      <JsonLd data={getProjectPageGraph(project)} />
      <Header />
      <main className="pt-20 pb-12 sm:pt-24 sm:pb-16 md:pt-28 md:pb-20">
        <div className="mx-auto w-full max-w-6xl px-4">
          <ProjectCase project={project} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
