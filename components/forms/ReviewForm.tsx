"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, LoaderCircle, Send, Star } from "lucide-react";
import FormField, { Honeypot } from "./FormField";

export default function ReviewForm({ services }: { services: string[] }) {
  const [rating, setRating] = useState(5);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setError("");
    try {
      const body = { ...Object.fromEntries(new FormData(event.currentTarget)), rating };
      const response = await fetch("/api/reviews", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error);
      setDone(true);
    } catch (caught) {
      setError((caught instanceof Error && caught.message) || "Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  }

  if (done) {
    return (
      <div role="status" className="rounded-2xl bg-white p-10 text-center shadow-md">
        <CheckCircle2 className="mx-auto h-16 w-16 text-leaf" aria-hidden="true" />
        <h2 className="mt-4 text-2xl font-extrabold text-forest-950">Thank You for Your Review!</h2>
        <p className="mt-2 text-gray-700">Your review will appear on the site after a quick check by our team.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="relative grid gap-5 rounded-2xl bg-white p-6 shadow-md sm:grid-cols-2 sm:p-8">
      <Honeypot />
      <fieldset className="sm:col-span-2">
        <legend className="mb-1.5 text-sm font-semibold text-forest-950">Your rating <span className="text-red-700" aria-hidden="true">*</span></legend>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((value) => (
            <button key={value} type="button" onClick={() => setRating(value)} aria-label={`${value} star${value > 1 ? "s" : ""}`} aria-pressed={rating === value}
              className="rounded p-0.5 transition hover:scale-110">
              <Star className={`h-8 w-8 ${value <= rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}`} aria-hidden="true" />
            </button>
          ))}
        </div>
      </fieldset>
      <FormField label="Your name" required><input name="name" required maxLength={80} autoComplete="name" className="field" /></FormField>
      <FormField label="Service you received">
        <select name="service" defaultValue="" className="field">
          <option value="">Select a service</option>
          {[...services, "Other"].map((service) => <option key={service}>{service}</option>)}
        </select>
      </FormField>
      <FormField label="Your review" required className="sm:col-span-2">
        <textarea name="review" required minLength={10} maxLength={1500} rows={5} className="field" placeholder="How was your experience with EcoGreen Tree Service LLC?" />
      </FormField>
      {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm font-medium text-red-800 sm:col-span-2">{error}</p>}
      <button type="submit" disabled={sending} className="btn btn-green sm:col-span-2">
        {sending ? <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" /> : <Send className="h-5 w-5" aria-hidden="true" />}
        {sending ? "Sending..." : "Submit Review"}
      </button>
    </form>
  );
}
