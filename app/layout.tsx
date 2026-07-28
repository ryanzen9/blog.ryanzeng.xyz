import { ThemeProvider } from "@/components/theme-provider";
import { BlurFade } from "@/components/ui/blur-fade";
import { Meteors } from "@/components/ui/meteors";
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import Footer from "./components/footer";
import { Navbar } from "./components/nav";
import { codeFont, proseFont, uiFont } from "./fonts";
import "./global.css";
import { baseUrl } from "./sitemap";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "May Rain",
    template: "%s | May Rain",
  },
  description: "There's no reason for it, you've gotta go sometime.",
  icons: {
    icon: "/images/logo.jpg",
    apple: "/images/logo.jpg",
  },
  openGraph: {
    title: "May Rain",
    description: "There's no reason for it, you've gotta go sometime.",
    url: baseUrl,
    siteName: "May Rain",
    locale: "zh-Hans",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="zh-Hans"
      className={cn(
        uiFont.variable,
        codeFont.variable,
        proseFont.variable,
        "font-sans",
      )}
      suppressHydrationWarning
    >
      <body className="antialiased max-w-2xl mx-4 mt-8 lg:mx-auto">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Meteors number={30} />

          <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
            <BlurFade delay={0.25 * 1} inView>
              <Navbar />
            </BlurFade>
            <BlurFade delay={0.25 * 2} inView>
              {children}
            </BlurFade>
            <BlurFade delay={0.25 * 3} inView>
              <Footer />
            </BlurFade>
            <Analytics />
            <SpeedInsights />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
