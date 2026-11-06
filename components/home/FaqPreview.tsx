import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FaqItem from "@/components/ui/FaqItem";
import SectionHeading from "@/components/ui/SectionHeading";
import type { FaqT } from "@/lib/types";

export default function FaqPreview({ eyebrow, heading, cta, faqs }: { eyebrow: string; heading: string; cta: string; faqs: FaqT[] }) {
  if (!faqs.length) return null;
  return (
    <section className="bg-mist py-16 sm:py-20">
      <div className="container-site max-w-3xl">
        <SectionHeading eyebrow={eyebrow} title={heading} />
        <div className="mt-10 space-y-3">
          {faqs.slice(0, 4).map((faq) => <FaqItem key={faq._id} question={faq.question} answer={faq.answer} />)}
        </div>
        <div className="mt-8 text-center">
          <Link href="/faq" className="btn btn-green">{cta}<ArrowRight className="h-5 w-5" aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  );
}
