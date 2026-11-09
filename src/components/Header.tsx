import Link from "next/link";
import { profile } from "@/data/profile";
import { PROJECTS_INDEX_PATH } from "@/data/projects";
import { SERVICES_INDEX_PATH } from "@/data/services";
import { Button } from "@/components/ui/button";
import { IMAGE_FALLBACK_ICON, SafeImage } from "@/components/SafeImage";

const links = [
  { href: SERVICES_INDEX_PATH, label: "Услуги" },
  { href: PROJECTS_INDEX_PATH, label: "Проекты" },
  { href: "/#contact", label: "Контакты" },
];

const mobileLinks = links.slice(0, 2);

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-20 border-b border-white/10 bg-background/10 backdrop-blur-xl supports-[backdrop-filter]:bg-background/5">
      <div className="mx-auto flex min-h-14 w-full max-w-6xl items-center justify-between gap-4 px-4 md:min-h-16 md:gap-8">
        <Link href="/" className="flex min-w-0 items-center gap-2.5 sm:gap-3">
          <SafeImage
            src="/logo.png"
            alt=""
            width={40}
            height={40}
            className="size-8 shrink-0 rounded-md object-contain md:size-9"
            fallbackSrc={IMAGE_FALLBACK_ICON}
            unoptimized
            priority
          />
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="truncate text-lg font-semibold tracking-tight md:text-base lg:text-lg">
              {profile.name}
            </span>
            <span className="hidden text-xs text-muted-foreground md:block">
              {profile.roles}
            </span>
          </span>
        </Link>

        <nav
          className="flex shrink-0 items-center gap-0.5 md:hidden"
          aria-label="Разделы"
        >
          {mobileLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-flex min-h-10 items-center rounded-full px-3 text-sm font-medium text-foreground/90 transition-colors hover:bg-white/10 hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <nav
          className="hidden flex-1 items-center justify-end gap-1.5 md:flex md:gap-2 lg:gap-3"
          aria-label="Основная"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-1.5 text-sm font-medium text-foreground/90 transition-colors hover:bg-white/10 hover:text-foreground lg:px-5 lg:text-base"
            >
              {link.label}
            </Link>
          ))}
          <Button size="default" className="ml-1 lg:ml-2" asChild>
            <a href={profile.contacts.telegram.href}>Обсудить проект</a>
          </Button>
        </nav>
      </div>
    </header>
  );
}
