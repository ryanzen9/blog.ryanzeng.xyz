"use client";

import { Progress as ProgressPrimitive } from "@base-ui/react/progress";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

type ReadingProgressProps = {
  targetId: string;
};

export function ReadingProgress({ targetId }: ReadingProgressProps) {
  const t = useTranslations("blog");
  const [progress, setProgress] = useState(0);
  const animationFrame = useRef<number | null>(null);

  useEffect(() => {
    const target = document.getElementById(targetId);

    if (!target) {
      return;
    }

    const updateProgress = () => {
      const targetRect = target.getBoundingClientRect();
      const targetTop = targetRect.top + window.scrollY;
      const readingDistance = targetRect.height - window.innerHeight;

      let nextProgress = 0;

      if (readingDistance <= 0) {
        nextProgress = targetRect.bottom <= window.innerHeight ? 100 : 0;
      } else {
        nextProgress = ((window.scrollY - targetTop) / readingDistance) * 100;
      }

      setProgress(Math.round(Math.min(100, Math.max(0, nextProgress))));
    };

    const scheduleUpdate = () => {
      if (animationFrame.current !== null) {
        return;
      }

      animationFrame.current = window.requestAnimationFrame(() => {
        animationFrame.current = null;
        updateProgress();
      });
    };

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    const resizeObserver = new ResizeObserver(scheduleUpdate);
    resizeObserver.observe(target);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      resizeObserver.disconnect();

      if (animationFrame.current !== null) {
        window.cancelAnimationFrame(animationFrame.current);
        animationFrame.current = null;
      }
    };
  }, [targetId]);

  return (
    <ProgressPrimitive.Root
      aria-label={t("readingProgress")}
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-1 bg-muted/70"
      value={progress}
    >
      <ProgressPrimitive.Track className="relative flex h-full w-full items-center overflow-hidden">
        <ProgressPrimitive.Indicator className="h-full bg-primary transition-[width] duration-100 ease-out motion-reduce:transition-none" />
      </ProgressPrimitive.Track>
    </ProgressPrimitive.Root>
  );
}
