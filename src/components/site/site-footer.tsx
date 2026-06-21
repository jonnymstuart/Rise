import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { NewsletterForm } from "@/components/site/newsletter-form";
import { WorldClock } from "@/components/site/world-clock";
import { ArrowUpRight } from "@/components/ui/icons";
import { site, ventures } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-32 border-t border-line bg-surface">
      <Container className="py-20">
        {/* CTA + newsletter */}
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 className="text-h2 max-w-[14ch] text-balance">
              Let’s build something worth shipping.
            </h2>
            <div className="mt-8">
              <Button href="/work-with-me" size="lg" withArrow>
                Work with me
              </Button>
            </div>
          </div>
          <div className="lg:pt-2">
            <NewsletterForm />
          </div>
        </div>

        {/* Columns */}
        <div className="mt-20 grid gap-12 border-t border-line pt-14 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="eyebrow mb-5">Navigate</p>
            <ul className="space-y-3">
              {site.nav.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-ink-2 hover:text-ink">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-5">Ecosystem</p>
            <ul className="space-y-3">
              {ventures.map((v) => (
                <li key={v.name}>
                  <a
                    href={v.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1 text-ink-2 hover:text-ink"
                  >
                    {v.name}
                    <ArrowUpRight className="size-3.5 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-5">Contact</p>
            <a
              href={`mailto:${site.email}`}
              className="block text-ink-2 hover:text-ink"
            >
              {site.email}
            </a>
            <p className="mt-3 text-muted">{site.location}</p>
            <div className="mt-4 flex gap-4">
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
          </div>

          <div>
            <p className="eyebrow mb-5">Local time</p>
            <WorldClock />
          </div>
        </div>

        {/* Legal */}
        <div className="mt-16 flex flex-col gap-2 text-small text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {year} {site.name}
          </span>
          <span>Lisbon → worldwide</span>
        </div>
      </Container>
    </footer>
  );
}
