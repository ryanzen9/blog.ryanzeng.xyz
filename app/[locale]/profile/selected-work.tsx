import { useTranslations } from "next-intl";

const WORK_PLACEHOLDERS = [
  {
    key: "manufacturingErp",
  },
  {
    key: "ecommerce",
  },
  {
    key: "aiAgent",
  },
] as const;

export function SelectedWork() {
  const t = useTranslations("profile.selectedWork");

  return (
    <section aria-labelledby="selected-work-title">
      <div className="mb-6 flex flex-col gap-1.5">
        <h2
          id="selected-work-title"
          className="text-2xl font-medium tracking-tight"
        >
          {t("title")}
        </h2>
        <p className="max-w-xl text-sm leading-6 text-muted-foreground">
          {t("description")}
        </p>
      </div>

      <div className="divide-y divide-border border-y border-border">
        {WORK_PLACEHOLDERS.map((work) => (
          <article
            key={work.key}
            className="grid gap-2 py-4 sm:grid-cols-[8rem_minmax(0,1fr)_auto] sm:items-center sm:gap-4"
          >
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
              {t(`items.${work.key}.category`)}
            </p>
            <h3 className="text-base font-medium">
              {t(`items.${work.key}.title`)}
            </h3>
            <p className="text-xs text-muted-foreground">{t("comingSoon")}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
