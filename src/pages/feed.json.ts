import { getCollection } from "astro:content";
import { SITE } from "../config";

export async function GET() {
  const posts = await getCollection("blog");
  const publishedPosts = posts
    .filter((post) => post.data.published)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
    .slice(0, 20);

  const feed = {
    version: "https://jsonfeed.org/version/1.1",
    title: "Hiền's Blog",
    description:
      "Thoughts on web development, technology, and personal projects by Hiền",
    home_page_url: SITE,
    feed_url: `${SITE}/feed.json`,
    language: "en",
    authors: [
      {
        name: "Hiền",
        url: SITE,
      },
    ],
    items: publishedPosts.map((post) => ({
      id: `${SITE}/blog/post/${post.slug.replace(/^(en|vi)\//, "")}`,
      url: `${SITE}/blog/post/${post.slug.replace(/^(en|vi)\//, "")}`,
      title: post.data.title,
      content_text: post.data.description,
      summary: post.data.description,
      date_published: post.data.pubDate.toISOString(),
      date_modified:
        post.data.updatedDate?.toISOString() || post.data.pubDate.toISOString(),
      tags: post.data.tags || [],
      language: post.slug.startsWith("vi/") ? "vi" : "en",
    })),
  };

  return new Response(JSON.stringify(feed, null, 2), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
