import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import SafeImage from "@/components/ui/SafeImage";
import { getContent, getGallery } from "@/lib/data";
import { WORK_PHOTOS } from "@/lib/work-photos";

export const metadata: Metadata = {
  title: "Project Gallery",
  description: "Photos of tree work completed by EcoGreen Tree Service LLC.",
  alternates: { canonical: "/gallery" },
};

export default async function GalleryPage() {
  const [c, photos] = await Promise.all([getContent("services"), getGallery()]);
  return (
    <>
      <PageHero title="Project Gallery" subtitle="A look at our recent tree work." image={c.heroImage} alt="" />
      <section className="py-16">
        <div className="container-site">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {photos.map((photo) => (
              <figure key={photo._id} className="overflow-hidden rounded-2xl bg-white shadow-md">
                <div className="relative aspect-[4/3]">
                  <SafeImage src={photo.imageUrl} alt={photo.caption || "EcoGreen tree service project"} fill sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="object-cover" />
                </div>
                {photo.caption && <figcaption className="p-4 font-medium text-forest-900">{photo.caption}</figcaption>}
              </figure>
            ))}
            {WORK_PHOTOS.map((src, index) => (
              <a key={src} href={src} target="_blank" rel="noopener" className="group relative block aspect-[3/4] overflow-hidden rounded-2xl shadow-md">
                <SafeImage src={src} alt={`EcoGreen tree service job photo ${index + 1}`} fill sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="object-cover transition duration-500 group-hover:scale-105" />
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
