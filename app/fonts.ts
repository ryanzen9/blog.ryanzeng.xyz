import { Geist, Geist_Mono, Noto_Serif_SC } from "next/font/google";

export const uiFont = Geist({
  subsets: ["latin"],
  variable: "--font-ui-source",
  display: "swap",
});

export const codeFont = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-code-source",
  display: "swap",
});

export const proseFont = Noto_Serif_SC({
  weight: ["400", "500", "600"],
  variable: "--font-prose-source",
  display: "swap",
  preload: false,
});
