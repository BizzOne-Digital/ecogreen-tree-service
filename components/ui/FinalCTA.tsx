import Link from "next/link";
import { CalendarDays, Phone } from "lucide-react";
import { telHref } from "@/lib/format";

type Props = { heading: string; text: string; cta: string; phone: string };

export default function FinalCTA({ heading, text, cta, phone }: Props) {
  return (
    <section className="bg-gradient-to-br from-forest-900 via-forest-700 to-leaf py-16 text-center text-white sm:py-20">
      <div className="container-site max-w-3xl">
        <h2 className="text-3xl font-black italic tracking-tight sm:text-5xl">{heading}</h2>
        <p className="mt-4 text-lg text-white/90">{text}</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
          <Link href="/booking" className="btn btn-lime"><CalendarDays className="h-5 w-5" aria-hidden="true" />{cta}</Link>
          <a href={telHref(phone)} className="btn btn-outline"><Phone className="h-5 w-5" aria-hidden="true" />Call {phone}</a>
        </div>
      </div>
    </section>
  );
}
