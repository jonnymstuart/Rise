"use client";

import { useState } from "react";
import { ArrowRight } from "@/components/ui/icons";

type Status = "idle" | "loading" | "success" | "error";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setStatus("error");
        setMessage(data.error ?? "Something went wrong. Try again.");
        return;
      }
      setStatus("success");
      setMessage("Check your inbox to confirm — talk soon.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-card border border-line bg-canvas p-6">
        <p className="text-h4">You’re in.</p>
        <p className="mt-2 text-muted">{message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <label htmlFor="newsletter-email" className="eyebrow mb-3 block">
        Stay connected
      </label>
      <div className="relative">
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          autoComplete="email"
          className="h-14 w-full rounded-pill border border-line bg-canvas pl-6 pr-16 text-ink outline-none transition-colors placeholder:text-muted focus:border-ink"
        />
        {/* Honeypot — hidden from users, catches bots. */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          className="absolute left-[-9999px] h-0 w-0 opacity-0"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          aria-label="Subscribe"
          className="absolute right-2 top-2 grid size-10 place-items-center rounded-pill bg-ink text-white transition-transform duration-300 hover:scale-105 disabled:opacity-50"
        >
          <ArrowRight className="size-4" />
        </button>
      </div>
      <p className="mt-3 text-small text-muted">
        No spam — just occasional, high-value notes. You agree to the terms.
      </p>
      {status === "error" && (
        <p className="mt-2 text-small text-accent">{message}</p>
      )}
    </form>
  );
}
