import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import type { Model } from "mongoose";
import { getAdminSession, unauthorized } from "./auth";
import { cleanupRemovedUploads } from "./deleteStoredUpload";
import { connectDB } from "./mongodb";
import { FAQ, GalleryItem, Service, TeamMember, Testimonial } from "./models";
import { RESOURCES, SERVICE_ICONS, type Resource, type ResourceKey } from "./resources";
import { ensureSeeded } from "./seed";

const MODELS = { services: Service, team: TeamMember, testimonials: Testimonial, faq: FAQ, gallery: GalleryItem } as
  unknown as Record<ResourceKey, Model<Record<string, unknown>>>;

const fail = (error: string, status = 400) => NextResponse.json({ success: false, error }, { status });
const refreshSite = () => revalidatePath("/", "layout");
const plain = (value: unknown) => JSON.parse(JSON.stringify(value));

/** Copies only known fields and coerces their types, so request bodies can't inject operators. */
function clean(resource: Resource, body: Record<string, unknown>) {
  const output: Record<string, unknown> = {};
  for (const field of resource.fields) {
    const value = body[field.key];
    if (field.type === "lines") {
      output[field.key] = (Array.isArray(value) ? value : String(value ?? "").split("\n"))
        .map((line) => String(line).trim()).filter(Boolean);
    } else if (field.type === "rating") {
      output[field.key] = Math.min(5, Math.max(1, Math.round(Number(value)) || 5));
    } else if (field.type === "icon") {
      output[field.key] = SERVICE_ICONS.includes(String(value)) ? value : SERVICE_ICONS[0];
    } else {
      output[field.key] = String(value ?? "").trim();
    }
    if (field.required && !output[field.key]) throw new Error(`${field.label} is required`);
  }
  output[resource.toggleKey] = body[resource.toggleKey] !== false;
  return output;
}

const slugify = (text: string) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "service";

async function uniqueSlug(title: string) {
  const base = slugify(title);
  let slug = base;
  for (let n = 2; await Service.exists({ slug }); n++) slug = `${base}-${n}`;
  return slug;
}

export function collectionRoutes(key: ResourceKey) {
  const resource: Resource = RESOURCES[key];
  const Item = MODELS[key];

  return {
    async GET() {
      if (!(await getAdminSession())) return unauthorized();
      await ensureSeeded();
      return NextResponse.json({ success: true, items: plain(await Item.find().sort({ order: 1 }).lean()) });
    },

    async POST(request: Request) {
      if (!(await getAdminSession())) return unauthorized();
      try {
        await connectDB();
        const data = clean(resource, await request.json());
        const last = await Item.findOne().sort({ order: -1 }).lean();
        data.order = Number(last?.order ?? -1) + 1;
        if (key === "services") data.slug = await uniqueSlug(String(data.title));
        const item = await Item.create(data);
        refreshSite();
        return NextResponse.json({ success: true, item: plain(item) }, { status: 201 });
      } catch (error) {
        return fail(error instanceof Error ? error.message : "Could not save");
      }
    },

    /** Saves a new display order: { ids: string[] } */
    async PATCH(request: Request) {
      if (!(await getAdminSession())) return unauthorized();
      const { ids } = await request.json();
      if (!Array.isArray(ids)) return fail("ids must be an array");
      await connectDB();
      await Item.bulkWrite(ids.map((id, order) => ({
        updateOne: { filter: { _id: String(id) }, update: { $set: { order } } },
      })) as never);
      refreshSite();
      return NextResponse.json({ success: true });
    },
  };
}

type IdContext = { params: Promise<{ id: string }> };

export function itemRoutes(key: ResourceKey) {
  const resource: Resource = RESOURCES[key];
  const Item = MODELS[key];

  return {
    async PUT(request: Request, { params }: IdContext) {
      if (!(await getAdminSession())) return unauthorized();
      try {
        await connectDB();
        const { id } = await params;
        const data = clean(resource, await request.json());
        const before = await Item.findById(id).lean();
        if (!before) return fail("Not found", 404);
        const item = await Item.findByIdAndUpdate(id, { $set: data }, { returnDocument: "after", runValidators: true }).lean();
        await cleanupRemovedUploads(before, item); // only after the save has succeeded
        refreshSite();
        return NextResponse.json({ success: true, item: plain(item) });
      } catch (error) {
        return fail(error instanceof Error ? error.message : "Could not save");
      }
    },

    async DELETE(_request: Request, { params }: IdContext) {
      if (!(await getAdminSession())) return unauthorized();
      try {
        await connectDB();
        const { id } = await params;
        const before = await Item.findByIdAndDelete(id).lean();
        if (!before) return fail("Not found", 404);
        await cleanupRemovedUploads(before, null);
        refreshSite();
        return NextResponse.json({ success: true });
      } catch {
        return fail("Could not delete");
      }
    },
  };
}
