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

const roadmap = [
  {
    id: 1,
    date: "Oct 2020",
    title: "University of Emergency Management (UEM)",
    description:
      "Bachelor of Engineering in Computer Science and Technology, University of Emergency Management.",
  },
  {
    id: 2,
    date: "Oct 2023",
    title: "C&D Agricultural Products Group",
    description:
      "Participated in the development of an in-house Production Order Management System (OMS).",
  },
  {
    id: 3,
    date: "Jun 2024",
    title: "Graduated from university",
  },
  {
    id: 4,
    date: "Jul 2024",
    title: "Full-stack Developer",
    description:
      "Full-stack Software Engineer at one of China’s leading tea companies, responsible for the end-to-end development of in-house digital systems for production operations.",
  },
  {
    id: 5,
    date: "Now",
    title: "AI Agent Engineer (Want to be)",
    description:
      "Learning and exploring AI agent development, focusing on the integration of AI technologies into practical applications.",
  },
];

export function CareerLine() {
  return (
    <section aria-labelledby="technology-stack-title" className="py-4">
      <div className="mb-2 flex flex-col gap-1">
        <h2
          id="technology-stack-title"
          className="text-xl font-medium tracking-tighter"
        >
          Career Roadmap
        </h2>
        <p className="text-sm text-muted-foreground">
          My planned career milestones and achievements.
        </p>
      </div>

      <Timeline
        defaultValue={roadmap[roadmap.length - 2].id}
        className="w-full max-w-md mx-auto"
      >
        {roadmap.reverse().map((item) => (
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
