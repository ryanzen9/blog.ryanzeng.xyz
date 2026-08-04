import { createElement, forwardRef } from "react";

import {
  ClaudeCode as ClaudeCodeColor,
  CloudflareIcon as CloudflareColor,
  Cursor as CursorColor,
  Dart as DartColor,
  DockerIcon as DockerColor,
  DrizzleOrm as DrizzleColor,
  Edgedb as EdgedbColor,
  Flutter as FlutterColor,
  GitIcon as GitColor,
  GithubActions as GithubActionsColor,
  GithubCopilot as GithubCopilotColor,
  Hono as HonoColor,
  Java as JavaColor,
  MysqlIcon as MysqlColor,
  Nestjs as NestjsColor,
  NextjsIcon as NextjsColor,
  NodejsIcon as NodejsColor,
  Openai as OpenaiColor,
  Postgresql as PostgresqlColor,
  Prisma as PrismaColor,
  RedisIcon as RedisColor,
  SpringIcon as SpringColor,
  SqliteIcon as SqliteColor,
  SupabaseIcon as SupabaseColor,
  TailwindIcon as TailwindColor,
  Typescript as TypescriptColor,
  VercelIcon as VercelColor,
  Vite as ViteColor,
  _React as ReactColor,
  _Vue as VueColor,
  type Icon,
  type IconProps,
} from "@dev.icons/react";
import {
  ClaudeCode as ClaudeCodeMono,
  CloudflareIcon as CloudflareMono,
  Cursor as CursorMono,
  Dart as DartMono,
  DockerIcon as DockerMono,
  DrizzleOrm as DrizzleMono,
  Edgedb as EdgedbMono,
  Flutter as FlutterMono,
  GitIcon as GitMono,
  GithubActions as GithubActionsMono,
  GithubCopilot as GithubCopilotMono,
  Hono as HonoMono,
  Java as JavaMono,
  LinuxTux as LinuxMono,
  MysqlIcon as MysqlMono,
  Nestjs as NestjsMono,
  NextjsIcon as NextjsMono,
  NodejsIcon as NodejsMono,
  Openai as OpenaiMono,
  Postgresql as PostgresqlMono,
  Prisma as PrismaMono,
  RedisIcon as RedisMono,
  SpringIcon as SpringMono,
  SqliteIcon as SqliteMono,
  SupabaseIcon as SupabaseMono,
  TailwindIcon as TailwindMono,
  Typescript as TypescriptMono,
  VercelIcon as VercelMono,
  Vite as ViteMono,
  _React as ReactMono,
  _Vue as VueMono,
} from "@dev.icons/react/mono";

export type DevIconPair = {
  mono: Icon;
  color: Icon;
};

function createDevIconPair(mono: Icon, color: Icon): DevIconPair {
  return { mono, color };
}

const springIcons = createDevIconPair(SpringMono, SpringColor);
const LinuxColor = forwardRef<SVGSVGElement, IconProps>((props, ref) =>
  createElement(LinuxMono, { ...props, ref, color: "#FCC624" }),
);

LinuxColor.displayName = "LinuxColor";

export const devIcons = {
  typescript: createDevIconPair(TypescriptMono, TypescriptColor),
  java: createDevIconPair(JavaMono, JavaColor),
  dart: createDevIconPair(DartMono, DartColor),
  react: createDevIconPair(ReactMono, ReactColor),
  vue: createDevIconPair(VueMono, VueColor),
  nextjs: createDevIconPair(NextjsMono, NextjsColor),
  flutter: createDevIconPair(FlutterMono, FlutterColor),
  tailwind: createDevIconPair(TailwindMono, TailwindColor),
  vite: createDevIconPair(ViteMono, ViteColor),
  nodejs: createDevIconPair(NodejsMono, NodejsColor),
  nestjs: createDevIconPair(NestjsMono, NestjsColor),
  hono: createDevIconPair(HonoMono, HonoColor),
  spring: springIcons,
  springBoot: springIcons,
  openai: createDevIconPair(OpenaiMono, OpenaiColor),
  claudeCode: createDevIconPair(ClaudeCodeMono, ClaudeCodeColor),
  githubCopilot: createDevIconPair(GithubCopilotMono, GithubCopilotColor),
  cursor: createDevIconPair(CursorMono, CursorColor),
  postgresql: createDevIconPair(PostgresqlMono, PostgresqlColor),
  mysql: createDevIconPair(MysqlMono, MysqlColor),
  redis: createDevIconPair(RedisMono, RedisColor),
  sqlite: createDevIconPair(SqliteMono, SqliteColor),
  supabase: createDevIconPair(SupabaseMono, SupabaseColor),
  prisma: createDevIconPair(PrismaMono, PrismaColor),
  drizzle: createDevIconPair(DrizzleMono, DrizzleColor),
  edgedb: createDevIconPair(EdgedbMono, EdgedbColor),
  docker: createDevIconPair(DockerMono, DockerColor),
  git: createDevIconPair(GitMono, GitColor),
  githubActions: createDevIconPair(GithubActionsMono, GithubActionsColor),
  cloudflare: createDevIconPair(CloudflareMono, CloudflareColor),
  vercel: createDevIconPair(VercelMono, VercelColor),
  linux: createDevIconPair(LinuxMono, LinuxColor),
} satisfies Record<string, DevIconPair>;
