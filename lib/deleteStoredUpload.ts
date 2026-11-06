import { connectDB } from "./mongodb";
import { GalleryItem, Service, SiteContent, StoredUpload, TeamMember, Testimonial } from "./models";
import { isAllowedFolder, isSafeFilename } from "./uploads";

export function parseUploadUrl(url: unknown) {
  if (typeof url !== "string") return null;
  const match = /^\/api\/uploads\/([^/]+)\/([^/?#]+)$/.exec(url);
  if (!match || !isAllowedFolder(match[1]) || !isSafeFilename(match[2])) return null;
  return { folder: match[1], filename: match[2] };
}

/** Removes a Mongo-stored image. Unsplash URLs and static assets are ignored. */
export async function deleteStoredUpload(url: unknown) {
  const parsed = parseUploadUrl(url);
  if (!parsed) return false;
  await connectDB();
  const { deletedCount } = await StoredUpload.deleteOne(parsed);
  return deletedCount > 0;
}

export async function isUploadReferenced(url: string) {
  await connectDB();
  const [service, team, review, photo, pages] = await Promise.all([
    Service.exists({ $or: [{ cardImage: url }, { heroImage: url }] }),
    TeamMember.exists({ image: url }),
    Testimonial.exists({ image: url }),
    GalleryItem.exists({ imageUrl: url }),
    SiteContent.find().lean(),
  ]);
  return Boolean(service || team || review || photo)
    || pages.some((page) => Object.values(page.data ?? {}).includes(url));
}

export function uploadUrlsIn(value: unknown): string[] {
  if (!value || typeof value !== "object") return [];
  return Object.values(value).filter(
    (v): v is string => typeof v === "string" && v.startsWith("/api/uploads/"),
  );
}

/** Call only after the new document is saved. Shared images stay until unused. */
export async function cleanupRemovedUploads(before: unknown, after: unknown) {
  const kept = new Set(uploadUrlsIn(after));
  for (const url of uploadUrlsIn(before)) {
    if (kept.has(url)) continue;
    try {
      if (!(await isUploadReferenced(url))) await deleteStoredUpload(url);
    } catch (error) {
      console.error("Could not remove old upload", url, error);
    }
  }
}
