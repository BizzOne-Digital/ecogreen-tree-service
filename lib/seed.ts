import { connectDB } from "./mongodb";
import { FAQ, Service, SiteContent, TeamMember, Testimonial } from "./models";
import { seedFaqs, seedServices, seedTeam, seedTestimonials } from "./seed-data";

const globalSeed = globalThis as unknown as { _seedPromise?: Promise<void> };

/**
 * Inserts starter content once per database. A marker document, not empty
 * collections, records this, so anything the admin deletes stays deleted.
 */
async function seedOnce() {
  await connectDB();
  const marker = await SiteContent.findOneAndUpdate(
    { key: "__seeded" },
    { $setOnInsert: { data: {} } },
    { upsert: true },
  );
  if (marker) return;
  try {
    await Promise.all([
      Service.insertMany(seedServices),
      TeamMember.insertMany(seedTeam),
      Testimonial.insertMany(seedTestimonials),
      FAQ.insertMany(seedFaqs),
    ]);
  } catch (error) {
    await SiteContent.deleteOne({ key: "__seeded" });
    throw error;
  }
}

export function ensureSeeded() {
  globalSeed._seedPromise ??= seedOnce().catch((error) => {
    globalSeed._seedPromise = undefined;
    throw error;
  });
  return globalSeed._seedPromise;
}
