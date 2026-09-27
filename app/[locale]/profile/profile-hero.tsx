import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { GitHubUser } from "@/lib/github";
import { useTranslations } from "next-intl";

export function ProfileHero({ profile }: { profile: GitHubUser | null }) {
  const t = useTranslations("profile.hero");
  const name = profile?.name ?? "Ryan Zeng";
  const username = profile?.login ?? "ryanzen9";
  const profileUrl = profile?.html_url ?? "https://github.com/ryanzen9";

  return (
    <header aria-labelledby="profile-title" className="reading-column">
      <div className="mb-8 flex items-center gap-4">
        <Avatar className="size-12">
          <AvatarImage src={profile?.avatar_url ?? ""} alt={name} />
          <AvatarFallback>{name[0]}</AvatarFallback>
        </Avatar>
        <p className="editorial-meta">{t("roleLocation")}</p>
      </div>
      <h1 id="profile-title" className="editorial-heading">
        {name}
      </h1>
      <a
        href={profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-link mt-4 inline-block py-1 font-mono text-sm text-muted-foreground"
        aria-label={t("githubProfileAria", { name })}
      >
        @{username}
      </a>
      <div className="editorial-copy editorial-body mt-(--space-content-media)">
        <p>{t("introduction.primary")}</p>
        <p>{t("introduction.currentFocus")}</p>
      </div>
      <div className="mt-(--space-content-media) flex items-center gap-8 text-sm">
        <a className="text-link py-2" href="mailto:rubyceng0326@gmail.com">
          {t("links.email")} <span aria-hidden="true">↗</span>
        </a>
        <a
          className="text-link py-2"
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("links.github")} <span aria-hidden="true">↗</span>
        </a>
      </div>
    </header>
  );
}
