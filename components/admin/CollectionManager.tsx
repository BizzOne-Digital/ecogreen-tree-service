"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import { ArrowDown, ArrowUp, Eye, EyeOff, LoaderCircle, Pencil, Plus, Trash2 } from "lucide-react";
import SafeImage from "@/components/ui/SafeImage";
import { RESOURCES, SERVICE_ICONS, type Resource, type ResourceKey } from "@/lib/resources";
import AdminImageField from "./AdminImageField";
import { useToast } from "./Toast";

type Item = Record<string, unknown> & { _id: string };
type Draft = Record<string, unknown>;

/** Add, edit, delete, reorder and publish for any collection described in lib/resources. */
export default function CollectionManager({ resourceKey }: { resourceKey: ResourceKey }) {
  const resource: Resource = RESOURCES[resourceKey];
  const endpoint = `/api/admin/${resourceKey}`;
  const toast = useToast();
  const [items, setItems] = useState<Item[] | null>(null);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    const response = await fetch(endpoint);
    const result = await response.json().catch(() => ({}));
    if (response.ok) setItems(result.items);
    else toast(result.error || "Could not load", "error");
  }, [endpoint, toast]);

  useEffect(() => { void load(); }, [load]);

  const newDraft = (): Draft => ({
    [resource.toggleKey]: true,
    ...Object.fromEntries(resource.fields.map((f) => [f.key, f.type === "rating" ? 5 : f.type === "icon" ? SERVICE_ICONS[0] : ""])),
  });

  const edit = (item: Item): Draft => ({
    ...item,
    ...Object.fromEntries(resource.fields.filter((f) => f.type === "lines").map((f) => [f.key, ((item[f.key] as string[]) ?? []).join("\n")])),
  });

  async function send(url: string, method: string, body?: unknown) {
    const response = await fetch(url, {
      method, headers: { "Content-Type": "application/json" }, body: body === undefined ? undefined : JSON.stringify(body),
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(result.error || "Request failed");
  }

  async function save(event: FormEvent) {
    event.preventDefault();
    if (!draft) return;
    const missing = resource.fields.find((f) => f.required && !draft[f.key]);
    if (missing) return toast(`${missing.label} is required`, "error");
    setSaving(true);
    try {
      await send(draft._id ? `${endpoint}/${draft._id}` : endpoint, draft._id ? "PUT" : "POST", draft);
      toast(`${resource.singular} saved`);
      setDraft(null);
      await load();
    } catch (error) {
      toast(error instanceof Error ? error.message : "Could not save", "error");
    } finally {
      setSaving(false);
    }
  }

  async function run(action: () => Promise<void>, message: string) {
    try {
      await action();
      toast(message);
      await load();
    } catch (error) {
      toast(error instanceof Error ? error.message : "Request failed", "error");
    }
  }

  const remove = (item: Item) => {
    if (window.confirm(`Delete this ${resource.singular.toLowerCase()}? This cannot be undone.`)) {
      void run(() => send(`${endpoint}/${item._id}`, "DELETE"), `${resource.singular} deleted`);
    }
  };
  const toggle = (item: Item) =>
    run(() => send(`${endpoint}/${item._id}`, "PUT", { ...item, [resource.toggleKey]: !item[resource.toggleKey] }), "Visibility updated");
  const move = (index: number, direction: number) => {
    if (!items) return;
    const ids = items.map((item) => item._id);
    [ids[index], ids[index + direction]] = [ids[index + direction], ids[index]];
    void run(() => send(endpoint, "PATCH", { ids }), "Order updated");
  };

  const iconButton = "grid h-9 w-9 place-items-center rounded-lg border bg-white transition hover:bg-mist disabled:opacity-30";

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-extrabold text-forest-950">{resource.label}</h1>
        <button type="button" onClick={() => setDraft(newDraft())} className="btn btn-green"><Plus className="h-5 w-5" aria-hidden="true" />Add {resource.singular}</button>
      </div>

      {draft && (
        <form onSubmit={save} className="mt-5 space-y-4 rounded-xl bg-white p-5 shadow-sm">
          <h2 className="text-lg font-extrabold text-forest-950">{draft._id ? "Edit" : "New"} {resource.singular}</h2>
          {resource.fields.map((field) => {
            const set = (value: unknown) => setDraft((d) => ({ ...d, [field.key]: value }));
            const value = draft[field.key];
            if (field.type === "image") {
              return <AdminImageField key={field.key} label={field.label} folder={field.folder ?? "pages"} value={String(value ?? "")} onChange={set} />;
            }
            return (
              <label key={field.key} className="block">
                <span className="mb-1 block text-sm font-semibold text-forest-950">{field.label}{field.required && " *"}</span>
                {field.type === "textarea" || field.type === "lines" ? (
                  <textarea rows={4} className="field" value={String(value ?? "")} onChange={(e) => set(e.target.value)} />
                ) : field.type === "icon" ? (
                  <select className="field" value={String(value)} onChange={(e) => set(e.target.value)}>{SERVICE_ICONS.map((icon) => <option key={icon}>{icon}</option>)}</select>
                ) : field.type === "rating" ? (
                  <select className="field" value={String(value)} onChange={(e) => set(Number(e.target.value))}>{[5, 4, 3, 2, 1].map((n) => <option key={n}>{n}</option>)}</select>
                ) : (
                  <input className="field" value={String(value ?? "")} onChange={(e) => set(e.target.value)} />
                )}
              </label>
            );
          })}
          <label className="flex items-center gap-2 font-semibold">
            <input type="checkbox" className="h-5 w-5" checked={draft[resource.toggleKey] !== false} onChange={(e) => setDraft({ ...draft, [resource.toggleKey]: e.target.checked })} />
            {resource.toggleLabel}
          </label>
          <div className="flex gap-3">
            <button type="submit" disabled={saving} className="btn btn-green">{saving ? "Saving..." : "Save"}</button>
            <button type="button" onClick={() => setDraft(null)} className="btn border">Cancel</button>
          </div>
        </form>
      )}

      {items === null ? (
        <LoaderCircle className="mx-auto mt-10 h-8 w-8 animate-spin text-leaf" aria-label="Loading" />
      ) : items.length === 0 ? (
        <p className="mt-5 rounded-xl bg-white p-8 text-center text-gray-600 shadow-sm">Nothing here yet.</p>
      ) : (
        <ul className="mt-5 space-y-3">
          {items.map((item, index) => {
            const visible = item[resource.toggleKey] !== false;
            const image = resource.imageKey ? String(item[resource.imageKey] ?? "") : "";
            return (
              <li key={item._id} className={`flex flex-wrap items-center gap-4 rounded-xl bg-white p-3 shadow-sm ${visible ? "" : "opacity-60"}`}>
                {resource.imageKey && (
                  <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-mist">
                    {image && <SafeImage src={image} alt="" fill sizes="80px" className="object-cover" />}
                  </div>
                )}
                <div className="min-w-0 flex-1 basis-48">
                  <p className="truncate font-bold text-forest-950">{String(item[resource.titleKey] || "(no caption)")}</p>
                  {resource.subtitleKey && <p className="truncate text-sm text-gray-600">{String(item[resource.subtitleKey] ?? "")}</p>}
                </div>
                <div className="flex gap-1.5">
                  <button type="button" aria-label="Move up" disabled={index === 0} onClick={() => move(index, -1)} className={iconButton}><ArrowUp className="h-4 w-4" aria-hidden="true" /></button>
                  <button type="button" aria-label="Move down" disabled={index === items.length - 1} onClick={() => move(index, 1)} className={iconButton}><ArrowDown className="h-4 w-4" aria-hidden="true" /></button>
                  <button type="button" aria-label={visible ? "Hide from site" : "Show on site"} onClick={() => toggle(item)} className={iconButton}>
                    {visible ? <Eye className="h-4 w-4" aria-hidden="true" /> : <EyeOff className="h-4 w-4" aria-hidden="true" />}
                  </button>
                  <button type="button" aria-label="Edit" onClick={() => { setDraft(edit(item)); window.scrollTo({ top: 0 }); }} className={iconButton}><Pencil className="h-4 w-4" aria-hidden="true" /></button>
                  <button type="button" aria-label="Delete" onClick={() => remove(item)} className={`${iconButton} text-red-700`}><Trash2 className="h-4 w-4" aria-hidden="true" /></button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
