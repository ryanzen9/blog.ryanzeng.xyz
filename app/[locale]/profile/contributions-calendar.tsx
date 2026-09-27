"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { GitHubCalendar } from "react-github-calendar";

export function ContributionsCalendar() {
  const t = useTranslations("profile.contributions");
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      aria-labelledby="github-contributions-title"
      className="reading-column min-w-0"
    >
      <div className="section-intro">
        <h2 id="github-contributions-title" className="section-heading">
          {t("title")}
        </h2>
        <p className="editorial-body">
          {t.rich("description", {
            profile: (chunks) => (
              <a
                href="https://github.com/ryanzen9"
                target="_blank"
                rel="noopener noreferrer"
                className="text-link"
              >
                {chunks}
              </a>
            ),
          })}
        </p>
      </div>
      <figure>
        <div
          className="contribution-scroll"
          role="region"
          aria-label={t("title")}
          tabIndex={0}
        >
          <div className="contribution-calendar" aria-busy={!mounted}>
            {mounted ? (
              <GitHubCalendar
                username="ryanzen9"
                colorScheme={resolvedTheme === "dark" ? "dark" : "light"}
                theme={{
                  light: [
                    "#e8e8e4",
                    "#d4d4cf",
                    "#a3a3a3",
                    "#525252",
                    "#171717",
                  ],
                  dark: ["#262626", "#525252", "#717171", "#a3a3a3", "#f4f4f2"],
                }}
                blockSize={8}
                blockMargin={3}
                blockRadius={2}
                fontSize={11}
                errorMessage={t("calendar.error")}
                labels={{
                  months: t.raw("calendar.months") as string[],
                  weekdays: t.raw("calendar.weekdays") as string[],
                  totalCount: t.raw("calendar.totalCount") as string,
                  legend: {
                    less: t("calendar.legend.less"),
                    more: t("calendar.legend.more"),
                  },
                }}
              />
            ) : (
              <Skeleton className="h-28 w-full rounded-lg" />
            )}
          </div>
        </div>
        <figcaption className="editorial-meta mt-2">{t("caption")}</figcaption>
      </figure>
    </section>
  );
}
