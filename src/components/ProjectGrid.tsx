import Link from "next/link";
import { PROJECTS_INDEX_PATH, projects } from "@/data/projects";
import { Button } from "@/components/ui/button";
import { MoreWork } from "./MoreWork";
import { ProjectCard } from "./ProjectCard";
import { Reveal } from "./Reveal";

export function ProjectGrid() {
  return (
    <section id="projects" className="py-12 sm:py-16 md:py-20" aria-labelledby="projects-title">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 sm:gap-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <h2
            id="projects-title"
            className="text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl"
          >
            Над чем я работал
          </h2>
          <Button variant="outline" className="w-full shrink-0 sm:w-auto" asChild>
            <Link href={PROJECTS_INDEX_PATH}>Все кейсы</Link>
          </Button>
        </div>
        <div className="flex flex-col gap-5 sm:gap-6 md:gap-8">
          {projects.map((project, index) => (
            <Reveal key={project.id} delayMs={index * 60}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
        <MoreWork />
      </div>
    </section>
  );
}
