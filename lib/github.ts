const GITHUB_CACHE_SECONDS = 60 * 60;

export type GitHubUser = {
  login: string;
  avatar_url: string;
  html_url: string;
  name: string | null;
};

export async function fetchGitHubUser(username: string): Promise<GitHubUser> {
  const response = await fetch(
    `https://api.github.com/users/${encodeURIComponent(username)}`,
    {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "may-rain-blog",
        "X-GitHub-Api-Version": "2026-03-10",
      },
      next: { revalidate: GITHUB_CACHE_SECONDS },
    },
  );

  if (!response.ok) {
    throw new Error(`GitHub profile request failed (${response.status})`);
  }

  return (await response.json()) as GitHubUser;
}
