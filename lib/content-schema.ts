/**
 * Single source of truth for editable page content. It drives the default site
 * copy and the admin form, so a new field only has to be added here.
 */
export type FieldType = "text" | "textarea" | "lines" | "image";
export type ContentField = { key: string; label: string; type: FieldType; default: string };
export type ContentPage = { label: string; fields: ContentField[] };

const site = (name: string) => `/images/site/${name}.jpg`;

export const PHOTOS = {
  hero: site("home-hero"),
  removal: site("tree-removal"),
  trimming: site("tree-trimming"),
  chipping: site("tree-chipping"),
  brush: site("brush-removal"),
  emergency: site("emergency-tree-service"),
  crew: site("about-page"),
  consultation: site("why-choose-us"),
  booking: site("booking-contact-banner"),
  banner: site("call-to-action-banner"),
};

const t = (key: string, label: string, value: string): ContentField => ({ key, label, type: "text", default: value });
const a = (key: string, label: string, value: string): ContentField => ({ key, label, type: "textarea", default: value });
const l = (key: string, label: string, value: string[]): ContentField => ({ key, label, type: "lines", default: value.join("\n") });
const i = (key: string, label: string, value: string): ContentField => ({ key, label, type: "image", default: value });

const hero = (heading: string, sub: string, image: string) => [
  t("heroHeading", "Hero heading", heading),
  a("heroSubheading", "Hero subheading", sub),
  i("heroImage", "Hero image", image),
];

export const CONTENT = {
  global: {
    label: "Business Info",
    fields: [
      t("businessName", "Business name", "EcoGreen Tree Service LLC"),
      t("phone", "Phone number", "(314) 376-1175"),
      t("email", "Email", "dany7963@hotmail.com"),
      t("contactPerson", "Contact person", "Daniel Ignacio Vega"),
      t("facebookUrl", "Facebook page URL", ""),
      a("footerText", "Footer description", "Professional residential tree care focused on quality, safety and reliable service."),
    ],
  },
  home: {
    label: "Home",
    fields: [
      t("heroLine1", "Hero line 1 (white)", "EcoGreen"),
      t("heroLine2", "Hero line 2 (lime)", "Tree Service"),
      t("heroLine2b", "Hero line 2 ending (white)", "LLC"),
      a("heroText", "Hero supporting text", "Always committed to providing the best service, with high quality and safety."),
      l("heroTrust", "Hero trust points (3, one per line)", ["Safe & Reliable", "Eco-Friendly Practices", "Experienced Team"]),
      t("heroCta", "Hero button label", "Book a Service"),
      i("heroImage", "Hero image", PHOTOS.hero),
      t("servicesEyebrow", "Services eyebrow", "OUR SERVICES"),
      t("servicesHeading", "Services heading", "Complete Tree Care for Your Property"),
      t("bannerLine1", "CTA banner line 1", "Need Tree Service?"),
      t("bannerLine2", "CTA banner line 2", "We're Here to Help!"),
      l("bannerChecks", "CTA banner checks (one per line)", ["Professional Service", "Safe & Efficient", "Residential Tree Care"]),
      t("bannerCta", "CTA banner button", "Book a Service Today"),
      t("aboutEyebrow", "About eyebrow", "ABOUT ECOGREEN"),
      t("aboutHeading", "About heading", "Trusted Tree Care for Your Property"),
      a("aboutText", "About text", "EcoGreen Tree Service LLC is committed to safe, reliable and high-quality tree care for residential properties. From a single overgrown branch to a full tree removal, we treat your home and yard with care and leave the job site clean."),
      l("aboutPoints", "About points (one per line)", ["Safe Work Practices", "Reliable Service", "Professional Equipment", "Residential Expertise"]),
      t("aboutCta", "About button", "Learn More About Us"),
      i("aboutImage", "About image", PHOTOS.crew),
      t("whyEyebrow", "Why choose us eyebrow", "WHY CHOOSE US"),
      t("whyHeading", "Why choose us heading", "Tree Care Done the Right Way"),
      t("why1Title", "Feature 1 title", "Safety First"),
      a("why1Text", "Feature 1 text", "Every job is planned around protecting your family, your home and our crew."),
      t("why2Title", "Feature 2 title", "Quality Service"),
      a("why2Text", "Feature 2 text", "Careful, clean work that improves your property and keeps your trees looking their best."),
      t("why3Title", "Feature 3 title", "Experienced Team"),
      a("why3Text", "Feature 3 text", "A hands-on crew that knows how to handle residential trees in tight spaces."),
      t("why4Title", "Feature 4 title", "Fast Response"),
      a("why4Text", "Feature 4 text", "Call us when a tree becomes a problem and we will respond as quickly as we can."),
      t("emergencyHeading", "Emergency heading", "Emergency Tree Service When You Need It Most"),
      a("emergencyText", "Emergency text", "When a storm hits or a tree comes down, you need help you can count on. Call EcoGreen Tree Service LLC for urgent help with:"),
      l("emergencyPoints", "Emergency points (one per line)", ["Fallen trees", "Storm damage", "Hazardous branches", "Urgent tree removal"]),
      i("emergencyImage", "Emergency image", PHOTOS.emergency),
      t("reviewsEyebrow", "Reviews eyebrow", "TESTIMONIALS"),
      t("reviewsHeading", "Reviews heading", "What Homeowners Say"),
      t("processEyebrow", "Process eyebrow", "HOW IT WORKS"),
      t("processHeading", "Process heading", "Getting Tree Work Done Is Simple"),
      t("step1Title", "Step 1 title", "Request a Service"),
      a("step1Text", "Step 1 text", "Call us or send a booking request with your address and a short description of the job."),
      t("step2Title", "Step 2 title", "Confirm the Details"),
      a("step2Text", "Step 2 text", "We contact you to talk through the work and arrange a suitable time."),
      t("step3Title", "Step 3 title", "We Do the Work"),
      a("step3Text", "Step 3 text", "The job is planned around your home, then carried out safely and with care."),
      t("step4Title", "Step 4 title", "Clean-Up"),
      a("step4Text", "Step 4 text", "Branches and debris are cleared so your yard is left clean."),
      t("signsEyebrow", "Warning signs eyebrow", "WARNING SIGNS"),
      t("signsHeading", "Warning signs heading", "Does Your Tree Need Attention?"),
      a("signsText", "Warning signs text", "Small problems can turn into big ones, especially before a storm. Give us a call if you notice any of these around your property:"),
      l("signsPoints", "Warning signs (one per line)", ["Dead, broken or hanging branches", "Cracks or splits in the trunk", "A tree that has started to lean", "Mushrooms or decay near the base", "Branches over your roof or driveway"]),
      a("signsNote", "Safety note", "If a tree or branch is touching a power line, stay well away and contact your utility company first."),
      t("signsCta", "Warning signs button", "Ask About Your Tree"),
      i("signsImage", "Warning signs image", PHOTOS.consultation),
      t("benefitsEyebrow", "Benefits eyebrow", "WHY TREE CARE MATTERS"),
      t("benefitsHeading", "Benefits heading", "Healthy Trees, Safer Property"),
      t("benefit1Title", "Benefit 1 title", "Protect Your Home"),
      a("benefit1Text", "Benefit 1 text", "Dealing with weak limbs and unsafe trees early helps lower the risk of damage to your roof, fence and driveway."),
      t("benefit2Title", "Benefit 2 title", "Support Tree Health"),
      a("benefit2Text", "Benefit 2 text", "Removing dead and damaged branches helps your trees put their energy into healthy growth."),
      t("benefit3Title", "Benefit 3 title", "Improve Your Yard"),
      a("benefit3Text", "Benefit 3 text", "Well-kept trees and a clear yard let in more light and make your whole property look better."),
      t("faqEyebrow", "FAQ eyebrow", "COMMON QUESTIONS"),
      t("faqHeading", "FAQ heading", "Questions Before You Book?"),
      t("faqCta", "FAQ button", "See All FAQs"),
      t("finalHeading", "Final CTA heading", "Ready to Take Care of Your Trees?"),
      a("finalText", "Final CTA text", "Contact EcoGreen Tree Service LLC today for professional, safe and reliable tree services."),
      t("finalCta", "Final CTA button", "Book a Service"),
    ],
  },
  about: {
    label: "About",
    fields: [
      ...hero("Professional Tree Care You Can Trust", "EcoGreen Tree Service LLC is committed to providing high-quality tree services with safety, professionalism and reliable customer service.", PHOTOS.banner),
      t("storyHeading", "Story heading", "Our Story"),
      a("storyText", "Story text", "EcoGreen Tree Service LLC was built to give homeowners tree care they can rely on. We focus on residential properties, where careful planning and respect for your home matter as much as the work itself.\n\nWhether you need one tree trimmed or a damaged tree removed, you will get clear communication, safe work and a clean finish."),
      i("storyImage", "Story image", PHOTOS.crew),
      t("missionHeading", "Mission heading", "Our Mission"),
      a("missionText", "Mission text", "Always committed to providing the best service, with high quality and safety."),
      t("valuesHeading", "Values heading", "Our Values"),
      l("values", "Values (one per line)", ["Safety", "Honesty", "Quality", "Respect for your property", "Care for the environment"]),
      t("safetyHeading", "Safety heading", "Safety Standards"),
      a("safetyText", "Safety text", "Tree work is serious work. We use protective equipment, assess each tree and job site before we begin, and keep people and property clear of the work area."),
      i("safetyImage", "Safety image", PHOTOS.consultation),
      t("qualityHeading", "Quality heading", "Our Quality Commitment"),
      a("qualityText", "Quality text", "We take pride in careful cuts, tidy job sites and finishing what we promise. If something is not right, we want to hear about it."),
      t("trustHeading", "Why homeowners trust us heading", "Why Homeowners Trust EcoGreen"),
      l("trustPoints", "Trust points (one per line)", ["Focused on residential properties", "Clear, direct communication", "Safe and efficient work", "Clean-up you can count on"]),
    ],
  },
  services: { label: "Services", fields: hero("Complete Tree Care Services", "From routine trimming to urgent removals, EcoGreen Tree Service LLC keeps your property safe and looking its best.", PHOTOS.trimming) },
  team: { label: "Team", fields: hero("Meet the EcoGreen Team", "The people behind safe, reliable tree care for your home.", PHOTOS.crew) },
  testimonials: { label: "Testimonials", fields: hero("What Our Customers Say", "Feedback from homeowners who trusted EcoGreen with their trees.", PHOTOS.consultation) },
  faq: { label: "FAQ", fields: hero("Frequently Asked Questions", "Quick answers about our tree services. Still unsure? Give us a call.", PHOTOS.banner) },
  booking: {
    label: "Booking",
    fields: [
      ...hero("Book a Tree Service", "Tell us what you need and we will contact you to confirm the details.", PHOTOS.booking),
      t("successHeading", "Confirmation heading", "Thank You! Your Request Was Received"),
      a("successText", "Confirmation text", "We will contact you soon to confirm the details. For urgent tree problems, please call us."),
      a("consentText", "Consent checkbox text", "I agree that EcoGreen Tree Service LLC may contact me by phone or email about this request."),
    ],
  },
  contact: {
    label: "Contact",
    fields: [
      ...hero("Contact EcoGreen Tree Service LLC", "Questions about your trees? Call, email or send us a message.", PHOTOS.booking),
      t("ctaLabel", "Primary button label", "Call Now"),
      t("formHeading", "Form heading", "Send Us a Message"),
    ],
  },
} satisfies Record<string, ContentPage>;

export type PageKey = keyof typeof CONTENT;
export const PAGE_KEYS = Object.keys(CONTENT) as PageKey[];
export const isPageKey = (key: string): key is PageKey => Object.hasOwn(CONTENT, key);

export function defaultContent(page: PageKey): Record<string, string> {
  return Object.fromEntries((CONTENT[page].fields as ContentField[]).map((f) => [f.key, f.default]));
}
