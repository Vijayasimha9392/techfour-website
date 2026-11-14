import { createServerFn } from "@tanstack/react-start";
import type { ContactResult } from "@/types";
import { MIN_FILL_TIME_MS, contactSubmissionSchema } from "./validation";
import { sendContactEmail } from "./email.server";

export const submitContact = createServerFn({ method: "POST" })
  .validator((data: unknown) => contactSubmissionSchema.parse(data))
  .handler(async ({ data }): Promise<ContactResult> => {
    const { website, startedAt, ...fields } = data;

    // Honeypot: real visitors never see or fill this field. Drop silently.
    if (website) return { ok: true };

    if (Date.now() - startedAt < MIN_FILL_TIME_MS) {
      return {
        ok: false,
        code: "too_fast",
        message: "That was quick! Please take a moment to review your message and send it again.",
      };
    }

    return sendContactEmail(fields);
  });
