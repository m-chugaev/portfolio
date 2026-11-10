import type { ServiceFaq as ServiceFaqItem } from "@/data/services";

type ServiceFaqProps = {
  items: ServiceFaqItem[];
};

export function ServiceFaq({ items }: ServiceFaqProps) {
  return (
    <section className="flex flex-col gap-4" aria-labelledby="service-faq">
      <h2
        id="service-faq"
        className="text-xl font-semibold tracking-tight sm:text-2xl"
      >
        Частые вопросы
      </h2>
      <dl className="flex flex-col gap-3">
        {items.map((item) => (
          <div
            key={item.question}
            className="rounded-2xl border border-border/60 bg-card/40 px-4 py-4 sm:px-5 sm:py-5"
          >
            <dt className="text-base font-medium tracking-tight sm:text-lg">
              {item.question}
            </dt>
            <dd className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
              {item.answer}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
