import { useEffect, useMemo, useState } from 'react';
import { BahaiApp } from './types';
import { LangCode, LANG_FLAGS, LANG_NAMES, TRANSLATIONS } from './i18n';
import { useT } from './TranslationContext';
import { useGitHubStars } from './hooks/useGitHubStars';
import AppCard from './components/AppCard';
import AppDetailModal from './components/AppDetailModal';
import MakeAnAppModal from './components/MakeAnAppModal';
import AccountModal from './components/AccountModal';
import SubmitAppModal from './components/SubmitAppModal';

type SortOption = 'newest' | 'oldest' | 'stars-desc' | 'stars-asc';

const ALL_LANGS = Object.keys(TRANSLATIONS) as LangCode[];

export default function App() {
  const { t } = useT();

  // Data
  const [apps, setApps] = useState<BahaiApp[]>([]);

  // Filters
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [activeLangs, setActiveLangs] = useState<LangCode[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [myStarsOnly, setMyStarsOnly] = useState(false);
  const [sort, setSort] = useState<SortOption>('newest');

  // Account / prefs
  const [githubUsername, setGithubUsername] = useState<string>(
    () => localStorage.getItem('bahaiapps_github_username') ?? '',
  );
  const [langPrefs, setLangPrefs] = useState<LangCode[]>(() => {
    try { return JSON.parse(localStorage.getItem('bahaiapps_lang_prefs') ?? '[]'); }
    catch { return []; }
  });

  // Local stars
  const [localStars, setLocalStars] = useState<Set<string>>(() => {
    try { return new Set(JSON.parse(localStorage.getItem('bahaiapps_local_stars') ?? '[]')); }
    catch { return new Set(); }
  });

  // GitHub stars
  const { starredRepos, rateLimited } = useGitHubStars(githubUsername);

  // Modals
  const [detailApp, setDetailApp] = useState<BahaiApp | null>(null);
  const [showMakeApp, setShowMakeApp] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const [showSubmit, setShowSubmit] = useState(false);

  useEffect(() => {
    fetch('data/apps.json')
      .then((r) => r.json())
      .then(setApps)
      .catch(console.error);
  }, []);

  // Derived: all tags with per-tag counts relative to current search/lang/star filter (not tag filter)
  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    apps.forEach((a) => {
      if (activeTag && !a.tags.includes(activeTag)) return; // still count within current selection? no — counts for the full set minus tag filter
      if (!matchesBase(a, search, activeLangs, myStarsOnly, localStars, starredRepos)) return;
      a.tags.forEach((t) => (counts[t] = (counts[t] ?? 0) + 1));
    });
    return counts;
  }, [apps, search, activeLangs, myStarsOnly, localStars, starredRepos, activeTag]);

  const allTags = useMemo(
    () =>
      Object.entries(tagCounts)
        .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
        .map(([t]) => t),
    [tagCounts],
  );

  // Derived: language counts
  const langCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    apps.forEach((a) => {
      if (!matchesBase(a, search, [], myStarsOnly, localStars, starredRepos)) return;
      (a.languages ?? []).forEach((l) => (counts[l] = (counts[l] ?? 0) + 1));
    });
    return counts;
  }, [apps, search, myStarsOnly, localStars, starredRepos]);

  const filtered = useMemo(() => {
    const base = apps.filter((a) =>
      matchesBase(a, search, activeLangs, myStarsOnly, localStars, starredRepos) &&
      (!activeTag || a.tags.includes(activeTag)),
    );

    return [...base].sort((a, b) => {
      // Starred float to top
      const aStarred = isStarred(a, localStars, starredRepos);
      const bStarred = isStarred(b, localStars, starredRepos);
      if (aStarred !== bStarred) return aStarred ? -1 : 1;

      if (sort === 'newest' || sort === 'oldest') {
        const da = a.dateAdded ?? '';
        const db = b.dateAdded ?? '';
        return sort === 'newest' ? db.localeCompare(da) : da.localeCompare(db);
      }
      return 0;
    });
  }, [apps, search, activeTag, activeLangs, myStarsOnly, localStars, starredRepos, sort]);

  function handleTagClick(tag: string) {
    setActiveTag((prev) => (prev === tag ? null : tag));
  }

  function toggleLangFilter(code: LangCode) {
    setActiveLangs((prev) =>
      prev.includes(code) ? prev.filter((l) => l !== code) : [...prev, code],
    );
  }

  function toggleLocalStar(url: string) {
    setLocalStars((prev) => {
      const next = new Set(prev);
      next.has(url) ? next.delete(url) : next.add(url);
      localStorage.setItem('bahaiapps_local_stars', JSON.stringify([...next]));
      return next;
    });
  }

  function saveUsername(u: string) {
    setGithubUsername(u);
    localStorage.setItem('bahaiapps_github_username', u);
  }

  function saveLangPrefs(prefs: LangCode[]) {
    setLangPrefs(prefs);
    localStorage.setItem('bahaiapps_lang_prefs', JSON.stringify(prefs));
  }

  const hasActiveFilters = !!activeTag || activeLangs.length > 0 || myStarsOnly;
  const activeFilterCount = (activeTag ? 1 : 0) + activeLangs.length + (myStarsOnly ? 1 : 0);

  // UI langs available as filter (only those that appear in apps)
  const uiLangs = ALL_LANGS.filter((code) => (langCounts[code] ?? 0) > 0);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-3">

          {/* Top row */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-2xl" aria-hidden>🌟</span>
              <div className="min-w-0">
                <h1 className="text-lg font-bold text-gray-900 leading-tight">Bahai Apps</h1>
                <p className="text-xs text-gray-400 leading-tight hidden sm:block">
                  Open directory of Bahai digital resources
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {rateLimited && (
                <span className="hidden sm:inline text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full">
                  GitHub rate limit
                </span>
              )}

              {/* My Stars toggle */}
              <button
                onClick={() => setMyStarsOnly((v) => !v)}
                title={t.myStars}
                className={`p-2 rounded-xl text-sm transition-colors ${
                  myStarsOnly
                    ? 'bg-yellow-100 text-yellow-600'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill={myStarsOnly ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </button>

              {/* Account */}
              <button
                onClick={() => setShowAccount(true)}
                className="p-2 rounded-xl bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors text-sm"
                title={t.account}
              >
                {githubUsername ? (
                  <span className="text-xs font-medium px-1">{githubUsername.slice(0, 2).toUpperCase()}</span>
                ) : '👤'}
              </button>

              {/* Submit */}
              <button
                onClick={() => setShowSubmit(true)}
                className="hidden sm:flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-medium px-3 py-2 rounded-xl transition-colors"
              >
                + {t.submitApp}
              </button>

              {/* Make an App */}
              <button
                onClick={() => setShowMakeApp(true)}
                className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-medium px-3 py-2 rounded-xl transition-colors shadow-sm"
              >
                <span>🛠️</span>
                <span>Make an App</span>
              </button>
            </div>
          </div>

          {/* Search row */}
          <div className="mt-3 flex gap-2">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full pl-9 pr-8 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-gray-50"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Filter toggle */}
            <button
              onClick={() => setShowFilters((v) => !v)}
              className={`relative flex items-center gap-1.5 text-sm px-3 py-2 rounded-xl border transition-colors ${
                showFilters
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                  : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                <path fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm3 5A.75.75 0 015.75 9h8.5a.75.75 0 010 1.5h-8.5A.75.75 0 015 9.75zm4 5a.75.75 0 01.75-.75h.5a.75.75 0 010 1.5h-.5a.75.75 0 01-.75-.75z" clipRule="evenodd" />
              </svg>
              <span className="hidden sm:inline">{showFilters ? t.hideFilters : t.filters}</span>
              {activeFilterCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-emerald-600 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>

          {/* Collapsible filter panel */}
          {showFilters && (
            <div className="mt-3 p-3 bg-gray-50 rounded-xl border border-gray-100 space-y-3">
              {/* Tag filter */}
              {allTags.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-gray-500 mb-1.5">{t.tags}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {allTags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => handleTagClick(tag)}
                        className={`text-xs px-2.5 py-1 rounded-full font-medium transition-colors border ${
                          activeTag === tag
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : 'bg-white text-gray-600 border-gray-200 hover:border-emerald-300'
                        }`}
                      >
                        {tag}
                        <span className={`ml-1 ${activeTag === tag ? 'text-emerald-200' : 'text-gray-400'}`}>
                          {tagCounts[tag]}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Language filter */}
              {uiLangs.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-gray-500 mb-1.5">{t.languages}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {uiLangs.map((code) => (
                      <button
                        key={code}
                        onClick={() => toggleLangFilter(code)}
                        className={`text-xs px-2.5 py-1 rounded-full font-medium transition-colors border flex items-center gap-1 ${
                          activeLangs.includes(code)
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : 'bg-white text-gray-600 border-gray-200 hover:border-emerald-300'
                        }`}
                      >
                        {LANG_FLAGS[code]} {LANG_NAMES[code]}
                        <span className={`${activeLangs.includes(code) ? 'text-emerald-200' : 'text-gray-400'}`}>
                          {langCounts[code]}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {hasActiveFilters && (
                <button
                  onClick={() => { setActiveTag(null); setActiveLangs([]); setMyStarsOnly(false); }}
                  className="text-xs text-red-500 hover:text-red-700 underline"
                >
                  {t.clearFilters}
                </button>
              )}
            </div>
          )}

          {/* Quick tag strip (visible when filters hidden) */}
          {!showFilters && allTags.length > 0 && (
            <div className="mt-2 flex gap-1.5 overflow-x-auto pb-1">
              <button
                onClick={() => setActiveTag(null)}
                className={`shrink-0 text-xs px-3 py-1 rounded-full font-medium transition-colors ${
                  activeTag === null ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {t.all}
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className={`shrink-0 text-xs px-3 py-1 rounded-full font-medium transition-colors ${
                    activeTag === tag ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {tag} <span className="opacity-60">{tagCounts[tag]}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-6">
        {/* Results bar */}
        <div className="flex items-center justify-between mb-4 gap-3">
          <p className="text-xs text-gray-400">
            {t.results(filtered.length, apps.length)}
            {myStarsOnly && <span className="ml-2 text-yellow-600 font-medium">· ⭐ {t.myStars}</span>}
            {activeTag && (
              <span className="ml-2 text-emerald-600 font-medium">
                · {t.tagged} "{activeTag}"{' '}
                <button onClick={() => setActiveTag(null)} className="underline hover:no-underline">{t.clear}</button>
              </span>
            )}
          </p>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 bg-white text-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          >
            <option value="newest">{t.sortNewest}</option>
            <option value="oldest">{t.sortOldest}</option>
          </select>
        </div>

        {apps.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 h-40 animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <div className="text-4xl mb-3">🔍</div>
            <p className="font-medium">{t.noResults}</p>
            <p className="text-sm mt-1">{t.noResultsSub}</p>
            <button
              onClick={() => { setSearch(''); setActiveTag(null); setActiveLangs([]); setMyStarsOnly(false); }}
              className="mt-3 text-sm text-emerald-600 underline hover:no-underline"
            >
              {t.clearFilters}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((app) => (
              <AppCard
                key={app.url}
                app={app}
                activeTag={activeTag}
                isStarred={isStarred(app, localStars, starredRepos)}
                isGitHubStarred={!!app.github && starredRepos.has(app.github.toLowerCase())}
                onTagClick={handleTagClick}
                onInfoClick={() => setDetailApp(app)}
                onStarClick={() => toggleLocalStar(app.url)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white py-4 text-center text-xs text-gray-400 space-x-4">
        <a
          href="https://github.com/gavinovsak/BahaiApps"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-emerald-600 transition-colors"
        >
          GitHub
        </a>
        <button
          onClick={() => setShowSubmit(true)}
          className="hover:text-emerald-600 transition-colors"
        >
          + {t.submitApp}
        </button>
      </footer>

      {/* Modals */}
      {detailApp && <AppDetailModal app={detailApp} onClose={() => setDetailApp(null)} />}
      {showMakeApp && <MakeAnAppModal onClose={() => setShowMakeApp(false)} />}
      {showAccount && (
        <AccountModal
          githubUsername={githubUsername}
          onSaveUsername={saveUsername}
          langPrefs={langPrefs}
          onSaveLangPrefs={saveLangPrefs}
          onClose={() => setShowAccount(false)}
        />
      )}
      {showSubmit && <SubmitAppModal onClose={() => setShowSubmit(false)} />}
    </div>
  );
}

function matchesBase(
  app: BahaiApp,
  search: string,
  activeLangs: LangCode[],
  myStarsOnly: boolean,
  localStars: Set<string>,
  starredRepos: Set<string>,
): boolean {
  if (myStarsOnly && !isStarred(app, localStars, starredRepos)) return false;
  if (activeLangs.length > 0) {
    const appLangs = app.languages ?? [];
    if (!activeLangs.some((l) => appLangs.includes(l))) return false;
  }
  if (search) {
    const q = search.toLowerCase().trim();
    const haystack = [app.name, app.description ?? '', ...app.tags].join(' ').toLowerCase();
    if (!haystack.includes(q)) return false;
  }
  return true;
}

function isStarred(app: BahaiApp, localStars: Set<string>, starredRepos: Set<string>): boolean {
  if (localStars.has(app.url)) return true;
  if (app.github && starredRepos.has(app.github.toLowerCase())) return true;
  return false;
}
