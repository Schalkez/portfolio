import { getCollection } from "astro:content";
import { SITE } from "../config";

export async function GET() {
  const posts = await getCollection("blog");
  const projects = await getCollection("projects");

  const pages = [
    "",
    "/about",
    "/projects",
    "/blog",
    "/learning",
    "/contact",
    "/en",
    "/en/about",
    "/en/projects",
    "/en/blog",
    "/en/learning",
    "/en/contact",
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages
    .map(
      (page) => `
  <url>
    <loc>${SITE}${page}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page === "" ? "1.0" : "0.8"}</priority>
  </url>
  `
    )
    .join("")}
  <url>
    <loc>${SITE}/rss.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>${SITE}/atom.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>${SITE}/feed.json</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.6</priority>
  </url>
  ${posts
    .filter((post) => post.data.published)
    .map(
      (post) => `
  <url>
    <loc>${SITE}/blog/post/${post.slug.replace(/^(en|vi)\//, "")}</loc>
    <lastmod>${
      post.data.updatedDate?.toISOString() ||
      post.data.pubDate?.toISOString() ||
      new Date().toISOString()
    }</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  `
    )
    .join("")}
  ${projects
    .map(
      (project) => `
  <url>
    <loc>${SITE}/projects/${project.slug.replace(/^(en|vi)\//, "")}</loc>
    <lastmod>${project.data.date.toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  `
    )
    .join("")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
