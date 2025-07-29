import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

i18n
  .use(HttpApi) // Подключаем загрузку через HTTP
  .use(LanguageDetector) // Автоматически определяет язык пользователя
  .use(initReactI18next)
  .init({
    fallbackLng: 'ru', // Язык по умолчанию
    supportedLngs: ['ru', 'kz'], // Поддерживаемые языки
    lng: 'ru', // Начальный язык
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'], // Порядок определения языка
      caches: ['localStorage'], // Кэшируем выбор пользователя
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json', // Путь к JSON-файлам
    },
    ns: ['common'], // Пространства имен
    defaultNS: 'common', // Пространство имен по умолчанию
    interpolation: {
      escapeValue: false, // React сам экранирует значения
    },
    load: 'all', // Загружаем все пространства имен сразу
    preload: ['ru', 'kz'], // Предзагружаем все языки
  });

export default i18n;
