import { getCollection } from "astro:content";
import { SITE } from "../config";

export async function GET() {
  const posts = await getCollection("blog");
  const publishedPosts = posts
    .filter((post) => post.data.published)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
    .slice(0, 20);

  const atom = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>Hiền's Blog</title>
  <subtitle>Thoughts on web development, technology, and personal projects by Hiền</subtitle>
  <link href="${SITE}" rel="alternate" type="text/html" />
  <link href="${SITE}/atom.xml" rel="self" type="application/atom+xml" />
  <id>${SITE}/atom.xml</id>
  <updated>${new Date().toISOString()}</updated>
  <author>
    <name>Hiền</name>
    <uri>${SITE}</uri>
  </author>
  ${publishedPosts
    .map(
      (post) => `
  <entry>
    <title>${post.data.title}</title>
    <link href="${SITE}/blog/post/${post.slug.replace(
        /^(en|vi)\//,
        ""
      )}" rel="alternate" type="text/html" />
    <id>${SITE}/blog/post/${post.slug.replace(/^(en|vi)\//, "")}</id>
    <updated>${
      post.data.updatedDate?.toISOString() || post.data.pubDate.toISOString()
    }</updated>
    <published>${post.data.pubDate.toISOString()}</published>
    <summary type="text">${post.data.description}</summary>
    <content type="html">
      <![CDATA[${post.data.description}]]>
    </content>
    ${post.data.tags?.map((tag) => `<category term="${tag}" />`).join("") || ""}
  </entry>
  `
    )
    .join("")}
</feed>`;

  return new Response(atom, {
    headers: {
      "Content-Type": "application/atom+xml",
    },
  });
}
