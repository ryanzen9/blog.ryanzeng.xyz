import { Separator } from "@/components/ui/separator";
import { devIcons, type DevIconPair } from "@/lib/icons";
import { useTranslations } from "next-intl";

type Technology = {
  name: string;
  icons: DevIconPair;
};

type TechnologyGroup = {
  key: "build" | "data" | "tooling";
  technologies: Technology[];
};

const TECHNOLOGY_GROUPS: TechnologyGroup[] = [
  {
    key: "build",
    technologies: [
      { name: "TypeScript", icons: devIcons.typescript },
      { name: "Java", icons: devIcons.java },
      { name: "Dart", icons: devIcons.dart },
      { name: "React", icons: devIcons.react },
      { name: "Vue", icons: devIcons.vue },
      { name: "Next.js", icons: devIcons.nextjs },
      { name: "Flutter", icons: devIcons.flutter },
      { name: "Tailwind CSS", icons: devIcons.tailwind },
      { name: "Vite", icons: devIcons.vite },
      { name: "Node.js", icons: devIcons.nodejs },
      { name: "NestJS", icons: devIcons.nestjs },
      { name: "Hono", icons: devIcons.hono },
      { name: "Spring Boot", icons: devIcons.springBoot },
    ],
  },
  {
    key: "data",
    technologies: [
      { name: "PostgreSQL", icons: devIcons.postgresql },
      { name: "MySQL", icons: devIcons.mysql },
      { name: "Redis", icons: devIcons.redis },
      { name: "SQLite", icons: devIcons.sqlite },
      { name: "Supabase", icons: devIcons.supabase },
      { name: "Prisma", icons: devIcons.prisma },
      { name: "Drizzle", icons: devIcons.drizzle },
      { name: "EdgeDB", icons: devIcons.edgedb },
    ],
  },
  {
    key: "tooling",
    technologies: [
      { name: "Codex", icons: devIcons.openai },
      { name: "Claude Code", icons: devIcons.claudeCode },
      { name: "GitHub Copilot", icons: devIcons.githubCopilot },
      { name: "Cursor", icons: devIcons.cursor },
      { name: "Docker", icons: devIcons.docker },
      { name: "Git", icons: devIcons.git },
      { name: "GitHub Actions", icons: devIcons.githubActions },
      { name: "Cloudflare", icons: devIcons.cloudflare },
      { name: "Vercel", icons: devIcons.vercel },
      { name: "Linux", icons: devIcons.linux },
    ],
  },
];

function TechnologyItem({ name, icons }: Technology) {
  const MonoIcon = icons.mono;

  return (
    <li className="flex items-center gap-2 text-sm text-foreground/80">
      <MonoIcon aria-hidden="true" size={14} />
      <span>{name}</span>
    </li>
  );
}

export function TechStack() {
  const t = useTranslations("profile.techStack");

  return (
    <section aria-labelledby="technology-stack-title">
      <div className="mb-8 grid gap-3 sm:grid-cols-12 sm:items-end">
        <h2
          id="technology-stack-title"
          className="text-2xl font-medium tracking-tight sm:col-span-7"
        >
          {t("title")}
        </h2>
        <p className="max-w-xl text-sm leading-6 text-muted-foreground sm:col-span-5">
          {t("description")}
        </p>
      </div>

      <div className="flex flex-col">
        {TECHNOLOGY_GROUPS.map((group, index) => (
          <div key={group.key}>
            {index > 0 && <Separator />}
            <div className="grid gap-4 py-6 sm:grid-cols-12 sm:gap-6">
              <h3 className="text-sm font-medium text-muted-foreground sm:col-span-2">
                {t(`groups.${group.key}.label`)}
              </h3>
              <ul
                className="grid grid-cols-2 gap-x-6 gap-y-3 sm:col-span-10 sm:grid-cols-3 lg:grid-cols-4"
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
