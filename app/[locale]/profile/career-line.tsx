import { useTranslations } from "next-intl";

const careerItems = [
  "aiAgent",
  "softwareEngineer",
  "projectContributor",
  "education",
] as const;

export function CareerLine() {
  const t = useTranslations("profile.career");
  return (
    <section aria-labelledby="career-timeline-title" className="reading-column">
      <div className="section-intro">
        <h2 id="career-timeline-title" className="section-heading">
          {t("title")}
        </h2>
        <p className="editorial-body">{t("description")}</p>
      </div>
      <ol className="flex flex-col gap-(--space-entry)">
        {careerItems.map((key) => (
          <li key={key} className="flex flex-col gap-3">
            <p className="editorial-meta font-mono">{t(`items.${key}.date`)}</p>
            <h3 className="text-xl font-medium leading-snug tracking-tight">
              {t(`items.${key}.title`)}
            </h3>
            <p className="editorial-body">{t(`items.${key}.description`)}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
