import { getPathname } from "@/i18n/navigation";
import { type AppLocale } from "@/i18n/routing";

export const siteUrl = (
  process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

/**
 * 生成不带 locale 的全局资源 URL。
 *
 * 用于：
 * - /rss
 * - /robots.txt
 * - /sitemap.xml
 * - /og
 */
export function getAbsoluteUrl(pathname: string) {
  return new URL(pathname, siteUrl).toString();
}

/**
 * 生成带 locale 的网站页面 URL。
 *
 * 由于 localePrefix 是 always：
 *
 * getLocalizedUrl("en-US", "/profile")
 * => https://example.com/en-US/profile
 *
 * getLocalizedUrl("zh-CN", "/blog/example")
 * => https://example.com/zh-CN/blog/example
 */
export function getLocalizedUrl(locale: AppLocale, href: string) {
  const pathname = getPathname({
    locale,
    href,
  });

  return new URL(pathname, siteUrl).toString();
}
