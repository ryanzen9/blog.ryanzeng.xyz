"use client";

import { LogoLoop, type LogoItem } from "@/components/LogoLoop";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { CSSProperties } from "react";
import {
  siCloudflare,
  siDocker,
  siFlutter,
  siGit,
  siGithubactions,
  siHono,
  siMongodb,
  siMysql,
  siNestjs,
  siNextdotjs,
  siNodedotjs,
  siOpenjdk,
  siPostgresql,
  siReact,
  siRedis,
  siSpringboot,
  siSqlite,
  siTailwindcss,
  siTypescript,
  type SimpleIcon,
} from "simple-icons";

type Technology = {
  name: string;
  icon: SimpleIcon;
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
      { name: "TypeScript", icon: siTypescript },
      { name: "React", icon: siReact },
      { name: "Next.js", icon: siNextdotjs },
      { name: "Tailwind CSS", icon: siTailwindcss },
      { name: "Flutter", icon: siFlutter },
    ],
  },
  {
    label: "Backend",
    ariaLabel: "Backend technologies",
    technologies: [
      { name: "Node.js", icon: siNodedotjs },
      { name: "NestJS", icon: siNestjs },
      { name: "Hono", icon: siHono },
      { name: "Spring Boot", icon: siSpringboot },
      { name: "Java", icon: siOpenjdk },
    ],
  },
  {
    label: "Database",
    ariaLabel: "Database technologies",
    technologies: [
      { name: "PostgreSQL", icon: siPostgresql },
      { name: "MySQL", icon: siMysql },
      { name: "MongoDB", icon: siMongodb },
      { name: "Redis", icon: siRedis },
      { name: "SQLite", icon: siSqlite },
    ],
  },
  {
    label: "Other",
    ariaLabel: "Other tools and platforms",
    technologies: [
      { name: "Docker", icon: siDocker },
      { name: "Git", icon: siGit },
      { name: "GitHub Actions", icon: siGithubactions },
      { name: "Cloudflare", icon: siCloudflare },
    ],
  },
];

function TechnologyBadge({ name, icon }: Technology) {
  const brandColor = icon.hex === "000000" ? "var(--foreground)" : `#${icon.hex}`;
  const style = { "--technology-color": brandColor } as CSSProperties;

  return (
    <Badge
      variant="outline"
      className="h-9 gap-2 px-3 text-sm shadow-xs"
      style={style}
    >
      <svg
        aria-hidden="true"
        data-icon="inline-start"
        role="img"
        viewBox="0 0 24 24"
        className="transition-colors duration-200 group-hover/item:text-[var(--technology-color)] motion-reduce:transition-none"
      >
        <path fill="currentColor" d={icon.path} />
      </svg>
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
