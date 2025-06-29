import { getCollection } from "astro:content";
import { SITE } from "../config";

export async function GET() {
  const posts = await getCollection("blog");
  const publishedPosts = posts
    .filter((post) => post.data.published)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
    .slice(0, 20); // Lấy 20 bài viết mới nhất

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Hiền's Blog</title>
    <description>Thoughts on web development, technology, and personal projects by Hiền</description>
    <link>${SITE}</link>
    <atom:link href="${SITE}/rss.xml" rel="self" type="application/rss+xml" />
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${publishedPosts
      .map(
        (post) => `
    <item>
      <guid>${SITE}/blog/post/${post.slug.replace(/^(en|vi)\//, "")}</guid>
      <title>${post.data.title}</title>
      <description><![CDATA[${post.data.description}]]></description>
      <link>${SITE}/blog/post/${post.slug.replace(/^(en|vi)\//, "")}</link>
      <pubDate>${post.data.pubDate.toUTCString()}</pubDate>
      <category>Blog</category>
      ${
        post.data.tags?.map((tag) => `<category>${tag}</category>`).join("") ||
        ""
      }
    </item>
    `
      )
      .join("")}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
