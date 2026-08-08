export const REPO = 'EtainClub/ghost-link';
export const REPO_URL = `https://github.com/${REPO}`;

export type Contributor = {
    login: string;
    avatar: string;
    url: string;
    contributions: number;
};

export type Commit = {
    sha: string;
    message: string;
    author: string;
    url: string;
    date: string;
};

export type RepoStats = {
    stars: number;
    openIssues: number;
    createdAt: string | null;
};

export type Ledger = {
    contributors: Contributor[];
    commits: Commit[];
    stats: RepoStats;
    /** True when GitHub could not be reached — the UI says so rather than inventing people. */
    offline: boolean;
};

const EMPTY: Ledger = {
    contributors: [],
    commits: [],
    stats: { stars: 0, openIssues: 0, createdAt: null },
    offline: true,
};

async function gh<T>(path: string): Promise<T | null> {
    try {
        const res = await fetch(`https://api.github.com/repos/${REPO}${path}`, {
            headers: { Accept: 'application/vnd.github+json' },
            // Unauthenticated GitHub allows 60 req/h per IP; an hour of cache is plenty.
            next: { revalidate: 3600 },
        });
        if (!res.ok) return null;
        return (await res.json()) as T;
    } catch {
        return null;
    }
}

type ApiContributor = { login: string; avatar_url: string; html_url: string; contributions: number; type: string };
type ApiCommit = {
    sha: string;
    html_url: string;
    commit: { message: string; author: { name: string; date: string } | null };
    author: { login: string } | null;
};
type ApiRepo = { stargazers_count: number; open_issues_count: number; created_at: string };

/**
 * Real contributors, real commits. The rest of this site is invented on purpose;
 * the people who built it are the one thing that must not be.
 */
export async function getLedger(): Promise<Ledger> {
    const [contributors, commits, repo] = await Promise.all([
        gh<ApiContributor[]>('/contributors?per_page=24'),
        gh<ApiCommit[]>('/commits?per_page=12'),
        gh<ApiRepo>(''),
    ]);

    if (!contributors && !commits && !repo) return EMPTY;

    return {
        contributors: (contributors ?? [])
            .filter(c => c.type !== 'Bot')
            .map(c => ({
                login: c.login,
                avatar: c.avatar_url,
                url: c.html_url,
                contributions: c.contributions,
            })),
        commits: (commits ?? []).map(c => ({
            sha: c.sha.slice(0, 7),
            message: c.commit.message.split('\n')[0],
            author: c.author?.login ?? c.commit.author?.name ?? 'unknown',
            url: c.html_url,
            date: c.commit.author?.date ?? '',
        })),
        stats: {
            stars: repo?.stargazers_count ?? 0,
            openIssues: repo?.open_issues_count ?? 0,
            createdAt: repo?.created_at ?? null,
        },
        offline: false,
    };
}
