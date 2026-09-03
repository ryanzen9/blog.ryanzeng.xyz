import { ThemeProvider } from "@/components/theme-provider";
import { Meteors } from "@/components/ui/meteors";
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

export default async function RootLayout({ children }) {
  const curLocale = await locale();

  return (
    <html
      lang={curLocale}
      className={cn(uiFont.variable, codeFont.variable, "font-sans")}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <NextIntlClientProvider>
        <body className="min-h-screen bg-background text-foreground antialiased">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Meteors number={30} />

            <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 sm:px-8">
              <Navbar />
              <main className="min-w-0 flex-1 py-12 sm:py-16 lg:py-20">
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
