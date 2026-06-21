import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/sections/page-header";
import { WorkGrid } from "@/components/sections/work-grid";
import { work } from "@/lib/work";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected products, brands and ventures — from AKQA luxury craft to AI-native 0→1 builds.",
};

export default function WorkPage() {
  return (
    <>
      <PageHeader
        eyebrow="Selected work"
        title="Proof, not promises."
        intro="A selection of products, brands and ventures — from AKQA luxury craft for Rolls-Royce and Hermès to AI-native 0→1 builds shipped in weeks."
      />
      <section className="mt-16 md:mt-24">
        <Container>
          <WorkGrid items={work} />
        </Container>
      </section>
    </>
  );
}
