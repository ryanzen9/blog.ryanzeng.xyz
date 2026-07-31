import { ProfileCard } from "./github-card";
export const metadata = {
  title: "Profile",
  description: "Read my profile.",
};

const PROFILE_URL =
  "https://raw.githubusercontent.com/ryanzen9/ryanzen9/refs/heads/main/README.md";

function prepareGithubMarkdownForMdx(markdown: string) {
  return markdown.replace(/<!--[\s\S]*?-->/g, "");
}

export default async function Page() {
  const profile = await fetch(PROFILE_URL, {
    next: {
      revalidate: 3600,
    },
  });

  const profileContent = await profile.text();

  const preparedProfileContent = prepareGithubMarkdownForMdx(profileContent);

  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
        My Profile
      </h1>
      <ProfileCard />
      {/* <article className="prose font-prose">
        <CustomMDX source={preparedProfileContent} />
      </article> */}
    </section>
  );
}
