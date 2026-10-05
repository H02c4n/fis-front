"use client";

import { useState } from "react";
import { ApiRequestError, sendContactMessage } from "@/lib/api";

type FieldErrors = Record<string, string>;

const EMPTY = { first_name: "", last_name: "", email: "", phone: "", message: "", website: "" };

/** DRF returns { field: ["msg", ...] }; flatten to the first message per field. */
function toFieldErrors(fields?: Record<string, unknown>): FieldErrors {
  const out: FieldErrors = {};
  if (!fields) return out;
  for (const [key, val] of Object.entries(fields)) {
    out[key] = Array.isArray(val) ? String(val[0]) : String(val);
  }
  return out;
}

export function ContactForm() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const set = (name: keyof typeof EMPTY) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValues((v) => ({ ...v, [name]: e.target.value }));

  function validate(): FieldErrors {
    const e: FieldErrors = {};
    if (!values.first_name.trim()) e.first_name = "Ange ditt förnamn.";
    if (!values.last_name.trim()) e.last_name = "Ange ditt efternamn.";
    if (!/^\S+@\S+\.\S+$/.test(values.email)) e.email = "Ange en giltig e-postadress.";
    if (values.phone.trim() && !/^\+?[0-9][0-9 \-()]{5,19}$/.test(values.phone.trim()))
      e.phone = "Ange ett giltigt telefonnummer.";
    if (!values.message.trim()) e.message = "Skriv ett meddelande.";
    return e;
  }

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    setFormError(null);
    const clientErrors = validate();
    setErrors(clientErrors);
    if (Object.keys(clientErrors).length > 0) return;

    setSubmitting(true);
    try {
      await sendContactMessage({ ...values, phone: values.phone.trim() });
      setSent(true);
      setValues(EMPTY);
    } catch (err) {
      if (err instanceof ApiRequestError) {
        const fe = toFieldErrors(err.fields);
        setErrors(fe);
        setFormError(Object.keys(fe).length ? "Kontrollera de markerade fälten." : err.message);
      } else {
        setFormError("Något gick fel. Försök igen.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  if (sent) {
    return (
      <div role="status" className="mt-8 rounded-lg border border-green-300 bg-green-50 p-5 text-green-900">
        <p className="font-medium">Tack för ditt meddelande!</p>
        <p className="mt-1 text-sm">Vi återkommer så snart vi kan.</p>
        <button type="button" className="mt-3 text-sm underline" onClick={() => setSent(false)}>
          Skicka ett till meddelande
        </button>
      </div>
    );
  }

  const input =
    "mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-offset-1";
  const err = (name: string) =>
    errors[name] ? (
      <p id={`${name}-error`} className="mt-1 text-sm text-red-600">
        {errors[name]}
      </p>
    ) : null;
  const aria = (name: string) => ({
    "aria-invalid": !!errors[name],
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
  });

  return (
    <form onSubmit={onSubmit} noValidate className="mt-8 space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="first_name" className="text-sm font-medium">Förnamn *</label>
          <input id="first_name" name="first_name" autoComplete="given-name" maxLength={80}
            className={input} value={values.first_name} onChange={set("first_name")} {...aria("first_name")} />
          {err("first_name")}
        </div>
        <div>
          <label htmlFor="last_name" className="text-sm font-medium">Efternamn *</label>
          <input id="last_name" name="last_name" autoComplete="family-name" maxLength={80}
            className={input} value={values.last_name} onChange={set("last_name")} {...aria("last_name")} />
          {err("last_name")}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="text-sm font-medium">E-post *</label>
          <input id="email" name="email" type="email" autoComplete="email"
            className={input} value={values.email} onChange={set("email")} {...aria("email")} />
          {err("email")}
        </div>
        <div>
          <label htmlFor="phone" className="text-sm font-medium">Telefon (valfritt)</label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" maxLength={30}
            className={input} value={values.phone} onChange={set("phone")} {...aria("phone")} />
          {err("phone")}
        </div>
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-medium">Meddelande *</label>
        <textarea id="message" name="message" rows={6} maxLength={5000}
          className={input} value={values.message} onChange={set("message")} {...aria("message")} />
        {err("message")}
      </div>

      {/* Honeypot: hidden from people and screen readers, bots tend to fill it in */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", height: 0, overflow: "hidden" }}>
        <label htmlFor="website">Lämna detta fält tomt</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off"
          value={values.website} onChange={set("website")} />
      </div>

      {formError && (
        <p role="alert" className="rounded-md bg-red-50 p-3 text-sm text-red-700">{formError}</p>
      )}

      <button type="submit" disabled={submitting}
        className="rounded-md bg-black px-6 py-2.5 font-medium text-white disabled:opacity-60">
        {submitting ? "Skickar…" : "Skicka meddelande"}
      </button>
    </form>
  );
}