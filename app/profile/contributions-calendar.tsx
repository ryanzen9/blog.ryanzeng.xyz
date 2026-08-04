"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { GitHubCalendar } from "react-github-calendar";

export function ContributionsCalendar() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  const [showLeftFade, setShowLeftFade] = useState(false);
  const [showRightFade, setShowRightFade] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const colorScheme = resolvedTheme === "dark" ? "dark" : "light";

  return (
    <section aria-labelledby="github-contributions-title">
      <div className="mb-6 flex flex-col gap-1.5">
        <h2
          id="github-contributions-title"
          className="text-2xl font-medium tracking-tight"
        >
          GitHub Contributions
        </h2>
        <p className="max-w-xl text-sm leading-6 text-muted-foreground">
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

      <div className="relative">
        <div
          className="overflow-x-auto pb-2"
          onScroll={(e) => {
            setShowLeftFade(e.currentTarget.scrollLeft > 4);
            setShowRightFade(
              e.currentTarget.scrollWidth -
                e.currentTarget.scrollLeft -
                e.currentTarget.clientWidth >
                4,
            );
          }}
        >
          <div className="min-h-40 min-w-[39.5rem]" aria-busy={!mounted}>
            {mounted ? (
              <GitHubCalendar
                username="ryanzen9"
                colorScheme={colorScheme}
                blockSize={8}
              />
            ) : (
              <Skeleton className="h-40 w-full rounded-lg" />
            )}
          </div>
        </div>
        <div
          aria-hidden="true"
          data-visible={showLeftFade}
          className="pointer-events-none absolute bottom-2 left-0 top-0 w-14 bg-linear-to-r from-background via-background/85 to-transparent opacity-0 transition-opacity data-[visible=true]:opacity-100 sm:hidden"
        />

        <div
          aria-hidden="true"
          data-visible={showRightFade}
          className="pointer-events-none absolute bottom-2 right-0 top-0 w-14 bg-linear-to-l from-background via-background/85 to-transparent opacity-0 transition-opacity data-[visible=true]:opacity-100 sm:hidden"
        />
      </div>
    </section>
  );
}
