import { ThemeProvider } from "@/components/theme-provider";
import { BlurFade } from "@/components/ui/blur-fade";
import { Meteors } from "@/components/ui/meteors";
import { routing } from "@/i18n/routing";
import { siteUrl } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import { locale } from "next/root-params";
import Footer from "../components/footer";
import { Navbar } from "../components/nav";
import { codeFont, proseFont, uiFont } from "../fonts";
import "../global.css";

export async function generateMetadata(): Promise<Metadata> {
  const curLocale = await locale();

  const t = await getTranslations("metadata");

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: t("title"),
      template: `%s | ${t("title")}`,
    },
    description: t("description"),
    icons: {
      icon: "/images/logo.jpg",
      apple: "/images/logo.jpg",
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: siteUrl,
      siteName: t("title"),
      locale: curLocale === "en-US" ? "en_US" : "zh_CN",
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
}

export function generateStaticParams() {
  const params = routing.locales.map((locale) => ({
    locale,
  }));
  return params;
}

export default async function RootLayout({ children }) {
  const curLocale = await locale();

  return (
    <html
      lang={curLocale}
      className={cn(
        uiFont.variable,
        codeFont.variable,
        proseFont.variable,
        "font-sans",
      )}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <NextIntlClientProvider>
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
      </NextIntlClientProvider>
    </html>
  );
}
