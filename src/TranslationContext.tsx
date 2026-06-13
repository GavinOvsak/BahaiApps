import { createContext, useContext, useState, ReactNode } from 'react';
import { LangCode, Translations, TRANSLATIONS, detectLang } from './i18n';

interface CtxValue {
  lang: LangCode;
  setLang: (l: LangCode) => void;
  t: Translations;
}

const Ctx = createContext<CtxValue | null>(null);

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LangCode>(() => {
    const saved = localStorage.getItem('bahaiapps_lang') as LangCode | null;
    return saved && saved in TRANSLATIONS ? saved : detectLang();
  });

  function setLang(l: LangCode) {
    setLangState(l);
    localStorage.setItem('bahaiapps_lang', l);
  }

  return (
    <Ctx.Provider value={{ lang, setLang, t: TRANSLATIONS[lang] }}>
      {children}
    </Ctx.Provider>
  );
}

export function useT() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useT must be used within TranslationProvider');
  return ctx;
}
