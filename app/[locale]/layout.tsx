import { ViewportBlur } from "@/app/components/viewport-blur";
import { Meteors } from "@/components/ui/meteors";
import { ThemeProvider } from "@/components/theme-provider";
import { routing } from "@/i18n/routing";
import { codeFont, uiFont } from "@/lib/fonts";
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const curLocale = await locale();
  const t = await getTranslations("accessibility");

  return (
    <html
      lang={curLocale}
      className={cn(uiFont.variable, codeFont.variable, "font-sans")}
      suppressHydrationWarning
    >
      <NextIntlClientProvider>
        <body className="min-h-screen bg-background text-foreground antialiased">
          <ThemeProvider
            attribute={["class", "data-theme"]}
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="site-meteors" aria-hidden="true">
              <Meteors number={30} />
            </div>
            <ViewportBlur />
            <a href="#main-content" className="skip-link">
              {t("skipToContent")}
            </a>

            <div className="site-shell">
              <Navbar />
              <main id="main-content" tabIndex={-1} className="site-main">
                {children}
              </main>
              <Footer />
              <Analytics />
              <SpeedInsights />
            </div>
          </ThemeProvider>
        </body>
      </NextIntlClientProvider>
    </html>
  );
}
