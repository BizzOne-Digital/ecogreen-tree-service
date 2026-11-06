"use client";

import { useRef, useState } from "react";
import { ImagePlus, LoaderCircle, RefreshCw, Trash2 } from "lucide-react";
import SafeImage from "@/components/ui/SafeImage";
import { shrinkImage } from "@/lib/shrinkImage";
import { useToast } from "./Toast";

type Props = {
  value: string;
  folder: "products" | "gallery" | "pages" | "misc";
  onChange: (url: string) => void;
  label?: string;
};

const ACCEPTED = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_BYTES = 8 * 1024 * 1024;

/**
 * Uploads to MongoDB through /api/upload and hands back only the URL. The previous
 * saved image is deleted by the server after the form save succeeds, never here.
 */
export default function AdminImageField({ value, folder, onChange, label }: Props) {
  const input = useRef<HTMLInputElement>(null);
  const toast = useToast();
  const [uploading, setUploading] = useState(false);
  const unsaved = useRef(new Set<string>());

  /** The API refuses to delete anything a saved document still uses. */
  function discardIfUnsaved(url: string) {
    if (!unsaved.current.delete(url)) return;
    void fetch("/api/upload", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ url }) });
  }

  async function upload(original: File) {
    if (!ACCEPTED.includes(original.type)) return toast("Please choose a JPEG, PNG, WebP or GIF image", "error");
    if (original.size > MAX_BYTES) return toast("Image must be 8MB or smaller", "error");
    setUploading(true);
    try {
      const file = await shrinkImage(original);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);
      const response = await fetch("/api/upload", { method: "POST", body: formData });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.success) throw new Error(result.error || "Upload failed");
      discardIfUnsaved(value);
      unsaved.current.add(result.url);
      onChange(result.url);
      toast("Image uploaded. Save to apply it.");
    } catch (error) {
      toast(error instanceof Error ? error.message : "Upload failed", "error");
    } finally {
      setUploading(false);
      if (input.current) input.current.value = "";
    }
  }

  const button = "inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-semibold transition hover:bg-mist disabled:opacity-50";

  return (
    <div>
      {label && <p className="mb-1.5 text-sm font-semibold text-forest-950">{label}</p>}
      <div className="flex flex-wrap items-center gap-4">
        <div className="relative grid h-24 w-36 place-items-center overflow-hidden rounded-lg border bg-mist">
          {value ? <SafeImage src={value} alt="Current image" fill sizes="144px" className="object-cover" />
            : <ImagePlus className="h-7 w-7 text-gray-400" aria-hidden="true" />}
          {uploading && (
            <span className="absolute inset-0 grid place-items-center bg-white/75">
              <LoaderCircle className="h-6 w-6 animate-spin text-leaf" aria-label="Uploading" />
            </span>
          )}
        </div>
        <input ref={input} type="file" accept={ACCEPTED.join(",")} disabled={uploading} className="sr-only" aria-label={label ? `Upload ${label}` : "Upload image"}
          onChange={(event) => { const file = event.target.files?.[0]; if (file) void upload(file); }} />
        <div className="flex gap-2">
          <button type="button" disabled={uploading} onClick={() => input.current?.click()} className={button}>
            <RefreshCw className="h-4 w-4" aria-hidden="true" />{uploading ? "Uploading..." : value ? "Replace" : "Upload"}
          </button>
          {value && (
            <button type="button" disabled={uploading} onClick={() => { discardIfUnsaved(value); onChange(""); }} className={`${button} text-red-700`}>
              <Trash2 className="h-4 w-4" aria-hidden="true" />Remove
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
