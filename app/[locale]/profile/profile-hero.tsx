import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { GitHubUser } from "@/lib/github";
import { useTranslations } from "next-intl";

const GITHUB_USERNAME = "ryanzen9";
const GITHUB_PROFILE_URL = `https://github.com/${GITHUB_USERNAME}`;

export function ProfileHero({ profile }: { profile: GitHubUser | null }) {
  const t = useTranslations("profile.hero");
  const name = profile?.name ?? "Ryan Zeng";
  const username = profile?.login ?? GITHUB_USERNAME;
  const profileUrl = profile?.html_url ?? GITHUB_PROFILE_URL;

  return (
    <header aria-labelledby="profile-title" className="pt-2">
      <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
        {t("roleLocation")}
      </p>

      <div className="flex items-center gap-4">
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t("githubProfileAria", { name })}
          className="rounded-full outline-none transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <Avatar className="size-16">
            <AvatarImage src={profile?.avatar_url ?? ""} alt={name} />
            <AvatarFallback>{name[0]}</AvatarFallback>
          </Avatar>
        </a>

        <div className="min-w-0">
          <h1
            id="profile-title"
            className="text-4xl font-semibold tracking-tighter sm:text-5xl"
          >
            {name}
          </h1>
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-flex text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            @{username}
          </a>
        </div>
      </div>

      <div className="mt-8 max-w-[62ch] space-y-4 font-prose text-base leading-7 text-foreground/80 sm:text-[1.0625rem] sm:leading-8">
        <p>{t("introduction.primary")}</p>
        <p>{t("introduction.currentFocus")}</p>
      </div>

      <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
        <a
          href="mailto:rubyceng0326@gmail.com"
          className="underline decoration-border underline-offset-4 transition-colors hover:text-muted-foreground"
        >
          {t("links.email")} ↗
        </a>
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-border underline-offset-4 transition-colors hover:text-muted-foreground"
        >
          {t("links.github")} ↗
        </a>
      </div>
    </header>
  );
}
