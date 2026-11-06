"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const body = Object.fromEntries(new FormData(event.currentTarget));
    const response = await fetch("/api/admin/login", {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body),
    }).catch(() => null);
    if (response?.ok) { window.location.href = "/admin"; return; }
    const result = await response?.json().catch(() => ({}));
    setError(result?.error || "Login failed");
    setBusy(false);
  }

  return (
    <main className="grid min-h-screen place-items-center bg-forest-900 p-4">
      <form onSubmit={submit} className="w-full max-w-sm space-y-4 rounded-2xl bg-white p-8 shadow-xl">
        <Image src="/images/logo.png" alt="EcoGreen Tree Service LLC" width={966} height={318} priority className="mx-auto h-16 w-auto" />
        <h1 className="text-center text-xl font-extrabold text-forest-950">Admin Login</h1>
        <label className="block"><span className="mb-1 block text-sm font-semibold">Email</span><input name="email" type="email" required autoComplete="username" className="field" /></label>
        <label className="block"><span className="mb-1 block text-sm font-semibold">Password</span><input name="password" type="password" required autoComplete="current-password" className="field" /></label>
        {error && <p role="alert" className="text-sm font-medium text-red-700">{error}</p>}
        <button type="submit" disabled={busy} className="btn btn-green w-full">{busy ? "Signing in..." : "Sign In"}</button>
      </form>
    </main>
  );
}
