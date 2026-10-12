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
    <article className="overflow-hidden rounded-2xl border border-border/60 bg-card/20 shadow-sm sm:rounded-[1.75rem] md:relative md:aspect-[16/9] md:min-h-[22rem]">
      <div className="relative aspect-[16/10] w-full bg-[#12151b] md:absolute md:inset-0 md:aspect-auto">
        <ProjectSlideshow images={project.images} alt={project.imageAlt} />
      </div>

      <div className="relative z-10 p-3 sm:p-4 md:absolute md:inset-0 md:flex md:h-full md:items-end md:p-7 lg:p-8">
        <Card className="w-full max-w-lg gap-3 border-border/40 bg-card/94 py-4 shadow-lg backdrop-blur-xl sm:gap-4 sm:py-5 md:py-6">
          <CardHeader className="gap-2.5 px-4 sm:gap-3 sm:px-5 md:px-6">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <Badge variant="default" className="max-w-full truncate">
                {project.role}
              </Badge>
              <Badge variant="secondary">{project.year}</Badge>
              <Badge variant="outline" className="max-w-full truncate">
                {project.context}
              </Badge>
            </div>
            <div className="flex flex-col gap-1.5">
              <CardTitle className="font-display text-xl tracking-tight sm:text-2xl md:text-3xl">
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
          <CardContent className="flex flex-col gap-3 px-4 sm:px-5 md:px-6">
            <p className="line-clamp-4 text-sm leading-relaxed text-muted-foreground sm:line-clamp-3 md:text-[0.95rem]">
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
            <CardFooter className="flex flex-col items-stretch gap-2 px-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:px-5 md:px-6">
              <Button className="w-full sm:w-auto" asChild>
                <a href={href} target="_blank" rel="noopener noreferrer">
                  Открыть проект
                  <ExternalLinkIcon data-icon="inline-end" />
                </a>
              </Button>
              <div className="flex w-full items-stretch sm:w-auto sm:flex-wrap sm:items-center sm:gap-2">
                {project.linkLabel ? (
                  <div className="flex min-w-0 flex-1 overflow-hidden rounded-full border border-border bg-background/70 shadow-xs sm:contents">
                    <Button
                      variant="outline"
                      className="min-w-0 flex-1 rounded-none rounded-l-full border-0 bg-transparent shadow-none sm:flex-none sm:rounded-full sm:border sm:bg-background/70 sm:shadow-xs"
                      asChild
                    >
                      <a href={href} target="_blank" rel="noopener noreferrer">
                        <span className="truncate">{project.linkLabel}</span>
                      </a>
                    </Button>
                    <CopyLinkButton href={href} compact className="sm:hidden" />
                  </div>
                ) : (
                  <CopyLinkButton href={href} className="sm:hidden" />
                )}
                <CopyLinkButton href={href} className="hidden sm:inline-flex" />
              </div>
            </CardFooter>
          ) : null}
        </Card>
      </div>
    </article>
  );
}
