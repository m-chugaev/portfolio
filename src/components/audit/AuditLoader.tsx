"use client";

import dynamic from "next/dynamic";

const AuditLive = dynamic(
  () => import("@/components/audit/AuditLive").then((mod) => mod.AuditLive),
  { ssr: false },
);

export function AuditLoader() {
  return <AuditLive />;
}
