import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import ScrollAnimations from "@/components/layout/ScrollAnimations";
import TopBar from "@/components/layout/TopBar";
import { getContent, getGallery, getServices } from "@/lib/data";
import { siteUrl } from "@/lib/site";

// Admin saves refresh pages immediately; this also recovers from a temporary database outage.
export const revalidate = 60;

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [site, services, gallery] = await Promise.all([getContent("global"), getServices(), getGallery()]);
  const links = services.map(({ slug, title }) => ({ slug, title }));
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.businessName,
    url: siteUrl(),
    telephone: site.phone,
    email: site.email,
    image: `${siteUrl()}/images/og.jpg`,
    ...(site.facebookUrl && { sameAs: [site.facebookUrl] }),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-white focus:p-3">Skip to content</a>
      <TopBar phone={site.phone} email={site.email} facebookUrl={site.facebookUrl} />
      <Header services={links} />
      <main id="main">{children}</main>
      <ScrollAnimations />
      <Footer site={site} services={links} showGallery={gallery.length > 0} />
    </>
  );
}
