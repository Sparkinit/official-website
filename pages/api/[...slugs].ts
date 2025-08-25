import { Elysia, t } from "elysia";
import { apiRouter } from "@/routes";

const app = new Elysia({ prefix: "/api" })
  .use(apiRouter)
  .get("/", () => "sparkinit")
  .post("/", ({ body }) => body, {
    body: t.Object({
      name: t.String(),
    }),
  });

const handle = ({ request }: { request: Request }) => app.handle(request);

export const GET = handle;
export const POST = handle;
