/** Client-safe description of each admin collection. Drives forms and server validation. */
export type ResourceField = {
  key: string; label: string; required?: boolean;
  type: "text" | "textarea" | "lines" | "image" | "icon" | "rating";
  folder?: "pages" | "gallery" | "misc";
};
export type Resource = {
  label: string; singular: string; titleKey: string; subtitleKey?: string; imageKey?: string;
  toggleKey: "published" | "active"; toggleLabel: string; fields: ResourceField[];
};

export const SERVICE_ICONS = ["tree", "scissors", "leaf", "trash", "zap", "axe", "shield"];

export const RESOURCES = {
  services: {
    label: "Services", singular: "Service", titleKey: "title", subtitleKey: "shortDescription", imageKey: "cardImage",
    toggleKey: "published", toggleLabel: "Published",
    fields: [
      { key: "title", label: "Title", type: "text", required: true },
      { key: "shortDescription", label: "Short description (cards)", type: "textarea" },
      { key: "description", label: "Full description", type: "textarea" },
      { key: "cardImage", label: "Card image", type: "image", folder: "pages" },
      { key: "heroImage", label: "Hero image", type: "image", folder: "pages" },
      { key: "icon", label: "Icon", type: "icon" },
      { key: "features", label: "Features (one per line)", type: "lines" },
      { key: "ctaText", label: "CTA text", type: "text" },
    ],
  },
  team: {
    label: "Team", singular: "Team Member", titleKey: "name", subtitleKey: "role", imageKey: "image",
    toggleKey: "active", toggleLabel: "Active",
    fields: [
      { key: "name", label: "Name", type: "text", required: true },
      { key: "role", label: "Role", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "image", label: "Photo", type: "image", folder: "pages" },
    ],
  },
  testimonials: {
    label: "Testimonials", singular: "Testimonial", titleKey: "customerName", subtitleKey: "review", imageKey: "image",
    toggleKey: "published", toggleLabel: "Published",
    fields: [
      { key: "customerName", label: "Customer name", type: "text", required: true },
      { key: "review", label: "Review", type: "textarea", required: true },
      { key: "rating", label: "Rating", type: "rating" },
      { key: "service", label: "Service received", type: "text" },
      { key: "image", label: "Customer photo (optional)", type: "image", folder: "pages" },
    ],
  },
  faq: {
    label: "FAQ", singular: "FAQ", titleKey: "question", subtitleKey: "answer",
    toggleKey: "active", toggleLabel: "Active",
    fields: [
      { key: "question", label: "Question", type: "text", required: true },
      { key: "answer", label: "Answer", type: "textarea", required: true },
    ],
  },
  gallery: {
    label: "Gallery", singular: "Photo", titleKey: "caption", imageKey: "imageUrl",
    toggleKey: "active", toggleLabel: "Published",
    fields: [
      { key: "imageUrl", label: "Photo", type: "image", folder: "gallery", required: true },
      { key: "caption", label: "Caption", type: "text" },
    ],
  },
} satisfies Record<string, Resource>;

export type ResourceKey = keyof typeof RESOURCES;
