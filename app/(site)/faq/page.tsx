import type { Metadata } from "next";
import FaqItem from "@/components/ui/FaqItem";
import PageHero from "@/components/ui/PageHero";
import { getContent, getFaqs } from "@/lib/data";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to common questions about tree removal, trimming, brush removal, emergencies and booking with EcoGreen Tree Service LLC.",
  alternates: { canonical: "/faq" },
};

export default async function FaqPage() {
  const [c, faqs] = await Promise.all([getContent("faq"), getFaqs()]);
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <PageHero title={c.heroHeading} subtitle={c.heroSubheading} image={c.heroImage} alt="Worker cutting a large tree with a chainsaw" />
      <section className="py-16">
        <div className="container-site max-w-3xl space-y-3">
          {faqs.map((faq) => <FaqItem key={faq._id} question={faq.question} answer={faq.answer} />)}
        </div>
      </section>
    </>
  );
}
