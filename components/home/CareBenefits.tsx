import { House, Sprout, Trees } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

export default function CareBenefits({ content }: { content: Record<string, string> }) {
  const icons = [House, Sprout, Trees];
  return (
    <section className="bg-forest-900 py-16 sm:py-20">
      <div className="container-site">
        <SectionHeading eyebrow={content.benefitsEyebrow} title={content.benefitsHeading} light />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {icons.map((Icon, index) => (
            <article key={index} className="rounded-2xl border border-white/15 bg-white/5 p-7 transition hover:-translate-y-1 hover:bg-white/10">
              <Icon className="h-10 w-10 text-lime" aria-hidden="true" />
              <h3 className="mt-4 text-xl font-extrabold text-white">{content[`benefit${index + 1}Title`]}</h3>
              <p className="mt-2 leading-relaxed text-white/80">{content[`benefit${index + 1}Text`]}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
