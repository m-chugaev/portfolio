import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { AuditLanding } from "@/components/audit/AuditLanding";
import { JsonLd } from "@/components/JsonLd";
import { AUDIT_SERVICE_ID } from "@/data/audit";
import { getServiceById, servicePath } from "@/data/services";
import { buildPageMetadata, getServicePageGraph } from "@/lib/seo";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0C1015",
};

export function generateMetadata(): Metadata {
  const service = getServiceById(AUDIT_SERVICE_ID);

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

export default function AuditServicePage() {
  const service = getServiceById(AUDIT_SERVICE_ID);

  if (!service) {
    notFound();
  }

  return (
    <>
      <JsonLd data={getServicePageGraph(service)} />
      <AuditLanding />
    </>
  );
}
