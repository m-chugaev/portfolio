import type { ReactNode } from "react";
import { ExternalLinkIcon } from "lucide-react";
import Link from "next/link";
import {
  PROJECTS_INDEX_PATH,
  getOtherProjects,
  projectPath,
  type Project,
} from "@/data/projects";
import {
  SERVICES_INDEX_PATH,
  getServicesForProject,
  servicePath,
} from "@/data/services";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "./Breadcrumbs";
import { CopyLinkButton } from "./CopyLinkButton";
import { BeforeAfterCompare } from "./BeforeAfterCompare";
import { ProjectContactCta } from "./ProjectContactCta";
import { ProjectGallery } from "./ProjectGallery";

type ProjectCaseProps = {
  project: Project;
};

function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  const headingId = title.replace(/\s+/g, "-").toLowerCase();

  return (
    <section className="flex flex-col gap-3" aria-labelledby={headingId}>
      <h2 id={headingId} className="text-xl font-semibold tracking-tight sm:text-2xl">
        {title}
      </h2>
      {children}
    </section>
  );
}

function ItemList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function ProjectCase({ project }: ProjectCaseProps) {
  const others = getOtherProjects(project.id);
  const relatedServices = getServicesForProject(project.id);
  const allLinks = [
    ...(project.href && project.linkLabel
      ? [{ href: project.href, label: project.linkLabel }]
      : []),
    ...(project.extraLinks ?? []),
  ];

  return (
    <article className="flex flex-col gap-10 sm:gap-12">
      <header className="flex flex-col gap-6">
        <Breadcrumbs
          items={[
            { href: "/", label: "Главная" },
            { href: PROJECTS_INDEX_PATH, label: "Проекты" },
            { label: project.title },
          ]}
        />
        {project.beforeAfter && project.beforeAfter.length > 0 ? (
          <BeforeAfterCompare pairs={project.beforeAfter} />
        ) : (
          <ProjectGallery images={project.images} alt={project.imageAlt} />
        )}
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <Badge variant="default" className="max-w-full truncate">
              {project.role}
            </Badge>
            <Badge variant="secondary">{project.year}</Badge>
            <Badge variant="outline" className="max-w-full truncate">
              {project.context}
            </Badge>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="font-display text-[clamp(1.85rem,6vw,3rem)] font-semibold tracking-tight text-balance">
              {project.title}
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {project.product}
            </p>
          </div>
        </div>
      </header>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_16.5rem] lg:items-start lg:gap-12">
        <div className="flex min-w-0 flex-col gap-9">
          {project.summary.length > 0 ? (
            <Section title="Задача и контекст">
              <div className="flex flex-col gap-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {project.summary.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              {project.task ? <ItemList items={project.task} /> : null}
            </Section>
          ) : null}

          {project.roleDetails ? (
            <Section title="Роль">
              {project.employment ? (
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {project.employment.note}
                </p>
              ) : null}
              <ItemList items={project.roleDetails} />
            </Section>
          ) : null}

          {project.work ? (
            <Section title="Что сделано">
              <ItemList items={project.work} />
            </Section>
          ) : null}

          {project.results ? (
            <Section title="Результаты">
              <ItemList items={project.results} />
            </Section>
          ) : null}
        </div>

        <aside className="flex flex-col gap-6 rounded-2xl border border-border/60 bg-card/40 p-5 sm:p-6 lg:sticky lg:top-24">
          <div className="flex flex-col gap-2">
            <h2 className="text-base font-semibold tracking-tight">Период</h2>
            <p className="text-sm text-muted-foreground">{project.period}</p>
            {project.employment ? (
              <p className="text-sm text-muted-foreground">
                {project.employment.employer}
              </p>
            ) : null}
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-base font-semibold tracking-tight">Стек</h2>
            <div className="flex flex-wrap gap-1.5">
              {project.stack.map((item) => (
                <Badge key={item} variant="outline">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
          {project.tools && project.tools.length > 0 ? (
            <div className="flex flex-col gap-2">
              <h2 className="text-base font-semibold tracking-tight">
                Инструменты
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {project.tools.join(", ")}
              </p>
            </div>
          ) : null}
          {allLinks.length > 0 ? (
            <div className="flex flex-col gap-2">
              <h2 className="text-base font-semibold tracking-tight">Ссылки</h2>
              <div className="flex flex-col gap-2">
                {allLinks.map((link) => (
                  <Button
                    key={link.href}
                    variant="outline"
                    className="w-full justify-between"
                    asChild
                  >
                    <a
                      href={link.href}
                      target="_blank"
                      rel={link.rel ?? "noopener noreferrer"}
                    >
                      <span className="truncate">{link.label}</span>
                      <ExternalLinkIcon data-icon="inline-end" />
                    </a>
                  </Button>
                ))}
                {project.href ? (
                  <CopyLinkButton href={project.href} className="w-full" />
                ) : null}
              </div>
            </div>
          ) : null}
        </aside>
      </div>

      <section
        className="flex flex-col gap-4"
        aria-labelledby="related-services"
      >
        <h2
          id="related-services"
          className="text-xl font-semibold tracking-tight sm:text-2xl"
        >
          {relatedServices.length > 0 ? "Связанные услуги" : "Услуги"}
        </h2>
        {relatedServices.length === 0 ? (
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            Этот кейс не привязан к отдельному лендингу услуги. Направления,
            которые можно обсудить, собраны на{" "}
            <Link
              href={SERVICES_INDEX_PATH}
              className="font-medium text-primary hover:underline"
            >
              странице услуг
            </Link>
            .
          </p>
        ) : (
          <ul className="grid gap-3 sm:grid-cols-2">
            {relatedServices.map((service) => (
              <li key={service.id}>
                <Link
                  href={servicePath(service.id)}
                  className="flex h-full flex-col gap-2 rounded-2xl border border-border/60 bg-card/40 p-4 transition-colors hover:border-primary/40"
                >
                  <span className="font-medium tracking-tight">{service.h1}</span>
                  <span className="text-sm text-muted-foreground">
                    {service.cardPitch}
                  </span>
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={SERVICES_INDEX_PATH}
                className="flex h-full flex-col justify-center gap-2 rounded-2xl border border-dashed border-border/60 bg-card/20 p-4 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
              >
                Все услуги
              </Link>
            </li>
          </ul>
        )}
      </section>

      {others.length > 0 ? (
        <section className="flex flex-col gap-4" aria-labelledby="other-cases">
          <h2
            id="other-cases"
            className="text-xl font-semibold tracking-tight sm:text-2xl"
          >
            Другие кейсы
          </h2>
          <ul className="grid gap-3 sm:grid-cols-3">
            {others.map((item) => (
              <li key={item.id}>
                <Link
                  href={projectPath(item.id)}
                  className="flex h-full flex-col gap-2 rounded-2xl border border-border/60 bg-card/40 p-4 transition-colors hover:border-primary/40"
                >
                  <span className="text-xs text-muted-foreground">
                    {item.year}
                  </span>
                  <span className="font-medium tracking-tight">{item.title}</span>
                  <span className="text-sm text-muted-foreground">
                    {item.role}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <ProjectContactCta />
    </article>
  );
}
