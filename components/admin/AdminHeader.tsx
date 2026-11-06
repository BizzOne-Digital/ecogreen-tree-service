"use client";

import { ExternalLink, LogOut } from "lucide-react";

export default function AdminHeader({ email }: { email: string }) {
  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }
  return (
    <header className="flex items-center justify-end gap-4 border-b bg-white py-3 pl-16 pr-5 text-sm">
      <span className="hidden text-gray-600 sm:inline">{email}</span>
      <a href="/" target="_blank" className="inline-flex items-center gap-1 font-semibold text-leaf hover:underline"><ExternalLink className="h-4 w-4" aria-hidden="true" />View site</a>
      <button type="button" onClick={logout} className="inline-flex items-center gap-1 font-semibold text-forest-900 hover:underline"><LogOut className="h-4 w-4" aria-hidden="true" />Log out</button>
    </header>
  );
}
