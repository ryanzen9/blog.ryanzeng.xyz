"use client";

import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";

const navItems = {
  "/": {
    name: "home",
  },
  "/profile": {
    name: "profile",
  },
  "/blog": {
    name: "blog",
  },
};

const themeButtonClassName = cn(
  buttonVariants({ variant: "ghost", size: "icon-sm" }),
  "ml-auto",
);

function ThemeToggleButton() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <span aria-hidden="true" className={themeButtonClassName} />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <AnimatedThemeToggler
      theme={isDark ? "dark" : "light"}
      onThemeChange={setTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      title={`Switch to ${isDark ? "light" : "dark"} theme`}
      className={themeButtonClassName}
    />
  );
}

export function Navbar() {
  return (
    <aside className="-ml-2 mb-16 tracking-tight">
      <div className="lg:sticky lg:top-20">
        <nav
          className="fade relative flex w-full flex-row items-center px-0 pb-0 md:relative md:overflow-auto"
          id="nav"
        >
          <div className="flex min-w-0 flex-row items-center">
            {Object.entries(navItems).map(([path, { name }]) => {
              return (
                <Link
                  key={path}
                  href={path}
                  className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-2 m-1"
                >
                  {name}
                </Link>
              );
            })}
          </div>
          <ThemeToggleButton />
        </nav>
      </div>
    </aside>
  );
}
