import { BlogPosts } from "@/app/components/posts";
import { Separator } from "@/components/ui/separator";
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
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
        {t("metadata.title")}
      </h1>
      <Separator className="my-4 data-horizontal:w-4/5" />
      <BlogPosts />
    </section>
  );
}
