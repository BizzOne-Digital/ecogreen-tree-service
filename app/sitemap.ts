import type { MetadataRoute } from "next";
import { getGallery, getServices } from "@/lib/data";
import { siteUrl } from "@/lib/site";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, gallery] = await Promise.all([getServices(), getGallery()]);
  const paths = ["", "/about", "/services", "/team", "/testimonials", "/faq", "/booking", "/contact",
    ...(gallery.length ? ["/gallery"] : []),
    ...services.map((service) => `/services/${service.slug}`)];
  return paths.map((path) => ({ url: `${siteUrl()}${path}` }));
}
