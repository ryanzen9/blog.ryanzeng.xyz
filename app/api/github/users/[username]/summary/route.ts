import {
  fetchGitHubSummary,
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
    const summary = await fetchGitHubSummary(username);

    return Response.json(summary);
  } catch (error) {
    return githubErrorResponse(error);
  }
}
