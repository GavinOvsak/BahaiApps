import { useEffect, useMemo, useState } from 'react';
import { BahaiApp } from './types';
import AppCard from './components/AppCard';
import MakeAnAppModal from './components/MakeAnAppModal';

export default function App() {
  const [apps, setApps] = useState<BahaiApp[]>([]);
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [showMakeApp, setShowMakeApp] = useState(false);

  useEffect(() => {
    fetch('data/apps.json')
      .then((r) => r.json())
      .then(setApps)
      .catch(console.error);
  }, []);

  const allTags = useMemo(() => {
    const counts: Record<string, number> = {};
    apps.forEach((a) => a.tags.forEach((t) => (counts[t] = (counts[t] ?? 0) + 1)));
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([t]) => t);
  }, [apps]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return apps.filter((a) => {
      if (activeTag && !a.tags.includes(activeTag)) return false;
      if (q && !a.name.toLowerCase().includes(q) && !a.tags.some((t) => t.includes(q)) && !(a.description?.toLowerCase().includes(q))) return false;
      return true;
    });
  }, [apps, search, activeTag]);

  function handleTagClick(tag: string) {
    setActiveTag((prev) => (prev === tag ? null : tag));
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            {/* Brand */}
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-2xl" aria-hidden>🌟</span>
              <div className="min-w-0">
                <h1 className="text-lg font-bold text-gray-900 leading-tight">Bahai Apps</h1>
                <p className="text-xs text-gray-400 leading-tight hidden sm:block">
                  Open directory of Bahai digital resources
                </p>
              </div>
            </div>

            {/* Make an App button */}
            <button
              onClick={() => setShowMakeApp(true)}
              className="shrink-0 flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-medium px-3 py-2 rounded-xl transition-colors shadow-sm"
            >
              <span>🛠️</span>
              <span className="hidden xs:inline">Make an App</span>
              <span className="xs:hidden">Make an App</span>
            </button>
          </div>

          {/* Search */}
          <div className="mt-3 relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search apps and resources…"
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

          {/* Tag filters */}
          {allTags.length > 0 && (
            <div className="mt-2 flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
              <button
                onClick={() => setActiveTag(null)}
                className={`shrink-0 text-xs px-3 py-1 rounded-full font-medium transition-colors ${
                  activeTag === null
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className={`shrink-0 text-xs px-3 py-1 rounded-full font-medium transition-colors ${
                    activeTag === tag
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-6">
        <p className="text-xs text-gray-400 mb-4">
          {filtered.length} of {apps.length} entries
          {activeTag && (
            <span className="ml-2 text-emerald-600 font-medium">
              · tagged "{activeTag}"{' '}
              <button onClick={() => setActiveTag(null)} className="underline hover:no-underline">
                clear
              </button>
            </span>
          )}
        </p>

        {apps.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 h-40 animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <div className="text-4xl mb-3">🔍</div>
            <p className="font-medium">No results found</p>
            <button
              onClick={() => { setSearch(''); setActiveTag(null); }}
              className="mt-3 text-sm text-emerald-600 underline hover:no-underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((app) => (
              <AppCard
                key={app.url}
                app={app}
                activeTag={activeTag}
                onTagClick={handleTagClick}
              />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white py-4 text-center text-xs text-gray-400">
        <a
          href="https://github.com/gavinovsak/BahaiApps"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-emerald-600 transition-colors"
        >
          Contribute on GitHub
        </a>
      </footer>

      {showMakeApp && <MakeAnAppModal onClose={() => setShowMakeApp(false)} />}
    </div>
  );
}
