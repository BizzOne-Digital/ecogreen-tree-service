import { Award, ShieldCheck, Timer } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { HelmetIcon } from "@/components/ui/icons";

export default function WhyChooseUs({ content }: { content: Record<string, string> }) {
  const icons = [ShieldCheck, Award, HelmetIcon, Timer];
  return (
    <section className="bg-mist py-16 sm:py-20">
      <div className="container-site">
        <SectionHeading eyebrow={content.whyEyebrow} title={content.whyHeading} />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {icons.map((Icon, index) => (
            <article key={index} className="rounded-2xl border-b-4 border-lime bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-forest-900 text-lime"><Icon className="h-7 w-7" aria-hidden="true" /></span>
              <h3 className="mt-4 text-xl font-extrabold text-forest-950">{content[`why${index + 1}Title`]}</h3>
              <p className="mt-2 leading-relaxed text-gray-700">{content[`why${index + 1}Text`]}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
