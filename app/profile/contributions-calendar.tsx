"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { GitHubCalendar } from "react-github-calendar";

export function ContributionsCalendar() {
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
    <section aria-labelledby="github-contributions-title" className="py-4">
      <div className="mb-2 flex flex-col gap-1">
        <h2
          id="technology-stack-title"
          className="text-xl font-medium tracking-tighter"
        >
          GitHub Contributions
        </h2>
        <p className="text-sm text-muted-foreground">
          My GitHub contributions over the last year. You can also check out my{" "}
          <a
            href="https://github.com/ryanzen9"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline"
          >
            GitHub profile
          </a>{" "}
          for more details.
        </p>
      </div>

      <GitHubCalendar
        username="ryanzen9"
        colorScheme={colorScheme}
        blockSize={8}
      />
    </section>
  );
}
