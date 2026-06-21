import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2, "Please share your name."),
  email: z.email("A valid email helps me reply."),
  company: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(10, "A little more detail, please."),
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
      { error: parsed.error.issues[0]?.message ?? "Please check the form." },
      { status: 422 },
    );
  }

  // Honeypot tripped — silently accept.
  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  // TODO: send the enquiry via Resend (notify Jonny + auto-reply) once
  // RESEND_API_KEY is configured. For now we log so nothing is lost in dev.
  const { website: _hp, ...enquiry } = parsed.data;
  void _hp;
  console.log("[apply]", enquiry);

  return NextResponse.json({ ok: true });
}
