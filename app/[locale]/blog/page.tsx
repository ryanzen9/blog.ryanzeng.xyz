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
    <section className="flex flex-col gap-12">
      <header className="grid gap-5 lg:grid-cols-12 lg:items-end">
        <h1 className="text-5xl font-semibold tracking-[-0.045em] sm:text-7xl lg:col-span-7">
          {t("title")}
        </h1>
        <p className="max-w-md text-base leading-7 text-muted-foreground lg:col-span-5">
          {t("description")}
        </p>
      </header>
      <BlogPosts />
    </section>
  );
}
