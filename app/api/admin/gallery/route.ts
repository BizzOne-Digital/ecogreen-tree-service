import { collectionRoutes } from "@/lib/adminCrud";
export const runtime = "nodejs";
const routes = collectionRoutes("gallery");
export const GET = routes.GET, POST = routes.POST, PATCH = routes.PATCH;
