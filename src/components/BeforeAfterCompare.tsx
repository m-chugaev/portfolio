"use client";

import { useId, useState } from "react";
import { SafeImage } from "@/components/SafeImage";
import { cn } from "@/lib/utils";
import type { ProjectBeforeAfter } from "@/data/projects";

type BeforeAfterCompareProps = {
  pairs: ProjectBeforeAfter[];
};

function PairSlider({ pair }: { pair: ProjectBeforeAfter }) {
  const sliderId = useId();
  const [value, setValue] = useState(50);

  return (
    <figure className="flex flex-col gap-3">
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl border border-border/60 bg-[#12151b]",
          pair.aspect === "mobile"
            ? "mx-auto aspect-[390/844] w-full max-w-sm"
            : "aspect-[16/10]",
        )}
      >
        <SafeImage
          src={pair.afterSrc}
          alt={pair.afterAlt}
          fill
          sizes={
            pair.aspect === "mobile"
              ? "24rem"
              : "(min-width: 1024px) 56rem, 100vw"
          }
          className="object-cover object-top"
          priority={pair.aspect === "desktop"}
        />
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}
        >
          <SafeImage
            src={pair.beforeSrc}
            alt={pair.beforeAlt}
            fill
            sizes={
              pair.aspect === "mobile"
                ? "24rem"
                : "(min-width: 1024px) 56rem, 100vw"
            }
            className="object-cover object-top"
          />
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 w-px bg-white/80"
          style={{ left: `${value}%` }}
        />
        <p className="pointer-events-none absolute top-3 left-3 rounded-full bg-black/55 px-2.5 py-1 text-xs text-white">
          {pair.beforeLabel}
        </p>
        <p className="pointer-events-none absolute top-3 right-3 rounded-full bg-black/55 px-2.5 py-1 text-xs text-white">
          {pair.afterLabel}
        </p>
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor={sliderId} className="text-sm text-muted-foreground">
          {pair.caption}
        </label>
        <input
          id={sliderId}
          type="range"
          min={0}
          max={100}
          step={1}
          value={value}
          aria-valuetext={`${value} процентов исходного сайта`}
          onChange={(event) => setValue(Number(event.target.value))}
          className="h-10 w-full cursor-pointer accent-primary"
        />
      </div>
    </figure>
  );
}

export function BeforeAfterCompare({ pairs }: BeforeAfterCompareProps) {
  return (
    <div className="flex flex-col gap-8">
      {pairs.map((pair) => (
        <PairSlider key={pair.beforeSrc} pair={pair} />
      ))}
      <p className="text-sm leading-relaxed text-muted-foreground">
        Скриншоты первого экрана сняты 9 ноября 2026 года. Телефоны на кадрах
        заменены на плейсхолдер. Ползунок показывает исходный сайт слева и
        концепт справа. Это не кадры с домена клуба после внедрения — концепт
        открывается по отдельной ссылке.
      </p>
    </div>
  );
}
