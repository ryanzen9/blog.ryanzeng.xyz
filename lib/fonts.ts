import localFont from "next/font/local";

export const uiFont = localFont({
  src: "../node_modules/geist/dist/fonts/geist-sans/Geist-Variable.woff2",
  variable: "--font-ui-source",
  weight: "100 900",
  display: "swap",
});

export const codeFont = localFont({
  src: "../node_modules/geist/dist/fonts/geist-mono/GeistMono-Variable.woff2",
  variable: "--font-code-source",
  weight: "100 900",
  display: "swap",
});
