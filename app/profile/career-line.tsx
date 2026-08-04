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

const careerTimeline = [
  {
    id: 1,
    date: "Oct 2020 — Jun 2024",
    title:
      "B.Eng. Computer Science and Technology · University of Emergency Management",
    description:
      "Bachelor of Engineering in Computer Science and Technology.",
  },
  {
    id: 2,
    date: "Oct 2023",
    title: "Project Contributor · C&D Agricultural Products Group",
    description:
      "Contributed to an in-house Production Order Management System (OMS).",
  },
  {
    id: 3,
    date: "Jul 2024 — Present",
    title: "Software Engineer · Tea Industry",
    description:
      "Responsible for the end-to-end development and operation of internal digital systems for tea production.",
  },
  {
    id: 4,
    date: "Present",
    title: "Exploring AI Agent Engineering",
    description:
      "Learning and prototyping AI agent workflows for practical applications.",
  },
];

const careerTimelineItems = [...careerTimeline].reverse();

export function CareerLine() {
  return (
    <section aria-labelledby="career-timeline-title">
      <div className="mb-6 flex flex-col gap-1.5">
        <h2
          id="career-timeline-title"
          className="text-2xl font-medium tracking-tight"
        >
          Career Timeline
        </h2>
        <p className="max-w-xl text-sm leading-6 text-muted-foreground">
          Education, professional experience, and current areas of exploration.
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
                {item.date}
              </TimelineDate>
              <TimelineTitle className="sm:-mt-0.5">{item.title}</TimelineTitle>
              <TimelineIndicator />
            </TimelineHeader>
            <TimelineContent>{item.description}</TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </section>
  );
}
