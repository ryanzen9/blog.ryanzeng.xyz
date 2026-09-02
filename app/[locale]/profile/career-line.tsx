import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@/components/reui/timeline";
import { useTranslations } from "next-intl";

const careerTimeline = [
  {
    id: 1,
    key: "education",
  },
  {
    id: 2,
    key: "projectContributor",
  },
  {
    id: 3,
    key: "softwareEngineer",
  },
  {
    id: 4,
    key: "aiAgent",
  },
] as const;

const careerTimelineItems = [...careerTimeline].reverse();

export function CareerLine() {
  const t = useTranslations("profile.career");

  return (
    <section aria-labelledby="career-timeline-title">
      <div className="mb-8 grid gap-3 sm:grid-cols-12 sm:items-end">
        <h2
          id="career-timeline-title"
          className="text-2xl font-medium tracking-tight sm:col-span-7"
        >
          {t("title")}
        </h2>
        <p className="max-w-xl text-sm leading-6 text-muted-foreground sm:col-span-5">
          {t("description")}
        </p>
      </div>

      <Timeline
        defaultValue={careerTimeline[careerTimeline.length - 2].id}
        className="w-full max-w-2xl"
      >
        {careerTimelineItems.map((item) => (
          <TimelineItem
            key={item.id}
            step={item.id}
            className="sm:group-data-[orientation=vertical]/timeline:ms-32"
          >
            <TimelineHeader>
              <TimelineSeparator />
              <TimelineDate className="sm:group-data-[orientation=vertical]/timeline:absolute sm:group-data-[orientation=vertical]/timeline:-left-32 sm:group-data-[orientation=vertical]/timeline:w-20 sm:group-data-[orientation=vertical]/timeline:text-right">
                {t(`items.${item.key}.date`)}
              </TimelineDate>
              <TimelineTitle className="sm:-mt-0.5">
                {t(`items.${item.key}.title`)}
              </TimelineTitle>
              <TimelineIndicator />
            </TimelineHeader>
            <TimelineContent>
              {t(`items.${item.key}.description`)}
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </section>
  );
}
