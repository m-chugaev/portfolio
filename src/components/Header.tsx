import Image from "next/image";
import Link from "next/link";
import { profile } from "@/data/profile";
import { Button } from "@/components/ui/button";

const links = [
  { href: "#projects", label: "Проекты" },
  { href: "#contact", label: "Контакты" },
];

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-20 border-b border-white/10 bg-background/10 backdrop-blur-xl supports-[backdrop-filter]:bg-background/5">
      <div className="mx-auto flex min-h-14 w-full max-w-6xl items-center justify-between gap-6 px-4 md:min-h-16 md:gap-8">
        <Link href="#top" className="flex shrink-0 items-center gap-2.5">
          <Image
            src="/logo.png"
            alt=""
            width={36}
            height={36}
            className="size-8 rounded-md object-contain"
            priority
          />
          <span className="flex flex-col leading-tight">
            <span className="text-sm font-semibold tracking-tight md:text-base">
              {profile.name}
            </span>
            <span className="text-[0.7rem] text-muted-foreground md:text-xs">
              {profile.roles}
            </span>
          </span>
        </Link>
        <nav
          className="hidden flex-1 items-center justify-end gap-1.5 md:flex md:gap-2 lg:gap-3"
          aria-label="Основная навигация"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-1.5 text-sm font-medium text-foreground/90 transition-colors hover:bg-white/10 hover:text-foreground lg:px-5 lg:text-base"
            >
              {link.label}
            </a>
          ))}
          <Button size="default" className="ml-1 lg:ml-2" asChild>
            <a href={profile.contacts.telegram.href}>Обсудить проект</a>
          </Button>
        </nav>
      </div>
    </header>
  );
}
