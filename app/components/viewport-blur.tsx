"use client";

import { usePathname } from "@/i18n/navigation";
import { useEffect, useRef } from "react";

const FADE_DISTANCE = 320;

function fadeOpacity(distance: number) {
  const progress = Math.min(1, Math.max(0, distance / FADE_DISTANCE));
  return progress * progress * (3 - 2 * progress);
}

// Each band overlaps its neighbours so the blur increases towards the edge.
const blurLayers = Array.from({ length: 8 }, (_, index) => {
  const stops = [
    `transparent ${index * 12.5}%`,
    `black ${(index + 1) * 12.5}%`,
    index < 7 ? `black ${(index + 2) * 12.5}%` : null,
    index < 6 ? `transparent ${(index + 3) * 12.5}%` : null,
  ]
    .filter(Boolean)
    .join(", ");

  return { strength: 2 ** (index - 7), stops };
});

export function ViewportBlur() {
  const pathname = usePathname();
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame: number | null = null;
    const update = () => {
      frame = null;
      const remaining =
        document.documentElement.scrollHeight - innerHeight - scrollY;
      if (topRef.current) {
        topRef.current.style.opacity = String(fadeOpacity(scrollY));
      }
      if (bottomRef.current) {
        bottomRef.current.style.opacity = String(fadeOpacity(remaining));
      }
    };
    const scheduleUpdate = () => {
      if (frame === null) frame = requestAnimationFrame(update);
    };
    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    const observer = new ResizeObserver(scheduleUpdate);
    observer.observe(document.body);
    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      observer.disconnect();
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return (
    <>
      {(["top", "bottom"] as const).map((edge) => (
        <div
          key={edge}
          ref={edge === "top" ? topRef : bottomRef}
          className={`viewport-blur viewport-blur-${edge}`}
          aria-hidden="true"
        >
          {blurLayers.map(({ strength, stops }, index) => {
            const mask = `linear-gradient(to ${edge}, ${stops})`;
            const blur = `blur(calc(var(--edge-blur-strength) * ${strength}))`;
            return (
              <span
                key={index}
                style={{
                  backdropFilter: blur,
                  WebkitBackdropFilter: blur,
                  maskImage: mask,
                  WebkitMaskImage: mask,
                }}
              />
            );
          })}
        </div>
      ))}
    </>
  );
}
