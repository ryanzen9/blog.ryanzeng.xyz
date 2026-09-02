import { Geist, Geist_Mono } from "next/font/google";

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
