import type { AppLocale } from "@/i18n/routing";
import { createPageMetadata } from "@/lib/seo";
import { BlogPosts } from "app/components/posts";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { locale } from "next/root-params";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("home.metadata");
  const currentLocale = (await locale()) as AppLocale;
  const title = t("title");
  const description = t("description");
  const path = `/`;

  return createPageMetadata({
    locale: currentLocale,
    path,
    title,
    description,
  });
}

export default async function Page() {
  const t = await getTranslations("home");
  return (
    <div className="flex flex-col gap-20 sm:gap-28">
      <section className="grid gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-8">
          <p className="mb-5 text-sm text-muted-foreground">{t("eyebrow")}</p>
          <h1 className="max-w-4xl text-balance text-[clamp(3.75rem,10vw,8.5rem)] font-semibold leading-[0.86] tracking-[-0.075em]">
            {t("title")}
          </h1>
        </div>

        <div className="flex flex-col justify-end gap-5 border-l border-border pl-5 lg:col-span-4 lg:mb-1 lg:pl-7">
          <p className="max-w-[36ch] text-lg leading-7 tracking-tight">
            {t("introduction")}
          </p>
          <div className="flex items-start gap-3 text-sm leading-6 text-muted-foreground">
            <span
              aria-hidden="true"
              className="mt-2 size-1.5 shrink-0 rounded-full bg-signal"
            />
            <p>{t("currentFocus")}</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="latest-writing-title">
        <div className="mb-8 grid gap-3 border-b border-border pb-5 sm:grid-cols-12 sm:items-end">
          <h2
            id="latest-writing-title"
            className="text-2xl font-medium tracking-tight sm:col-span-7"
          >
            {t("latest.title")}
          </h2>
          <p className="max-w-md text-sm leading-6 text-muted-foreground sm:col-span-5">
            {t("latest.description")}
          </p>
        </div>
        <BlogPosts />
      </section>
    </div>
  );
}
