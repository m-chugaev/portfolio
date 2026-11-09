import type { ReactNode } from "react";
import Link from "next/link";
import {
  SERVICES_INDEX_PATH,
  getOtherServices,
  servicePath,
  workProcess,
  type Service,
} from "@/data/services";
import { profile } from "@/data/profile";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IMAGE_FALLBACK_ICON, SafeImage } from "@/components/SafeImage";
import { Breadcrumbs } from "./Breadcrumbs";
import { ServiceCta } from "./ServiceCta";
import { ServiceFaq } from "./ServiceFaq";

type ServicePageProps = {
  service: Service;
};

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="flex flex-col gap-3" aria-labelledby={id}>
      <h2 id={id} className="text-xl font-semibold tracking-tight sm:text-2xl">
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

export function ServicePage({ service }: ServicePageProps) {
  const others = getOtherServices(service.id);

  return (
    <article className="flex flex-col gap-10 sm:gap-12">
      <header className="flex flex-col gap-6">
        <Breadcrumbs
          items={[
            { href: "/", label: "Главная" },
            { href: SERVICES_INDEX_PATH, label: "Услуги" },
            { label: service.navLabel },
          ]}
        />
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          <div className="flex max-w-2xl flex-col gap-4">
            <div className="flex items-center gap-3">
              <span
                className="grid size-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-[#12151b]/80"
                style={{
                  boxShadow: `inset 0 1px 0 color-mix(in srgb, ${service.color} 35%, transparent)`,
                }}
              >
                <SafeImage
                  src={service.icon}
                  alt=""
                  width={22}
                  height={22}
                  className="size-5"
                  fallbackSrc={IMAGE_FALLBACK_ICON}
                  unoptimized
                />
              </span>
              <p className="text-sm text-muted-foreground">{service.navLabel}</p>
            </div>
            <h1 className="font-display text-[clamp(1.85rem,6vw,3rem)] font-semibold tracking-tight text-balance">
              {service.h1}
            </h1>
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              {service.lead}
            </p>
          </div>
          <Button size="lg" className="w-full shrink-0 sm:w-auto" asChild>
            <a href={profile.contacts.telegram.href}>Обсудить задачу</a>
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-border/60 bg-card/40 p-5 sm:p-6">
            <h2 className="text-base font-semibold tracking-tight">Задача</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
              {service.problem}
            </p>
          </div>
          <div className="rounded-2xl border border-primary/25 bg-card/50 p-5 sm:p-6">
            <h2 className="text-base font-semibold tracking-tight">Результат</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
              {service.outcome}
            </p>
          </div>
        </div>
      </header>

      <Section id="dlya-kogo" title="Кому это подходит">
        <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
          {service.audienceLead}
        </p>
        <ItemList items={service.audience} />
      </Section>

      <Section id="zadachi" title="Типовые задачи">
        <ItemList items={service.tasks} />
      </Section>

      <Section id="vklyucheno" title="Что входит">
        <ItemList items={service.included} />
      </Section>

      <Section id="process" title="Как идёт работа">
        <ol className="grid gap-3 sm:grid-cols-2">
          {workProcess.map((step, index) => (
            <li
              key={step.title}
              className="flex flex-col gap-2 rounded-2xl border border-border/60 bg-card/40 p-5"
            >
              <p className="text-sm text-muted-foreground">Шаг {index + 1}</p>
              <h3 className="text-base font-semibold tracking-tight">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {step.text}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="stack" title="Стек">
        <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
          {service.stackLead}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {service.stack.map((item) => (
            <Badge key={item} variant="outline">
              {item}
            </Badge>
          ))}
        </div>
      </Section>

      {service.relatedCases.length > 0 ? (
        <Section id="cases" title="Связанные кейсы">
          <ul className="grid gap-3 sm:grid-cols-2">
            {service.relatedCases.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex h-full flex-col gap-2 rounded-2xl border border-border/60 bg-card/40 p-5 transition-colors hover:border-primary/40"
                >
                  <span className="font-medium tracking-tight">{item.title}</span>
                  <span className="text-sm leading-relaxed text-muted-foreground">
                    {item.note}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <ServiceFaq items={service.faq} />

      {others.length > 0 ? (
        <section className="flex flex-col gap-4" aria-labelledby="other-services">
          <h2
            id="other-services"
            className="text-xl font-semibold tracking-tight sm:text-2xl"
          >
            Другие услуги
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((item) => (
              <li key={item.id}>
                <Link
                  href={servicePath(item.id)}
                  className="flex h-full flex-col gap-2 rounded-2xl border border-border/60 bg-card/40 p-4 transition-colors hover:border-primary/40"
                >
                  <span className="font-medium tracking-tight">{item.h1}</span>
                  <span className="text-sm text-muted-foreground">
                    {item.cardPitch}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <ServiceCta title="Обсудить эту задачу" hint={service.briefHint} />
    </article>
  );
}
