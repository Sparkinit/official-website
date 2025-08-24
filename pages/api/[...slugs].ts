import { Elysia, t } from "elysia";
import { authRouter } from "@/routes/auth";

const app = new Elysia({ prefix: "/api" })
  .use(authRouter)
  .get("/", () => "sparkinit")
  .post("/", ({ body }) => body, {
    body: t.Object({
      name: t.String(),
    }),
  });

const handle = ({ request }: { request: Request }) => app.handle(request);

export const GET = handle;
export const POST = handle;
