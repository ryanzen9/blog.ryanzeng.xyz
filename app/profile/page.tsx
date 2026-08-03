import { Separator } from "@/components/ui/separator";
import { CareerLine } from "./career-line";
import { ContributionsCalendar } from "./contributions-calendar";
import { ProfileCard } from "./resume";
import { TechStack } from "./tech-stack";

export const metadata = {
  title: "Profile",
  description: "Read my profile.",
};

export default async function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
        My Profile
      </h1>
      <Separator className="my-4 data-horizontal:w-4/5" />

      <ProfileCard />

      <TechStack />

      <CareerLine />

      <ContributionsCalendar />
    </section>
  );
}
