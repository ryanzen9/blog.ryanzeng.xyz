const GITHUB_REST_API = "https://api.github.com";
const GITHUB_API_VERSION = "2026-03-10";
const GITHUB_CACHE_SECONDS = 60 * 60;

export type GitHubUser = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  html_url: string;
  name: string | null;
  company: string | null;
  blog: string;
  location: string | null;
  email: string | null;
  hireable: boolean | null;
  bio: string | null;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
};

export class GitHubApiError extends Error {
  readonly status: number;
  readonly code: string;
  readonly details?: unknown;

  constructor(
    message: string,
    options: {
      status: number;
      code: string;
      details?: unknown;
    },
  ) {
    super(message);
    this.name = "GitHubApiError";
    this.status = options.status;
    this.code = options.code;
    this.details = options.details;
  }
}

function normalizeUsername(username: string) {
  const normalized = username.trim();

  if (!normalized || normalized.length > 100) {
    throw new GitHubApiError("GitHub 用户名不合法", {
      status: 400,
      code: "INVALID_GITHUB_USERNAME",
    });
  }

  return normalized;
}

function createGitHubHeaders(token?: string): HeadersInit {
  return {
    Accept: "application/vnd.github+json",
    "User-Agent": "may-rain-blog",
    "X-GitHub-Api-Version": GITHUB_API_VERSION,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

function githubHttpError(
  status: number,
  fallbackMessage: string,
  details?: unknown,
) {
  if (status === 404) {
    return new GitHubApiError("GitHub 用户不存在", {
      status: 404,
      code: "GITHUB_USER_NOT_FOUND",
      details,
    });
  }

  if (status === 401) {
    return new GitHubApiError("GITHUB_TOKEN 无效或已过期", {
      status: 502,
      code: "GITHUB_AUTH_FAILED",
      details,
    });
  }

  if (status === 403 || status === 429) {
    return new GitHubApiError("GitHub API 请求频率受限", {
      status: 503,
      code: "GITHUB_RATE_LIMITED",
      details,
    });
  }

  return new GitHubApiError(fallbackMessage, {
    status: 502,
    code: "GITHUB_API_ERROR",
    details,
  });
}

async function readResponseBody(response: Response) {
  const text = await response.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text) as unknown;
  } catch {
    return text;
  }
}

export async function fetchGitHubUser(username: string): Promise<GitHubUser> {
  const normalizedUsername = normalizeUsername(username);
  const response = await fetch(
    `${GITHUB_REST_API}/users/${encodeURIComponent(normalizedUsername)}`,
    {
      headers: createGitHubHeaders(),
      next: {
        revalidate: GITHUB_CACHE_SECONDS,
        tags: [`github-user-${normalizedUsername.toLowerCase()}`],
      },
    },
  );

  const body = await readResponseBody(response);

  if (!response.ok) {
    throw githubHttpError(response.status, "获取 GitHub 用户信息失败", body);
  }

  return body as GitHubUser;
}

export function githubErrorResponse(error: unknown) {
  if (error instanceof GitHubApiError) {
    return Response.json(
      {
        error: {
          code: error.code,
          message: error.message,
          ...(process.env.NODE_ENV === "development" && error.details
            ? { details: error.details }
            : {}),
        },
      },
      { status: error.status },
    );
  }

  console.error("Unexpected GitHub API error", error);

  return Response.json(
    {
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "服务器内部错误",
      },
    },
    { status: 500 },
  );
}
