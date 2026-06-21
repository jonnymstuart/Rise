"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(2, "Your name, please."),
  email: z.email("A valid email, please."),
  company: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(10, "A little more detail helps."),
  website: z.string().optional(), // honeypot
});

type FormValues = z.infer<typeof schema>;

const budgets = ["Not sure yet", "€5k–15k", "€15k–50k", "€50k+"];

const fieldBase =
  "w-full border-b border-line bg-transparent py-3 text-body text-ink outline-none transition-colors placeholder:text-muted focus:border-ink";

export function ApplicationForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });
  const [done, setDone] = useState(false);
  const [serverError, setServerError] = useState("");

  async function onSubmit(values: FormValues) {
    setServerError("");
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setServerError(data.error ?? "Something went wrong. Try again.");
        return;
      }
      setDone(true);
      reset();
    } catch {
      setServerError("Network error. Please try again.");
    }
  }

  if (done) {
    return (
      <div className="rounded-card border border-line bg-canvas p-8">
        <p className="text-h3">Thank you — message received.</p>
        <p className="mt-3 text-ink-2">
          I read every enquiry personally and reply within a couple of days.
          Talk soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-8">
      <Field label="Your name" error={errors.name?.message}>
        <input
          {...register("name")}
          className={fieldBase}
          placeholder="Jane Doe"
          autoComplete="name"
        />
      </Field>

      <Field label="Email" error={errors.email?.message}>
        <input
          {...register("email")}
          type="email"
          className={fieldBase}
          placeholder="jane@company.com"
          autoComplete="email"
        />
      </Field>

      <Field label="Company / project" optional>
        <input
          {...register("company")}
          className={fieldBase}
          placeholder="Company or project name"
        />
      </Field>

      <Field label="Budget" optional>
        <select
          {...register("budget")}
          defaultValue=""
          className={cn(fieldBase, "appearance-none")}
        >
          <option value="" disabled>
            Select a range
          </option>
          {budgets.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </Field>

      <Field label="What are you building?" error={errors.message?.message}>
        <textarea
          {...register("message")}
          rows={4}
          className={cn(fieldBase, "resize-none")}
          placeholder="A few lines on the product, the goal, and timing."
        />
      </Field>

      {/* Honeypot — hidden from users. */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        {...register("website")}
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      {serverError && <p className="text-small text-accent">{serverError}</p>}

      <div className="flex flex-col gap-4">
        <Button type="submit" size="lg" withArrow disabled={isSubmitting}>
          {isSubmitting ? "Sending…" : "Send enquiry"}
        </Button>
        <p className="text-small text-muted">
          I only take on a few partners at a time — the more context, the better.
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  optional,
  error,
  children,
}: {
  label: string;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="flex items-baseline justify-between">
        <span className="text-small text-ink-2">{label}</span>
        {optional && <span className="text-small text-muted">Optional</span>}
      </span>
      <span className="mt-1 block">{children}</span>
      {error && <span className="mt-2 block text-small text-accent">{error}</span>}
    </label>
  );
}
