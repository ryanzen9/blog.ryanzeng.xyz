import {
  getBlogPosts,
  parsePublishedAt,
  publishedDateFormat,
} from "@/app/[locale]/blog/utils";
import { Link } from "@/i18n/navigation";
import { blogLang } from "@/lib/site";
import { getFormatter } from "next-intl/server";

export async function BlogPosts() {
  const format = await getFormatter();
  const posts = getBlogPosts().sort(
    (a, b) =>
      parsePublishedAt(b.metadata.publishedAt).getTime() -
      parsePublishedAt(a.metadata.publishedAt).getTime(),
  );

  return (
    <ol className="flex flex-col gap-(--space-entry)">
      {posts.map((post) => (
        <li key={post.slug}>
          <Link
            className="group flex flex-col items-start gap-3 py-2"
            href={`/blog/${post.slug}`}
          >
            <time
              dateTime={post.metadata.publishedAt}
              className="editorial-meta font-mono tabular-nums"
            >
              {format.dateTime(
                parsePublishedAt(post.metadata.publishedAt),
                publishedDateFormat,
              )}
            </time>
            <h3
              lang={blogLang}
              className="text-xl font-medium leading-snug tracking-tight decoration-border underline-offset-4 group-hover:underline sm:text-2xl"
            >
              {post.metadata.title}{" "}
              <span
                aria-hidden="true"
                className="inline-block text-base text-muted-foreground transition-transform group-hover:translate-x-1"
              >
                ↗
              </span>
            </h3>
            <p lang={blogLang} className="editorial-body">
              {post.metadata.summary}
            </p>
          </Link>
        </li>
      ))}
    </ol>
  );
}
