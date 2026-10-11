import { MailIcon, MessageCircleIcon, UserRoundIcon } from "lucide-react";
import { profile } from "@/data/profile";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function Contact() {
  const items = [
    {
      label: "Telegram",
      value: profile.contacts.telegram.label,
      href: profile.contacts.telegram.href,
      icon: MessageCircleIcon,
      external: true,
    },
    {
      label: "Email",
      value: profile.contacts.email.label,
      href: profile.contacts.email.href,
      icon: MailIcon,
      external: false,
    },
    {
      label: "Профиль",
      value: profile.contacts.habr.label,
      href: profile.contacts.habr.href,
      icon: UserRoundIcon,
      external: true,
    },
  ];

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-20" aria-labelledby="contact-title">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 sm:gap-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="flex max-w-xl flex-col gap-2">
            <h2
              id="contact-title"
              className="text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl"
            >
              Контакты
            </h2>
            <p className="text-sm text-muted-foreground sm:text-base">
              Напишите в Telegram — обсудим задачу и следующий шаг.
            </p>
          </div>
          <Button size="lg" className="w-full sm:w-auto" asChild>
            <a href={profile.contacts.telegram.href}>Обсудить проект</a>
          </Button>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href={item.href}
                {...(item.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="group"
              >
                <Card className="h-full gap-3 border-border/60 bg-card/60 py-5 transition-colors group-hover:border-primary/40">
                  <CardHeader className="gap-3 px-5">
                    <Icon className="size-5 text-primary" />
                    <CardDescription>{item.label}</CardDescription>
                    <CardTitle className="text-lg">{item.value}</CardTitle>
                  </CardHeader>
                </Card>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
