import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { AdminUser } from "@/lib/models";
import { connectDB } from "@/lib/mongodb";
import { SESSION_COOKIE, SESSION_HOURS, createSessionToken } from "@/lib/session";

export const runtime = "nodejs";

const MAX_ATTEMPTS = 5;
const LOCK_MINUTES = 15;
// Compared for unknown emails so response time doesn't reveal which emails exist.
const DUMMY_HASH = bcrypt.hashSync("not-a-real-password", 10);

const denied = (error = "Invalid email or password", status = 401) =>
  NextResponse.json({ success: false, error }, { status });

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const email = String(body.email ?? "").trim().toLowerCase();
  const password = String(body.password ?? "");
  const configuredEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const configuredHash = process.env.ADMIN_PASSWORD_HASH;

  if (!configuredEmail || !configuredHash || !process.env.AUTH_SECRET) {
    return denied("Admin login is not configured", 503);
  }

  try {
    await connectDB();
    if (email !== configuredEmail) {
      await bcrypt.compare(password, DUMMY_HASH);
      return denied();
    }
    // The environment variable stays authoritative, so rotating it changes the password.
    const admin = await AdminUser.findOneAndUpdate(
      { email },
      { $set: { passwordHash: configuredHash } },
      { upsert: true, returnDocument: "after", setDefaultsOnInsert: true },
    );
    if (admin.lockUntil && admin.lockUntil > new Date()) {
      return denied("Too many failed attempts. Try again later.", 429);
    }

    if (!(await bcrypt.compare(password, admin.passwordHash))) {
      const attempts = admin.failedAttempts + 1;
      const locked = attempts >= MAX_ATTEMPTS;
      await AdminUser.updateOne({ _id: admin._id }, {
        failedAttempts: locked ? 0 : attempts,
        ...(locked && { lockUntil: new Date(Date.now() + LOCK_MINUTES * 60_000) }),
      });
      return denied();
    }

    await AdminUser.updateOne({ _id: admin._id }, { failedAttempts: 0, $unset: { lockUntil: 1 } });
    const response = NextResponse.json({ success: true });
    response.cookies.set(SESSION_COOKIE, await createSessionToken(email), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: SESSION_HOURS * 3600,
    });
    return response;
  } catch (error) {
    console.error("Login failed:", error);
    return denied("Login is temporarily unavailable", 503);
  }
}
