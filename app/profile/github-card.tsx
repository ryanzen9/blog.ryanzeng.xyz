"use client";
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { GitHubUser } from "@/lib/github";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { GitHubCalendar } from "react-github-calendar";
import { TechStack } from "./tech-stack";

export function ProfileCard() {
  const { resolvedTheme } = useTheme();

  const colorScheme = resolvedTheme === "dark" ? "dark" : "light";

  return (
    <>
      <PersonalInfo />

      <Introduction />

      <Separator className="my-4" />

      <TechStack />

      <Separator className="my-4 mx-4" />

      <h2 className="font-medium text-xl tracking-tighter mb-4">
        GitHub Contributions
      </h2>

      <ContributionsCalendar />
    </>
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
      <div className="flex w-full mx-auto mb-4 items-center gap-2 rounded-lg p-4 ">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[140px]" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full mx-auto mb-4 items-center gap-2 rounded-lg p-4 ">
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
      </div>
    </div>
  );
}

function Introduction() {
  return (
    <div className="mb-4">
      <p className="text-md text-muted-foreground mb-4">
        I am an independent full-stack developer based in China, proficient in
        TypeScript, JavaScript, Java, Dart, and related technologies. My
        responsibilities span the full software development lifecycle, including
        frontend and backend development, application delivery, deployment,
        infrastructure operations, and database maintenance.
      </p>
      <p className="text-md text-muted-foreground mb-4">
        I have worked on ERP systems for traditional manufacturing enterprises
        and consumer-facing e-commerce applications. I am currently expanding my
        expertise in AI agent development and transitioning toward this field. I
        also hope to contribute more actively to open-source projects and the
        broader open-source community.
      </p>

      <p className="text-sm text-accent-foreground mb-2">
        <a href="mailto:rubyceng0326@gmail.com">
          rubyceng0326<span className="font-mono">[at]</span>gmail.com
        </a>
      </p>
    </div>
  );
}

function ContributionsCalendar() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Skeleton className="h-32 w-full rounded-lg" />;
  }

  const colorScheme = resolvedTheme === "dark" ? "dark" : "light";

  return (
    <GitHubCalendar
      username="ryanzen9"
      colorScheme={colorScheme}
      blockSize={8}
    />
  );
}
