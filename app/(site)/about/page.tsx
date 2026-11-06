import type { Metadata } from "next";
import { CheckCircle2, Heart, ShieldCheck, Target } from "lucide-react";
import FinalCTA from "@/components/ui/FinalCTA";
import PageHero from "@/components/ui/PageHero";
import SafeImage from "@/components/ui/SafeImage";
import { getContent } from "@/lib/data";
import { lines } from "@/lib/format";

export const metadata: Metadata = {
  title: "About Us",
  description: "EcoGreen Tree Service LLC is committed to high-quality residential tree services with safety, professionalism and reliable customer service.",
  alternates: { canonical: "/about" },
};

export default async function AboutPage() {
  const [c, home, site] = await Promise.all([getContent("about"), getContent("home"), getContent("global")]);
  return (
    <>
      <PageHero title={c.heroHeading} subtitle={c.heroSubheading} image={c.heroImage} alt="Arborist cutting a large tree trunk" />

      <section className="py-16 sm:py-20">
        <div className="container-site grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-3xl font-extrabold text-forest-950 sm:text-4xl">{c.storyHeading}</h2>
            <p className="mt-4 whitespace-pre-line text-lg leading-relaxed text-gray-700">{c.storyText}</p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl">
            <SafeImage src={c.storyImage} alt="Large tree beside a brick home" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section className="bg-mist py-16">
        <div className="container-site grid gap-6 md:grid-cols-2">
          <article className="rounded-2xl bg-forest-900 p-8 text-white">
            <Target className="h-10 w-10 text-lime" aria-hidden="true" />
            <h2 className="mt-3 text-2xl font-extrabold">{c.missionHeading}</h2>
            <p className="mt-3 text-lg text-white/85">{c.missionText}</p>
          </article>
          <article className="rounded-2xl bg-white p-8 shadow-sm">
            <Heart className="h-10 w-10 text-leaf" aria-hidden="true" />
            <h2 className="mt-3 text-2xl font-extrabold text-forest-950">{c.valuesHeading}</h2>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {lines(c.values).map((value) => <li key={value} className="font-semibold text-forest-900">{value}</li>)}
            </ul>
          </article>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-site grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl lg:order-2">
            <SafeImage src={c.safetyImage} alt="Arborist wearing a helmet and harness in a tree" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
          </div>
          <div>
            <ShieldCheck className="h-10 w-10 text-leaf" aria-hidden="true" />
            <h2 className="mt-3 text-3xl font-extrabold text-forest-950">{c.safetyHeading}</h2>
            <p className="mt-3 text-lg leading-relaxed text-gray-700">{c.safetyText}</p>
            <h2 className="mt-8 text-3xl font-extrabold text-forest-950">{c.qualityHeading}</h2>
            <p className="mt-3 text-lg leading-relaxed text-gray-700">{c.qualityText}</p>
          </div>
        </div>
      </section>

      <section className="bg-forest-900 py-16 text-white">
        <div className="container-site">
          <h2 className="text-center text-3xl font-extrabold sm:text-4xl">{c.trustHeading}</h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {lines(c.trustPoints).map((point) => (
              <li key={point} className="flex items-start gap-3 rounded-xl bg-white/10 p-5 font-semibold"><CheckCircle2 className="h-6 w-6 shrink-0 text-lime" aria-hidden="true" />{point}</li>
            ))}
          </ul>
        </div>
      </section>

      <FinalCTA heading={home.finalHeading} text={home.finalText} cta={home.finalCta} phone={site.phone} />
    </>
  );
}
