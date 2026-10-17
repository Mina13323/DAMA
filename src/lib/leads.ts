/** Shared lead validation — used by the inquiry forms (client) and /api/leads (server). */
export type LeadInput = {
  name: string;
  email: string;
  phone: string;
  message: string;
  consent: boolean;
  project: string; // project slug OR "general" | "careers" | "partnerships"
  subject?: string;
  position?: string;
  portfolio?: string;
  locale: string;
};

export type LeadErrors = Partial<Record<"name" | "email" | "phone" | "message" | "consent", true>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^\+?[0-9\s()-]{7,20}$/;

export function validateLead(v: Partial<LeadInput>): LeadErrors {
  const errors: LeadErrors = {};
  if (!v.name || v.name.trim().length < 2 || v.name.length > 120) errors.name = true;
  if (!v.email || !EMAIL.test(v.email.trim()) || v.email.length > 200) errors.email = true;
  if (!v.phone || !PHONE.test(v.phone.trim())) errors.phone = true;
  if ((v.message ?? "").length > 2000) errors.message = true;
  if (v.consent !== true) errors.consent = true;
  return errors;
}
