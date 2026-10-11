import Image from "next/image";
import { profile } from "@/data/profile";

export function Advantages() {
  return (
    <div
      aria-label="Преимущества"
      className="relative border-t border-white/10 bg-background/35 backdrop-blur-md"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 lg:py-12">
        {profile.advantages.map((item) => (
          <article key={item.title} className="flex flex-col gap-3.5">
            <Image
              src={item.icon}
              alt=""
              width={32}
              height={32}
              className="size-8 opacity-90"
              unoptimized
            />
            <h3 className="text-[1.05rem] font-semibold tracking-tight">
              {item.title}
            </h3>
            <p className="max-w-[18rem] text-sm leading-relaxed text-muted-foreground">
              {item.description}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
