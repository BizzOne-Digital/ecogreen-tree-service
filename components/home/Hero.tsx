import Link from "next/link";
import { CalendarDays, Leaf, Phone, ShieldCheck } from "lucide-react";
import SafeImage from "@/components/ui/SafeImage";
import { HelmetIcon } from "@/components/ui/icons";
import { lines, telHref } from "@/lib/format";

export default function Hero({ content, phone }: { content: Record<string, string>; phone: string }) {
  const icons = [ShieldCheck, Leaf, HelmetIcon];
  return (
    <section className="relative overflow-hidden bg-forest-900 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_30%_75%_at_16%_25%,#1c6a38_0%,transparent_100%)]" aria-hidden="true" />

      <div className="container-site relative lg:min-h-[35rem]">
        <div className="relative z-10 py-12 sm:py-14 lg:w-[50%] lg:py-16">
          <h1 className="font-black italic leading-[0.98] tracking-tight">
            <span className="flex items-center gap-3 text-5xl sm:text-6xl xl:text-7xl">
              {content.heroLine1}
              <Leaf className="h-10 w-10 fill-leaf text-lime sm:h-12 sm:w-12" aria-hidden="true" />
            </span>
            <span className="mt-1 block text-[2.6rem] sm:text-6xl xl:text-[3.75rem]">
              <span className="text-lime-soft">{content.heroLine2}</span> {content.heroLine2b}
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-lg font-medium sm:text-2xl sm:leading-snug">{content.heroText}</p>

          <ul className="mt-7 grid max-w-xl grid-cols-3 gap-3">
            {lines(content.heroTrust).slice(0, 3).map((point, index) => {
              const Icon = icons[index];
              return (
                <li key={point} className="flex flex-col gap-2 text-sm font-medium leading-tight sm:flex-row sm:items-center">
                  <Icon className="h-9 w-9 shrink-0 text-lime" aria-hidden="true" />{point}
                </li>
              );
            })}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-5">
            <Link href="/booking" className="btn btn-lime text-lg sm:px-9"><CalendarDays className="h-5 w-5" aria-hidden="true" />{content.heroCta}</Link>
            <a href={telHref(phone)} className="btn btn-outline text-lg sm:px-9"><Phone className="h-5 w-5" aria-hidden="true" />{phone}</a>
          </div>
        </div>
      </div>

      {/* Mobile and tablet: photo stacks below the content under a lime curve */}
      <div className="relative aspect-[16/11] lg:hidden">
        <SafeImage src={content.heroImage} alt="Arborist in a helmet and harness working in a large tree" fill sizes="100vw" className="object-cover" />
        <svg viewBox="0 0 100 12" preserveAspectRatio="none" className="absolute inset-x-0 top-0 h-10 w-full" aria-hidden="true">
          <path d="M0 0H100V2C70 12 30 12 0 5Z" fill="var(--color-lime)" />
          <path d="M0 0H100V0C70 9 30 9 0 2Z" fill="var(--color-forest-900)" />
        </svg>
      </div>

      {/* Desktop: photo fills the right side behind a curved divider */}
      <div className="absolute inset-y-0 right-0 hidden w-[52%] lg:block">
        <SafeImage src={content.heroImage} alt="Arborist in a helmet and harness working in a large tree" fill priority sizes="52vw" className="object-cover" />
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-y-0 left-0 h-full w-[30%]" aria-hidden="true">
          <path d="M0 0H100C44 24 12 58 16 100H0Z" fill="var(--color-lime)" />
          <path d="M0 0H90C34 24 3 58 7 100H0Z" fill="var(--color-forest-900)" />
        </svg>
      </div>
    </section>
  );
}
