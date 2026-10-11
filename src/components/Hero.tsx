import Image from "next/image";
import { Clock3Icon, MessagesSquareIcon } from "lucide-react";
import { profile } from "@/data/profile";
import { Button } from "@/components/ui/button";
import { Advantages } from "./Advantages";
import { TechStack } from "./TechStack";

export function Hero() {
  return (
    <section
      className="relative flex min-h-svh flex-col overflow-hidden"
      aria-labelledby="hero-title"
    >
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/hero-bg.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="scale-105 object-cover object-[70%_18%] opacity-50 blur-md sm:object-[74%_14%] md:object-[78%_10%] lg:object-[82%_8%] xl:object-[84%_6%]"
        />
        <div className="hero-photo-mask absolute inset-0">
          <Image
            src="/hero-bg.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[70%_18%] sm:object-[74%_14%] md:object-[78%_10%] lg:object-[82%_8%] xl:object-[84%_6%]"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/55 via-background/30 to-background/90 md:bg-gradient-to-r md:from-background/75 md:via-background/20 md:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/15" />
        <div className="absolute inset-y-0 left-0 hidden w-1/4 bg-gradient-to-r from-background/35 to-transparent md:block" />
      </div>

      <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 pt-20 pb-6 sm:pt-24 sm:pb-8 md:pt-28 md:pb-10">
        <div className="relative flex flex-1 flex-col gap-8 lg:block">
          <div className="flex max-w-2xl flex-col gap-5 sm:gap-7 lg:max-w-xl lg:pb-8 xl:max-w-2xl">
            <h1
              id="hero-title"
              className="text-[clamp(1.85rem,7.2vw,4rem)] font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl lg:text-[3.5rem] lg:leading-[1.05] xl:text-[4rem]"
            >
              {profile.headline}{" "}
              <span className="text-gradient">{profile.headlineAccent}</span>
            </h1>
            <p className="max-w-xl text-[0.95rem] leading-relaxed text-muted-foreground sm:text-base md:text-lg">
              {profile.slogan}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
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
          </div>

          <div className="w-full max-w-md self-end lg:absolute lg:right-0 lg:bottom-0 lg:w-[min(100%,22rem)] min-[1500px]:lg:w-[min(100%,26rem)]">
            <TechStack />
          </div>
        </div>
      </div>

      <Advantages />
    </section>
  );
}
