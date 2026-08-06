"use client";

import { LogoLoop, type LogoItem } from "@/components/LogoLoop";
import { Badge } from "@/components/ui/badge";
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

function TechnologyBadge({ name, icons }: Technology) {
  const MonoIcon = icons.mono;
  const ColorIcon = icons.color;

  return (
    <Badge
      variant="outline"
      className="h-9 gap-2 px-3 text-sm shadow-xs"
    >
      <MonoIcon
        aria-hidden="true"
        data-icon="inline-start"
        className="group-hover/item:hidden"
      />
      <ColorIcon
        aria-hidden="true"
        data-icon="inline-start"
        className="hidden group-hover/item:block"
      />
      {name}
    </Badge>
  );
}

function createLogoItems(technologies: Technology[]): LogoItem[] {
  return technologies.map((technology) => ({
    node: <TechnologyBadge {...technology} />,
    title: technology.name,
    ariaLabel: technology.name,
  }));
}

const GROUPS_WITH_LOGOS = TECHNOLOGY_GROUPS.map((group) => ({
  ...group,
  logos: createLogoItems(group.technologies),
}));

export function TechStack() {
  const t = useTranslations("profile.techStack");

  return (
    <section aria-labelledby="technology-stack-title">
      <div className="mb-6 flex flex-col gap-1.5">
        <h2
          id="technology-stack-title"
          className="text-2xl font-medium tracking-tight"
        >
          {t("title")}
        </h2>
        <p className="max-w-xl text-sm leading-6 text-muted-foreground">
          {t("description")}
        </p>
      </div>

      <div className="flex flex-col">
        {GROUPS_WITH_LOGOS.map((group, index) => (
          <div key={group.key}>
            {index > 0 && <Separator />}
            <div className="grid gap-3 py-4 sm:grid-cols-[8rem_minmax(0,1fr)] sm:items-center sm:gap-4">
              <h3 className="text-sm font-medium text-muted-foreground">
                {t(`groups.${group.key}.label`)}
              </h3>
              <LogoLoop
                logos={group.logos}
                speed={36}
                gap={12}
                logoHeight={36}
                pauseOnHover
                scaleOnHover
                fadeOut
                fadeOutColor="var(--background)"
                ariaLabel={t(`groups.${group.key}.ariaLabel`)}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
