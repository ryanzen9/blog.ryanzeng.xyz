import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { GitHubUser } from "@/lib/github";
import { ArrowUpRight, Mail } from "lucide-react";
import { useTranslations } from "next-intl";

const GITHUB_USERNAME = "ryanzen9";
const GITHUB_PROFILE_URL = `https://github.com/${GITHUB_USERNAME}`;

export function ProfileHero({ profile }: { profile: GitHubUser | null }) {
  const t = useTranslations("profile.hero");
  const name = profile?.name ?? "Ryan Zeng";
  const username = profile?.login ?? GITHUB_USERNAME;
  const profileUrl = profile?.html_url ?? GITHUB_PROFILE_URL;

  return (
    <header
      aria-labelledby="profile-title"
      className="grid gap-10 lg:grid-cols-12 lg:gap-8"
    >
      <div className="lg:col-span-8">
        <p className="mb-5 text-sm text-muted-foreground">
          {t("roleLocation")}
        </p>
        <div className="min-w-0 border-b border-border pb-8">
          <h1
            id="profile-title"
            className="text-5xl font-semibold tracking-[-0.05em] sm:text-7xl"
          >
            {name}
          </h1>
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex font-mono text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            @{username}
          </a>
        </div>

        <div className="mt-8 flex max-w-[64ch] flex-col gap-4 text-base leading-7 text-foreground/85 sm:text-lg sm:leading-8">
          <p>{t("introduction.primary")}</p>
          <p>{t("introduction.currentFocus")}</p>
        </div>
      </div>

      <aside className="flex self-start flex-col gap-6 border-l border-border pl-5 lg:col-span-4 lg:pl-8">
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t("githubProfileAria", { name })}
          className="w-fit rounded-full outline-none transition-opacity hover:opacity-75 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <Avatar className="size-20">
            <AvatarImage src={profile?.avatar_url ?? ""} alt={name} />
            <AvatarFallback>{name[0]}</AvatarFallback>
          </Avatar>
        </a>

        <div className="flex flex-col items-start gap-3 text-sm">
          <a
            href="mailto:rubyceng0326@gmail.com"
            className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <Mail aria-hidden="true" className="size-4" />
            {t("links.email")}
            <ArrowUpRight aria-hidden="true" className="size-3.5" />
          </a>
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            {t("links.github")}
            <ArrowUpRight aria-hidden="true" className="size-3.5" />
          </a>
        </div>
      </aside>
    </header>
  );
}
