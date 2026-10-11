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
          className="scale-110 object-cover object-[72%_center] blur-2xl md:object-[68%_center] lg:blur-3xl"
        />
        <div
          className="absolute inset-0"
          style={{
            maskImage:
              "radial-gradient(ellipse 78% 82% at 62% 42%, #000 42%, transparent 82%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 78% 82% at 62% 42%, #000 42%, transparent 82%)",
          }}
        >
          <Image
            src="/hero-bg.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[72%_center] md:object-[68%_center]"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent md:from-background/82 md:via-background/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/15" />
        <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-background/45 to-transparent xl:w-2/5" />
        <div className="absolute inset-y-0 right-0 hidden w-1/4 bg-gradient-to-l from-background/50 to-transparent xl:block" />
      </div>

      <div className="relative mx-auto grid w-full max-w-6xl flex-1 items-end gap-10 px-4 pt-24 pb-8 md:pt-28 md:pb-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <div className="flex max-w-2xl flex-col gap-7 lg:self-center lg:pb-6">
          <h1
            id="hero-title"
            className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl lg:text-[4rem] lg:leading-[1.05]"
          >
            {profile.headline}{" "}
            <span className="text-gradient">{profile.headlineAccent}</span>
          </h1>
          <p className="max-w-xl text-base text-muted-foreground md:text-lg">
            {profile.slogan}
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
            <Button size="lg" asChild>
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

        <div className="flex justify-start lg:justify-end lg:pb-4">
          <TechStack />
        </div>
      </div>

      <Advantages />
    </section>
  );
}
