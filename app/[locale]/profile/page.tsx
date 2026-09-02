import type { AppLocale } from "@/i18n/routing";
import { fetchGitHubUser } from "@/lib/github";
import { createPageMetadata } from "@/lib/seo";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { locale } from "next/root-params";
import { CareerLine } from "./career-line";
import { ContributionsCalendar } from "./contributions-calendar";
import { ProfileHero } from "./profile-hero";
import { TechStack } from "./tech-stack";

export async function generateMetadata(): Promise<Metadata> {
  const currentLocale = ((await locale()) as AppLocale) ?? "en-US";
  const t = await getTranslations("profile.metadata");

  return createPageMetadata({
    title: t("title"),
    description: t("description"),
    locale: currentLocale,
    path: `/profile`,
  });
}

async function getProfile() {
  try {
    return await fetchGitHubUser("ryanzen9");
  } catch (error) {
    console.error("Failed to load the GitHub profile", error);
    return null;
  }
}

export default async function Page() {
  const profile = await getProfile();
  const currentLocale = (await locale()) ?? "en-US";

  return (
    <section lang={currentLocale} className="flex flex-col gap-16 sm:gap-24">
      <ProfileHero profile={profile} />

      {/* 暂时隐藏
      <SelectedWork /> */}

      <TechStack />

      <CareerLine />

      <ContributionsCalendar />
    </section>
  );
}
