import { Hero } from "@/components/sections/home/hero";
import { JsonLd } from "@/components/seo/json-ld";
import { site } from "@/lib/site";

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
    </>
  );
}
