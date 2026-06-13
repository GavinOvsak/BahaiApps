import { BahaiApp } from '../types';
import { useT } from '../TranslationContext';

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
  isStarred: boolean;
  onTagClick: (tag: string) => void;
  onInfoClick: () => void;
}

export default function AppCard({ app, activeTag, isStarred, onTagClick, onInfoClick }: Props) {
  const { t } = useT();

  return (
    <div className={`bg-white rounded-2xl border shadow-sm hover:shadow-md transition-shadow flex flex-col ${isStarred ? 'border-yellow-300' : 'border-gray-100'}`}>
      <div className="p-4 flex-1 flex flex-col gap-2">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <button
              onClick={onInfoClick}
              className="text-gray-300 hover:text-gray-500 shrink-0 transition-colors"
              title="More info"
            >
              ⓘ
            </button>
            <h3 className="font-semibold text-gray-900 text-sm leading-tight truncate">
              {app.name}
            </h3>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            {isStarred && (
              <span className="text-yellow-400 text-sm" title="You've starred this on GitHub">⭐</span>
            )}
            <span
              className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                app.access === 'open'
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-gray-100 text-gray-500'
              }`}
            >
              {app.access === 'open' ? 'Free & Open' : 'Login Req.'}
            </span>
          </div>
        </div>

        {/* Description */}
        {app.description && (
          <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{app.description}</p>
        )}

        {/* Languages */}
        {app.languages && app.languages.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {app.languages.map((l) => (
              <span key={l} className="text-xs text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded">
                {l}
              </span>
            ))}
          </div>
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
          {app.resource ? t.visitSite : t.openApp}
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
