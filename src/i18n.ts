export type LangCode = 'en' | 'fr' | 'es' | 'fa' | 'ar' | 'pt' | 'ru';

export interface Translations {
  searchPlaceholder: string;
  all: string;
  makeAnApp: string;
  visitSite: string;
  openApp: string;
  openSource: string;
  closedSource: string;
  filters: string;
  hideFilters: string;
  tags: string;
  languages: string;
  clearFilters: string;
  noResults: string;
  noResultsSub: string;
  contributeGitHub: string;
  account: string;
  submitApp: string;
  myStars: string;
  results: (n: number, total: number) => string;
  tagged: string;
  clear: string;
  resource: string;
  app: string;
  suggestEdit: string;
  requestRemoval: string;
  sortNewest: string;
  sortOldest: string;
  sortStarsDesc: string;
  sortStarsAsc: string;
  sort: string;
}

const en: Translations = {
  searchPlaceholder: 'Search apps and resources…',
  all: 'All',
  makeAnApp: 'Make an App',
  visitSite: 'Visit',
  openApp: 'Open App',
  openSource: 'Open Source',
  closedSource: 'Closed Source',
  filters: 'Show Filters',
  hideFilters: 'Hide Filters',
  tags: 'Tags',
  languages: 'Languages',
  clearFilters: 'Clear all filters',
  noResults: 'No results found',
  noResultsSub: 'Try a different search or clear the filters.',
  contributeGitHub: 'Contribute on GitHub',
  account: 'Account',
  submitApp: 'Submit an App',
  myStars: 'My Stars',
  results: (n, total) => `${n} of ${total} entries`,
  tagged: 'tagged',
  clear: 'clear',
  resource: 'Resource',
  app: 'App',
  suggestEdit: 'Suggest Edit',
  requestRemoval: 'Request Removal',
  sortNewest: 'Newest first',
  sortOldest: 'Oldest first',
  sortStarsDesc: 'Most starred',
  sortStarsAsc: 'Fewest starred',
  sort: 'Sort',
};

const fr: Translations = {
  searchPlaceholder: 'Rechercher des applications et ressources…',
  all: 'Tout',
  makeAnApp: 'Créer une appli',
  visitSite: 'Visiter',
  openApp: 'Ouvrir',
  openSource: 'Source ouverte',
  closedSource: 'Source fermée',
  filters: 'Afficher les filtres',
  hideFilters: 'Masquer les filtres',
  tags: 'Étiquettes',
  languages: 'Langues',
  clearFilters: 'Effacer tous les filtres',
  noResults: 'Aucun résultat trouvé',
  noResultsSub: 'Essayez une autre recherche ou effacez les filtres.',
  contributeGitHub: 'Contribuer sur GitHub',
  account: 'Compte',
  submitApp: 'Soumettre une appli',
  myStars: 'Mes étoiles',
  results: (n, total) => `${n} sur ${total} entrées`,
  tagged: 'étiqueté',
  clear: 'effacer',
  resource: 'Ressource',
  app: 'Application',
  suggestEdit: 'Suggérer une modification',
  requestRemoval: 'Demander la suppression',
  sortNewest: 'Plus récent',
  sortOldest: 'Plus ancien',
  sortStarsDesc: 'Plus d\'étoiles',
  sortStarsAsc: 'Moins d\'étoiles',
  sort: 'Trier',
};

const es: Translations = {
  searchPlaceholder: 'Buscar aplicaciones y recursos…',
  all: 'Todo',
  makeAnApp: 'Crear una app',
  visitSite: 'Visitar',
  openApp: 'Abrir',
  openSource: 'Código abierto',
  closedSource: 'Código cerrado',
  filters: 'Mostrar filtros',
  hideFilters: 'Ocultar filtros',
  tags: 'Etiquetas',
  languages: 'Idiomas',
  clearFilters: 'Borrar filtros',
  noResults: 'Sin resultados',
  noResultsSub: 'Intenta una búsqueda diferente o borra los filtros.',
  contributeGitHub: 'Contribuir en GitHub',
  account: 'Cuenta',
  submitApp: 'Enviar una app',
  myStars: 'Mis estrellas',
  results: (n, total) => `${n} de ${total} entradas`,
  tagged: 'etiquetado',
  clear: 'borrar',
  resource: 'Recurso',
  app: 'Aplicación',
  suggestEdit: 'Sugerir edición',
  requestRemoval: 'Solicitar eliminación',
  sortNewest: 'Más reciente',
  sortOldest: 'Más antiguo',
  sortStarsDesc: 'Más estrellas',
  sortStarsAsc: 'Menos estrellas',
  sort: 'Ordenar',
};

const fa: Translations = {
  searchPlaceholder: 'جستجوی برنامه‌ها و منابع…',
  all: 'همه',
  makeAnApp: 'ساخت برنامه',
  visitSite: 'بازدید',
  openApp: 'باز کردن',
  openSource: 'متن‌باز',
  closedSource: 'متن‌بسته',
  filters: 'نمایش فیلترها',
  hideFilters: 'پنهان کردن فیلترها',
  tags: 'برچسب‌ها',
  languages: 'زبان‌ها',
  clearFilters: 'پاک کردن فیلترها',
  noResults: 'نتیجه‌ای یافت نشد',
  noResultsSub: 'جستجوی دیگری امتحان کنید یا فیلترها را پاک کنید.',
  contributeGitHub: 'مشارکت در GitHub',
  account: 'حساب کاربری',
  submitApp: 'ارسال برنامه',
  myStars: 'ستاره‌های من',
  results: (n, total) => `${n} از ${total} ورودی`,
  tagged: 'برچسب‌گذاری شده',
  clear: 'پاک کردن',
  resource: 'منبع',
  app: 'برنامه',
  suggestEdit: 'پیشنهاد ویرایش',
  requestRemoval: 'درخواست حذف',
  sortNewest: 'جدیدترین',
  sortOldest: 'قدیمی‌ترین',
  sortStarsDesc: 'بیشترین ستاره',
  sortStarsAsc: 'کمترین ستاره',
  sort: 'مرتب‌سازی',
};

const ar: Translations = {
  searchPlaceholder: 'البحث في التطبيقات والموارد…',
  all: 'الكل',
  makeAnApp: 'إنشاء تطبيق',
  visitSite: 'زيارة',
  openApp: 'فتح',
  openSource: 'مفتوح المصدر',
  closedSource: 'مغلق المصدر',
  filters: 'إظهار الفلاتر',
  hideFilters: 'إخفاء الفلاتر',
  tags: 'الوسوم',
  languages: 'اللغات',
  clearFilters: 'مسح الفلاتر',
  noResults: 'لا توجد نتائج',
  noResultsSub: 'جرّب بحثاً مختلفاً أو امسح الفلاتر.',
  contributeGitHub: 'المساهمة على GitHub',
  account: 'الحساب',
  submitApp: 'إرسال تطبيق',
  myStars: 'نجومي',
  results: (n, total) => `${n} من ${total} إدخال`,
  tagged: 'موسوم',
  clear: 'مسح',
  resource: 'مورد',
  app: 'تطبيق',
  suggestEdit: 'اقتراح تعديل',
  requestRemoval: 'طلب الحذف',
  sortNewest: 'الأحدث',
  sortOldest: 'الأقدم',
  sortStarsDesc: 'الأكثر نجوماً',
  sortStarsAsc: 'الأقل نجوماً',
  sort: 'ترتيب',
};

const pt: Translations = {
  searchPlaceholder: 'Pesquisar apps e recursos…',
  all: 'Tudo',
  makeAnApp: 'Criar um app',
  visitSite: 'Visitar',
  openApp: 'Abrir',
  openSource: 'Código aberto',
  closedSource: 'Código fechado',
  filters: 'Mostrar filtros',
  hideFilters: 'Ocultar filtros',
  tags: 'Etiquetas',
  languages: 'Idiomas',
  clearFilters: 'Limpar filtros',
  noResults: 'Sem resultados',
  noResultsSub: 'Tente uma busca diferente ou limpe os filtros.',
  contributeGitHub: 'Contribuir no GitHub',
  account: 'Conta',
  submitApp: 'Enviar um app',
  myStars: 'Minhas estrelas',
  results: (n, total) => `${n} de ${total} entradas`,
  tagged: 'marcado',
  clear: 'limpar',
  resource: 'Recurso',
  app: 'Aplicativo',
  suggestEdit: 'Sugerir edição',
  requestRemoval: 'Solicitar remoção',
  sortNewest: 'Mais recente',
  sortOldest: 'Mais antigo',
  sortStarsDesc: 'Mais estrelas',
  sortStarsAsc: 'Menos estrelas',
  sort: 'Ordenar',
};

const ru: Translations = {
  searchPlaceholder: 'Поиск приложений и ресурсов…',
  all: 'Все',
  makeAnApp: 'Создать приложение',
  visitSite: 'Посетить',
  openApp: 'Открыть',
  openSource: 'Открытый код',
  closedSource: 'Закрытый код',
  filters: 'Показать фильтры',
  hideFilters: 'Скрыть фильтры',
  tags: 'Теги',
  languages: 'Языки',
  clearFilters: 'Очистить фильтры',
  noResults: 'Результатов не найдено',
  noResultsSub: 'Попробуйте другой поиск или очистите фильтры.',
  contributeGitHub: 'Внести вклад на GitHub',
  account: 'Аккаунт',
  submitApp: 'Добавить приложение',
  myStars: 'Мои звёзды',
  results: (n, total) => `${n} из ${total} записей`,
  tagged: 'с тегом',
  clear: 'очистить',
  resource: 'Ресурс',
  app: 'Приложение',
  suggestEdit: 'Предложить правку',
  requestRemoval: 'Запросить удаление',
  sortNewest: 'Сначала новые',
  sortOldest: 'Сначала старые',
  sortStarsDesc: 'Больше звёзд',
  sortStarsAsc: 'Меньше звёзд',
  sort: 'Сортировка',
};

export const TRANSLATIONS: Record<LangCode, Translations> = { en, fr, es, fa, ar, pt, ru };

export const LANG_NAMES: Record<LangCode, string> = {
  en: 'English',
  fr: 'Français',
  es: 'Español',
  fa: 'فارسی',
  ar: 'العربية',
  pt: 'Português',
  ru: 'Русский',
};

export const LANG_FLAGS: Record<LangCode, string> = {
  en: '🇺🇸',
  fr: '🇫🇷',
  es: '🇪🇸',
  fa: '🇮🇷',
  ar: '🇸🇦',
  pt: '🇧🇷',
  ru: '🇷🇺',
};

export function detectLang(): LangCode {
  const langs = navigator.languages ?? [navigator.language];
  for (const l of langs) {
    const code = l.split('-')[0] as LangCode;
    if (code in TRANSLATIONS) return code;
  }
  return 'en';
}
