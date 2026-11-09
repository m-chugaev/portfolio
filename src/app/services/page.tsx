import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { ServicesIndex } from "@/components/ServicesIndex";
import { SERVICES_INDEX_PATH, servicesIndex } from "@/data/services";
import { buildPageMetadata, getServicesIndexGraph } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: servicesIndex.seoTitle,
  description: servicesIndex.seoDescription,
  path: SERVICES_INDEX_PATH,
  keywords: [...servicesIndex.keywords],
});

export default function ServicesPage() {
  return (
    <div>
      <JsonLd data={getServicesIndexGraph()} />
      <Header />
      <main className="pt-20 pb-12 sm:pt-24 sm:pb-16 md:pt-28 md:pb-20">
        <div className="mx-auto w-full max-w-6xl px-4">
          <ServicesIndex />
        </div>
      </main>
      <Contact />
      <Footer />
    </div>
  );
}
