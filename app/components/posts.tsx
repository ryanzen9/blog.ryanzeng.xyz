import {
  getBlogPosts,
  parsePublishedAt,
  publishedDateFormat,
} from "@/app/[locale]/blog/utils";
import { Link } from "@/i18n/navigation";
import { getFormatter } from "next-intl/server";

export async function BlogPosts() {
  const format = await getFormatter();

  let allBlogs = getBlogPosts().sort((a, b) => {
    if (
      parsePublishedAt(a.metadata.publishedAt) >
      parsePublishedAt(b.metadata.publishedAt)
    ) {
      return -1;
    }
    return 1;
  });

  return (
    <ol className="divide-y divide-border border-b border-border">
      {allBlogs.map((post, index) => (
        <li key={post.slug}>
          <Link
            className="group grid gap-3 py-6 outline-none transition-opacity hover:opacity-60 focus-visible:ring-2 focus-visible:ring-ring sm:grid-cols-12 sm:items-baseline sm:gap-6"
            href={`/blog/${post.slug}`}
          >
            <time
              dateTime={post.metadata.publishedAt}
              className="font-mono text-xs tabular-nums text-muted-foreground sm:col-span-2"
            >
              {format.dateTime(
                parsePublishedAt(post.metadata.publishedAt),
                publishedDateFormat,
              )}
            </time>
            <div className="flex flex-col gap-2 sm:col-span-9">
              <h3 className="text-lg font-medium tracking-tight sm:text-xl">
                {post.metadata.title}
              </h3>
              <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
                {post.metadata.summary}
              </p>
            </div>
            <span
              aria-hidden="true"
              className="hidden justify-self-end font-mono text-sm text-muted-foreground transition-transform group-hover:translate-x-1 sm:block"
            >
              {String(index + 1).padStart(2, "0")} ↗
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
