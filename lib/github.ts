const GITHUB_REST_API = "https://api.github.com";
const GITHUB_GRAPHQL_API = "https://api.github.com/graphql";
const GITHUB_API_VERSION = "2026-03-10";
const GITHUB_CACHE_SECONDS = 60 * 60;

type GitHubGraphQLError = {
  message: string;
  type?: string;
  path?: Array<string | number>;
};

type GitHubGraphQLResponse<T> = {
  data?: T;
  errors?: GitHubGraphQLError[];
};

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

export type GitHubContributionLevel =
  | "NONE"
  | "FIRST_QUARTILE"
  | "SECOND_QUARTILE"
  | "THIRD_QUARTILE"
  | "FOURTH_QUARTILE";

export type GitHubContributionDay = {
  color: string;
  contributionCount: number;
  contributionLevel: GitHubContributionLevel;
  date: string;
  weekday: number;
};

export type GitHubContributionWeek = {
  firstDay: string;
  contributionDays: GitHubContributionDay[];
};

export type GitHubContributionMonth = {
  firstDay: string;
  name: string;
  totalWeeks: number;
  year: number;
};

export type GitHubContributionRepository = {
  contributions: {
    totalCount: number;
  };
  repository: {
    nameWithOwner: string;
    url: string;
    isPrivate: boolean;
    primaryLanguage: {
      name: string;
      color: string | null;
    } | null;
  };
};

export type GitHubContributions = {
  startedAt: string;
  endedAt: string;
  hasAnyContributions: boolean;
  restrictedContributionsCount: number;
  totalCommitContributions: number;
  totalIssueContributions: number;
  totalPullRequestContributions: number;
  totalPullRequestReviewContributions: number;
  totalRepositoriesWithContributedCommits: number;
  contributionCalendar: {
    colors: string[];
    totalContributions: number;
    months: GitHubContributionMonth[];
    weeks: GitHubContributionWeek[];
  };
  commitContributionsByRepository: GitHubContributionRepository[];
};

type GitHubContributionsQuery = {
  user: {
    login: string;
    contributionsCollection: GitHubContributions;
  } | null;
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

const CONTRIBUTIONS_QUERY = `
  query UserContributions(
    $username: String!
    $from: DateTime!
    $to: DateTime!
  ) {
    user(login: $username) {
      login
      contributionsCollection(from: $from, to: $to) {
        startedAt
        endedAt
        hasAnyContributions
        restrictedContributionsCount
        totalCommitContributions
        totalIssueContributions
        totalPullRequestContributions
        totalPullRequestReviewContributions
        totalRepositoriesWithContributedCommits
        contributionCalendar {
          colors
          totalContributions
          months {
            firstDay
            name
            totalWeeks
            year
          }
          weeks {
            firstDay
            contributionDays {
              color
              contributionCount
              contributionLevel
              date
              weekday
            }
          }
        }
        commitContributionsByRepository(maxRepositories: 10) {
          contributions {
            totalCount
          }
          repository {
            nameWithOwner
            url
            isPrivate
            primaryLanguage {
              name
              color
            }
          }
        }
      }
    }
  }
`;

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

function getGitHubToken() {
  const token = process.env.GITHUB_TOKEN?.trim();

  if (!token) {
    throw new GitHubApiError(
      "服务端缺少 GITHUB_TOKEN，GitHub GraphQL API 无法调用",
      {
        status: 503,
        code: "GITHUB_TOKEN_MISSING",
      },
    );
  }

  return token;
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
  const token = process.env.GITHUB_TOKEN?.trim();
  const response = await fetch(
    `${GITHUB_REST_API}/users/${encodeURIComponent(normalizedUsername)}`,
    {
      headers: createGitHubHeaders(token),
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

export async function fetchGitHubContributions(
  username: string,
  options: {
    from?: Date;
    to?: Date;
  } = {},
): Promise<GitHubContributions> {
  const normalizedUsername = normalizeUsername(username);
  const token = getGitHubToken();
  const to = options.to ?? new Date();
  const from =
    options.from ?? new Date(to.getTime() - 365 * 24 * 60 * 60 * 1000);

  if (
    Number.isNaN(from.getTime()) ||
    Number.isNaN(to.getTime()) ||
    from >= to
  ) {
    throw new GitHubApiError("贡献查询的时间范围不合法", {
      status: 400,
      code: "INVALID_CONTRIBUTION_RANGE",
    });
  }

  const response = await fetch(GITHUB_GRAPHQL_API, {
    method: "POST",
    headers: {
      ...createGitHubHeaders(token),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: CONTRIBUTIONS_QUERY,
      variables: {
        username: normalizedUsername,
        from: from.toISOString(),
        to: to.toISOString(),
      },
    }),
    next: {
      revalidate: GITHUB_CACHE_SECONDS,
      tags: [`github-contributions-${normalizedUsername.toLowerCase()}`],
    },
  });

  const body = (await readResponseBody(
    response,
  )) as GitHubGraphQLResponse<GitHubContributionsQuery> | null;

  if (!response.ok) {
    throw githubHttpError(response.status, "获取 GitHub 贡献信息失败", body);
  }

  if (body?.errors?.length) {
    throw new GitHubApiError("GitHub GraphQL 查询失败", {
      status: 502,
      code: "GITHUB_GRAPHQL_ERROR",
      details: body.errors,
    });
  }

  if (!body?.data?.user) {
    throw new GitHubApiError("GitHub 用户不存在", {
      status: 404,
      code: "GITHUB_USER_NOT_FOUND",
    });
  }

  const contributions = body.data.user.contributionsCollection;

  return {
    ...contributions,
    // 即使部署时误用了权限过大的 Token，也不要通过公开接口返回私有仓库名。
    commitContributionsByRepository:
      contributions.commitContributionsByRepository.filter(
        ({ repository }) => !repository.isPrivate,
      ),
  };
}

export async function fetchGitHubSummary(username: string) {
  const user = await fetchGitHubUser(username);
  const contributions = await fetchGitHubContributions(username);

  const activityTotal =
    contributions.totalCommitContributions +
    contributions.totalIssueContributions +
    contributions.totalPullRequestContributions +
    contributions.totalPullRequestReviewContributions;

  const percentage = (value: number) =>
    activityTotal === 0 ? 0 : Math.round((value / activityTotal) * 100);

  return {
    user,
    contributions,
    activityOverview: {
      total: activityTotal,
      commits: {
        count: contributions.totalCommitContributions,
        percentage: percentage(contributions.totalCommitContributions),
      },
      issues: {
        count: contributions.totalIssueContributions,
        percentage: percentage(contributions.totalIssueContributions),
      },
      pullRequests: {
        count: contributions.totalPullRequestContributions,
        percentage: percentage(contributions.totalPullRequestContributions),
      },
      codeReviews: {
        count: contributions.totalPullRequestReviewContributions,
        percentage: percentage(
          contributions.totalPullRequestReviewContributions,
        ),
      },
    },
  };
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
