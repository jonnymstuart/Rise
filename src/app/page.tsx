import { Hero } from "@/components/sections/home/hero";
import { Container } from "@/components/ui/container";
import { WorkGrid } from "@/components/sections/work-grid";
import { JsonLd } from "@/components/seo/json-ld";
import { site } from "@/lib/site";
import { work } from "@/lib/work";

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  url: site.url,
  email: `mailto:${site.email}`,
  description: site.description,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lisbon",
    addressCountry: "PT",
  },
  alumniOf: "Central Saint Martins",
  knowsAbout: [
    "AI product design",
    "Product strategy",
    "Design leadership",
    "AI MVP development",
    "Fractional CPO",
  ],
};

const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.name,
  url: site.url,
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={personLd} />
      <JsonLd data={websiteLd} />
      <Hero />
      <section id="work" className="border-t border-ink/15 py-20 md:py-28">
        <Container>
          <p className="eyebrow mb-10 md:mb-14">Selected work</p>
          <WorkGrid items={work} />
        </Container>
      </section>
    </>
  );
}
