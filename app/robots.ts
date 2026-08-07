import { siteUrl } from "@/lib/site";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/blog",
        disallow: "/api",
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
