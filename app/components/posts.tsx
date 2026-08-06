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
    <div>
      {allBlogs.map((post) => (
        <Link
          key={post.slug}
          className="flex flex-col space-y-1 mb-4"
          href={`/blog/${post.slug}`}
        >
          <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
            <p className="text-neutral-600 dark:text-neutral-400 w-30 tabular-nums">
              {format.dateTime(
                parsePublishedAt(post.metadata.publishedAt),
                publishedDateFormat,
              )}
            </p>
            <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
              {post.metadata.title}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
