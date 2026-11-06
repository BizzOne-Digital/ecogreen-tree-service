export const PLACEHOLDER_IMAGE = "/images/placeholder.jpg";

/**
 * Returns a URL next/image can always render. Legacy /uploads/... paths no longer
 * exist after deployment, and unknown hosts would make next/image throw.
 */
export function resolveImage(url?: string | null, fallback = PLACEHOLDER_IMAGE): string {
  if (!url) return fallback;
  if (url.startsWith("/api/uploads/") || url.startsWith("/images/")) return url;
  if (url.startsWith("https://images.unsplash.com/")) return url;
  return fallback;
}
