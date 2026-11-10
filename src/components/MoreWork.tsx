import Link from "next/link";
import { SERVICES_INDEX_PATH, servicePath } from "@/data/services";
import { Reveal } from "./Reveal";

const highlights = [
  { value: "20+", label: "сайтов — от крупных до небольших" },
  { value: "3+", label: "iOS-приложения" },
  { value: "3+", label: "расширения для Chrome" },
  {
    value: "10+",
    label: "Telegram-ботов",
    href: servicePath("telegram-bots"),
  },
  { value: "4 место", label: "Telegram Contest for JS Developers 2024" },
  { value: "дизайн", label: "несколько сайтов от идеи до макета" },
  { value: "рост", label: "анализ метрик и закупка рекламы" },
  {
    value: "и ещё",
    label: "многое другое по запросу бизнеса",
    href: SERVICES_INDEX_PATH,
  },
] as const;

type MoreWorkProps = {
  headingLevel?: "h2" | "h3";
};

export function MoreWork({ headingLevel = "h3" }: MoreWorkProps) {
  const Heading = headingLevel;

  return (
    <Reveal>
      <div className="rounded-2xl border border-white/10 bg-card/40 px-4 py-7 backdrop-blur-md sm:px-5 sm:py-8 md:px-8 md:py-10">
        <div className="flex max-w-2xl flex-col gap-2.5 sm:gap-3">
          <Heading className="text-xl font-semibold tracking-tight sm:text-2xl md:text-3xl">
            Это не все проекты
          </Heading>
          <p className="text-sm text-muted-foreground sm:text-base md:text-lg">
            За годы веб-разработки накопилось гораздо
            больше разных форматов и задач.
          </p>
        </div>
        <ul className="mt-6 grid grid-cols-2 gap-4 sm:mt-8 sm:gap-5 lg:grid-cols-4">
          {highlights.map((item) => (
            <li key={item.label} className="flex flex-col gap-1 sm:gap-1.5">
              {"href" in item && item.href ? (
                <Link
                  href={item.href}
                  className="flex flex-col gap-1 rounded-sm sm:gap-1.5"
                >
                  <span className="text-lg font-semibold tracking-tight text-foreground sm:text-xl md:text-2xl">
                    {item.value}
                  </span>
                  <span className="text-xs leading-snug text-muted-foreground underline-offset-4 hover:underline sm:text-sm">
                    {item.label}
                  </span>
                </Link>
              ) : (
                <>
                  <span className="text-lg font-semibold tracking-tight text-foreground sm:text-xl md:text-2xl">
                    {item.value}
                  </span>
                  <span className="text-xs leading-snug text-muted-foreground sm:text-sm">
                    {item.label}
                  </span>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}
