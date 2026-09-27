import { BlogPosts } from "@/app/components/posts";
import type { AppLocale } from "@/i18n/routing";
import { createPageMetadata } from "@/lib/seo";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { locale } from "next/root-params";

export async function generateMetadata(): Promise<Metadata> {
  const currentLocale = ((await locale()) as AppLocale) ?? "en-US";
  const t = await getTranslations("blog.metadata");

  return createPageMetadata({
    title: t("title"),
    description: t("description"),
    locale: currentLocale,
    path: `/blog`,
  });
}

export default async function Page() {
  const t = await getTranslations("blog");
  return (
    <section className="reading-column editorial-flow">
      <header>
        <p className="editorial-meta mb-6">{t("eyebrow")}</p>
        <h1 className="editorial-heading">{t("title")}</h1>
        <p className="editorial-body mt-(--space-content-media)">
          {t("description")}
        </p>
      </header>
      <BlogPosts />
    </section>
  );
}
