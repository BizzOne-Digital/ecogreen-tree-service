export const ALLOWED_FOLDERS = ["products", "gallery", "pages", "misc"] as const;
export type UploadFolder = (typeof ALLOWED_FOLDERS)[number];

export const MAX_UPLOAD_BYTES = 8 * 1024 * 1024;
/** Customer photos are limited to fit under Vercel's 4.5MB request body limit. */
export const MAX_PUBLIC_UPLOAD_BYTES = 4 * 1024 * 1024;

export const MIME_EXTENSIONS: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

export const isAllowedFolder = (folder: unknown): folder is UploadFolder =>
  typeof folder === "string" && (ALLOWED_FOLDERS as readonly string[]).includes(folder);

export const isSafeFilename = (name: string) =>
  name.length > 0 && name.length <= 100 && !/\.\.|[/\\]/.test(name);

/** Checks the file's real signature, since the browser-sent MIME type can be forged. */
export function matchesSignature(buffer: Buffer, mimeType: string): boolean {
  const ascii = (start: number, end: number) => buffer.toString("latin1", start, end);
  switch (mimeType) {
    case "image/jpeg": return buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
    case "image/png": return ascii(1, 4) === "PNG" && buffer[0] === 0x89;
    case "image/gif": return ascii(0, 4) === "GIF8";
    case "image/webp": return ascii(0, 4) === "RIFF" && ascii(8, 12) === "WEBP";
    default: return false;
  }
}

/** Normalises the value a lean Mongoose query returns (Buffer or BSON Binary) to bytes. */
export function toBytes(data: unknown): Uint8Array<ArrayBuffer> {
  const value = data as { buffer?: Uint8Array; position?: number };
  const source = Buffer.isBuffer(data)
    ? data
    : value.buffer instanceof Uint8Array
      ? value.buffer.subarray(0, value.position ?? value.buffer.length)
      : new Uint8Array(0);
  const bytes = new Uint8Array(source.length);
  bytes.set(source);
  return bytes;
}
