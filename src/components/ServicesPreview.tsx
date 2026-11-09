import Link from "next/link";
import {
  SERVICES_INDEX_PATH,
  servicePath,
  services,
} from "@/data/services";
import { IMAGE_FALLBACK_ICON, SafeImage } from "@/components/SafeImage";
import { Reveal } from "./Reveal";

export function ServicesPreview() {
  return (
    <section
      id="services"
      className="py-12 sm:py-16 md:py-20"
      aria-labelledby="services-title"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 sm:gap-8">
        <div className="flex max-w-2xl flex-col gap-2 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
          <div className="flex flex-col gap-2">
            <h2
              id="services-title"
              className="text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl"
            >
              Чем могу помочь
            </h2>
            <p className="text-sm text-muted-foreground sm:text-base">
              Сначала разбор задачи, потом фиксированный объём. Цена и сроки —
              после оценки, не из прайса на сайте.
            </p>
          </div>
          <Link
            href={SERVICES_INDEX_PATH}
            className="text-sm font-medium text-primary hover:underline sm:mb-1"
          >
            Все услуги
          </Link>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2">
          {services.map((service, index) => (
            <li key={service.id}>
              <Reveal delayMs={index * 60}>
                <Link
                  href={servicePath(service.id)}
                  className="flex h-full gap-4 rounded-2xl border border-border/60 bg-card/40 p-4 transition-colors hover:border-primary/40 sm:p-5"
                >
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
                  <span className="flex min-w-0 flex-col gap-1.5">
                    <span className="font-medium tracking-tight">
                      {service.h1}
                    </span>
                    <span className="text-sm leading-relaxed text-muted-foreground">
                      {service.cardPitch}
                    </span>
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
