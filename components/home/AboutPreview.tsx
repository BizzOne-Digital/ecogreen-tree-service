import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import SafeImage from "@/components/ui/SafeImage";
import { lines } from "@/lib/format";

export default function AboutPreview({ content }: { content: Record<string, string> }) {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="container-site grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl">
          <SafeImage src={content.aboutImage} alt="Tree service crew beside a work truck" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
        </div>
        <div>
          <p className="eyebrow eyebrow-left">{content.aboutEyebrow}</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-forest-950 sm:text-4xl">{content.aboutHeading}</h2>
          <p className="mt-4 text-lg leading-relaxed text-gray-700">{content.aboutText}</p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {lines(content.aboutPoints).map((point) => (
              <li key={point} className="flex items-center gap-2 font-semibold text-forest-900"><CheckCircle2 className="h-5 w-5 shrink-0 text-leaf" aria-hidden="true" />{point}</li>
            ))}
          </ul>
          <Link href="/about" className="btn btn-green mt-8">{content.aboutCta}<ArrowRight className="h-5 w-5" aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  );
}
