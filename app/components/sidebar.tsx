"use client";

import type { TocItem } from "@/app/[locale]/blog/toc";
import LineSidebar, { type LineSidebarItem } from "@/components/LineSidebar";
import { cn } from "@/lib/utils";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
} from "react";

const SCROLL_OFFSET = 32;
const SCROLL_DURATION = 1000;

function easeInOutQuart(progress: number) {
  return progress < 0.5
    ? 8 * progress * progress * progress * progress
    : 1 - Math.pow(-2 * progress + 2, 4) / 2;
}

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

      const detectionLine = window.scrollY + window.innerHeight / 3;
      let nextIndex: number | null = null;

      for (let index = 0; index < headings.length; index += 1) {
        const heading = headings[index];
        const nextHeading = headings[index + 1];
        const sectionTop =
          heading.element.getBoundingClientRect().top + window.scrollY;
        const sectionBottom = nextHeading
          ? nextHeading.element.getBoundingClientRect().top + window.scrollY
          : document.documentElement.scrollHeight;

        if (detectionLine >= sectionTop && detectionLine < sectionBottom) {
          nextIndex = heading.index;
          break;
        }
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

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);

      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, [items]);

  return [activeIndex, setActiveIndex] as const;
}

export function TocSidebar({ items }: { items: TocItem[] }) {
  const [activeIndex, setActiveIndex] = useActiveHeading(items);
  const scrollAnimationRef = useRef<number | null>(null);

  const sidebarItems = useMemo<LineSidebarItem[]>(
    () =>
      items.map((item) => ({
        id: item.id,
        label: item.text,
        href: `#${item.id}`,
      })),
    [items],
  );

  const cancelScrollAnimation = useCallback(() => {
    if (scrollAnimationRef.current !== null) {
      window.cancelAnimationFrame(scrollAnimationRef.current);
      scrollAnimationRef.current = null;
    }
  }, []);

  useEffect(() => {
    const cancelOnKeyboardNavigation = (event: KeyboardEvent) => {
      if (
        ["ArrowDown", "ArrowUp", "End", "Home", "PageDown", "PageUp"].includes(
          event.key,
        )
      ) {
        cancelScrollAnimation();
      }
    };

    window.addEventListener("wheel", cancelScrollAnimation, { passive: true });
    window.addEventListener("touchstart", cancelScrollAnimation, {
      passive: true,
    });
    window.addEventListener("keydown", cancelOnKeyboardNavigation);

    return () => {
      cancelScrollAnimation();
      window.removeEventListener("wheel", cancelScrollAnimation);
      window.removeEventListener("touchstart", cancelScrollAnimation);
      window.removeEventListener("keydown", cancelOnKeyboardNavigation);
    };
  }, [cancelScrollAnimation]);

  const handleItemClick = useCallback(
    (
      event: ReactMouseEvent<HTMLAnchorElement>,
      index: number,
      item: LineSidebarItem,
    ) => {
      const isModifiedClick =
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey;

      if (isModifiedClick) {
        return;
      }

      event.preventDefault();

      const target = document.getElementById(item.id);

      if (!target) {
        return;
      }

      cancelScrollAnimation();
      setActiveIndex(index);

      const startY = window.scrollY;
      const rawTargetY =
        target.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
      const maxScrollY = Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight,
      );
      const targetY = Math.min(Math.max(rawTargetY, 0), maxScrollY);
      const distance = targetY - startY;

      window.history.pushState(null, "", item.href);

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        window.scrollTo(0, targetY);
        return;
      }

      let startedAt: number | null = null;

      const runScrollAnimation = (timestamp: number) => {
        startedAt ??= timestamp;

        const elapsed = timestamp - startedAt;
        const progress = Math.min(elapsed / SCROLL_DURATION, 1);
        const easedProgress = easeInOutQuart(progress);

        window.scrollTo(0, startY + distance * easedProgress);

        if (progress < 1) {
          scrollAnimationRef.current =
            window.requestAnimationFrame(runScrollAnimation);
        } else {
          scrollAnimationRef.current = null;
        }
      };

      scrollAnimationRef.current =
        window.requestAnimationFrame(runScrollAnimation);
    },
    [cancelScrollAnimation, setActiveIndex],
  );

  if (items.length === 0) {
    return null;
  }

  return (
    <>
      <details className="group mb-8 border-b border-border pb-4 xl:hidden">
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
          <ol className="flex flex-col gap-1">
            {sidebarItems.map((item, index) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  aria-current={activeIndex === index ? "location" : undefined}
                  className={cn(
                    "block border-l border-border py-1 pl-3 text-sm leading-5 text-muted-foreground transition-colors hover:border-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    activeIndex === index &&
                      "border-foreground text-foreground",
                  )}
                  onClick={(event) => handleItemClick(event, index, item)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </details>

      <LineSidebar
        items={sidebarItems}
        activeIndex={activeIndex}
        onItemClick={handleItemClick}
      />
    </>
  );
}
