import dotenvX from "@dotenvx/dotenvx";
import { defineConfig } from "drizzle-kit";

dotenvX.config({ path: ".env" });

export default defineConfig({
  schema: "./db/schema.ts",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
