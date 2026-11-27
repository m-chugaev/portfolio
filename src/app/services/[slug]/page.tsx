import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { ServicePage } from "@/components/ServicePage";
import { AUDIT_SERVICE_ID } from "@/data/audit";
import { QUIZ_SERVICE_ID } from "@/data/quiz";
import {
  CONVERSION_SERVICE_ID,
  getServiceById,
  servicePath,
  services,
} from "@/data/services";
import { buildPageMetadata, getServicePageGraph } from "@/lib/seo";

type ServiceRouteProps = {
  params: Promise<{ slug: string }>;
};

const standaloneServiceIds = new Set<string>([
  CONVERSION_SERVICE_ID,
  AUDIT_SERVICE_ID,
  QUIZ_SERVICE_ID,
]);

export function generateStaticParams() {
  return services
    .filter((service) => !standaloneServiceIds.has(service.id))
    .map((service) => ({ slug: service.id }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: ServiceRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceById(slug);

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

export default async function ServiceRoutePage({ params }: ServiceRouteProps) {
  const { slug } = await params;
  const service = getServiceById(slug);

  if (!service) {
    notFound();
  }

  return (
    <div>
      <JsonLd data={getServicePageGraph(service)} />
      <Header />
      <main className="pt-20 pb-12 sm:pt-24 sm:pb-16 md:pt-28 md:pb-20">
        <div className="mx-auto w-full max-w-6xl px-4">
          <ServicePage service={service} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
