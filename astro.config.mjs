// @ts-check
import { defineConfig, fontProviders } from "astro/config";

import react from "@astrojs/react";

import tailwindcss from "@tailwindcss/vite";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  srcDir: ".",
  integrations: [react()],
  output: "server",

  vite: {
    plugins: [tailwindcss()],
  },

  adapter: node({
    mode: "standalone",
  }),

  experimental: {
    fonts: [
      {
        name: "Funnel Display",
        cssVariable: "--font-funnel-display",
        provider: fontProviders.fontsource(),
        weights: [300, 400],
      },
    ],
  },
});
