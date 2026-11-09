import { MessagesSquareIcon } from "lucide-react";
import { profile } from "@/data/profile";
import { Button } from "@/components/ui/button";

type ServiceCtaProps = {
  title: string;
  hint: string;
};

export function ServiceCta({ title, hint }: ServiceCtaProps) {
  return (
    <section
      className="rounded-2xl border border-white/10 bg-card/40 px-4 py-7 backdrop-blur-md sm:px-6 sm:py-8 md:px-8"
      aria-labelledby="service-cta-title"
    >
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div className="flex max-w-2xl flex-col gap-2">
          <h2
            id="service-cta-title"
            className="text-xl font-semibold tracking-tight sm:text-2xl"
          >
            {title}
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            {hint}
          </p>
        </div>
        <Button size="lg" className="w-full shrink-0 sm:w-auto" asChild>
          <a href={profile.contacts.telegram.href}>
            <MessagesSquareIcon data-icon="inline-start" />
            Написать в Telegram
          </a>
        </Button>
      </div>
    </section>
  );
}
