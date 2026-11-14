import { z } from "zod";

export const INQUIRY_TYPES = [
  "Freelance Project",
  "Full-Time Employment",
  "Individual Developer Hiring",
  "Team Collaboration",
  "Internship",
  "Other",
] as const;

export const DEVELOPER_PREFERENCES = [
  "Entire TechFour Team",
  "Vijayasimha Tammineni",
  "Shekar D",
  "Dinesh Boini",
  "Manikanta M",
  "Multiple Developers",
] as const;

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max, { message: `Must be ${max} characters or fewer` })
    .optional()
    .default("");

/** Shared by the browser form and the server handler. */
export const contactSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, { message: "Please enter your full name" })
    .max(100, { message: "Name must be 100 characters or fewer" }),
  email: z
    .string()
    .trim()
    .min(1, { message: "Please enter your email address" })
    .email({ message: "Please enter a valid email address" })
    .max(255, { message: "Email must be 255 characters or fewer" }),
  phone: z
    .string()
    .trim()
    .optional()
    .default("")
    .transform((val) => (val ? val.replace(/\D/g, "") : ""))
    .refine((val) => val === "" || val.length === 10, {
      message: "Phone number must be exactly 10 digits",
    }),
  company: optionalText(120),
  inquiryType: z
    .string()
    .refine((v) => (INQUIRY_TYPES as readonly string[]).includes(v), {
      message: "Please select an inquiry type",
    }),
  developerPreference: z
    .string()
    .refine((v) => v === "" || (DEVELOPER_PREFERENCES as readonly string[]).includes(v), {
      message: "Please select a valid option",
    })
    .optional()
    .default(""),
  service: optionalText(150),
  message: z
    .string()
    .trim()
    .min(20, { message: "Please write at least 20 characters about your project or role" })
    .max(3000, { message: "Message must be 3000 characters or fewer" }),
});

/** Adds spam-protection fields: a hidden honeypot and the time the form was opened. */
export const contactSubmissionSchema = contactSchema.extend({
  website: z.string().max(200).optional().default(""),
  startedAt: z.number().int().nonnegative(),
});

export type ContactFormInput = z.input<typeof contactSchema>;
export type ContactFields = z.output<typeof contactSchema>;
export type ContactSubmission = z.input<typeof contactSubmissionSchema>;

/** Submissions faster than this are treated as automated. */
export const MIN_FILL_TIME_MS = 3000;
