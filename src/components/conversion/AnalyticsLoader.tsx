"use client";

import dynamic from "next/dynamic";

const LiveAnalytics = dynamic(
  () =>
    import("@/components/conversion/LiveAnalytics").then(
      (mod) => mod.LiveAnalytics,
    ),
  { ssr: false },
);

export function AnalyticsLoader() {
  return <LiveAnalytics />;
}
