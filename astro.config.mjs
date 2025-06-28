// @ts-check

import mdx from "@astrojs/mdx";
import svelte from "@astrojs/svelte";

import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import { resolve } from "path";
import { BASE, SITE } from "./src/config";

// https://astro.build/config
export default defineConfig({
	integrations: [tailwind(), mdx(), svelte()],
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
	},

	site: SITE,
	base: BASE,
});
