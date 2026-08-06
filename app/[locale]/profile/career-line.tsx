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
      <div className="mb-6 flex flex-col gap-1.5">
        <h2
          id="career-timeline-title"
          className="text-2xl font-medium tracking-tight"
        >
          {t("title")}
        </h2>
        <p className="max-w-xl text-sm leading-6 text-muted-foreground">
          {t("description")}
        </p>
      </div>

      <Timeline
        defaultValue={careerTimeline[careerTimeline.length - 2].id}
        className="w-full max-w-md mx-auto"
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
