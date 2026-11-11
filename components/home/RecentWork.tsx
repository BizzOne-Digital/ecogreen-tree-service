import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SafeImage from "@/components/ui/SafeImage";
import SectionHeading from "@/components/ui/SectionHeading";
import { WORK_PHOTOS } from "@/lib/work-photos";

const FEATURED = [1, 5, 9, 14, 2, 10, 18, 21].map((n) => WORK_PHOTOS[n - 1]);

export default function RecentWork() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="container-site">
        <SectionHeading eyebrow="OUR WORK" title="Real Jobs by Our Crew" />
        <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-gray-700">Photos taken on real EcoGreen Tree Service LLC job sites.</p>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {FEATURED.map((src, index) => (
            <a key={src} href={src} target="_blank" rel="noopener" className="group relative block aspect-[3/4] overflow-hidden rounded-2xl shadow-md">
              <SafeImage src={src} alt={`EcoGreen tree service job photo ${index + 1}`} fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover transition duration-500 group-hover:scale-105" />
            </a>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/gallery" className="btn btn-green">See All Photos<ArrowRight className="h-5 w-5" aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  );
}
