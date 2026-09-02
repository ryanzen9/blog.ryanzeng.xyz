"use client";

import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import type { MouseEvent } from "react";

export default function Footer() {
  //   const text = "推荐这篇文章";
  //   const shareUrl = `https://x.com/intent/post?text=${encodeURIComponent(text)}`;
  const shareUrl = `https://x.com/intent/post`;

  const t = useTranslations("accessibility");

  function addCurrentUrl(event: MouseEvent<HTMLAnchorElement>) {
    event.currentTarget.href = `${shareUrl}?url=${encodeURIComponent(window.location.href)}`;
  }

  return (
    <footer className="border-t border-border py-8 text-sm text-muted-foreground">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Ryan Zeng · MIT</p>
        <ul className="flex flex-wrap items-center gap-5">
          <li aria-label="rss" aria-description={t("rss")}>
            <a
              className="flex items-center gap-2 transition-colors hover:text-foreground"
              rel="noopener noreferrer"
              target="_blank"
              href="/rss"
            >
              <span>RSS</span>
              <ArrowUpRight aria-hidden="true" className="size-3.5" />
            </a>
          </li>
          <li aria-label="github" aria-description={t("github")}>
            <a
              className="flex items-center gap-2 transition-colors hover:text-foreground"
              rel="noopener noreferrer"
              target="_blank"
              href="https://github.com/ryanzen9"
            >
              <span>GitHub</span>
              <ArrowUpRight aria-hidden="true" className="size-3.5" />
            </a>
          </li>
          <li aria-label="x" aria-description={t("x")}>
            <a
              className="flex items-center gap-2 transition-colors hover:text-foreground"
              rel="noopener noreferrer"
              target="_blank"
              href={shareUrl}
              onClick={addCurrentUrl}
            >
              <span>Share</span>
              <ArrowUpRight aria-hidden="true" className="size-3.5" />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
