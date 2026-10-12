import { profile } from "@/data/profile";
import { IMAGE_FALLBACK_ICON, SafeImage } from "@/components/SafeImage";

export function Advantages() {
  return (
    <div
      aria-label="Преимущества"
      className="relative border-t border-white/10 bg-background/35 backdrop-blur-md"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-8 sm:grid-cols-2 sm:gap-8 sm:py-10 lg:grid-cols-4 lg:py-12">
        {profile.advantages.map((item) => (
          <article key={item.title} className="flex flex-col gap-2.5 sm:gap-3.5">
            <SafeImage
              src={item.icon}
              alt=""
              width={32}
              height={32}
              className="size-7 opacity-90 sm:size-8"
              fallbackSrc={IMAGE_FALLBACK_ICON}
              unoptimized
            />
            <h3 className="text-base font-semibold tracking-tight sm:text-[1.05rem]">
              {item.title}
            </h3>
            <p className="max-w-none text-sm leading-relaxed text-muted-foreground sm:max-w-[18rem]">
              {item.description}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
