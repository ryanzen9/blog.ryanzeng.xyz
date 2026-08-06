import type { Metadata } from "next";

import { routing, type AppLocale } from "@/i18n/routing";

import { getLocalizedUrl } from "@/lib/site";

type PageMetadataInput = {
  locale: AppLocale;
  path: string;
  title: string;
  description: string;
};

export function createPageMetadata({
  locale,
  path,
  title,
  description,
}: PageMetadataInput): Metadata {
  const url = getLocalizedUrl(locale, path);

  const languages = Object.fromEntries(
    routing.locales.map((l) => {
      return [l, getLocalizedUrl(l, path)];
    }),
  );

  return {
    title,
    description,

    alternates: {
      canonical: url,
      languages: languages,
    },

    openGraph: {
      title,
      description,
      url,
      siteName: "May Rain",
      locale: locale === "en-US" ? "en_US" : "zh_CN",
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
