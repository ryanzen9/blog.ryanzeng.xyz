import {
  fetchGitHubContributions,
  githubErrorResponse,
} from "@/lib/github";

type RouteContext = {
  params: Promise<{
    username: string;
  }>;
};

export async function GET(_request: Request, { params }: RouteContext) {
  try {
    const { username } = await params;
    const contributions = await fetchGitHubContributions(username);

    return Response.json({ contributions });
  } catch (error) {
    return githubErrorResponse(error);
  }
}
