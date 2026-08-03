"use client";

import { LogoLoop, type LogoItem } from "@/components/LogoLoop";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { devIcons, type DevIconPair } from "@/lib/icons";

type Technology = {
  name: string;
  icons: DevIconPair;
};

type TechnologyGroup = {
  label: string;
  ariaLabel: string;
  technologies: Technology[];
};

const TECHNOLOGY_GROUPS: TechnologyGroup[] = [
  {
    label: "Frontend",
    ariaLabel: "Frontend technologies",
    technologies: [
      { name: "React", icons: devIcons.react },
      { name: "Vue", icons: devIcons.vue },
      { name: "Next.js", icons: devIcons.nextjs },
      { name: "Flutter", icons: devIcons.flutter },
      { name: "Tailwind CSS", icons: devIcons.tailwind },
      { name: "Vite", icons: devIcons.vite },
    ],
  },
  {
    label: "Backend",
    ariaLabel: "Backend technologies",
    technologies: [
      { name: "Node.js", icons: devIcons.nodejs },
      { name: "NestJS", icons: devIcons.nestjs },
      { name: "Hono", icons: devIcons.hono },
      { name: "Spring", icons: devIcons.spring },
      { name: "Spring Boot", icons: devIcons.springBoot },
    ],
  },
  {
    label: "AI",
    ariaLabel: "AI technologies",
    technologies: [
      { name: "Codex", icons: devIcons.openai },
      { name: "Claude Code", icons: devIcons.claudeCode },
      { name: "Github Copilot", icons: devIcons.githubCopilot },
      { name: "Cursor", icons: devIcons.cursor },
    ],
  },
  {
    label: "Database",
    ariaLabel: "Database technologies",
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
    label: "Other",
    ariaLabel: "Other tools and platforms",
    technologies: [
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
  return (
    <section aria-labelledby="technology-stack-title" className="py-4">
      <div className="mb-2 flex flex-col gap-1">
        <h2
          id="technology-stack-title"
          className="text-xl font-medium tracking-tighter"
        >
          Technology Stack
        </h2>
        <p className="text-sm text-muted-foreground">
          Technologies I use to build, ship, and maintain products.
        </p>
      </div>

      <div className="flex flex-col">
        {GROUPS_WITH_LOGOS.map((group, index) => (
          <div key={group.label}>
            {index > 0 && <Separator />}
            <div className="grid gap-3 py-4 sm:grid-cols-[5.5rem_minmax(0,1fr)] sm:items-center">
              <h3 className="text-sm font-medium text-muted-foreground">
                {group.label}
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
                ariaLabel={group.ariaLabel}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
