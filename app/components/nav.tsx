"use client";

import { routes } from "@/app/routes";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { LocaleSwitcher } from "./locale-switcher";
import { ThemeToggleButton } from "./theme-button";

export function Navbar() {
  const pathname = usePathname();

  return (
    <aside className="-ml-2 mb-16 tracking-tight">
      <div className="lg:sticky lg:top-20">
        <nav
          className="fade relative flex w-full flex-row items-center px-0 pb-0 md:relative md:overflow-auto"
          id="nav"
        >
          <div className="flex min-w-0 flex-row items-center">
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
                    "relative m-1 flex px-2 py-1 text-muted-foreground transition-colors hover:text-foreground",
                    isActive &&
                      "font-medium text-foreground after:absolute after:inset-x-2 after:-bottom-0.5 after:h-px after:bg-foreground",
                  )}
                >
                  {name}
                </Link>
              );
            })}
          </div>
          <div className="flex min-w-0 flex-row ml-auto gap-2">
            <LocaleSwitcher />
            <ThemeToggleButton />
          </div>
        </nav>
      </div>
    </aside>
  );
}
