import { auth } from "@/lib/auth";
import type { APIRoute } from "astro";

// Astro API 路由处理函数
export const ALL: APIRoute = async (ctx) => {
  // 如果需要速率限制，可以设置 x-forwarded-for 头
  // ctx.request.headers.set("x-forwarded-for", ctx.clientAddress);

  return auth.handler(ctx.request);
};
