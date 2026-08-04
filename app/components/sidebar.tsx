"use client";

import LineSidebar, { type LineSidebarItem } from "@/components/LineSidebar";
import type { TocItem } from "app/blog/toc";
import { useCallback, useEffect, useMemo, useState } from "react";

function useActiveHeading(items: TocItem[]) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    const headings = items
      .map((item, index) => ({
        element: document.getElementById(item.id),
        index,
      }))
      .filter(
        (heading): heading is { element: HTMLElement; index: number } =>
          heading.element !== null,
      );

    if (headings.length === 0) {
      setActiveIndex(null);
      return;
    }

    let animationFrame: number | null = null;

    const updateActiveHeading = () => {
      animationFrame = null;

      // A heading becomes active shortly before it reaches the top of the
      // viewport, which better matches the paragraph the reader is looking at.
      const readingLine = Math.min(window.innerHeight * 0.25, 160);
      let nextIndex = headings[0].index;

      for (const heading of headings) {
        if (heading.element.getBoundingClientRect().top > readingLine) {
          break;
        }

        nextIndex = heading.index;
      }

      const isAtPageEnd =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 2;

      if (isAtPageEnd) {
        nextIndex = headings.at(-1)?.index ?? nextIndex;
      }

      setActiveIndex((currentIndex) =>
        currentIndex === nextIndex ? currentIndex : nextIndex,
      );
    };

    const scheduleUpdate = () => {
      if (animationFrame === null) {
        animationFrame = window.requestAnimationFrame(updateActiveHeading);
      }
    };

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("hashchange", scheduleUpdate);
    window.addEventListener("popstate", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("hashchange", scheduleUpdate);
      window.removeEventListener("popstate", scheduleUpdate);

      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, [items]);

  return [activeIndex, setActiveIndex] as const;
}

type TocLinksProps = {
  items: readonly LineSidebarItem[];
  activeIndex: number | null;
  onItemClick: (index: number) => void;
};

function TocLinks({ items, activeIndex, onItemClick }: TocLinksProps) {
  return (
    <LineSidebar
      items={items}
      activeIndex={activeIndex}
      onItemClick={onItemClick}
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
  const [activeIndex, setActiveIndex] = useActiveHeading(items);

  const sidebarItems = useMemo<LineSidebarItem[]>(
    () =>
      items.map((item) => ({
        id: item.id,
        label: item.text,
        href: `#${item.id}`,
      })),
    [items],
  );

  const handleItemClick = useCallback(
    (index: number) => {
      setActiveIndex(index);
    },
    [setActiveIndex],
  );

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
          <TocLinks
            items={sidebarItems}
            activeIndex={activeIndex}
            onItemClick={handleItemClick}
          />
        </nav>
      </details>

      <aside className="absolute inset-y-0 left-[calc(100%+3rem)] hidden w-56 xl:block">
        <nav aria-label="文章目录" className="sticky top-8">
          <p className="mb-3 text-xs font-medium tracking-widest text-muted-foreground uppercase">
            文章目录
          </p>

          <TocLinks
            items={sidebarItems}
            activeIndex={activeIndex}
            onItemClick={handleItemClick}
          />
        </nav>
      </aside>
    </>
  );
}
