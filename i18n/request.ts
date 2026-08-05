import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import { locale as getLocale } from "next/root-params";
import { routing } from "./routing";

export default getRequestConfig(async ({ locale }) => {
  if (!locale) {
    const paramValue = (await getLocale()) ?? "en";

    if (!hasLocale(routing.locales, paramValue)) {
      notFound();
    }

    locale = paramValue;
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
