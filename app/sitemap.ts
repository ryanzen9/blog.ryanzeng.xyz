import { blogLang } from "@/lib/site";
import { getBlogPosts } from "./[locale]/blog/utils";
import { routes as appRouters } from "./routes";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export default async function sitemap() {
  const routes = Object.keys(appRouters).map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
    priority: 0.7,
  }));

  let blogs = getBlogPosts().map((post) => ({
    url: `${baseUrl}/${blogLang}/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
    priority: 0.9,
  }));

  return [...routes, ...blogs];
}
