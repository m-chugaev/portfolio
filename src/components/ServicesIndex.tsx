import Link from "next/link";
import { PROJECTS_INDEX_PATH } from "@/data/projects";
import {
  servicePath,
  services,
  servicesIndex,
  workProcess,
} from "@/data/services";
import { IMAGE_FALLBACK_ICON, SafeImage } from "@/components/SafeImage";
import { Breadcrumbs } from "./Breadcrumbs";
import { ServiceCta } from "./ServiceCta";
import { ServiceFaq } from "./ServiceFaq";

export function ServicesIndex() {
  return (
    <div className="flex flex-col gap-12 sm:gap-16">
      <header className="flex flex-col gap-5">
        <Breadcrumbs
          items={[
            { href: "/", label: "Главная" },
            { label: "Услуги" },
          ]}
        />
        <div className="flex max-w-2xl flex-col gap-3">
          <h1 className="font-display text-[clamp(1.85rem,6vw,3rem)] font-semibold tracking-tight text-balance">
            {servicesIndex.h1}
          </h1>
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
            {servicesIndex.lead}
          </p>
        </div>
      </header>

      <ul className="grid gap-4 sm:grid-cols-2">
        {services.map((service) => (
          <li key={service.id}>
            <Link
              href={servicePath(service.id)}
              className="flex h-full flex-col gap-4 rounded-2xl border border-border/60 bg-card/30 p-5 transition-colors hover:border-primary/40 sm:p-6"
            >
              <span
                className="grid size-11 place-items-center rounded-xl border border-white/10 bg-[#12151b]/80"
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
              <span className="flex flex-col gap-2">
                <span className="font-display text-xl font-semibold tracking-tight sm:text-2xl">
                  {service.h1}
                </span>
                <span className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {service.cardPitch}
                </span>
                <span className="text-sm font-medium text-foreground">
                  {service.priceLabel}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <section className="flex flex-col gap-4" aria-labelledby="services-terms">
        <h2
          id="services-terms"
          className="text-xl font-semibold tracking-tight sm:text-2xl"
        >
          Стоимость и сроки
        </h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {services.map((service) => (
            <li key={service.id}>
              <Link
                href={servicePath(service.id)}
                className="flex h-full flex-col gap-2 rounded-2xl border border-border/60 bg-card/40 p-5 transition-colors hover:border-primary/40"
              >
                <span className="text-sm text-muted-foreground">
                  {service.navLabel}
                </span>
                <span className="font-medium tracking-tight">
                  {service.terms.price}
                </span>
                {service.terms.timeline ? (
                  <span className="text-sm leading-relaxed text-muted-foreground">
                    {service.terms.timeline}
                  </span>
                ) : (
                  <span className="text-sm leading-relaxed text-muted-foreground">
                    {service.terms.notes[0]}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-4" aria-labelledby="services-process">
        <h2
          id="services-process"
          className="text-xl font-semibold tracking-tight sm:text-2xl"
        >
          Как идёт работа
        </h2>
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
      </section>

      <ServiceFaq items={[...servicesIndex.faq]} />

      <p className="text-sm text-muted-foreground">
        Кейсы, которые можно показать публично, собраны на{" "}
        <Link
          href={PROJECTS_INDEX_PATH}
          className="font-medium text-primary hover:underline"
        >
          странице проектов
        </Link>
        . Связь с конкретной услугой — только там, где она честная.
      </p>

      <ServiceCta
        title="Написать в Telegram"
        hint="Опишите ручной процесс, какими сервисами уже пользуетесь и где случаются ошибки. Этого достаточно для первого сообщения."
      />
    </div>
  );
}
