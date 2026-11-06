import { PHOTOS } from "./content-schema";

const service = (order: number, slug: string, title: string, icon: string, shortDescription: string, description: string, image: string, heroImage: string, features: string[]) =>
  ({ slug, title, icon, shortDescription, description, cardImage: image, heroImage, features, ctaText: "Book a Service", order, published: true });

export const seedServices = [
  service(0, "tree-removal", "Tree Removal", "tree", "Professional removal of unwanted, hazardous or damaged trees.",
    "When a tree is dead, damaged, too close to your home or simply in the way, our crew removes it safely and with care for the property around it.",
    PHOTOS.removal, PHOTOS.removal, ["Hazardous and damaged trees", "Unwanted trees near your home", "Careful work around structures", "Job site clean-up"]),
  service(1, "tree-trimming", "Tree Trimming", "scissors", "Professional trimming and pruning to improve safety, appearance and tree health.",
    "Regular trimming keeps branches away from your roof, lets in more light and helps your trees stay healthy and attractive.",
    PHOTOS.trimming, PHOTOS.trimming, ["Pruning for tree health", "Branches over roofs and driveways", "Improved shape and appearance", "Removal of dead limbs"]),
  service(2, "tree-chipping", "Tree Chipping", "leaf", "Efficient processing of branches and tree debris.",
    "Instead of leaving piles of branches behind, we process tree debris efficiently so your yard is clear and ready to enjoy.",
    PHOTOS.chipping, PHOTOS.chipping, ["Branch and limb processing", "Efficient debris reduction", "Cleaner job sites", "Less waste left in your yard"]),
  service(3, "brush-removal", "Brush Removal", "trash", "Removal of branches, brush, vegetation and unwanted yard debris.",
    "Overgrown brush and yard debris can take over a property. We clear it out and haul it away so you can get your space back.",
    PHOTOS.brush, PHOTOS.brush, ["Branches and brush piles", "Overgrown vegetation", "Unwanted yard debris", "Haul-away clean-up"]),
  service(4, "emergency-tree-service", "Emergency Tree Service", "zap", "Fast response for fallen trees, storm-damaged trees and hazardous branches.",
    "Storm damage and fallen trees can't wait. Call us and we will respond as quickly as possible to make your property safe again.",
    PHOTOS.emergency, PHOTOS.emergency, ["Fallen trees", "Storm-damaged trees", "Hazardous hanging branches", "Urgent tree removal"]),
];

export const seedTeam = [
  { name: "Daniel Ignacio Vega", role: "Primary Contact", description: "Your point of contact for service requests and questions at EcoGreen Tree Service LLC.", image: "", order: 0, active: true },
  { name: "Team Member Name", role: "Role / Title", description: "Add a short description of this team member from the admin panel.", image: "", order: 1, active: true },
  { name: "Team Member Name", role: "Role / Title", description: "Add a short description of this team member from the admin panel.", image: "", order: 2, active: true },
];

export const seedTestimonials = [
  { customerName: "Sarah M.", rating: 5, service: "Tree Removal", review: "They took down a large dead tree next to our house without a single problem. The crew was careful, friendly and left the yard spotless.", image: "", published: true, order: 0 },
  { customerName: "James R.", rating: 5, service: "Tree Trimming", review: "Our oak was hanging over the roof and they trimmed it beautifully. It looks healthier and we finally have light in the backyard again.", image: "", published: true, order: 1 },
  { customerName: "Linda K.", rating: 5, service: "Emergency Tree Service", review: "A storm dropped a big limb on our fence. I called and they came out quickly, cleared everything and made the yard safe.", image: "", published: true, order: 2 },
];

const faqs: [string, string][] = [
  ["What areas do you serve?", "Please call us at (314) 376-1175 with your address and we will confirm whether your property is in our service area."],
  ["Do you provide free estimates?", "Contact us with the details of your job and we will explain how pricing and estimates work for your project."],
  ["Do you offer emergency tree service?", "Yes. We help with fallen trees, storm damage, hazardous branches and urgent tree removal. Call (314) 376-1175."],
  ["Can you remove large trees?", "Yes, we remove trees from residential properties. Tell us about the tree, or send a photo with your booking request, so we can plan the right approach."],
  ["Do you clean up after the work?", "Yes. Leaving your property clean is part of the job, and we will go over the clean-up plan with you before we start."],
  ["Do you remove branches and brush?", "Yes. Our brush removal service clears branches, brush, vegetation and unwanted yard debris."],
  ["How can I book a service?", "Fill out the form on our booking page, or call us at (314) 376-1175. We will contact you to confirm the details."],
  ["Do you provide tree trimming?", "Yes. We trim and prune trees to improve safety, appearance and tree health."],
  ["How quickly can you respond to emergencies?", "We respond as quickly as we can. Response time depends on the weather and the number of calls, so please call us directly for urgent problems."],
];
export const seedFaqs = faqs.map(([question, answer], order) => ({ question, answer, order, active: true }));
