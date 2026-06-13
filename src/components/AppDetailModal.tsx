import { useState } from 'react';
import { BahaiApp } from '../types';
import { useT } from '../TranslationContext';
import { EditAppModal, DeleteAppModal } from './EditDeleteModals';

interface Props {
  app: BahaiApp;
  onClose: () => void;
}

export default function AppDetailModal({ app, onClose }: Props) {
  const { t } = useT();
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  if (showEdit) return <EditAppModal app={app} onClose={() => { setShowEdit(false); onClose(); }} />;
  if (showDelete) return <DeleteAppModal app={app} onClose={() => { setShowDelete(false); onClose(); }} />;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl font-bold">✕</button>

        <div className="flex items-center gap-2 mb-1">
          <span className="text-2xl">{app.resource ? '🔗' : '📱'}</span>
          <h2 className="text-xl font-bold text-gray-900">{app.name}</h2>
        </div>

        <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full mb-4 ${
          app.access === 'open'
            ? 'bg-emerald-100 text-emerald-700'
            : 'bg-gray-100 text-gray-500'
        }`}>
          {app.access === 'open' ? 'Free & Open Access' : 'Closed / Login Required'}
        </span>

        {app.description && (
          <p className="text-sm text-gray-600 mb-4">{app.description}</p>
        )}

        <div className="space-y-2 text-sm mb-5">
          <div className="flex gap-2">
            <span className="text-gray-400 w-20 shrink-0">URL</span>
            <a href={app.url} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline truncate">{app.url}</a>
          </div>
          {app.github && (
            <div className="flex gap-2">
              <span className="text-gray-400 w-20 shrink-0">GitHub</span>
              <a href={`https://github.com/${app.github}`} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">{app.github}</a>
            </div>
          )}
          {app.languages && app.languages.length > 0 && (
            <div className="flex gap-2">
              <span className="text-gray-400 w-20 shrink-0">{t.languages}</span>
              <span className="text-gray-700">{app.languages.join(', ')}</span>
            </div>
          )}
          {app.tags.length > 0 && (
            <div className="flex gap-2">
              <span className="text-gray-400 w-20 shrink-0">{t.tags}</span>
              <span className="text-gray-700">{app.tags.join(', ')}</span>
            </div>
          )}
          {app.dateAdded && (
            <div className="flex gap-2">
              <span className="text-gray-400 w-20 shrink-0">Added</span>
              <span className="text-gray-700">{app.dateAdded}</span>
            </div>
          )}
        </div>

        <div className="flex gap-2 pt-4 border-t border-gray-100">
          <button
            onClick={() => setShowEdit(true)}
            className="flex-1 text-sm py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
          >
            {t.suggestEdit}
          </button>
          <button
            onClick={() => setShowDelete(true)}
            className="flex-1 text-sm py-2 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 transition-colors"
          >
            {t.requestRemoval}
          </button>
        </div>
      </div>
    </div>
  );
}
