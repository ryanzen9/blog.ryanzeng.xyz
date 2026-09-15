"use client";

import { Progress as ProgressPrimitive } from "@base-ui/react/progress";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import {
  READING_PROGRESS_PAUSE_EVENT,
  READING_PROGRESS_RESUME_EVENT,
} from "./reading-progress-events";

const SETTLE_DURATION = 300;

type ReadingProgressProps = {
  targetId: string;
};

export function ReadingProgress({ targetId }: ReadingProgressProps) {
  const t = useTranslations("blog");
  const [progress, setProgress] = useState(0);
  const [isSettling, setIsSettling] = useState(false);
  const animationFrame = useRef<number | null>(null);
  const settleTimeout = useRef<number | null>(null);
  const isPaused = useRef(false);

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
      if (isPaused.current || animationFrame.current !== null) {
        return;
      }

      animationFrame.current = window.requestAnimationFrame(() => {
        animationFrame.current = null;
        updateProgress();
      });
    };

    const pauseProgress = () => {
      isPaused.current = true;
      setIsSettling(false);

      if (animationFrame.current !== null) {
        window.cancelAnimationFrame(animationFrame.current);
        animationFrame.current = null;
      }

      if (settleTimeout.current !== null) {
        window.clearTimeout(settleTimeout.current);
        settleTimeout.current = null;
      }
    };

    const resumeProgress = () => {
      isPaused.current = false;
      setIsSettling(true);
      scheduleUpdate();

      if (settleTimeout.current !== null) {
        window.clearTimeout(settleTimeout.current);
      }

      settleTimeout.current = window.setTimeout(() => {
        settleTimeout.current = null;
        setIsSettling(false);
      }, SETTLE_DURATION);
    };

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener(READING_PROGRESS_PAUSE_EVENT, pauseProgress);
    window.addEventListener(READING_PROGRESS_RESUME_EVENT, resumeProgress);

    const resizeObserver = new ResizeObserver(scheduleUpdate);
    resizeObserver.observe(target);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener(READING_PROGRESS_PAUSE_EVENT, pauseProgress);
      window.removeEventListener(
        READING_PROGRESS_RESUME_EVENT,
        resumeProgress,
      );
      resizeObserver.disconnect();

      if (animationFrame.current !== null) {
        window.cancelAnimationFrame(animationFrame.current);
        animationFrame.current = null;
      }

      if (settleTimeout.current !== null) {
        window.clearTimeout(settleTimeout.current);
        settleTimeout.current = null;
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
        <ProgressPrimitive.Indicator
          className={cn(
            "h-full bg-primary transition-[width] motion-reduce:transition-none",
            isSettling
              ? "duration-300 ease-out"
              : "duration-100 ease-out",
          )}
        />
      </ProgressPrimitive.Track>
    </ProgressPrimitive.Root>
  );
}
