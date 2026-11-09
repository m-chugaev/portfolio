import { ArrowLeftIcon, MessagesSquareIcon } from "lucide-react";
import Link from "next/link";
import { profile } from "@/data/profile";
import { Button } from "@/components/ui/button";

export function ProjectContactCta() {
  return (
    <section
      className="rounded-2xl border border-white/10 bg-card/40 px-4 py-7 backdrop-blur-md sm:px-6 sm:py-8 md:px-8"
      aria-labelledby="case-contact-title"
    >
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div className="flex max-w-xl flex-col gap-2">
          <h2
            id="case-contact-title"
            className="text-xl font-semibold tracking-tight sm:text-2xl"
          >
            Обсудить похожую задачу
          </h2>
          <p className="text-sm text-muted-foreground sm:text-base">
            Напишите в Telegram — это тот же контакт, что на главной. Коротко
            опишите контур, и решим, чем могу помочь.
          </p>
        </div>
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:flex-wrap">
          <Button size="lg" className="w-full sm:w-auto" asChild>
            <a href={profile.contacts.telegram.href}>
              <MessagesSquareIcon data-icon="inline-start" />
              Написать в Telegram
            </a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="w-full sm:w-auto"
            asChild
          >
            <Link href="/#contact">
              <ArrowLeftIcon data-icon="inline-start" />
              К контактам
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
