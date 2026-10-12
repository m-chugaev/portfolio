import { Clock3Icon, MessagesSquareIcon } from "lucide-react";
import { profile } from "@/data/profile";
import { Button } from "@/components/ui/button";
import { SafeImage } from "@/components/SafeImage";
import { Advantages } from "./Advantages";
import { TechStack } from "./TechStack";

function HeroCta({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Button size="lg" className="w-full sm:w-auto" asChild>
        <a href={profile.contacts.telegram.href}>
          <MessagesSquareIcon data-icon="inline-start" />
          Обсудить проект
        </a>
      </Button>
      <p className="inline-flex items-center gap-2 text-sm text-muted-foreground">
        <Clock3Icon className="size-4 shrink-0" />
        {profile.responseNote}
      </p>
    </div>
  );
}

export function Hero() {
  return (
    <section
      className="relative flex flex-col overflow-hidden lg:min-h-svh"
      aria-labelledby="hero-title"
    >
      <div className="pointer-events-none absolute inset-0">
        <SafeImage
          src="/hero-bg.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="scale-105 object-cover object-[70%_calc(18%-50px)] opacity-50 blur-md sm:object-[74%_14%] md:object-[78%_10%] lg:object-[82%_8%] xl:object-[84%_6%]"
        />
        <div className="hero-photo-mask absolute inset-0">
          <SafeImage
            src="/hero-bg.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[70%_calc(18%-50px)] sm:object-[74%_14%] md:object-[78%_10%] lg:object-[82%_8%] xl:object-[84%_6%]"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/55 via-background/30 to-background/90 md:bg-gradient-to-r md:from-background/75 md:via-background/20 md:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/15" />
        <div className="absolute inset-y-0 left-0 hidden w-1/4 bg-gradient-to-r from-background/35 to-transparent md:block" />
      </div>

      <div className="relative mx-auto flex min-h-svh w-full max-w-6xl flex-1 flex-col px-4 pt-20 pb-6 sm:pt-24 sm:pb-8 md:pt-28 md:pb-10 lg:min-h-0">
        <div className="relative flex flex-1 flex-col gap-8 lg:block">
          <div className="flex max-w-2xl flex-col gap-5 sm:gap-7 lg:max-w-xl lg:pb-8 xl:max-w-2xl">
            <h1
              id="hero-title"
              className="text-[clamp(2.45rem,9.5vw,4rem)] font-semibold leading-[1.1] tracking-tight text-balance sm:text-5xl sm:leading-tight md:text-6xl lg:text-[3.5rem] lg:leading-[1.05] xl:text-[4rem]"
            >
              {profile.headline}{" "}
              <span className="text-gradient">{profile.headlineAccent}</span>
            </h1>
            <p className="max-w-xl text-[0.95rem] leading-relaxed text-muted-foreground sm:text-base md:text-lg">
              {profile.slogan}
            </p>
            <HeroCta className="hidden flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 lg:flex" />
          </div>

          <div className="mt-auto flex w-full max-w-md flex-col gap-4 self-end lg:absolute lg:right-0 lg:bottom-0 lg:mt-0 lg:w-[min(100%,22rem)] min-[1500px]:lg:w-[min(100%,26rem)]">
            <HeroCta className="flex flex-col items-center gap-3 text-center lg:hidden" />
            <TechStack />
          </div>
        </div>
      </div>

      <Advantages />
    </section>
  );
}
