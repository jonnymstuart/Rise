import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  email: z.email(),
  website: z.string().optional(), // honeypot
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 422 },
    );
  }

  // Honeypot tripped — silently accept so bots don't learn.
  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  // TODO: persist to newsletter provider (Beehiiv / ConvertKit / Mailchimp)
  // and/or send a confirmation via Resend once API keys are configured.
  console.log("[subscribe]", parsed.data.email);

  return NextResponse.json({ ok: true });
}
