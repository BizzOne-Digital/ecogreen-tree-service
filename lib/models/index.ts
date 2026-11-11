import mongoose, { Schema, type Model } from "mongoose";

function model<T>(name: string, schema: Schema): Model<T> {
  return (mongoose.models[name] as Model<T>) ?? mongoose.model<T>(name, schema);
}
const opts = { timestamps: true };

export const AdminUser = model<{
  email: string; passwordHash: string; failedAttempts: number; lockUntil?: Date;
}>("AdminUser", new Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  failedAttempts: { type: Number, default: 0 },
  lockUntil: Date,
}, opts));

export const Service = model("Service", new Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  shortDescription: { type: String, default: "" },
  description: { type: String, default: "" },
  cardImage: { type: String, default: "" },
  heroImage: { type: String, default: "" },
  icon: { type: String, default: "tree" },
  features: { type: [String], default: [] },
  ctaText: { type: String, default: "Book a Service" },
  order: { type: Number, default: 0 },
  published: { type: Boolean, default: true },
}, opts));

/** One document per page. `data` is a flat map of field key to string value. */
export const SiteContent = model<{ key: string; data: Record<string, string> }>("SiteContent", new Schema({
  key: { type: String, required: true, unique: true },
  data: { type: Schema.Types.Mixed, default: {} },
}, { ...opts, minimize: false }));

export const TeamMember = model("TeamMember", new Schema({
  name: { type: String, required: true },
  role: { type: String, default: "" },
  description: { type: String, default: "" },
  image: { type: String, default: "" },
  order: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
}, opts));

export const Testimonial = model("Testimonial", new Schema({
  customerName: { type: String, required: true },
  review: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, default: 5 },
  service: { type: String, default: "" },
  image: { type: String, default: "" },
  published: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
  // Set only on reviews sent from the public form; used for rate limiting.
  ipHash: { type: String, select: false },
}, opts));

export const FAQ = model("FAQ", new Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  order: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
}, opts));

export const GalleryItem = model("GalleryItem", new Schema({
  imageUrl: { type: String, required: true },
  caption: { type: String, default: "" },
  order: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
}, opts));

export const BOOKING_STATUSES = ["New", "Contacted", "Scheduled", "Completed", "Cancelled"] as const;

export const Booking = model("Booking", new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  service: { type: String, required: true },
  address: { type: String, required: true },
  preferredDate: { type: String, default: "" },
  preferredTime: { type: String, default: "" },
  message: { type: String, default: "" },
  photoUrl: { type: String, default: "" },
  consent: { type: Boolean, required: true },
  status: { type: String, enum: BOOKING_STATUSES, default: "New" },
  ipHash: { type: String, select: false },
}, opts));

export const ContactInquiry = model("ContactInquiry", new Schema({
  name: { type: String, required: true },
  phone: { type: String, default: "" },
  email: { type: String, required: true },
  service: { type: String, default: "" },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
  ipHash: { type: String, select: false },
}, opts));

const storedUploadSchema = new Schema({
  folder: { type: String, required: true },
  filename: { type: String, required: true },
  mimeType: { type: String, required: true },
  size: { type: Number, required: true },
  data: { type: Buffer, required: true },
}, opts);
storedUploadSchema.index({ folder: 1, filename: 1 }, { unique: true });

export const StoredUpload = model<{
  folder: string; filename: string; mimeType: string; size: number; data: Buffer;
}>("StoredUpload", storedUploadSchema);
