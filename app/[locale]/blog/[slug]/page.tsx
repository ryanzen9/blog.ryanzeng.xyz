import { compilePostMDX } from "@/app/components/mdx";
import { TocSidebar } from "@/app/components/sidebar";
import { getLocalizedUrl, siteUrl } from "@/lib/site";
import { Metadata } from "next";
import { getFormatter } from "next-intl/server";
import { notFound } from "next/navigation";
import { locale } from "next/root-params";
import { getBlogPosts, parsePublishedAt, publishedDateFormat } from "../utils";

export async function generateStaticParams() {
  let posts = getBlogPosts();
  const currentLocale = await locale(); // Ensure the locale is loaded before generating static params

  return posts.map((post) => ({
    slug: post.slug,
    locale: currentLocale || "en-US", // Use the current locale or default to "en-US"
  }));
}

export async function generateMetadata({ params }): Promise<Metadata> {
  const { slug, locale } = await params;
  const path = `/blog/${slug}`;
  let post = getBlogPosts().find((post) => post.slug === slug);
  const canonicalUrl = getLocalizedUrl(locale, path);

  if (!post) {
    notFound();
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;

  let ogImage = image
    ? image
    : `${siteUrl}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      modifiedTime: publishedTime,
      locale: locale === "en-US" ? "en_US" : "zh_CN",
      url: canonicalUrl,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Blog({ params }) {
  const { slug, locale } = await params;
  let post = getBlogPosts().find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  const format = await getFormatter();

  const { content, toc } = await compilePostMDX(post.content);

  const path = `/${locale}/blog/${slug}`;

  return (
    <section className="relative">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.metadata.title,
            inLanguage: "zh_CN",
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${siteUrl}${post.metadata.image}`
              : `${siteUrl}/og?title=${encodeURIComponent(post.metadata.title)}`,
            url: `${siteUrl}${path}`,
            author: {
              "@type": "Person",
              name: "Ryan Zeng",
              url: "https://github.com/ryanzen9",
            },
          }),
        }}
      />
      <h1 className="title font-semibold text-2xl tracking-tighter">
        {post.metadata.title}
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {format.dateTime(
            parsePublishedAt(post.metadata.publishedAt),
            publishedDateFormat,
          )}
        </p>
      </div>
      {/* <TableOfContents items={toc} /> */}
      <TocSidebar items={toc} />

      <article className="prose font-prose">{content}</article>
    </section>
  );
}
