import { translations } from './translations.js';

function detectLanguage() {
  if (typeof window === 'undefined') return 'en';
  
  // Сначала проверяем сохранённый язык
  const saved = localStorage.getItem('ashvehicle-lang');
  if (saved && translations[saved]) {
    return saved;
  }
  
  const browserLang = navigator.language || navigator.userLanguage || 'en';
  const lang = browserLang.toLowerCase();
  
  // Русский для СНГ
  if (lang.startsWith('ru') || lang.startsWith('uk') || lang.startsWith('be') || lang.startsWith('kk')) {
    return 'ru';
  }
  
  // Японский
  if (lang.startsWith('ja')) {
    return 'ja';
  }
  
  // Всё остальное — английский
  return 'en';
}

let currentLanguage = $state(detectLanguage());

export function getLanguage() {
  return currentLanguage;
}

export function setLanguage(lang) {
  currentLanguage = lang;
  // Сохраняем выбор в localStorage
  if (typeof window !== 'undefined') {
    localStorage.setItem('ashvehicle-lang', lang);
  }
}

export function getTranslations() {
  return translations[currentLanguage];
}

export function createI18n() {
  return {
    get language() { return currentLanguage; },
    set language(val) { setLanguage(val); },
    get t() { return translations[currentLanguage]; }
  };
}

// Reactive translation getter
export function t() {
  return translations[currentLanguage];
}
