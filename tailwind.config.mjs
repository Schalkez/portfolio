import aspectRatio from "@tailwindcss/aspect-ratio";
import forms from "@tailwindcss/forms";
import prose from "@tailwindcss/typography";
import colors from "tailwindcss/colors";
import plugin from "tailwindcss/plugin";
import animate from "tailwindcss-animate";
import { ACCENT_COLOR, BASE_COLOR } from "./src/config";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        accent: colors[ACCENT_COLOR.toLowerCase()],
        base: colors[BASE_COLOR.toLowerCase()],
        background: colors[BASE_COLOR.toLowerCase()][950],
      },
      typography: {
        DEFAULT: {
          css: {
            "code::before": {
              content: "none",
            },
            "code::after": {
              content: "none",
            },
            "blockquote p:first-of-type::before": {
              content: "none",
            },
            "blockquote p:first-of-type::after": {
              content: "none",
            },
          },
        },
      },
    },
  },
  darkMode: "class",
  plugins: [
    prose,
    forms,
    aspectRatio,
    animate,
    plugin(({ addVariant }) => {
      addVariant(
        "prose-inline-code",
        '&.prose :where(:not(pre)>code):not(:where([class~="not-prose"] *))'
      );
    }),
    plugin(({ addUtilities }) => {
      addUtilities({
        ".image-render-pixelated": {
          "image-rendering": "pixelated",
          "image-rendering": "-moz-crisp-edges",
          "image-rendering": "crisp-edges",
        },
      });
    }),
  ],
};
