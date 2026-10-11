import { ExternalLinkIcon } from "lucide-react";
import type { Project } from "@/data/projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CopyLinkButton } from "./CopyLinkButton";
import { ProjectSlideshow } from "./ProjectSlideshow";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const href = project.href;

  return (
    <article className="relative aspect-[16/9] min-h-[18rem] overflow-hidden rounded-[1.75rem] border border-border/60 shadow-sm md:min-h-[22rem]">
      <ProjectSlideshow images={project.images} alt={project.imageAlt} />
      <div className="relative z-10 flex h-full items-end p-4 md:p-7 lg:p-8">
        <Card className="w-full max-w-lg gap-4 border-border/40 bg-card/92 py-5 shadow-lg backdrop-blur-xl md:py-6">
          <CardHeader className="gap-3 px-5 md:px-6">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="default">{project.role}</Badge>
              <Badge variant="secondary">{project.year}</Badge>
              <Badge variant="outline">{project.context}</Badge>
            </div>
            <div className="flex flex-col gap-1.5">
              <CardTitle className="font-display text-2xl tracking-tight md:text-3xl">
                {href ? (
                  <a href={href} target="_blank" rel="noopener noreferrer">
                    {project.title}
                  </a>
                ) : (
                  project.title
                )}
              </CardTitle>
              <p className="text-sm leading-snug md:text-base">
                {project.product}
              </p>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 px-5 md:px-6">
            <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground md:text-[0.95rem]">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
          {href ? (
            <CardFooter className="flex flex-wrap justify-between gap-2 px-5 md:px-6">
              <Button asChild>
                <a href={href} target="_blank" rel="noopener noreferrer">
                  Открыть проект
                  <ExternalLinkIcon data-icon="inline-end" />
                </a>
              </Button>
              <div className="flex flex-wrap items-center gap-2">
                {project.linkLabel ? (
                  <Button variant="outline" asChild>
                    <a href={href} target="_blank" rel="noopener noreferrer">
                      {project.linkLabel}
                    </a>
                  </Button>
                ) : null}
                <CopyLinkButton href={href} />
              </div>
            </CardFooter>
          ) : null}
        </Card>
      </div>
    </article>
  );
}
