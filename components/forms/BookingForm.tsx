"use client";

import { useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { CalendarDays, CheckCircle2, LoaderCircle, Phone } from "lucide-react";
import { telHref } from "@/lib/format";
import { shrinkImage } from "@/lib/shrinkImage";
import FormField, { Honeypot } from "./FormField";

type Props = { services: string[]; content: Record<string, string>; phone: string };

export default function BookingForm({ services, content, phone }: Props) {
  const preselected = useSearchParams().get("service") ?? "";
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const options = [...services, "Other"];

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setError("");
    try {
      const form = new FormData(event.currentTarget);
      const photo = form.get("photo");
      if (photo instanceof File && photo.size > 0) form.set("photo", await shrinkImage(photo, 3.5 * 1024 * 1024));
      const response = await fetch("/api/bookings", { method: "POST", body: form });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error);
      setDone(true);
      window.scrollTo({ top: 0 });
    } catch (caught) {
      setError((caught instanceof Error && caught.message) || `Something went wrong. Please call ${phone}.`);
    } finally {
      setSending(false);
    }
  }

  if (done) {
    return (
      <div role="status" className="rounded-2xl bg-white p-10 text-center shadow-md">
        <CheckCircle2 className="mx-auto h-16 w-16 text-leaf" aria-hidden="true" />
        <h2 className="mt-4 text-2xl font-extrabold text-forest-950">{content.successHeading}</h2>
        <p className="mt-2 text-gray-700">{content.successText}</p>
        <a href={telHref(phone)} className="btn btn-green mt-6"><Phone className="h-5 w-5" aria-hidden="true" />{phone}</a>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="relative grid gap-5 rounded-2xl bg-white p-6 shadow-md sm:grid-cols-2 sm:p-8">
      <Honeypot />
      <FormField label="Full Name" required><input name="fullName" required autoComplete="name" className="field" /></FormField>
      <FormField label="Email" required><input name="email" type="email" required autoComplete="email" className="field" /></FormField>
      <FormField label="Phone" required><input name="phone" type="tel" required autoComplete="tel" className="field" /></FormField>
      <FormField label="Service Needed" required>
        <select name="service" required defaultValue={options.includes(preselected) ? preselected : ""} className="field">
          <option value="" disabled>Select a service</option>
          {options.map((option) => <option key={option}>{option}</option>)}
        </select>
      </FormField>
      <FormField label="Address" required className="sm:col-span-2"><input name="address" required autoComplete="street-address" className="field" /></FormField>
      <FormField label="Preferred Date"><input name="preferredDate" type="date" className="field" /></FormField>
      <FormField label="Preferred Time">
        <select name="preferredTime" defaultValue="" className="field">
          <option value="">No preference</option>
          <option>Morning</option><option>Afternoon</option><option>Evening</option>
        </select>
      </FormField>
      <FormField label="Message / Description" className="sm:col-span-2"><textarea name="message" rows={4} className="field" /></FormField>
      <FormField label="Upload Photo (optional)" className="sm:col-span-2">
        <input name="photo" type="file" accept="image/jpeg,image/png,image/webp,image/gif" className="field" />
      </FormField>
      <label className="flex items-start gap-3 text-sm text-gray-700 sm:col-span-2">
        <input name="consent" type="checkbox" required className="mt-0.5 h-5 w-5 accent-[var(--color-leaf)]" />
        {content.consentText}
      </label>
      {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm font-medium text-red-800 sm:col-span-2">{error}</p>}
      <button type="submit" disabled={sending} className="btn btn-lime text-lg sm:col-span-2">
        {sending ? <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" /> : <CalendarDays className="h-5 w-5" aria-hidden="true" />}
        {sending ? "Sending..." : "Request Service"}
      </button>
    </form>
  );
}
