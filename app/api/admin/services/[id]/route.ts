import { itemRoutes } from "@/lib/adminCrud";
export const runtime = "nodejs";
const routes = itemRoutes("services");
export const PUT = routes.PUT, DELETE = routes.DELETE;
