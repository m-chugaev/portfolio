import { getStructuredData } from "@/lib/seo";

export function JsonLd() {
  const json = JSON.stringify(getStructuredData()).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
