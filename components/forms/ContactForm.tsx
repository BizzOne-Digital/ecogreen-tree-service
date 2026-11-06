"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, LoaderCircle, Send } from "lucide-react";
import FormField, { Honeypot } from "./FormField";

export default function ContactForm({ heading, services }: { heading: string; services: string[] }) {
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setError("");
    try {
      const body = Object.fromEntries(new FormData(event.currentTarget));
      const response = await fetch("/api/contact", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error);
      setDone(true);
    } catch (caught) {
      setError((caught instanceof Error && caught.message) || "Something went wrong. Please call us.");
    } finally {
      setSending(false);
    }
  }

  if (done) {
    return (
      <div role="status" className="grid place-items-center rounded-2xl bg-white p-10 text-center shadow-md">
        <div>
          <CheckCircle2 className="mx-auto h-16 w-16 text-leaf" aria-hidden="true" />
          <h2 className="mt-4 text-2xl font-extrabold text-forest-950">Message Sent</h2>
          <p className="mt-2 text-gray-700">Thank you. We will get back to you soon.</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="relative grid content-start gap-5 rounded-2xl bg-white p-6 shadow-md sm:grid-cols-2 sm:p-8">
      <h2 className="text-2xl font-extrabold text-forest-950 sm:col-span-2">{heading}</h2>
      <Honeypot />
      <FormField label="Name" required><input name="name" required autoComplete="name" className="field" /></FormField>
      <FormField label="Phone"><input name="phone" type="tel" autoComplete="tel" className="field" /></FormField>
      <FormField label="Email" required><input name="email" type="email" required autoComplete="email" className="field" /></FormField>
      <FormField label="Service">
        <select name="service" defaultValue="" className="field">
          <option value="">Select a service</option>
          {[...services, "Other"].map((service) => <option key={service}>{service}</option>)}
        </select>
      </FormField>
      <FormField label="Message" required className="sm:col-span-2"><textarea name="message" required rows={5} className="field" /></FormField>
      {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm font-medium text-red-800 sm:col-span-2">{error}</p>}
      <button type="submit" disabled={sending} className="btn btn-green sm:col-span-2">
        {sending ? <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" /> : <Send className="h-5 w-5" aria-hidden="true" />}
        {sending ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
