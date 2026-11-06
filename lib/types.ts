export type ServiceT = {
  _id: string; slug: string; title: string; shortDescription: string; description: string;
  cardImage: string; heroImage: string; icon: string; features: string[]; ctaText: string;
  order: number; published: boolean;
};
export type TeamT = { _id: string; name: string; role: string; description: string; image: string; order: number; active: boolean };
export type TestimonialT = { _id: string; customerName: string; review: string; rating: number; service: string; image: string; published: boolean; order: number };
export type FaqT = { _id: string; question: string; answer: string; order: number; active: boolean };
export type GalleryT = { _id: string; imageUrl: string; caption: string; order: number; active: boolean };
