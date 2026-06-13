import { BahaiApp } from '../types';

const TAG_COLORS = [
  'bg-emerald-100 text-emerald-800',
  'bg-blue-100 text-blue-800',
  'bg-purple-100 text-purple-800',
  'bg-orange-100 text-orange-800',
  'bg-pink-100 text-pink-800',
  'bg-teal-100 text-teal-800',
  'bg-red-100 text-red-800',
  'bg-yellow-100 text-yellow-800',
  'bg-indigo-100 text-indigo-800',
  'bg-cyan-100 text-cyan-800',
];

function tagColor(tag: string): string {
  let h = 0;
  for (let i = 0; i < tag.length; i++) h = (h * 31 + tag.charCodeAt(i)) % 10;
  return TAG_COLORS[h];
}

interface Props {
  app: BahaiApp;
  activeTag: string | null;
  onTagClick: (tag: string) => void;
}

export default function AppCard({ app, activeTag, onTagClick }: Props) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col">
      <div className="p-4 flex-1 flex flex-col gap-2">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-lg" aria-hidden>
              {app.resource ? '🔗' : '📱'}
            </span>
            <h3 className="font-semibold text-gray-900 text-sm leading-tight truncate">
              {app.name}
            </h3>
          </div>
          <span
            className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded-full ${
              app.access === 'open'
                ? 'bg-emerald-100 text-emerald-700'
                : 'bg-gray-100 text-gray-500'
            }`}
          >
            {app.access === 'open' ? 'Open Source' : 'Closed Source'}
          </span>
        </div>

        {/* Description */}
        {app.description && (
          <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{app.description}</p>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mt-auto pt-1">
          {app.tags.map((tag) => (
            <button
              key={tag}
              onClick={() => onTagClick(tag)}
              className={`text-xs px-2 py-0.5 rounded-full font-medium transition-all ${tagColor(tag)} ${
                activeTag === tag ? 'ring-2 ring-offset-1 ring-blue-400' : 'hover:opacity-80'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Action buttons */}
      <div className="px-4 pb-4 flex gap-2">
        <a
          href={app.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center text-sm font-medium bg-emerald-600 hover:bg-emerald-700 text-white py-1.5 rounded-lg transition-colors"
        >
          {app.resource ? 'Visit' : 'Open App'}
        </a>
        {app.github && (
          <a
            href={`https://github.com/${app.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-lg transition-colors font-mono"
            title="View source on GitHub"
          >
            &lt;/&gt;
          </a>
        )}
      </div>
    </div>
  );
}
