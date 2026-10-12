"use client";

import type { CSSProperties } from "react";
import { useState } from "react";
import { profile } from "@/data/profile";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { IMAGE_FALLBACK_ICON, SafeImage } from "@/components/SafeImage";
import { TypingOverflowText } from "@/components/TypingOverflowText";

type SkillItem = {
  name: string;
  icon: string;
  color: string;
};

const ALWAYS_TYPE_ON_MOBILE = new Set([
  "PostgreSQL",
  "JavaScript",
  "Kubernetes",
]);

export function TechStack() {
  const [showRequests, setShowRequests] = useState(false);

  const items: SkillItem[] = showRequests
    ? [...profile.skillRequests, profile.skillsToggle.back]
    : [...profile.skills, profile.skillsToggle.more];

  const title = showRequests
    ? "Популярные запросы бизнеса сейчас"
    : "Технологии, с которыми работаю больше 8 лет";

  return (
    <Card className="w-full gap-4 border-white/15 bg-[#1a1d24]/85 py-5 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.65)] backdrop-blur-xl min-[1500px]:gap-5 min-[1500px]:py-6">
      <CardHeader className="px-4 pb-0 min-[1500px]:px-6">
        <p className="text-sm font-semibold tracking-tight text-pretty text-white min-[1500px]:text-[0.95rem]">
          {title}
        </p>
      </CardHeader>
      <CardContent className="px-4 min-[1500px]:px-6">
        <ul
          key={showRequests ? "requests" : "skills"}
          className="grid grid-cols-3 gap-2 min-[1500px]:gap-3"
        >
          {items.map((skill, index) => {
            const isToggle =
              skill.name === profile.skillsToggle.more.name ||
              skill.name === profile.skillsToggle.back.name;

            const content = (
              <>
                <span className="relative grid size-4 shrink-0 place-items-center min-[1500px]:size-[22px]">
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full opacity-0 blur-md transition-opacity duration-200 group-hover:opacity-70"
                    style={{ backgroundColor: skill.color }}
                  />
                  <SafeImage
                    src={skill.icon}
                    alt=""
                    width={22}
                    height={22}
                    className="relative size-4 transition-transform duration-200 group-hover:scale-110 min-[1500px]:size-[22px]"
                    fallbackSrc={IMAGE_FALLBACK_ICON}
                    unoptimized
                  />
                </span>
                <TypingOverflowText
                  text={skill.name}
                  alwaysTypeOnMobile={ALWAYS_TYPE_ON_MOBILE.has(skill.name)}
                />
              </>
            );

            const className =
              "skill-chip group inline-flex min-h-10 w-full min-w-0 items-center gap-1.5 overflow-hidden rounded-[max(0.5rem,calc(1rem-1.25rem))] border border-white/10 bg-[#12151b]/90 px-2 py-2 text-left text-[0.72rem] font-medium leading-none text-white transition-[transform,border-color,background-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-white/25 hover:bg-[#1c212b] sm:min-h-11 sm:text-[0.78rem] min-[1500px]:min-h-12 min-[1500px]:gap-2.5 min-[1500px]:px-3 min-[1500px]:py-2.5 min-[1500px]:text-[0.84rem]";

            const style = {
              "--skill-color": skill.color,
              animationDelay: `${index * 45}ms`,
            } as CSSProperties;

            if (isToggle) {
              return (
                <li key={skill.name} className="min-w-0">
                  <button
                    type="button"
                    className={`${className} cursor-pointer`}
                    style={style}
                    onClick={() => setShowRequests((value) => !value)}
                    aria-pressed={showRequests}
                  >
                    {content}
                  </button>
                </li>
              );
            }

            return (
              <li key={skill.name} className={className} style={style}>
                {content}
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
