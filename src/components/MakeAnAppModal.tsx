interface Props {
  onClose: () => void;
}

export default function MakeAnAppModal({ onClose }: Props) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl font-bold"
        >
          ✕
        </button>

        <div className="mb-4">
          <div className="text-3xl mb-2">🛠️</div>
          <h2 className="text-xl font-bold text-gray-900">Make Your Own App</h2>
          <p className="text-sm text-gray-500 mt-1">It's easier than you think.</p>
        </div>

        <div className="space-y-4 text-sm text-gray-700">
          <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
            <h3 className="font-semibold text-emerald-800 mb-1">✨ Vibe-code a new app</h3>
            <p>
              Use an AI coding assistant like{' '}
              <a
                href="https://claude.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 underline hover:text-emerald-900"
              >
                Claude
              </a>{' '}
              or{' '}
              <a
                href="https://cursor.sh"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 underline hover:text-emerald-900"
              >
                Cursor
              </a>{' '}
              to describe what you want in plain English. You don't need to know how to code — just
              describe your idea and iterate. Many Bahai apps (prayers, children's classes, song
              players) are simple enough to build in an afternoon.
            </p>
          </div>

          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <h3 className="font-semibold text-blue-800 mb-1">🍴 Fork an existing app</h3>
            <p>
              Any app with a{' '}
              <span className="font-mono bg-blue-100 px-1 rounded text-blue-700">&lt;/&gt;</span>{' '}
              GitHub link can be forked and customized. Click the link, hit "Fork" on GitHub, then
              open it in an AI editor to add features, change the design, or adapt it for your
              community.
            </p>
          </div>

          <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
            <h3 className="font-semibold text-amber-800 mb-1">🚀 Deploy for free</h3>
            <p>
              Host your finished app for free on{' '}
              <a
                href="https://pages.github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-700 underline hover:text-amber-900"
              >
                GitHub Pages
              </a>
              ,{' '}
              <a
                href="https://vercel.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-700 underline hover:text-amber-900"
              >
                Vercel
              </a>
              , or{' '}
              <a
                href="https://netlify.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-700 underline hover:text-amber-900"
              >
                Netlify
              </a>
              . Once it's live, submit it to this directory so others can benefit.
            </p>
          </div>
        </div>

        <div className="mt-5 pt-4 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-400">
            Have an app to add?{' '}
            <a
              href="https://github.com/gavinovsak/BahaiApps/issues/new?title=Add+App&body=Name:%0AURL:%0ATags:%0ADescription:"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-600 underline hover:text-emerald-800"
            >
              Submit it via GitHub
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
