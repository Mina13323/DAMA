import { NextResponse } from "next/server";
import { getProject } from "@/content/projects";
import { validateLead, type LeadInput } from "@/lib/leads";

const validInquiryTypes = new Set(["general", "contact", "careers", "partnerships", "media"]);

/**
 * Lead & Inquiry endpoint for project interest, contact, and career applications.
 *
 * Webhook Forwarding:
 *  - Set `LEADS_WEBHOOK_URL` (server-only env var) to DAMA's CRM webhook.
 *  - Optionally set `LEADS_WEBHOOK_TOKEN` for Bearer auth.
 *  - In development or when explicitly allowed, submissions are logged and accepted.
 *  - In production without a webhook, returns 503 so fake success is never displayed.
 */
export async function POST(request: Request) {
  let body: Partial<LeadInput> & { website?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  // Honeypot filled → silently accept without forwarding (bot prevention).
  if (body.website) {
    return NextResponse.json({ ok: true, spam: true });
  }

  const errors = validateLead(body);
  const isValidTarget =
    body.project && (validInquiryTypes.has(body.project) || !!getProject(body.project));

  if (Object.keys(errors).length > 0 || !isValidTarget) {
    return NextResponse.json({ error: "invalid", fields: errors }, { status: 422 });
  }

  const endpoint = process.env.LEADS_WEBHOOK_URL;
  if (!endpoint) {
    if (process.env.NODE_ENV === "development" || process.env.ALLOW_DEV_LEADS === "true") {
      console.info("[LEADS_API_DEV_SIMULATION]", {
        name: body.name,
        email: body.email,
        phone: body.phone,
        project: body.project,
        subject: body.subject,
        submittedAt: new Date().toISOString(),
      });
      return NextResponse.json({ ok: true, devMode: true });
    }
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.LEADS_WEBHOOK_TOKEN ? { Authorization: `Bearer ${process.env.LEADS_WEBHOOK_TOKEN}` } : {}),
      },
      body: JSON.stringify({
        name: body.name!.trim(),
        email: body.email!.trim(),
        phone: body.phone!.trim(),
        message: (body.message ?? "").trim(),
        project: body.project,
        subject: body.subject ?? body.position ?? "General",
        portfolio: body.portfolio,
        locale: body.locale ?? "en",
        consent: true,
        submittedAt: new Date().toISOString(),
      }),
    });
    if (!res.ok) return NextResponse.json({ error: "upstream_failed" }, { status: 502 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "upstream_unreachable" }, { status: 502 });
  }
}
