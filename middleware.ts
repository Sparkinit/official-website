import { auth } from "@/lib/auth";
import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  const pathname = context.url.pathname;
  const publicPaths = [
    "/auth",
    "/api/auth",
    "/favicon.svg",
    "/_astro",
    "/assets",
  ];

  const isPublic = publicPaths.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );

  const isAuthed = await auth.api.getSession({
    headers: context.request.headers,
  });

  if (isAuthed?.user) {
    context.locals.user = isAuthed.user as import("better-auth").User & {
      activationDate: Date;
      aiApproved: boolean;
      formSubmitted: boolean;
    };
    context.locals.session = isAuthed.session;
    if (pathname === "/auth" || pathname.startsWith("/auth/")) {
      return new Response(null, {
        status: 302,
        headers: { Location: "/" },
      });
    }
  } else {
    context.locals.user = null;
    context.locals.session = null;
    if (!isPublic) {
      return new Response(null, {
        status: 302,
        headers: { Location: "/auth" },
      });
    }
  }

  return next();
});
