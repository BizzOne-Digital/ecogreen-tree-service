"use client";

import { useEffect, useState, type FormEvent } from "react";
import { LoaderCircle } from "lucide-react";
import { CONTENT, PAGE_KEYS, type ContentField, type PageKey } from "@/lib/content-schema";
import AdminImageField from "./AdminImageField";
import { useToast } from "./Toast";

export default function ContentEditor() {
  const toast = useToast();
  const [page, setPage] = useState<PageKey>("global");
  const [data, setData] = useState<Record<string, string> | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let stale = false;
    setData(null);
    fetch(`/api/admin/content?page=${page}`).then((r) => r.json()).then((result) => {
      if (!stale) setData(result.data ?? {});
    }).catch(() => toast("Could not load content", "error"));
    return () => { stale = true; };
  }, [page, toast]);

  async function save(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    const response = await fetch("/api/admin/content", {
      method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ page, data }),
    }).catch(() => null);
    setSaving(false);
    toast(response?.ok ? "Content saved" : "Could not save", response?.ok ? "success" : "error");
  }

  const fields = CONTENT[page].fields as ContentField[];
  return (
    <div>
      <h1 className="text-2xl font-extrabold text-forest-950">Page Content</h1>
      <div role="tablist" className="mt-4 flex flex-wrap gap-2">
        {PAGE_KEYS.map((key) => (
          <button key={key} type="button" role="tab" aria-selected={page === key} onClick={() => setPage(key)}
            className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${page === key ? "bg-forest-800 text-white" : "bg-white hover:bg-mist"}`}>
            {CONTENT[key].label}
          </button>
        ))}
      </div>
      {!data ? (
        <LoaderCircle className="mx-auto mt-10 h-8 w-8 animate-spin text-leaf" aria-label="Loading" />
      ) : (
        <form key={page} onSubmit={save} className="mt-5 space-y-4 rounded-xl bg-white p-5 shadow-sm">
          {fields.map((field) => {
            const set = (value: string) => setData((d) => ({ ...d, [field.key]: value }));
            if (field.type === "image") {
              return <AdminImageField key={field.key} label={field.label} folder="pages" value={data[field.key] ?? ""} onChange={set} />;
            }
            return (
              <label key={field.key} className="block">
                <span className="mb-1 block text-sm font-semibold text-forest-950">{field.label}</span>
                {field.type === "text"
                  ? <input className="field" value={data[field.key] ?? ""} onChange={(e) => set(e.target.value)} />
                  : <textarea rows={field.type === "lines" ? 4 : 3} className="field" value={data[field.key] ?? ""} onChange={(e) => set(e.target.value)} />}
              </label>
            );
          })}
          <button type="submit" disabled={saving} className="btn btn-green">{saving ? "Saving..." : "Save Changes"}</button>
        </form>
      )}
    </div>
  );
}
