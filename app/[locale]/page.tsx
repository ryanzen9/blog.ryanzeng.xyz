import { Contact } from "@/app/components/contact";
import { Link } from "@/i18n/navigation";
import { ContributionsCalendar } from "./profile/contributions-calendar";
import type { AppLocale } from "@/i18n/routing";
import { createPageMetadata } from "@/lib/seo";
import { BlogPosts } from "@/app/components/posts";
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
  const profile = await getTranslations("profile.hero");
  return (
    <div className="editorial-flow">
      <header className="reading-column">
        <p className="editorial-meta mb-6">{t("eyebrow")}</p>
        <h1 className="editorial-heading whitespace-pre-line">{t("title")}</h1>
        <div className="editorial-copy editorial-body mt-(--space-content-media)">
          <p>{t("introduction")}</p>
          <p>{t("currentFocus")}</p>
        </div>
        <a
          href="#latest-writing"
          className="text-link mt-(--space-content-media) inline-flex items-center gap-3 py-2 text-sm"
        >
          {t("readNotes")} <span aria-hidden="true">↓</span>
        </a>
      </header>

      <section
        id="latest-writing"
        aria-labelledby="latest-writing-title"
        className="reading-column scroll-mt-(--space-content-media)"
      >
        <div className="section-intro">
          <h2 id="latest-writing-title" className="section-heading">
            {t("latest.title")}
          </h2>
          <p className="editorial-body">{t("latest.description")}</p>
        </div>
        <BlogPosts />
        <Link
          href="/blog"
          className="text-link mt-10 inline-block py-2 text-sm"
        >
          {t("allWriting")} <span aria-hidden="true">→</span>
        </Link>
      </section>

      <section aria-labelledby="practice-title" className="reading-column">
        <div className="section-intro">
          <h2 id="practice-title" className="section-heading">
            {t("practice.title")}
          </h2>
          <div className="editorial-copy editorial-body">
            <p>{profile("introduction.primary")}</p>
            <p>{t("practice.description")}</p>
          </div>
        </div>
        <Link href="/profile" className="text-link inline-block py-2 text-sm">
          {t("about")} <span aria-hidden="true">→</span>
        </Link>
      </section>
      <ContributionsCalendar />
      <Contact />
    </div>
  );
}
