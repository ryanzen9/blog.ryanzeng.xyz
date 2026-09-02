import { compilePostMDX } from "@/app/components/mdx";
import { TocSidebar } from "@/app/components/sidebar";
import { blogLang, getAbsoluteUrl, siteUrl } from "@/lib/site";
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
  const path = `/${blogLang}/blog/${slug}`;
  let post = getBlogPosts().find((post) => post.slug === slug);
  const canonicalUrl = getAbsoluteUrl(path);

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
      locale: blogLang.replace("-", "_"),
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
  const { slug } = await params;
  let post = getBlogPosts().find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  const format = await getFormatter();

  const { content, toc } = await compilePostMDX(post.content);

  const path = `/${blogLang}/blog/${slug}`;
  const url = getAbsoluteUrl(path);

  const image = post.metadata.image
    ? `${siteUrl}${post.metadata.image}`
    : `${siteUrl}/og?title=${encodeURIComponent(post.metadata.title)}`;

  return (
    <section className="relative mx-auto max-w-3xl">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            author: {
              "@type": "Person",
              name: "Ryan Zeng",
              url: "https://github.com/ryanzen9",
            },

            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,

            inLanguage: blogLang,
            image: image,
            url: url,
          }),
        }}
      />
      <header className="mb-10 border-b border-border pb-8 sm:mb-12 sm:pb-10">
        <p className="mb-4 text-sm text-muted-foreground">May Rain / Writing</p>
        <h1 className="title max-w-3xl text-4xl font-semibold tracking-[-0.045em] sm:text-6xl sm:leading-[1.05]">
          {post.metadata.title}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
          {post.metadata.summary}
        </p>
        <time
          dateTime={post.metadata.publishedAt}
          className="mt-6 block font-mono text-xs tabular-nums text-muted-foreground"
        >
          {format.dateTime(
            parsePublishedAt(post.metadata.publishedAt),
            publishedDateFormat,
          )}
        </time>
      </header>
      {/* <TableOfContents items={toc} /> */}
      <TocSidebar items={toc} />

      <article className="prose" lang={blogLang}>
        {content}
      </article>
    </section>
  );
}
