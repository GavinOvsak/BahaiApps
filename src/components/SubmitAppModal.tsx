import { useState } from 'react';

const COMMON_TAGS = [
  'prayers', 'songs', 'children', 'education', 'writings', 'devotional',
  'music', 'community-building', 'reference', 'study', 'search', 'guidance',
];

interface Props {
  onClose: () => void;
}

function buildIssueUrl(name: string, url: string, github: string, tags: string[], access: 'open' | 'closed', isResource: boolean, description: string, languages: string): string {
  const data: Record<string, unknown> = {
    name,
    url,
    tags,
    access,
    ...(isResource ? { resource: true } : {}),
    ...(github.trim() ? { github: github.trim() } : {}),
    ...(description.trim() ? { description: description.trim() } : {}),
    ...(languages.trim() ? { languages: languages.split(',').map((l) => l.trim()).filter(Boolean) } : {}),
  };

  const json = JSON.stringify({ action: 'add', data }, null, 2);

  const body = [
    `## New App Submission`,
    ``,
    `**Name:** ${name}`,
    `**URL:** ${url}`,
    github.trim() ? `**GitHub:** ${github.trim()}` : '',
    `**Tags:** ${tags.join(', ')}`,
    `**Access:** ${access === 'open' ? 'Free & Open' : 'Login Required'}`,
    `**Type:** ${isResource ? 'Resource/Website' : 'App'}`,
    languages.trim() ? `**Languages:** ${languages}` : '',
    description.trim() ? `**Description:** ${description.trim()}` : '',
    ``,
    `### Why this belongs in Bahai Apps`,
    ``,
    `### Checklist`,
    `- [ ] The app or resource is related to the Bahai Faith`,
    `- [ ] The URL is publicly accessible and working`,
    `- [ ] I have tested the link`,
    ``,
    `<!-- BAHAIAPPS_JSON`,
    json,
    `-->`,
  ].filter((l) => l !== null).join('\n');

  return `https://github.com/GavinOvsak/BahaiApps/issues/new?template=add-app.md&title=${encodeURIComponent(`[Add App] ${name}`)}&body=${encodeURIComponent(body)}&labels=new-app`;
}

export default function SubmitAppModal({ onClose }: Props) {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [github, setGithub] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [customTag, setCustomTag] = useState('');
  const [access, setAccess] = useState<'open' | 'closed'>('open');
  const [isResource, setIsResource] = useState(false);
  const [description, setDescription] = useState('');
  const [languages, setLanguages] = useState('');

  function toggleTag(tag: string) {
    setTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  }

  function addCustomTag() {
    const t = customTag.trim().toLowerCase().replace(/\s+/g, '-');
    if (t && !tags.includes(t)) setTags((prev) => [...prev, t]);
    setCustomTag('');
  }

  function submit() {
    const issueUrl = buildIssueUrl(name.trim(), url.trim(), github, tags, access, isResource, description, languages);
    window.open(issueUrl, '_blank', 'noopener,noreferrer');
    onClose();
  }

  const valid = name.trim() && url.trim() && tags.length > 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl font-bold">✕</button>

        <div className="mb-5">
          <h2 className="text-xl font-bold text-gray-900">Submit an App</h2>
          <p className="text-sm text-gray-500 mt-1">
            Opens a pre-filled GitHub issue. A maintainer will review and apply it automatically when approved.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Name <span className="text-red-400">*</span></label>
            <input value={name} onChange={(e) => setName(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400" placeholder="e.g. My Prayer App" />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">URL <span className="text-red-400">*</span></label>
            <input value={url} onChange={(e) => setUrl(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400" placeholder="https://…" />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">GitHub repo (optional)</label>
            <input value={github} onChange={(e) => setGithub(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400" placeholder="username/repo" />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Languages (optional, comma-separated ISO codes)</label>
            <input value={languages} onChange={(e) => setLanguages(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400" placeholder="en, fa, ar" />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Tags <span className="text-red-400">*</span></label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {COMMON_TAGS.map((tag) => (
                <button key={tag} onClick={() => toggleTag(tag)} className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${tags.includes(tag) ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-gray-600 border-gray-200 hover:border-emerald-400'}`}>
                  {tag}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <input value={customTag} onChange={(e) => setCustomTag(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addCustomTag()} className="flex-1 border border-gray-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-400" placeholder="Custom tag… (press Enter)" />
              <button onClick={addCustomTag} className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs font-medium transition-colors">Add</button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {tags.map((t) => (
                  <span key={t} className="inline-flex items-center gap-1 text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                    {t}
                    <button onClick={() => toggleTag(t)} className="text-emerald-500 hover:text-emerald-800">✕</button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-xs font-semibold text-gray-600 mb-1">Access</label>
              <div className="flex gap-2">
                {(['open', 'closed'] as const).map((a) => (
                  <button key={a} onClick={() => setAccess(a)} className={`flex-1 text-xs py-2 rounded-lg border transition-colors ${access === a ? 'bg-emerald-600 text-white border-emerald-600' : 'border-gray-200 text-gray-600 hover:border-emerald-300'}`}>
                    {a === 'open' ? 'Free / Open' : 'Login Required'}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-xs font-semibold text-gray-600 mb-1">Type</label>
              <div className="flex gap-2">
                {[false, true].map((r) => (
                  <button key={String(r)} onClick={() => setIsResource(r)} className={`flex-1 text-xs py-2 rounded-lg border transition-colors ${isResource === r ? 'bg-emerald-600 text-white border-emerald-600' : 'border-gray-200 text-gray-600 hover:border-emerald-300'}`}>
                    {r ? 'Resource' : 'App'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Description (optional)</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 resize-none" placeholder="One sentence describing what it does…" />
          </div>
        </div>

        <button onClick={submit} disabled={!valid} className="mt-5 w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-xl transition-colors">
          Submit via GitHub →
        </button>
      </div>
    </div>
  );
}
