import Link from "next/link";
import { profile } from "@/data/profile";
import { PROJECTS_INDEX_PATH } from "@/data/projects";
import { SERVICES_INDEX_PATH } from "@/data/services";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="pb-8 sm:pb-12">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 sm:gap-5">
        <Separator className="bg-border/60" />
        <div className="flex flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4">
          <span>
            © {year} {profile.name}
          </span>
          <nav
            aria-label="Подвал"
            className="flex flex-wrap items-center gap-x-4 gap-y-2"
          >
            <Link
              href={SERVICES_INDEX_PATH}
              className="rounded-sm transition-colors hover:text-foreground"
            >
              Услуги
            </Link>
            <Link
              href={PROJECTS_INDEX_PATH}
              className="rounded-sm transition-colors hover:text-foreground"
            >
              Проекты
            </Link>
            <Link
              href="/#contact"
              className="rounded-sm transition-colors hover:text-foreground"
            >
              Контакты
            </Link>
            <a
              href={profile.contacts.telegram.href}
              className="rounded-sm transition-colors hover:text-foreground"
            >
              Telegram
            </a>
          </nav>
          <span>
            На создание этого сайта с 0 до появления на домене ушло 6 часов
          </span>
        </div>
      </div>
    </footer>
  );
}
