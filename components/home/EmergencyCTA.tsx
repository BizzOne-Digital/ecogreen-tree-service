import { Phone, TriangleAlert } from "lucide-react";
import SafeImage from "@/components/ui/SafeImage";
import { lines, telHref } from "@/lib/format";

export default function EmergencyCTA({ content, phone }: { content: Record<string, string>; phone: string }) {
  return (
    <section className="bg-forest-950 py-16 text-white sm:py-20">
      <div className="container-site grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <TriangleAlert className="h-11 w-11 text-lime" aria-hidden="true" />
          <h2 className="mt-3 text-3xl font-black italic leading-tight sm:text-5xl">{content.emergencyHeading}</h2>
          <p className="mt-4 text-lg text-white/85">{content.emergencyText}</p>
          <ul className="mt-5 grid gap-2 sm:grid-cols-2">
            {lines(content.emergencyPoints).map((point) => (
              <li key={point} className="flex items-center gap-2 font-semibold"><span className="h-2 w-2 rounded-full bg-lime" aria-hidden="true" />{point}</li>
            ))}
          </ul>
          <a href={telHref(phone)} className="btn btn-lime mt-8 text-lg"><Phone className="h-5 w-5" aria-hidden="true" />Call {phone}</a>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl ring-4 ring-lime/70">
          <SafeImage src={content.emergencyImage} alt="Large uprooted tree fallen beside a house" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
        </div>
      </div>
    </section>
  );
}
