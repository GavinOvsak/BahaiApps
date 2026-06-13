import { BahaiApp } from '../types';

interface EditProps {
  app: BahaiApp;
  onClose: () => void;
}

export function EditAppModal({ app, onClose }: EditProps) {
  function submit() {
    const body = [
      `**App:** ${app.name}`,
      `**Current URL:** ${app.url}`,
      '',
      '**Suggested changes:**',
      '(describe what should be changed)',
    ].join('\n');

    const url = `https://github.com/GavinOvsak/BahaiApps/issues/new?template=edit-app.yml&title=${encodeURIComponent(`Edit: ${app.name}`)}&body=${encodeURIComponent(body)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl font-bold">✕</button>
        <h2 className="text-lg font-bold text-gray-900 mb-1">Suggest an Edit</h2>
        <p className="text-sm text-gray-500 mb-4">
          This will open a GitHub issue for <span className="font-medium text-gray-700">{app.name}</span> where you can describe what needs to change.
        </p>
        <button
          onClick={submit}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl transition-colors"
        >
          Open GitHub Issue →
        </button>
      </div>
    </div>
  );
}

interface DeleteProps {
  app: BahaiApp;
  onClose: () => void;
}

export function DeleteAppModal({ app, onClose }: DeleteProps) {
  function submit() {
    const body = [
      `**App:** ${app.name}`,
      `**URL:** ${app.url}`,
      '',
      '**Reason for removal:**',
      '(explain why this should be removed)',
    ].join('\n');

    const url = `https://github.com/GavinOvsak/BahaiApps/issues/new?template=remove-app.yml&title=${encodeURIComponent(`Remove: ${app.name}`)}&body=${encodeURIComponent(body)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl font-bold">✕</button>
        <h2 className="text-lg font-bold text-gray-900 mb-1">Request Removal</h2>
        <p className="text-sm text-gray-500 mb-4">
          Request that <span className="font-medium text-gray-700">{app.name}</span> be removed from the directory by opening a GitHub issue.
        </p>
        <button
          onClick={submit}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 rounded-xl transition-colors"
        >
          Open GitHub Issue →
        </button>
      </div>
    </div>
  );
}
