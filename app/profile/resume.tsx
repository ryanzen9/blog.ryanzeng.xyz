"use client";
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { GitHubUser } from "@/lib/github";
import { useEffect, useState } from "react";

export function ProfileCard() {
  return (
    <section aria-labelledby="profile-card-title" className="py-4">
      <PersonalInfo />
      <Introduction />
    </section>
  );
}

function PersonalInfo() {
  const [profile, setProfile] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProfile("ryanzen9");
  }, []);

  async function getProfile(username: string) {
    try {
      const res = await fetch(`/api/github/users/${username}`);
      const data = await res.json();

      setProfile(data.user);
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  }

  function openGithubProfile() {
    if (profile?.html_url) {
      window.open(profile.html_url, "_blank");
    }
  }

  if (loading) {
    return (
      <div className="flex w-full mx-auto mb-4 items-center gap-2 rounded-lg p-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[140px]" />
        </div>
      </div>
    );
  }

  const profileCard = (
    <div className="flex cursor-pointer items-center gap-2">
      <Avatar className="h-12 w-12 rounded-full">
        <AvatarImage
          src={profile?.avatar_url ?? ""}
          alt={profile?.name ?? profile?.login ?? "GitHub User"}
        />
        <AvatarFallback>
          {profile?.name?.[0] ?? profile?.login?.[0] ?? "G"}
        </AvatarFallback>
      </Avatar>
      <div>
        <p className="text-lg font-medium hover:underline">{profile?.name}</p>
        <p className="text-muted-foreground text-sm">@{profile?.login}</p>
      </div>
    </div>
  );

  const triggerRender = (
    <>
      <Avatar size="lg" onClick={openGithubProfile} className="cursor-pointer">
        <AvatarImage
          src={profile?.avatar_url ?? ""}
          alt={profile?.name ?? profile?.login ?? "GitHub User"}
        />
        <AvatarFallback>
          {profile?.name?.[0] ?? profile?.login?.[0] ?? "G"}
        </AvatarFallback>
        <AvatarBadge>
          <AvatarBadge className="bg-green-500" />
        </AvatarBadge>
      </Avatar>
      <div className="flex flex-col">
        <h2 className="font-medium text-xl tracking-tighter">
          {profile?.name}
        </h2>
        <p
          className="text-sm text-muted-foreground hover:text-blue-300 cursor-pointer"
          onClick={openGithubProfile}
        >
          @{profile?.login}
        </p>
        {profile?.bio && (
          <p className="text-sm text-muted-foreground mt-2">{profile?.bio}</p>
        )}
      </div>
      <Separator className="my-2 data-horizontal:w-4/5" />
      <div className="flex flex-col gap-1 text-xs text-muted-foreground">
        <p>Location: {profile?.location}</p>
        {profile?.email && <p>Email: {profile?.email}</p>}
        {profile?.blog && (
          <p>
            WebSite:{" "}
            <a href={profile?.blog} target="_blank" rel="noopener noreferrer">
              {profile?.blog}
            </a>
          </p>
        )}
        <p className="text-2xs">
          Joined by: {new Date(profile?.created_at ?? "").toLocaleDateString()}
        </p>
      </div>
    </>
  );

  return (
    <div className="flex w-full mx-auto mb-4 items-center gap-2 rounded-lg p-4">
      <HoverCard>
        <HoverCardTrigger delay={100} closeDelay={100} render={profileCard} />
        <HoverCardContent align="start">{triggerRender}</HoverCardContent>
      </HoverCard>
    </div>
  );
}

function Introduction() {
  return (
    <>
      <p className="text-md text-muted-foreground mb-4 font-prose">
        I am an independent full-stack developer based in China, proficient in
        TypeScript, Java, Dart, and related technologies. My responsibilities
        span the full software development lifecycle, including frontend and
        backend development, application delivery, deployment, infrastructure
        operations, and database maintenance.
      </p>
      <p className="text-md text-muted-foreground mb-4 font-prose">
        I have worked on ERP systems for traditional manufacturing enterprises
        and consumer-facing e-commerce applications. I am currently expanding my
        expertise in AI agent development and transitioning toward this field. I
        also hope to contribute more actively to open-source projects and the
        broader open-source community.
      </p>

      <p className="text-sm text-accent-foreground font-prose">
        rubyceng0326
        <a href="mailto:rubyceng0326@gmail.com" className="font-mono">
          {" "}
          [at]{" "}
        </a>
        gmail.com
      </p>
    </>
  );
}
