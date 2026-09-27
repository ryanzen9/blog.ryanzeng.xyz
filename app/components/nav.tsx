"use client";

import { routes } from "@/app/routes";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { LocaleSwitcher } from "./locale-switcher";
import { ThemeToggleButton } from "./theme-button";

export function Navbar() {
  const pathname = usePathname();
  const t = useTranslations("navigation");

  return (
    <header>
      <nav
        className="flex min-h-(--layout-header-height) w-full flex-wrap items-center gap-x-2 gap-y-1 py-4"
        aria-label={t("label")}
      >
        <Link
          href="/"
          className="shrink-0 text-base font-semibold tracking-tight outline-none transition-opacity hover:opacity-60 focus-visible:ring-2 focus-visible:ring-ring"
        >
          May Rain
        </Link>

        <div className="ml-auto flex min-w-0 items-center gap-0 sm:gap-4">
          <div className="flex min-w-0 items-center">
            {Object.entries(routes).map(([path, { name }]) => {
              const isActive =
                path === "/"
                  ? pathname === path
                  : pathname === path || pathname.startsWith(`${path}/`);

              return (
                <Link
                  key={path}
                  href={path}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "relative flex h-11 items-center px-2 text-sm text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring sm:px-3",
                    path === "/" && "hidden sm:flex",
                    isActive &&
                      "font-medium text-foreground after:absolute after:inset-x-2 after:bottom-0 after:h-px after:bg-foreground sm:after:inset-x-3",
                  )}
                >
                  {t(name)}
                </Link>
              );
            })}
          </div>
          <div className="flex shrink-0 items-center gap-1">
            <LocaleSwitcher />
            <ThemeToggleButton />
          </div>
        </div>
      </nav>
    </header>
  );
}
