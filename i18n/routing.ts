import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en-US", "zh-CN"],
  defaultLocale: "en-US",
  localePrefix: "always", // 默认语言也显示前缀
});

export type AppLocale = (typeof routing)["locales"][number];
