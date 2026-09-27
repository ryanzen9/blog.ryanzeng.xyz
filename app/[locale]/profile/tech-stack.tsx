import { useTranslations } from "next-intl";

type Technology = {
  name: string;
};

type TechnologyGroup = {
  key: "build" | "data" | "tooling";
  technologies: Technology[];
};

const TECHNOLOGY_GROUPS: TechnologyGroup[] = [
  {
    key: "build",
    technologies: [
      { name: "TypeScript" },
      { name: "Java" },
      { name: "Dart" },
      { name: "React" },
      { name: "Vue" },
      { name: "Next.js" },
      { name: "Flutter" },
      { name: "Tailwind CSS" },
      { name: "Vite" },
      { name: "Node.js" },
      { name: "NestJS" },
      { name: "Hono" },
      { name: "Spring Boot" },
    ],
  },
  {
    key: "data",
    technologies: [
      { name: "PostgreSQL" },
      { name: "MySQL" },
      { name: "Redis" },
      { name: "SQLite" },
      { name: "Supabase" },
      { name: "Prisma" },
      { name: "Drizzle" },
      { name: "EdgeDB" },
    ],
  },
  {
    key: "tooling",
    technologies: [
      { name: "Codex" },
      { name: "Claude Code" },
      { name: "GitHub Copilot" },
      { name: "Cursor" },
      { name: "Docker" },
      { name: "Git" },
      { name: "GitHub Actions" },
      { name: "Cloudflare" },
      { name: "Vercel" },
      { name: "Linux" },
    ],
  },
];

function TechnologyItem({ name }: Technology) {
  return <li className="text-base leading-7 text-muted-foreground">{name}</li>;
}

export function TechStack() {
  const t = useTranslations("profile.techStack");

  return (
    <section
      aria-labelledby="technology-stack-title"
      className="reading-column"
    >
      <div className="section-intro">
        <h2 id="technology-stack-title" className="section-heading">
          {t("title")}
        </h2>
        <p className="editorial-body">{t("description")}</p>
      </div>

      <div className="flex flex-col gap-(--space-entry)">
        {TECHNOLOGY_GROUPS.map((group) => (
          <div key={group.key}>
            <div className="flex flex-col gap-4">
              <h3 className="text-xl font-medium">
                {t(`groups.${group.key}.label`)}
              </h3>
              <ul
                className="grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3"
                aria-label={t(`groups.${group.key}.ariaLabel`)}
              >
                {group.technologies.map((technology) => (
                  <TechnologyItem key={technology.name} {...technology} />
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
