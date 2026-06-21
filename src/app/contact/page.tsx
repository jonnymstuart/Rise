import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/sections/page-header";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { WorldClock } from "@/components/site/world-clock";
import { NewsletterForm } from "@/components/site/newsletter-form";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Jonny Stuart — AI Product & Design Partner, based in Lisbon, working worldwide.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let’s talk."
        intro="The fastest way to start is the application — but email works too. I’m based in Lisbon and work with founders and CEOs worldwide."
      />

      <section className="mt-16 md:mt-24">
        <Container>
          <div className="grid gap-x-12 gap-y-14 md:grid-cols-12">
            <div className="md:col-span-6">
              <Reveal>
                <p className="eyebrow">Direct</p>
                <a
                  href={`mailto:${site.email}`}
                  className="mt-4 block text-h2 hover:text-accent"
                >
                  {site.email}
                </a>
                <p className="mt-6 text-ink-2">{site.location}</p>
                <div className="mt-8">
                  <Button href="/work-with-me" withArrow>
                    Work with me
                  </Button>
                </div>
                <div className="mt-10 flex gap-6">
                  {site.socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ink-2 hover:text-ink"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              </Reveal>
            </div>

            <div className="md:col-span-5 md:col-start-8">
              <Reveal>
                <div className="rounded-card border border-line bg-surface p-6 md:p-8">
                  <NewsletterForm />
                </div>
                <div className="mt-10">
                  <p className="eyebrow mb-4">Local time</p>
                  <WorldClock />
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
