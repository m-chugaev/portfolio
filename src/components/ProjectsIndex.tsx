import Link from "next/link";
import { additionalExperience } from "@/data/experience";
import { projectPath, projects } from "@/data/projects";
import { profile } from "@/data/profile";
import { SERVICES_INDEX_PATH } from "@/data/services";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "./Breadcrumbs";
import { MoreWork } from "./MoreWork";
import { ProjectGallery } from "./ProjectGallery";

export function ProjectsIndex() {
  return (
    <div className="flex flex-col gap-12 sm:gap-16">
      <header className="flex flex-col gap-5">
        <Breadcrumbs
          items={[
            { href: "/", label: "Главная" },
            { label: "Проекты" },
          ]}
        />
        <div className="flex max-w-2xl flex-col gap-3">
          <h1 className="font-display text-[clamp(1.85rem,6vw,3rem)] font-semibold tracking-tight text-balance">
            Проекты
          </h1>
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
            Избранные кейсы с сайта: роль, стек и то, что можно рассказать
            публично. Подробности — на отдельных страницах, чтобы их находили
            поиск и можно было открыть ссылкой. Услуги, под которые этот опыт
            ложится, собраны на{" "}
            <Link
              href={SERVICES_INDEX_PATH}
              className="font-medium text-primary hover:underline"
            >
              отдельной странице
            </Link>
            .
          </p>
        </div>
      </header>

      <ul className="flex flex-col gap-8">
        {projects.map((project) => (
          <li key={project.id}>
            <article className="flex flex-col gap-4 rounded-2xl border border-border/60 bg-card/30 p-4 sm:p-5 md:p-6">
              <ProjectGallery images={project.images} alt={project.imageAlt} />
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap items-center gap-1.5">
                  <Badge variant="default">{project.role}</Badge>
                  <Badge variant="secondary">{project.year}</Badge>
                </div>
                <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                  <Link
                    href={projectPath(project.id)}
                    className="transition-colors hover:text-primary"
                  >
                    {project.title}
                  </Link>
                </h2>
                <p className="text-sm text-muted-foreground sm:text-base">
                  {project.product}
                </p>
                <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {project.description}
                </p>
                <Button className="w-full sm:w-auto sm:self-start" asChild>
                  <Link href={projectPath(project.id)}>Читать кейс</Link>
                </Button>
              </div>
            </article>
          </li>
        ))}
      </ul>

      <section className="flex flex-col gap-4" aria-labelledby="other-experience">
        <div className="flex max-w-2xl flex-col gap-2">
          <h2
            id="other-experience"
            className="text-xl font-semibold tracking-tight sm:text-2xl md:text-3xl"
          >
            Другой опыт
          </h2>
          <p className="text-sm text-muted-foreground sm:text-base">
            Позиции из профиля{" "}
            <a
              href={profile.contacts.habr.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline-offset-4 hover:underline"
            >
              Habr Career
            </a>
            , без отдельных страниц: по ним нет публичного описания конкретного
            продукта.
          </p>
        </div>
        <ul className="grid gap-4 md:grid-cols-2">
          {additionalExperience.map((item) => (
            <li
              key={item.id}
              className="flex flex-col gap-3 rounded-2xl border border-border/60 bg-card/40 p-5"
            >
              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-semibold tracking-tight">
                  {item.companyHref ? (
                    <a
                      href={item.companyHref}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.employer}
                    </a>
                  ) : (
                    item.employer
                  )}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {item.role} · {item.period}
                </p>
                <p className="text-sm text-muted-foreground">
                  {item.industry}, {item.location}
                </p>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {item.summary}
              </p>
              <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed text-muted-foreground">
                {item.work.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>

      <MoreWork headingLevel="h2" />
    </div>
  );
}
