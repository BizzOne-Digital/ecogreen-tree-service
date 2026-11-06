"use client";

import { useRouter } from "next/navigation";

export default function InquiryActions({ id, read }: { id: string; read: boolean }) {
  const router = useRouter();
  async function call(method: string, body?: object) {
    await fetch(`/api/admin/inquiries/${id}`, { method, headers: { "Content-Type": "application/json" }, body: body && JSON.stringify(body) });
    router.refresh();
  }
  return (
    <div className="flex gap-3 text-sm font-semibold">
      <button type="button" className="text-leaf hover:underline" onClick={() => call("PATCH", { read: !read })}>Mark {read ? "unread" : "read"}</button>
      <button type="button" className="text-red-700 hover:underline" onClick={() => { if (window.confirm("Delete this inquiry?")) void call("DELETE"); }}>Delete</button>
    </div>
  );
}
