import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { TypingAnimation } from "@/components/ui/typing-animation";
import type { AppLocale } from "@/i18n/routing";
import { createPageMetadata } from "@/lib/seo";
import { BlogPosts } from "app/components/posts";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { locale } from "next/root-params";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("home.metadata");
  const currentLocale = (await locale()) as AppLocale;
  const title = t("title");
  const description = t("description");
  const path = `/`;

  return createPageMetadata({
    locale: currentLocale,
    path,
    title,
    description,
  });
}

export default async function Page() {
  const t = await getTranslations("home");
  return (
    <section>
      <h1 className="mb-4 text-2xl font-semibold tracking-tighter">
        <TypingAnimation delay={500}>{t("title")}</TypingAnimation>
      </h1>

      <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
        <span className="mb-8">
          There's no reason for it, you've gotta go sometime.
        </span>
      </AnimatedShinyText>

      <p className="mb-4">
        {`
            I'm Ryan.
          `}
      </p>

      <p className="mb-4">
        {`
            I am a full stack developer(Maybe) from China.
          `}
      </p>

      <p className="mb-4">
        {`
            An obsessive lover of black and green.
          `}
      </p>

      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  );
}
