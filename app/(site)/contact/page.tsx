import type { Metadata } from "next";
import { Mail, Phone } from "lucide-react";
import ContactForm from "@/components/forms/ContactForm";
import PageHero from "@/components/ui/PageHero";
import { FacebookIcon } from "@/components/ui/icons";
import { getContent, getServices } from "@/lib/data";
import { telHref } from "@/lib/format";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Call (314) 376-1175 or send a message to EcoGreen Tree Service LLC.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage() {
  const [c, site, services] = await Promise.all([getContent("contact"), getContent("global"), getServices()]);
  const row = "flex items-center gap-4 rounded-xl bg-white/10 p-4 transition hover:bg-white/15";
  const badge = "grid h-11 w-11 shrink-0 place-items-center rounded-full bg-lime text-forest-950";
  return (
    <>
      <PageHero title={c.heroHeading} subtitle={c.heroSubheading} image={c.heroImage} alt="Arborist cutting a large tree trunk" />
      <section className="bg-mist py-14">
        <div className="container-site grid gap-8 lg:grid-cols-[2fr_3fr]">
          <div className="rounded-2xl bg-forest-900 p-6 text-white sm:p-8">
            <h2 className="text-2xl font-extrabold">Get in Touch</h2>
            <div className="mt-6 space-y-3">
              <a href={telHref(site.phone)} className={row}><span className={badge}><Phone className="h-5 w-5" aria-hidden="true" /></span><span className="font-bold">{site.phone}</span></a>
              <a href={`mailto:${site.email}`} className={row}><span className={badge}><Mail className="h-5 w-5" aria-hidden="true" /></span><span className="break-all font-bold">{site.email}</span></a>
              {site.facebookUrl && (
                <a href={site.facebookUrl} target="_blank" rel="noopener noreferrer" className={row}><span className={badge}><FacebookIcon className="h-5 w-5" /></span><span className="font-bold">Facebook</span></a>
              )}
            </div>
            <a href={telHref(site.phone)} className="btn btn-lime mt-6 w-full text-lg"><Phone className="h-5 w-5" aria-hidden="true" />{c.ctaLabel}</a>
          </div>
          <ContactForm heading={c.formHeading} services={services.map((s) => s.title)} />
        </div>
      </section>
    </>
  );
}
