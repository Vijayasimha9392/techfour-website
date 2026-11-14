import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { contactSchema } from "@/lib/validation";
import { sendContactEmail } from "@/lib/email.server";

const valid = {
  fullName: "Asha Rao",
  email: "asha@example.org",
  phone: "",
  company: "",
  inquiryType: "Freelance Project",
  developerPreference: "",
  service: "",
  message: "We need a Spring Boot API and a React dashboard for our team.",
};

describe("contact form validation", () => {
  it("accepts a complete submission with optional fields empty", () => {
    expect(contactSchema.safeParse(valid).success).toBe(true);
  });

  it("requires full name, email, inquiry type and message", () => {
    const result = contactSchema.safeParse({
      ...valid,
      fullName: "",
      email: "",
      inquiryType: "",
      message: "",
    });
    expect(result.success).toBe(false);
    const fields = result.success ? [] : result.error.issues.map((i) => i.path[0]);
    expect(fields).toEqual(
      expect.arrayContaining(["fullName", "email", "inquiryType", "message"]),
    );
  });

  it("rejects an invalid email format", () => {
    expect(contactSchema.safeParse({ ...valid, email: "not-an-email" }).success).toBe(false);
  });

  it("only accepts the listed inquiry types", () => {
    expect(contactSchema.safeParse({ ...valid, inquiryType: "Internship" }).success).toBe(true);
    expect(contactSchema.safeParse({ ...valid, inquiryType: "Spam" }).success).toBe(false);
  });

  it("only accepts the listed developer preferences", () => {
    expect(
      contactSchema.safeParse({ ...valid, developerPreference: "Shekar D" }).success,
    ).toBe(true);
    expect(
      contactSchema.safeParse({ ...valid, developerPreference: "Someone Else" }).success,
    ).toBe(false);
  });
});

describe("contact email delivery", () => {
  const env = { ...process.env };
  beforeEach(() => {
    delete process.env.RESEND_API_KEY;
    delete process.env.CONTACT_TO_EMAIL;
  });
  afterEach(() => {
    process.env = { ...env };
    vi.unstubAllGlobals();
  });

  const fields = contactSchema.parse(valid);

  it("reports not_configured (never success) when credentials are missing", async () => {
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);
    const result = await sendContactEmail(fields);
    expect(result).toMatchObject({ ok: false, code: "not_configured" });
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("reports send_failed when the email provider rejects the message", async () => {
    process.env.RESEND_API_KEY = "re_test";
    process.env.CONTACT_TO_EMAIL = "team@example.org";
    vi.stubGlobal("fetch", vi.fn(async () => new Response("bad", { status: 422 })));
    const result = await sendContactEmail(fields);
    expect(result).toMatchObject({ ok: false, code: "send_failed" });
  });

  it("reports success only when the provider accepts the message", async () => {
    process.env.RESEND_API_KEY = "re_test";
    process.env.CONTACT_TO_EMAIL = "team@example.org";
    vi.stubGlobal("fetch", vi.fn(async () => new Response('{"id":"1"}', { status: 200 })));
    expect(await sendContactEmail(fields)).toEqual({ ok: true });
  });

  it("routes email to specific developer when selected", async () => {
    process.env.RESEND_API_KEY = "re_test";
    const fetchSpy = vi.fn(async () => new Response('{"id":"1"}', { status: 200 }));
    vi.stubGlobal("fetch", fetchSpy);

    const devFields = contactSchema.parse({
      ...valid,
      developerPreference: "Vijayasimha Tammineni",
    });

    const result = await sendContactEmail(devFields);
    expect(result).toEqual({ ok: true });
    expect(fetchSpy).toHaveBeenCalledWith(
      "https://api.resend.com/emails",
      expect.objectContaining({
        body: expect.stringContaining("vijayasimhatammineni@gmail.com"),
      }),
    );
  });

  it("routes email to all developers when Entire TechFour Team is selected", async () => {
    process.env.RESEND_API_KEY = "re_test";
    const fetchSpy = vi.fn(async () => new Response('{"id":"1"}', { status: 200 }));
    vi.stubGlobal("fetch", fetchSpy);

    const teamFields = contactSchema.parse({
      ...valid,
      developerPreference: "Entire TechFour Team",
    });

    const result = await sendContactEmail(teamFields);
    expect(result).toEqual({ ok: true });
    const callBody = JSON.parse((fetchSpy.mock.calls[0][1] as RequestInit).body as string);
    expect(callBody.to).toEqual([
      "vijayasimhatammineni@gmail.com",
      "lakshmishekardangeti25@gmail.com",
      "dineshboini2003@gmail.com",
      "mangalapallimanikanta9898@gmail.com",
    ]);
  });
});
