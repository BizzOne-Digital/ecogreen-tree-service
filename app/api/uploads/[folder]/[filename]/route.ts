import { StoredUpload } from "@/lib/models";
import { connectDB } from "@/lib/mongodb";
import { isAllowedFolder, isSafeFilename, toBytes } from "@/lib/uploads";

export const runtime = "nodejs";

export async function GET(_request: Request, { params }: { params: Promise<{ folder: string; filename: string }> }) {
  const { folder, filename } = await params;
  if (!isAllowedFolder(folder) || !isSafeFilename(filename)) {
    return new Response("Invalid path", { status: 400 });
  }

  await connectDB();
  const upload = await StoredUpload.findOne({ folder, filename }).lean();
  if (!upload) return new Response("Not found", { status: 404 });

  const bytes = toBytes(upload.data);
  return new Response(bytes, {
    headers: {
      "Content-Type": upload.mimeType,
      "Content-Length": String(bytes.length),
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
