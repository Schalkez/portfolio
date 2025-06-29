import { type CollectionEntry, getCollection } from "astro:content";
import type { ImageMetadata } from "astro";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getFeaturedProjects = async (lang: string = "en") => {
  const imageImports = import.meta.glob(
    "/src/assets/projects/**/*.{png,webp,jpg,jpeg,svg}",
    { eager: true }
  );
  const projects = (await getCollection("projects", ({ id }) =>
    id.startsWith(`${lang}/`)
  )) as CollectionEntry<"projects">[];
  return projects
    .filter((project) => project.data.featured)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
    .map((project) => {
      let thumb: unknown = project.data.thumbnail;
      const thumbKey =
        typeof thumb === "object" && thumb !== null && "src" in thumb
          ? (thumb as { src: string }).src
          : (thumb as string);
      if (imageImports[thumbKey]) {
        thumb = (imageImports[thumbKey] as { default: ImageMetadata }).default;
      }
      return {
        ...project,
        data: {
          ...project.data,
          thumbnail: thumb,
        },
      };
    });
};

export const getProjects = async (lang: string = "en") => {
  const imageImports = import.meta.glob(
    "/src/assets/projects/**/*.{png,webp,jpg,jpeg,svg}",
    { eager: true }
  );
  const projects = (await getCollection("projects", ({ id }) =>
    id.startsWith(`${lang}/`)
  )) as CollectionEntry<"projects">[];
  return projects
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
    .map((project) => {
      let thumb: unknown = project.data.thumbnail;
      const thumbKey =
        typeof thumb === "object" && thumb !== null && "src" in thumb
          ? (thumb as { src: string }).src
          : (thumb as string);
      if (imageImports[thumbKey]) {
        thumb = (imageImports[thumbKey] as { default: ImageMetadata }).default;
      }
      return {
        ...project,
        data: {
          ...project.data,
          thumbnail: thumb,
        },
      };
    });
};

export const getBlogPosts = async (lang: string = "en") => {
  const posts = (await getCollection("blog", ({ id }) =>
    id.startsWith(`${lang}/`)
  )) as CollectionEntry<"blog">[];
  return posts
    .filter((post) => post.data.published)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
};
