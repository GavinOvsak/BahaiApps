import { useEffect, useState } from 'react';

const CACHE_KEY = 'bahaiapps_stars_cache';
const TTL_MS = 5 * 60 * 1000; // 5 minutes

interface Cache {
  username: string;
  repos: string[];
  fetchedAt: number;
}

function loadCache(): Cache | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const c: Cache = JSON.parse(raw);
    if (Date.now() - c.fetchedAt > TTL_MS) return null;
    return c;
  } catch {
    return null;
  }
}

function saveCache(username: string, repos: string[]) {
  localStorage.setItem(CACHE_KEY, JSON.stringify({ username, repos, fetchedAt: Date.now() }));
}

export function useGitHubStars(username: string) {
  const [starredRepos, setStarredRepos] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);
  const [rateLimited, setRateLimited] = useState(false);

  useEffect(() => {
    if (!username.trim()) {
      setStarredRepos(new Set());
      return;
    }

    const cached = loadCache();
    if (cached && cached.username.toLowerCase() === username.toLowerCase()) {
      setStarredRepos(new Set(cached.repos.map((r) => r.toLowerCase())));
      return;
    }

    let cancelled = false;
    setLoading(true);
    setRateLimited(false);

    async function fetchAll() {
      const repos: string[] = [];
      let page = 1;
      while (true) {
        const res = await fetch(
          `https://api.github.com/users/${encodeURIComponent(username)}/starred?per_page=100&page=${page}`,
        );
        if (res.status === 403 || res.status === 429) {
          if (!cancelled) setRateLimited(true);
          break;
        }
        if (!res.ok) break;
        const data: { full_name: string }[] = await res.json();
        if (data.length === 0) break;
        repos.push(...data.map((r) => r.full_name));
        if (data.length < 100) break;
        page++;
      }
      if (!cancelled) {
        saveCache(username, repos);
        setStarredRepos(new Set(repos.map((r) => r.toLowerCase())));
        setLoading(false);
      }
    }

    fetchAll().catch(() => {
      if (!cancelled) setLoading(false);
    });

    return () => { cancelled = true; };
  }, [username]);

  return { starredRepos, loading, rateLimited };
}
