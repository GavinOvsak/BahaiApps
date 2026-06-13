import { useState } from 'react';
import { useT } from '../TranslationContext';
import { LangCode, LANG_FLAGS, LANG_NAMES, TRANSLATIONS } from '../i18n';

interface Props {
  githubUsername: string;
  onSaveUsername: (u: string) => void;
  langPrefs: LangCode[];
  onSaveLangPrefs: (prefs: LangCode[]) => void;
  onClose: () => void;
}

const ALL_LANGS = Object.keys(TRANSLATIONS) as LangCode[];

export default function AccountModal({
  githubUsername,
  onSaveUsername,
  langPrefs,
  onSaveLangPrefs,
  onClose,
}: Props) {
  const { t, lang, setLang } = useT();
  const [username, setUsername] = useState(githubUsername);
  const [selectedLangs, setSelectedLangs] = useState<LangCode[]>(langPrefs);
  const [langSearch, setLangSearch] = useState('');

  function toggleLang(code: LangCode) {
    setSelectedLangs((prev) =>
      prev.includes(code) ? prev.filter((l) => l !== code) : [...prev, code],
    );
  }

  function save() {
    onSaveUsername(username.trim());
    onSaveLangPrefs(selectedLangs);
    if (selectedLangs.length > 0 && !selectedLangs.includes(lang)) {
      setLang(selectedLangs[0]);
    }
    onClose();
  }

  const filteredLangs = ALL_LANGS.filter((code) =>
    LANG_NAMES[code].toLowerCase().includes(langSearch.toLowerCase()),
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl font-bold"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold text-gray-900 mb-5">{t.account}</h2>

        {/* GitHub Stars */}
        <section className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-yellow-400 text-lg">⭐</span>
            <h3 className="font-semibold text-gray-800">GitHub Stars</h3>
          </div>
          <p className="text-xs text-gray-500 mb-3">
            Enter your GitHub username to highlight apps whose repos you've starred. Stored only in
            your browser.
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="GitHub username"
              className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
            {username && (
              <button
                onClick={() => setUsername('')}
                className="px-3 py-2 border border-red-200 text-red-500 rounded-lg text-sm hover:bg-red-50 transition-colors"
              >
                ✕
              </button>
            )}
          </div>
          {githubUsername && (
            <p className="text-xs text-gray-400 mt-1.5">Showing stars for @{githubUsername}</p>
          )}
        </section>

        {/* Language preferences */}
        <section className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">🌐</span>
            <h3 className="font-semibold text-gray-800">{t.languages}</h3>
          </div>
          <p className="text-xs text-gray-500 mb-3">
            Apps supporting your preferred languages will be sorted to the top. Also sets the app
            interface language.
          </p>
          <input
            type="text"
            value={langSearch}
            onChange={(e) => setLangSearch(e.target.value)}
            placeholder="Search languages…"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mb-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
          <div className="space-y-1 max-h-48 overflow-y-auto">
            {filteredLangs.map((code) => {
              const selected = selectedLangs.includes(code);
              return (
                <button
                  key={code}
                  onClick={() => toggleLang(code)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                    selected
                      ? 'bg-emerald-50 text-emerald-800'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>{LANG_FLAGS[code]}</span>
                    <span>{LANG_NAMES[code]}</span>
                  </span>
                  {selected && <span className="text-emerald-600">✓</span>}
                </button>
              );
            })}
          </div>
        </section>

        <button
          onClick={save}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-xl transition-colors"
        >
          Save Preferences
        </button>
      </div>
    </div>
  );
}
