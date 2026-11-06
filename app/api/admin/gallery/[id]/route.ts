import { itemRoutes } from "@/lib/adminCrud";
export const runtime = "nodejs";
const routes = itemRoutes("gallery");
export const PUT = routes.PUT, DELETE = routes.DELETE;
