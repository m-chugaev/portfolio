import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { QuizLanding } from "@/components/quiz/QuizLanding";
import { JsonLd } from "@/components/JsonLd";
import { QUIZ_SERVICE_ID } from "@/data/quiz";
import { getServiceById, servicePath } from "@/data/services";
import { buildPageMetadata, getServicePageGraph } from "@/lib/seo";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#23185C",
};

export function generateMetadata(): Metadata {
  const service = getServiceById(QUIZ_SERVICE_ID);

  if (!service) {
    return {};
  }

  return buildPageMetadata({
    title: service.seoTitle,
    description: service.seoDescription,
    path: servicePath(service.id),
    keywords: service.keywords,
  });
}

export default function QuizServicePage() {
  const service = getServiceById(QUIZ_SERVICE_ID);

  if (!service) {
    notFound();
  }

  return (
    <>
      <JsonLd data={getServicePageGraph(service)} />
      <QuizLanding />
    </>
  );
}
