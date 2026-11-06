import Link from "next/link";
import { ArrowRight, TriangleAlert } from "lucide-react";
import SafeImage from "@/components/ui/SafeImage";
import { lines } from "@/lib/format";

export default function WarningSigns({ content }: { content: Record<string, string> }) {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="container-site grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="eyebrow eyebrow-left">{content.signsEyebrow}</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-forest-950 sm:text-4xl">{content.signsHeading}</h2>
          <p className="mt-4 text-lg leading-relaxed text-gray-700">{content.signsText}</p>
          <ul className="mt-6 space-y-3">
            {lines(content.signsPoints).map((point) => (
              <li key={point} className="flex items-start gap-3 font-semibold text-forest-900"><TriangleAlert className="mt-0.5 h-5 w-5 shrink-0 text-leaf" aria-hidden="true" />{point}</li>
            ))}
          </ul>
          <p className="mt-6 rounded-xl bg-mist p-4 text-sm leading-relaxed text-gray-700">{content.signsNote}</p>
          <Link href="/contact" className="btn btn-green mt-6">{content.signsCta}<ArrowRight className="h-5 w-5" aria-hidden="true" /></Link>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl">
          <SafeImage src={content.signsImage} alt="Tree service worker reviewing a job with a homeowner" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
        </div>
      </div>
    </section>
  );
}
