import { cache } from "react";
import { hasDatabase } from "./mongodb";
import { FAQ, GalleryItem, Service, SiteContent, TeamMember, Testimonial } from "./models";
import { ensureSeeded } from "./seed";
import { seedFaqs, seedServices, seedTeam, seedTestimonials } from "./seed-data";
import { defaultContent, type PageKey } from "./content-schema";
import type { FaqT, GalleryT, ServiceT, TeamT, TestimonialT } from "./types";

const plain = <T,>(value: unknown): T => JSON.parse(JSON.stringify(value));
const withIds = <T,>(items: object[]) => items.map((item, n) => ({ _id: `default-${n}`, ...item })) as T[];

/** The public site keeps working from defaults if the database is unavailable. */
async function read<T>(query: () => Promise<unknown>, fallback: T): Promise<T> {
  if (!hasDatabase()) return fallback;
  try {
    await ensureSeeded();
    return plain<T>(await query());
  } catch (error) {
    console.error("Database read failed, using defaults:", error);
    return fallback;
  }
}

export const getContent = cache(async (page: PageKey) => {
  const stored = await read<{ data?: Record<string, string> } | null>(
    () => SiteContent.findOne({ key: page }).lean(), null,
  );
  return { ...defaultContent(page), ...stored?.data };
});

export const getServices = cache(() =>
  read<ServiceT[]>(() => Service.find({ published: true }).sort({ order: 1 }).lean(), withIds(seedServices)));

export const getService = cache(async (slug: string) =>
  (await getServices()).find((service) => service.slug === slug) ?? null);

export const getTeam = cache(() =>
  read<TeamT[]>(() => TeamMember.find({ active: true }).sort({ order: 1 }).lean(), withIds(seedTeam)));

export const getTestimonials = cache(() =>
  read<TestimonialT[]>(() => Testimonial.find({ published: true }).sort({ order: 1 }).lean(), withIds(seedTestimonials)));

export const getFaqs = cache(() =>
  read<FaqT[]>(() => FAQ.find({ active: true }).sort({ order: 1 }).lean(), withIds(seedFaqs)));

export const getGallery = cache(() =>
  read<GalleryT[]>(() => GalleryItem.find({ active: true }).sort({ order: 1 }).lean(), []));
