import { CalendarCheck, PhoneCall, Sparkles, TreeDeciduous } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

export default function ProcessSteps({ content }: { content: Record<string, string> }) {
  const icons = [PhoneCall, CalendarCheck, TreeDeciduous, Sparkles];
  return (
    <section className="bg-white pb-16 sm:pb-20">
      <div className="container-site">
        <SectionHeading eyebrow={content.processEyebrow} title={content.processHeading} />
        <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {icons.map((Icon, index) => (
            <li key={index} className="text-center">
              <span className="relative mx-auto grid h-20 w-20 place-items-center rounded-full bg-mist text-forest-700">
                <Icon className="h-9 w-9" aria-hidden="true" />
                <span className="absolute -right-1 -top-1 grid h-8 w-8 place-items-center rounded-full bg-lime font-display text-sm font-black text-forest-950">{index + 1}</span>
              </span>
              <h3 className="mt-4 text-xl font-extrabold text-forest-950">{content[`step${index + 1}Title`]}</h3>
              <p className="mt-2 leading-relaxed text-gray-700">{content[`step${index + 1}Text`]}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
