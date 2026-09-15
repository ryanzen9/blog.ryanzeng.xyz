"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import type { ReactNode } from "react";

const REVEAL_PRESETS = {
  hero: {
    blur: "2px",
    duration: 0.46,
    offset: 8,
  },
  section: {
    blur: "1px",
    duration: 0.4,
    offset: 6,
  },
  row: {
    blur: "0px",
    duration: 0.34,
    offset: 4,
  },
} as const;

type RevealPreset = keyof typeof REVEAL_PRESETS;

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  inView?: boolean;
  preset?: RevealPreset;
};

export function Reveal({
  children,
  className,
  delay = 0,
  inView = false,
  preset = "section",
}: RevealProps) {
  return (
    <BlurFade
      {...REVEAL_PRESETS[preset]}
      className={className}
      delay={delay}
      direction="up"
      inView={inView}
      initial="hidden"
    >
      {children}
    </BlurFade>
  );
}
