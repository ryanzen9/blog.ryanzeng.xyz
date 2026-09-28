"use client";

import { useTheme } from "next-themes";
import { useEffect } from "react";

const themeColors = {
  light: "#ffffff",
  dark: "#0d0d0c",
} as const;

export function BrowserChromeTheme() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (resolvedTheme !== "light" && resolvedTheme !== "dark") return;

    const color = themeColors[resolvedTheme];
    document
      .querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]')
      .forEach((meta) => meta.setAttribute("content", color));
  }, [resolvedTheme]);

  return null;
}
