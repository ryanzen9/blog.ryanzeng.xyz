import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "zh-CN"],
  defaultLocale: "en",
  localePrefix: "always", // 默认语言也显示前缀
});

export type AppLocale = (typeof routing)["locales"][number];
