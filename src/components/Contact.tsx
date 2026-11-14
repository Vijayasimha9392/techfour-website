import { useEffect, useRef, useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertCircle,
  Building2,
  CheckCircle2,
  Loader2,
  Mail,
  Phone,
  Rocket,
  Send,
  UserSearch,
} from "lucide-react";
import { teamContact } from "@/data/contact";
import { services } from "@/data/services";
import { submitContact } from "@/lib/contact.functions";
import { onContactIntent } from "@/lib/contact-intent";
import { externalLinkProps, isPlaceholderLink } from "@/lib/links";
import {
  DEVELOPER_PREFERENCES,
  INQUIRY_TYPES,
  contactSchema,
  type ContactFields,
  type ContactFormInput,
} from "@/lib/validation";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { NativeSelect } from "./ui/native-select";
import { Reveal } from "./ui/reveal";
import { Section, SectionHeading } from "./ui/section";
import { GithubIcon, LinkedinIcon } from "./ui/social-icons";
import { Textarea } from "./ui/textarea";

type Status =
  | { type: "idle" }
  | { type: "submitting" }
  | { type: "success" }
  | { type: "error"; message: string };

const defaultValues: ContactFormInput = {
  fullName: "",
  email: "",
  phone: "",
  company: "",
  inquiryType: "",
  developerPreference: "",
  service: "",
  message: "",
};

const fieldClass =
  "h-11 rounded-lg border-input bg-surface px-3.5 text-sm placeholder:text-muted-foreground/70 focus-visible:border-primary/60 focus-visible:ring-2 focus-visible:ring-ring/40 aria-[invalid=true]:border-destructive/70";

function Field({
  id,
  label,
  required,
  error,
  hint,
  children,
  className,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 flex items-baseline justify-between text-sm font-medium text-foreground">
        <span>
          {label}
          {required ? (
            <span className="ml-0.5 text-primary" aria-hidden>
              *
            </span>
          ) : null}
        </span>
        {!required && <span className="text-xs font-normal text-muted-foreground">Optional</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-muted-foreground">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-destructive">
          <AlertCircle className="size-3.5 shrink-0" aria-hidden />
          {error}
        </p>
      )}
    </div>
  );
}

function ContactDetail({
  icon,
  label,
  value,
  href,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const placeholder = isPlaceholderLink(href ?? value);
  const content = (
    <>
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border-strong bg-surface text-muted-foreground">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block text-xs text-muted-foreground">{label}</span>
        <span className="block truncate text-sm font-medium text-foreground">{value}</span>
      </span>
    </>
  );
  if (placeholder || !href) {
    return (
      <div className="flex items-center gap-3" title={placeholder ? "Not added yet" : undefined}>
        {content}
      </div>
    );
  }
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...(external ? externalLinkProps : {})}
      className="flex items-center gap-3 rounded-xl transition-opacity hover:opacity-80"
    >
      {content}
    </a>
  );
}

export function Contact() {
  const [status, setStatus] = useState<Status>({ type: "idle" });
  const startedAt = useRef<number>(0);
  const honeypot = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    setFocus,
    formState: { errors },
  } = useForm<ContactFormInput, unknown, ContactFields>({
    resolver: zodResolver(contactSchema),
    defaultValues,
    mode: "onTouched",
  });

  useEffect(() => {
    startedAt.current = Date.now();
    return onContactIntent((intent) => {
      setStatus((s) => (s.type === "success" ? { type: "idle" } : s));
      if (intent.inquiryType) setValue("inquiryType", intent.inquiryType);
      if (intent.developerPreference) setValue("developerPreference", intent.developerPreference);
      if (intent.service) setValue("service", intent.service);
      window.setTimeout(() => setFocus("fullName"), 650);
    });
  }, [setValue, setFocus]);

  const submitting = status.type === "submitting";

  const onSubmit = async (values: ContactFields) => {
    if (submitting) return;
    setStatus({ type: "submitting" });
    try {
      const result = await submitContact({
        data: {
          ...values,
          website: honeypot.current?.value ?? "",
          startedAt: startedAt.current,
        },
      });
      if (result.ok) {
        setStatus({ type: "success" });
        reset(defaultValues);
      } else {
        setStatus({ type: "error", message: result.message });
      }
    } catch (error) {
      console.error("Contact submission failed", error);
      setStatus({
        type: "error",
        message:
          typeof navigator !== "undefined" && !navigator.onLine
            ? "You appear to be offline. Check your connection and try again."
            : "Something went wrong while sending your message. Please check your details and try again.",
      });
    } finally {
      requestAnimationFrame(() => statusRef.current?.focus());
    }
  };

  const describedBy = (id: keyof ContactFormInput, hint = false) =>
    errors[id] ? `${id}-error` : hint ? `${id}-hint` : undefined;

  return (
    <Section id="contact" labelledBy="contact-title" className="border-t border-border">
      <div aria-hidden className="absolute bottom-0 left-1/2 -z-10 h-[500px] w-[900px] -translate-x-1/2 rounded-full glow-primary opacity-50 blur-3xl" />
      <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <SectionHeading
            id="contact-title"
            eyebrow="Contact"
            title="Have a Project in Mind? Let's Build It Together!"
            description="Whether you are a startup seeking a development team, a business looking for technical solutions, or a recruiter searching for skilled developers, TechFour would love to connect with you."
          />

          <Reveal delay={0.1} className="mt-10 space-y-4">
            {[
              { icon: Rocket, text: "Startups looking for a full development team" },
              { icon: Building2, text: "Businesses that need a specific technical solution" },
              { icon: UserSearch, text: "Recruiters hiring one of our developers" },
            ].map(({ icon: Icon, text }) => (
              <p key={text} className="flex items-center gap-3 text-sm text-secondary-foreground">
                <Icon className="size-4 text-primary" aria-hidden />
                {text}
              </p>
            ))}
          </Reveal>

          <Reveal delay={0.15} className="mt-10 grid gap-5 rounded-2xl border border-border bg-surface/60 p-6 sm:grid-cols-2">
            <ContactDetail
              icon={<Mail className="size-4" />}
              label="Email"
              value={teamContact.email}
              href={`mailto:${teamContact.email}`}
            />
            <ContactDetail icon={<Phone className="size-4" />} label="Phone" value={teamContact.phone} />
            <ContactDetail
              icon={<LinkedinIcon className="size-4" />}
              label="LinkedIn"
              value="TechFour on LinkedIn"
              href={teamContact.linkedin}
            />
            <ContactDetail
              icon={<GithubIcon className="size-4" />}
              label="GitHub"
              value="TechFour on GitHub"
              href={teamContact.github}
            />
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="glass rounded-3xl p-6 shadow-card sm:p-8">
            {status.type === "success" ? (
              <div
                ref={statusRef}
                tabIndex={-1}
                role="status"
                className="flex min-h-[480px] flex-col items-center justify-center text-center outline-none"
              >
                <span className="flex size-14 items-center justify-center rounded-2xl bg-success/15">
                  <CheckCircle2 className="size-7 text-success" aria-hidden />
                </span>
                <h3 className="mt-6 text-2xl font-semibold tracking-tight text-foreground">
                  Message sent
                </h3>
                <p className="mt-3 max-w-sm text-muted-foreground">
                  Thanks for reaching out. Your message was delivered to the TechFour team, and
                  we'll reply to the email address you provided.
                </p>
                <Button variant="outline" className="mt-8" onClick={() => setStatus({ type: "idle" })}>
                  Send another message
                </Button>
              </div>
            ) : (
              <form noValidate onSubmit={handleSubmit(onSubmit)} aria-busy={submitting}>
                <fieldset disabled={submitting} className="grid gap-5 sm:grid-cols-2">
                  <legend className="sr-only">Contact TechFour</legend>

                  <Field id="fullName" label="Full Name" required error={errors.fullName?.message}>
                    <Input
                      id="fullName"
                      autoComplete="name"
                      className={fieldClass}
                      aria-invalid={!!errors.fullName}
                      aria-required
                      aria-describedby={describedBy("fullName")}
                      {...register("fullName")}
                    />
                  </Field>

                  <Field id="email" label="Email Address" required error={errors.email?.message}>
                    <Input
                      id="email"
                      type="email"
                      autoComplete="email"
                      inputMode="email"
                      className={fieldClass}
                      aria-invalid={!!errors.email}
                      aria-required
                      aria-describedby={describedBy("email")}
                      {...register("email")}
                    />
                  </Field>

                  <Field id="phone" label="Phone Number" error={errors.phone?.message}>
                    <Input
                      id="phone"
                      type="tel"
                      autoComplete="tel"
                      inputMode="numeric"
                      placeholder="Enter 10-digit phone number"
                      className={fieldClass}
                      aria-invalid={!!errors.phone}
                      aria-describedby={describedBy("phone")}
                      {...register("phone", {
                        onChange: (e) => {
                          const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                          e.target.value = val;
                        },
                      })}
                    />
                  </Field>

                  <Field id="company" label="Company Name" error={errors.company?.message}>
                    <Input
                      id="company"
                      autoComplete="organization"
                      className={fieldClass}
                      aria-invalid={!!errors.company}
                      aria-describedby={describedBy("company")}
                      {...register("company")}
                    />
                  </Field>

                  <Field id="inquiryType" label="Inquiry Type" required error={errors.inquiryType?.message}>
                    <NativeSelect
                      id="inquiryType"
                      aria-invalid={!!errors.inquiryType}
                      aria-required
                      aria-describedby={describedBy("inquiryType")}
                      {...register("inquiryType")}
                    >
                      <option value="">Select an inquiry type</option>
                      {INQUIRY_TYPES.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </NativeSelect>
                  </Field>

                  <Field
                    id="developerPreference"
                    label="Developer Preference"
                    error={errors.developerPreference?.message}
                  >
                    <NativeSelect
                      id="developerPreference"
                      aria-invalid={!!errors.developerPreference}
                      aria-describedby={describedBy("developerPreference")}
                      {...register("developerPreference")}
                    >
                      <option value="">No preference</option>
                      {DEVELOPER_PREFERENCES.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </NativeSelect>
                  </Field>

                  <Field
                    id="service"
                    label="Technology or Service Required"
                    error={errors.service?.message}
                    className="sm:col-span-2"
                  >
                    <NativeSelect
                      id="service"
                      aria-invalid={!!errors.service}
                      aria-describedby={describedBy("service")}
                      {...register("service")}
                    >
                      <option value="">Not sure yet</option>
                      {services.map((s) => (
                        <option key={s.id} value={s.title}>
                          {s.title}
                        </option>
                      ))}
                      <option value="Other">Other</option>
                    </NativeSelect>
                  </Field>

                  <Field
                    id="message"
                    label="Project Description / Message"
                    required
                    error={errors.message?.message}
                    hint="Tell us about the project, role, timeline, or anything else that helps."
                    className="sm:col-span-2"
                  >
                    <Textarea
                      id="message"
                      rows={6}
                      className={cn(fieldClass, "h-auto min-h-36 resize-y py-3")}
                      aria-invalid={!!errors.message}
                      aria-required
                      aria-describedby={describedBy("message", true)}
                      {...register("message")}
                    />
                  </Field>

                  {/* Honeypot — hidden from people and assistive tech, catches bots. */}
                  <div aria-hidden className="absolute -left-[10000px] h-px w-px overflow-hidden">
                    <label htmlFor="website">Website</label>
                    <input ref={honeypot} id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
                  </div>

                  <div className="sm:col-span-2">
                    {status.type === "error" && (
                      <div
                        ref={statusRef}
                        tabIndex={-1}
                        role="alert"
                        className="mb-5 flex items-start gap-3 rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-sm text-foreground outline-none"
                      >
                        <AlertCircle className="mt-0.5 size-4 shrink-0 text-destructive" aria-hidden />
                        <p>{status.message}</p>
                      </div>
                    )}
                    <div className="flex flex-col-reverse items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-xs text-muted-foreground">
                        <span className="text-primary">*</span> Required fields
                      </p>
                      <Button type="submit" variant="hero" size="xl" className="w-full sm:w-auto" disabled={submitting}>
                        {submitting ? (
                          <>
                            <Loader2 className="animate-spin" aria-hidden /> Sending…
                          </>
                        ) : (
                          <>
                            Send Message <Send aria-hidden />
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </fieldset>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
