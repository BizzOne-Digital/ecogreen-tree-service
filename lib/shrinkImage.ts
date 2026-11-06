/**
 * Vercel functions reject request bodies over ~4.5MB, so larger photos are resized
 * in the browser first. GIFs are left alone because a canvas would drop animation.
 */
export async function shrinkImage(file: File, limit = 4 * 1024 * 1024): Promise<File> {
  if (file.size <= limit || file.type === "image/gif") return file;
  try {
    const bitmap = await createImageBitmap(file);
    for (const [maxSide, quality] of [[2400, 0.85], [1800, 0.8], [1400, 0.75]]) {
      const scale = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(bitmap.width * scale);
      canvas.height = Math.round(bitmap.height * scale);
      canvas.getContext("2d")?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
      const blob = await new Promise<Blob | null>((done) => canvas.toBlob(done, "image/jpeg", quality));
      if (blob && blob.size <= limit) {
        return new File([blob], file.name.replace(/\.\w+$/, "") + ".jpg", { type: "image/jpeg" });
      }
    }
  } catch {
    // Fall through: the server applies its own size limit.
  }
  return file;
}
