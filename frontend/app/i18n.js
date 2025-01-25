import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";

i18n
    .use(HttpApi) // Подключаем загрузку через HTTP
    .use(LanguageDetector) // Автоматически определяет язык пользователя
    .use(initReactI18next)
    .init({
        fallbackLng: "ru", // Язык по умолчанию
        supportedLngs: ["ru", "kz"], // Поддерживаемые языки
        lng: "ru", // Начальный язык
        detection: {
            order: ["localStorage", "navigator", "htmlTag"], // Порядок определения языка
            caches: ["localStorage"], // Кэшируем выбор пользователя
        },
        backend: {
            loadPath: "/locales/{{lng}}/common.json", // Путь к JSON-файлам
        },
        interpolation: {
            escapeValue: false, // React сам экранирует значения
        },
    });

export default i18n;