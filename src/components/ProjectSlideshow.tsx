"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type ProjectSlideshowProps = {
  images: string[];
  alt: string;
  intervalMs?: number;
};

export function ProjectSlideshow({
  images,
  alt,
  intervalMs = 4200,
}: ProjectSlideshowProps) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (images.length < 2) {
      return;
    }

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) {
      return;
    }

    if (paused) {
      return;
    }

    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % images.length);
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [images.length, intervalMs, paused]);

  return (
    <div
      className="absolute inset-0"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {images.map((src, index) => (
        <Image
          key={src}
          src={src}
          alt={index === active ? alt : ""}
          fill
          priority={index === 0}
          sizes="100vw"
          className={cn(
            "object-cover object-center transition-opacity duration-1000 ease-out",
            index === active ? "opacity-100" : "opacity-0",
          )}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/55 to-background/15" />
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/20" />
      <div className="absolute right-5 bottom-5 z-10 flex gap-2 md:right-8 md:bottom-8">
        {images.map((src, index) => (
          <button
            key={src}
            type="button"
            aria-label={`Показать кадр ${index + 1}`}
            aria-current={index === active}
            className={cn(
              "h-1.5 rounded-full transition-all",
              index === active
                ? "w-8 bg-primary"
                : "w-3 bg-foreground/35 hover:bg-foreground/55",
            )}
            onClick={() => setActive(index)}
          />
        ))}
      </div>
    </div>
  );
}
