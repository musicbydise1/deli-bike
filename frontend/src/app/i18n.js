import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation resources directly so they are available during SSR
import ruCommon from '../../public/locales/ru/common.json';
import kzCommon from '../../public/locales/kz/common.json';

const resources = {
  ru: { common: ruCommon },
  kz: { common: kzCommon },
};

i18n
  // Keep language detection, but ensure it works both server and client side
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ru', // default language
    supportedLngs: ['ru', 'kz'],
    lng: 'ru',
    detection: {
      // Prefer htmlTag so <html lang="..."> controls SSR rendering, then navigator/localStorage on client
      order: ['htmlTag', 'navigator', 'localStorage'],
      caches: ['localStorage'],
    },
    ns: ['common'],
    defaultNS: 'common',
    interpolation: { escapeValue: false },
    load: 'all',
    preload: ['ru', 'kz'],
  });

export default i18n;
