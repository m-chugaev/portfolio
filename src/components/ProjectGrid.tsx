import { projects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { Reveal } from "./Reveal";

export function ProjectGrid() {
  return (
    <section id="projects" className="py-16 md:py-20" aria-labelledby="projects-title">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4">
        <div className="flex max-w-xl flex-col gap-2">
          <h2
            id="projects-title"
            className="text-3xl font-semibold tracking-tight md:text-4xl"
          >
            Проекты
          </h2>
          <p className="text-muted-foreground">
            Кейсы, которые можно открыть или отправить карточкой в Telegram.
          </p>
        </div>
        <div className="flex flex-col gap-6 md:gap-8">
          {projects.map((project, index) => (
            <Reveal key={project.id} delayMs={index * 60}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
