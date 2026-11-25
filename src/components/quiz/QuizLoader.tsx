"use client";

import dynamic from "next/dynamic";

const QuizLive = dynamic(
  () => import("@/components/quiz/QuizLive").then((mod) => mod.QuizLive),
  { ssr: false },
);

export function QuizLoader() {
  return <QuizLive />;
}
