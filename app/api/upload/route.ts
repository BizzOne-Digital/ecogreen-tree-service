import crypto from "crypto";
import { NextResponse } from "next/server";
import { getAdminSession, unauthorized } from "@/lib/auth";
import { deleteStoredUpload, isUploadReferenced, parseUploadUrl } from "@/lib/deleteStoredUpload";
import { StoredUpload } from "@/lib/models";
import { connectDB } from "@/lib/mongodb";
import { MAX_UPLOAD_BYTES, MIME_EXTENSIONS, isAllowedFolder, matchesSignature } from "@/lib/uploads";

export const runtime = "nodejs";

const fail = (error: string, status = 400) => NextResponse.json({ success: false, error }, { status });

export async function POST(request: Request) {
  if (!(await getAdminSession())) return unauthorized();

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return fail("Invalid upload");
  }
  const file = form.get("file");
  const folder = form.get("folder");

  if (!isAllowedFolder(folder)) return fail("Invalid folder");
  if (!(file instanceof File)) return fail("No file provided");
  const extension = MIME_EXTENSIONS[file.type];
  if (!extension) return fail("Only JPEG, PNG, WebP and GIF images are allowed");
  if (file.size > MAX_UPLOAD_BYTES) return fail("Image must be 8MB or smaller", 413);

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  if (!matchesSignature(buffer, file.type)) return fail("File content is not a valid image");

  const randomHex = crypto.randomBytes(8).toString("hex");
  const filename = `${Date.now()}-${randomHex}.${extension}`;

  await connectDB();
  await StoredUpload.create({ folder, filename, mimeType: file.type, size: buffer.length, data: buffer });

  return NextResponse.json({
    success: true,
    url: `/api/uploads/${folder}/${filename}`,
    filename,
    size: buffer.length,
    folder,
  });
}

/** Discards an upload that was replaced before it was saved. Saved images are never removed here. */
export async function DELETE(request: Request) {
  if (!(await getAdminSession())) return unauthorized();
  const { url } = await request.json();
  if (!parseUploadUrl(url)) return fail("Invalid image URL");
  if (await isUploadReferenced(url)) return NextResponse.json({ success: true, deleted: false });
  return NextResponse.json({ success: true, deleted: await deleteStoredUpload(url) });
}
