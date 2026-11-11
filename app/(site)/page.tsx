import type { Metadata } from "next";
import AboutPreview from "@/components/home/AboutPreview";
import CareBenefits from "@/components/home/CareBenefits";
import CtaBanner from "@/components/home/CtaBanner";
import EmergencyCTA from "@/components/home/EmergencyCTA";
import FaqPreview from "@/components/home/FaqPreview";
import Hero from "@/components/home/Hero";
import ProcessSteps from "@/components/home/ProcessSteps";
import RecentWork from "@/components/home/RecentWork";
import ServicesPreview from "@/components/home/ServicesPreview";
import TestimonialsPreview from "@/components/home/TestimonialsPreview";
import WarningSigns from "@/components/home/WarningSigns";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import FinalCTA from "@/components/ui/FinalCTA";
import { getContent, getFaqs, getServices, getTestimonials } from "@/lib/data";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default async function HomePage() {
  const [content, site, services, reviews, faqs] = await Promise.all([
    getContent("home"), getContent("global"), getServices(), getTestimonials(), getFaqs(),
  ]);
  return (
    <>
      <Hero content={content} phone={site.phone} />
      <ServicesPreview eyebrow={content.servicesEyebrow} heading={content.servicesHeading} services={services} />
      <CtaBanner content={content} />
      <AboutPreview content={content} />
      <ProcessSteps content={content} />
      <WhyChooseUs content={content} />
      <RecentWork />
      <WarningSigns content={content} />
      <EmergencyCTA content={content} phone={site.phone} />
      <CareBenefits content={content} />
      <TestimonialsPreview eyebrow={content.reviewsEyebrow} heading={content.reviewsHeading} reviews={reviews} />
      <FaqPreview eyebrow={content.faqEyebrow} heading={content.faqHeading} cta={content.faqCta} faqs={faqs} />
      <FinalCTA heading={content.finalHeading} text={content.finalText} cta={content.finalCta} phone={site.phone} />
    </>
  );
}
