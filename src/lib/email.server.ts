import type { ContactResult } from "@/types";
import type { ContactFields } from "./validation";

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const DEFAULT_FROM = "TechFour Website <onboarding@resend.dev>";

const DEVELOPER_EMAILS: Record<string, string> = {
  "Vijayasimha Tammineni": "vijayasimhatammineni@gmail.com",
  "Shekar D": "lakshmishekardangeti25@gmail.com",
  "Dinesh Boini": "dineshboini2003@gmail.com",
  "Manikanta M": "mangalapallimanikanta9898@gmail.com",
};

const ALL_TEAM_EMAILS = [
  "vijayasimhatammineni@gmail.com",
  "lakshmishekardangeti25@gmail.com",
  "dineshboini2003@gmail.com",
  "mangalapallimanikanta9898@gmail.com",
];

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function rows(f: ContactFields): Array<[string, string]> {
  return [
    ["Name", f.fullName],
    ["Email", f.email],
    ["Phone", f.phone || "—"],
    ["Company", f.company || "—"],
    ["Inquiry type", f.inquiryType],
    ["Developer preference", f.developerPreference || "—"],
    ["Technology / service", f.service || "—"],
  ];
}

export function buildContactEmail(f: ContactFields) {
  const subject = `[TechFour] ${f.inquiryType} — ${f.fullName}`;
  const text = [...rows(f).map(([k, v]) => `${k}: ${v}`), "", "Message:", f.message].join("\n");
  const html = `
  <div style="font-family:Arial,sans-serif;color:#111;max-width:640px">
    <h2 style="margin:0 0 16px">New TechFour website inquiry</h2>
    <table style="border-collapse:collapse;width:100%;font-size:14px">
      ${rows(f)
        .map(
          ([k, v]) =>
            `<tr><td style="padding:6px 12px 6px 0;color:#555;white-space:nowrap;vertical-align:top">${escapeHtml(k)}</td><td style="padding:6px 0">${escapeHtml(v)}</td></tr>`,
        )
        .join("")}
    </table>
    <h3 style="margin:24px 0 8px">Message</h3>
    <p style="white-space:pre-wrap;font-size:14px;line-height:1.6;margin:0">${escapeHtml(f.message)}</p>
  </div>`;
  return { subject, text, html };
}

/**
 * Sends the contact inquiry to the team inbox through Resend.
 * Requires RESEND_API_KEY and CONTACT_TO_EMAIL; CONTACT_FROM_EMAIL is optional.
 * Only returns ok: true when Resend confirms the email was accepted.
 */
export async function sendContactEmail(f: ContactFields): Promise<ContactResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const envTo = (process.env.CONTACT_TO_EMAIL ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const from = process.env.CONTACT_FROM_EMAIL?.trim() || DEFAULT_FROM;

  let to: string[] = [];
  if (f.developerPreference && DEVELOPER_EMAILS[f.developerPreference]) {
    to = [DEVELOPER_EMAILS[f.developerPreference]];
  } else {
    to = envTo.length > 0 ? envTo : ALL_TEAM_EMAILS;
  }

  if (!apiKey) {
    console.error("Contact form email is not configured (missing: RESEND_API_KEY)");
    return {
      ok: false,
      code: "not_configured",
      message:
        "Our contact form isn't connected to email yet, so your message was not sent. Please reach us using the contact details on this page.",
    };
  }

  const { subject, text, html } = buildContactEmail(f);

  let response: Response;
  try {
    response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from, to, reply_to: f.email, subject, text, html }),
    });
  } catch (error) {
    console.error("Contact email request failed:", error);
    return {
      ok: false,
      code: "send_failed",
      message: "We couldn't reach our email service. Please try again in a few minutes.",
    };
  }

  if (!response.ok) {
    const body = await response.text();
    console.error(`Resend rejected contact email [${response.status}]: ${body}`);
    return {
      ok: false,
      code: "send_failed",
      message: "We couldn't send your message right now. Please try again in a few minutes.",
    };
  }

  return { ok: true };
}
