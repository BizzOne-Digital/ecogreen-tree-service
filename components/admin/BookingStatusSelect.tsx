"use client";

import { useState } from "react";
import { useToast } from "./Toast";

const STATUSES = ["New", "Contacted", "Scheduled", "Completed", "Cancelled"];

export default function BookingStatusSelect({ id, status }: { id: string; status: string }) {
  const toast = useToast();
  const [value, setValue] = useState(status);
  const [saving, setSaving] = useState(false);

  async function change(next: string) {
    setSaving(true);
    const response = await fetch(`/api/admin/bookings/${id}`, {
      method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: next }),
    }).catch(() => null);
    setSaving(false);
    if (response?.ok) { setValue(next); toast("Status updated"); }
    else toast("Could not update status", "error");
  }

  return (
    <select aria-label="Booking status" disabled={saving} value={value} onChange={(e) => change(e.target.value)} className="rounded-lg border bg-white px-2 py-1.5 text-sm font-semibold">
      {STATUSES.map((s) => <option key={s}>{s}</option>)}
    </select>
  );
}
