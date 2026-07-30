import {
  fetchGitHubUser,
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
    const user = await fetchGitHubUser(username);

    return Response.json({ user });
  } catch (error) {
    return githubErrorResponse(error);
  }
}
