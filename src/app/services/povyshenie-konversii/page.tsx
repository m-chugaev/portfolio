import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { ConversionLanding } from "@/components/conversion/ConversionLanding";
import { JsonLd } from "@/components/JsonLd";
import { CONVERSION_SERVICE_ID, getServiceById, servicePath } from "@/data/services";
import { buildPageMetadata, getServicePageGraph } from "@/lib/seo";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#F3EFE6",
};

export function generateMetadata(): Metadata {
  const service = getServiceById(CONVERSION_SERVICE_ID);

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

export default function ConversionServicePage() {
  const service = getServiceById(CONVERSION_SERVICE_ID);

  if (!service) {
    notFound();
  }

  return (
    <>
      <JsonLd data={getServicePageGraph(service)} />
      <ConversionLanding />
    </>
  );
}
