"use client";

import LineSidebar, { type LineSidebarItem } from "@/components/LineSidebar";
import type { TocItem } from "app/blog/toc";
import { useMemo, useSyncExternalStore } from "react";

function decodeHash(hash: string) {
  const value = hash.replace(/^#/, "");

  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function getHashSnapshot() {
  return decodeHash(window.location.hash);
}

function getServerHashSnapshot() {
  return "";
}

function subscribeToHash(onStoreChange: () => void) {
  window.addEventListener("hashchange", onStoreChange);
  window.addEventListener("popstate", onStoreChange);

  return () => {
    window.removeEventListener("hashchange", onStoreChange);
    window.removeEventListener("popstate", onStoreChange);
  };
}

type TocLinksProps = {
  items: readonly LineSidebarItem[];
  activeIndex: number | null;
};

function TocLinks({ items, activeIndex }: TocLinksProps) {
  return (
    <LineSidebar
      items={items}
      activeIndex={activeIndex}
      accentColor="var(--foreground)"
      textColor="var(--muted-foreground)"
      markerColor="var(--border)"
      showIndex
      showMarker
      proximityRadius={100}
      maxShift={30}
      falloff="smooth"
      markerLength={60}
      markerGap={0}
      tickScale={0.5}
      scaleTick
      itemGap={20}
      fontSize={1.1}
      smoothing={100}
    />
  );
}

export function TocSidebar({ items }: { items: TocItem[] }) {
  const hash = useSyncExternalStore(
    subscribeToHash,
    getHashSnapshot,
    getServerHashSnapshot,
  );

  const sidebarItems = useMemo<LineSidebarItem[]>(
    () =>
      items.map((item) => ({
        id: item.id,
        label: item.text,
        href: `#${item.id}`,
      })),
    [items],
  );

  const matchedIndex = items.findIndex((item) => item.id === hash);
  const activeIndex = matchedIndex >= 0 ? matchedIndex : null;

  if (items.length === 0) {
    return null;
  }

  return (
    <>
      <details className="group mb-8 border-y border-border py-3 xl:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium">
          文章目录
          <span
            aria-hidden="true"
            className="text-muted-foreground transition-transform group-open:rotate-45"
          >
            +
          </span>
        </summary>

        <nav aria-label="文章目录" className="mt-3">
          <TocLinks items={sidebarItems} activeIndex={activeIndex} />
        </nav>
      </details>

      <aside className="absolute inset-y-0 left-[calc(100%+3rem)] hidden w-56 xl:block">
        <nav aria-label="文章目录" className="sticky top-8">
          <p className="mb-3 text-xs font-medium tracking-widest text-muted-foreground uppercase">
            文章目录
          </p>

          <TocLinks items={sidebarItems} activeIndex={activeIndex} />
        </nav>
      </aside>
    </>
  );
}
