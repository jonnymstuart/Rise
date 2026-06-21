"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const links = site.nav.filter((l) => l.href !== "/work-with-me");

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        scrolled || open
          ? "border-b border-line bg-canvas/80 backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <Container>
        <div className="flex h-[72px] items-center justify-between md:h-20">
          <Link
            href="/"
            className="relative z-10 text-[1.15rem] tracking-tight"
            aria-label={`${site.name} — home`}
          >
            {site.name}
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "text-[0.95rem] transition-colors hover:text-ink",
                  pathname === l.href ? "text-ink" : "text-ink/70",
                )}
              >
                {l.label}
              </Link>
            ))}
            <Button href="/work-with-me" size="sm" withArrow>
              Work with me
            </Button>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="relative z-10 flex size-10 flex-col items-center justify-center gap-[6px] md:hidden"
          >
            <span
              className={cn(
                "block h-px w-6 bg-ink transition-transform duration-300",
                open && "translate-y-[3.5px] rotate-45",
              )}
            />
            <span
              className={cn(
                "block h-px w-6 bg-ink transition-transform duration-300",
                open && "-translate-y-[3.5px] -rotate-45",
              )}
            />
          </button>
        </div>
      </Container>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-0 top-[72px] z-0 bg-canvas transition-[opacity,transform] duration-500 md:hidden",
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0",
        )}
      >
        <Container className="flex h-full flex-col justify-between py-10">
          <nav className="flex flex-col gap-2">
            {site.nav.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-h2 leading-tight tracking-tight"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="text-muted">
            <a href={`mailto:${site.email}`} className="block text-ink">
              {site.email}
            </a>
            <p className="mt-1">{site.location}</p>
          </div>
        </Container>
      </div>
    </header>
  );
}
