import Link from "next/link";
import { CalendarDays, Check } from "lucide-react";
import { Pines } from "@/components/ui/icons";
import { lines } from "@/lib/format";

export default function CtaBanner({ content }: { content: Record<string, string> }) {
  return (
    <section className="relative overflow-hidden bg-forest-900 text-white">
      <div className="absolute inset-y-0 left-0 hidden w-56 bg-leaf [clip-path:polygon(0_0,100%_0,62%_100%,0_100%)] lg:block" aria-hidden="true">
        <Pines className="absolute bottom-0 left-0 h-20 w-40 text-forest-800" />
      </div>
      <div className="absolute inset-y-0 right-0 hidden w-56 bg-leaf [clip-path:polygon(38%_0,100%_0,100%_100%,0_100%)] lg:block" aria-hidden="true">
        <Pines className="absolute bottom-0 right-0 h-20 w-40 text-forest-800" />
      </div>
      <div className="container-site relative flex flex-col items-center justify-center gap-6 py-8 text-center lg:flex-row lg:gap-10 lg:px-44 lg:text-left">
        <h2 className="text-3xl font-black italic leading-tight lg:border-r lg:border-white/30 lg:pr-10">
          {content.bannerLine1}<br />{content.bannerLine2}
        </h2>
        <ul className="space-y-1 text-left">
          {lines(content.bannerChecks).map((item) => (
            <li key={item} className="flex items-center gap-2 font-medium"><Check className="h-5 w-5 shrink-0 text-lime" strokeWidth={3} aria-hidden="true" />{item}</li>
          ))}
        </ul>
        <Link href="/booking" className="btn btn-lime shrink-0 text-lg"><CalendarDays className="h-5 w-5" aria-hidden="true" />{content.bannerCta}</Link>
      </div>
    </section>
  );
}
