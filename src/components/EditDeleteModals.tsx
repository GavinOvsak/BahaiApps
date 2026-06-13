import { useState } from 'react';
import { BahaiApp } from '../types';

// ── Edit Modal ─────────────────────────────────────────────────────────────────

const COMMON_TAGS = [
  'prayers', 'songs', 'children', 'education', 'writings', 'devotional',
  'music', 'community-building', 'reference', 'study', 'search', 'guidance',
];

interface EditProps {
  app: BahaiApp;
  onClose: () => void;
}

export function EditAppModal({ app, onClose }: EditProps) {
  const [name, setName] = useState(app.name);
  const [url, setUrl] = useState(app.url);
  const [github, setGithub] = useState(app.github ?? '');
  const [tags, setTags] = useState<string[]>(app.tags);
  const [customTag, setCustomTag] = useState('');
  const [access, setAccess] = useState(app.access);
  const [description, setDescription] = useState(app.description ?? '');
  const [languages, setLanguages] = useState((app.languages ?? []).join(', '));
  const [reason, setReason] = useState('');

  function toggleTag(tag: string) {
    setTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  }

  function addCustomTag() {
    const t = customTag.trim().toLowerCase().replace(/\s+/g, '-');
    if (t && !tags.includes(t)) setTags((prev) => [...prev, t]);
    setCustomTag('');
  }

  function submit() {
    const data: Record<string, unknown> = {
      name: name.trim(),
      url: url.trim(),
      tags,
      access,
      ...(app.resource ? { resource: true } : {}),
      ...(github.trim() ? { github: github.trim() } : {}),
      ...(description.trim() ? { description: description.trim() } : {}),
      ...(languages.trim()
        ? { languages: languages.split(',').map((l) => l.trim()).filter(Boolean) }
        : {}),
    };

    const json = JSON.stringify({ action: 'edit', appUrl: app.url, data }, null, 2);

    const body = [
      `## Edit Request: ${app.name}`,
      ``,
      `**Original URL:** ${app.url}`,
      `**Reason for edit:** ${reason}`,
      ``,
      `### Proposed values`,
      `**Name:** ${name}`,
      `**URL:** ${url}`,
      github.trim() ? `**GitHub:** ${github.trim()}` : '',
      `**Tags:** ${tags.join(', ')}`,
      `**Access:** ${access}`,
      languages.trim() ? `**Languages:** ${languages}` : '',
      description.trim() ? `**Description:** ${description.trim()}` : '',
      ``,
      `<!-- BAHAIAPPS_JSON`,
      json,
      `-->`,
    ].filter((l) => l !== null).join('\n');

    const issueUrl = `https://github.com/GavinOvsak/BahaiApps/issues/new?template=edit-app.md&title=${encodeURIComponent(`[Edit App] ${app.name}`)}&body=${encodeURIComponent(body)}&labels=edit-app`;
    window.open(issueUrl, '_blank', 'noopener,noreferrer');
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 relative max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl font-bold">✕</button>

        <div className="mb-5">
          <h2 className="text-xl font-bold text-gray-900">Suggest an Edit</h2>
          <p className="text-sm text-gray-500 mt-1">
            Pre-fills a GitHub issue with the updated values. A maintainer will apply it when approved.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Reason for edit <span className="text-red-400">*</span></label>
            <input value={reason} onChange={(e) => setReason(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="e.g. URL changed, description outdated…" />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">URL</label>
            <input value={url} onChange={(e) => setUrl(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">GitHub repo</label>
            <input value={github} onChange={(e) => setGithub(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="username/repo" />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Languages (comma-separated)</label>
            <input value={languages} onChange={(e) => setLanguages(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="en, fa, ar" />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Tags</label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {COMMON_TAGS.map((tag) => (
                <button key={tag} onClick={() => toggleTag(tag)} className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${tags.includes(tag) ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-200 hover:border-blue-400'}`}>
                  {tag}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <input value={customTag} onChange={(e) => setCustomTag(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addCustomTag()} className="flex-1 border border-gray-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Custom tag… (press Enter)" />
              <button onClick={addCustomTag} className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs font-medium">Add</button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {tags.map((t) => (
                  <span key={t} className="inline-flex items-center gap-1 text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                    {t}
                    <button onClick={() => toggleTag(t)} className="text-blue-500 hover:text-blue-800">✕</button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Access</label>
            <div className="flex gap-2">
              {(['open', 'closed'] as const).map((a) => (
                <button key={a} onClick={() => setAccess(a)} className={`flex-1 text-xs py-2 rounded-lg border transition-colors ${access === a ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-200 text-gray-600 hover:border-blue-300'}`}>
                  {a === 'open' ? 'Free / Open' : 'Login Required'}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none" />
          </div>
        </div>

        <button onClick={submit} disabled={!reason.trim()} className="mt-5 w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-xl transition-colors">
          Submit Edit via GitHub →
        </button>
      </div>
    </div>
  );
}

// ── Delete Modal ───────────────────────────────────────────────────────────────

const REMOVAL_REASONS = [
  'Dead / broken URL',
  'Paywalled — no longer free',
  'Duplicate of another entry',
  'No longer maintained',
  'Not Bahai-related',
  'Other',
];

interface DeleteProps {
  app: BahaiApp;
  onClose: () => void;
}

export function DeleteAppModal({ app, onClose }: DeleteProps) {
  const [reason, setReason] = useState('');
  const [details, setDetails] = useState('');

  function submit() {
    const json = JSON.stringify({ action: 'delete', appUrl: app.url }, null, 2);

    const body = [
      `## Removal Request: ${app.name}`,
      ``,
      `**URL:** ${app.url}`,
      `**Reason:** ${reason}`,
      details.trim() ? `**Details:** ${details.trim()}` : '',
      ``,
      `<!-- BAHAIAPPS_JSON`,
      json,
      `-->`,
    ].filter((l) => l !== null).join('\n');

    const issueUrl = `https://github.com/GavinOvsak/BahaiApps/issues/new?template=remove-app.md&title=${encodeURIComponent(`[Remove App] ${app.name}`)}&body=${encodeURIComponent(body)}&labels=remove-app`;
    window.open(issueUrl, '_blank', 'noopener,noreferrer');
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 relative" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl font-bold">✕</button>
        <h2 className="text-lg font-bold text-gray-900 mb-1">Request Removal</h2>
        <p className="text-sm text-gray-500 mb-4">
          Opens a GitHub issue for <span className="font-medium text-gray-700">{app.name}</span>. A maintainer will apply the removal when approved.
        </p>

        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Reason <span className="text-red-400">*</span></label>
            <div className="space-y-1">
              {REMOVAL_REASONS.map((r) => (
                <label key={r} className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="radio" name="reason" value={r} checked={reason === r} onChange={() => setReason(r)} className="accent-red-500" />
                  {r}
                </label>
              ))}
            </div>
          </div>

          {(reason === 'Other' || reason) && (
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                {reason === 'Other' ? 'Details (required)' : 'Additional details (optional)'}
              </label>
              <textarea value={details} onChange={(e) => setDetails(e.target.value)} rows={2} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400 resize-none" />
            </div>
          )}
        </div>

        <button
          onClick={submit}
          disabled={!reason || (reason === 'Other' && !details.trim())}
          className="mt-5 w-full bg-red-600 hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-xl transition-colors"
        >
          Submit Removal via GitHub →
        </button>
      </div>
    </div>
  );
}
