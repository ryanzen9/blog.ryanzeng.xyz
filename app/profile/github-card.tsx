"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { GitHubCalendar } from "react-github-calendar";

export function GithubCard() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        aria-hidden="true"
        className="h-32 w-full animate-pulse rounded-lg bg-muted"
      />
    );
  }

  const colorScheme = resolvedTheme === "dark" ? "dark" : "light";

  return (
    <div className="rounded-lg border border-border bg-card p-4 shadow-md flex items-center">
      <GitHubCalendar
        username="ryanzen9"
        colorScheme={colorScheme}
        blockSize={10}
      />
    </div>
  );
}
