import { useTranslations } from "next-intl";

export function Contact() {
  const t = useTranslations("contact");

  return (
    <section aria-labelledby="contact-title" className="reading-column">
      <div className="section-intro">
        <h2 id="contact-title" className="section-heading">
          {t("title")}
        </h2>
        <p className="editorial-body">{t("description")}</p>
      </div>
      <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
        <a className="text-link py-2" href="mailto:rubyceng0326@gmail.com">
          {t("email")} <span aria-hidden="true">↗</span>
        </a>
        <a className="text-link py-2 text-muted-foreground" href="/rss">
          {t("rss")}
        </a>
      </div>
    </section>
  );
}
