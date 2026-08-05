import { fetchGitHubUser } from "@/lib/github";
import { CareerLine } from "./career-line";
import { ContributionsCalendar } from "./contributions-calendar";
import { ProfileHero } from "./profile-hero";
import { TechStack } from "./tech-stack";

export const metadata = {
  title: "Ryan Zeng",
  description:
    "Software engineer building production systems across web, data, infrastructure, and AI-assisted workflows.",
};

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

  return (
    <section lang="en" className="space-y-14 sm:space-y-16">
      <ProfileHero profile={profile} />

      {/* 暂时隐藏
      <SelectedWork /> */}

      <TechStack />

      <CareerLine />

      <ContributionsCalendar />
    </section>
  );
}
