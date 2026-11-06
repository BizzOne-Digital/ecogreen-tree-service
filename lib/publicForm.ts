import crypto from "crypto";
import type { Model } from "mongoose";

const MAX_PER_HOUR = 5;

export const text = (value: unknown, max = 300) => String(value ?? "").trim().slice(0, max);
export const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
export const isPhone = (value: string) => value.replace(/\D/g, "").length >= 10;

export function ipHash(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  return crypto.createHash("sha256").update(`${process.env.AUTH_SECRET}:${ip}`).digest("hex");
}

export async function overLimit(model: Model<never>, hash: string) {
  const since = new Date(Date.now() - 60 * 60 * 1000);
  return (await model.countDocuments({ ipHash: hash, createdAt: { $gte: since } } as never)) >= MAX_PER_HOUR;
}
