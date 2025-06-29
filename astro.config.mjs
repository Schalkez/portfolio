// @ts-check

import mdx from "@astrojs/mdx";
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import { resolve } from "path";
import { BASE, SITE } from "./src/config";
import { i18n } from "astro-i18n-aut/integration";

const defaultLocale = "en";
const locales = {
  en: "en-US",
  vi: "vi-VN",
};

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    mdx(),
    svelte(),
    i18n({
      locales,
      defaultLocale,
      exclude: ["pages/api/**/*", "pages/**/*.md", "pages/**/_*"],
    }),
  ],
  vite: {
    resolve: {
      alias: {
        $components: resolve("./src/components"),
        $layouts: resolve("./src/layouts"),
        $pages: resolve("./src/pages"),
        $assets: resolve("./src/assets"),
        $content: resolve("./src/content"),
      },
    },
    ssr: {
      noExternal: ["gsap"],
    },
    logLevel: "error",
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ["gsap"],
          },
        },
      },
    },
  },

  site: SITE,
  base: BASE,
  trailingSlash: "always",
  build: {
    format: "directory",
  },

  // SEO và Performance optimizations
  experimental: {
    // assets: true, // Removed - not valid in current Astro version
  },

  // Image optimization
  image: {
    service: {
      entrypoint: "astro/assets/services/sharp",
    },
  },
});
