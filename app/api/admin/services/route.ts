import { collectionRoutes } from "@/lib/adminCrud";
export const runtime = "nodejs";
const routes = collectionRoutes("services");
export const GET = routes.GET, POST = routes.POST, PATCH = routes.PATCH;
