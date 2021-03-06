import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18n
  // load translation using http -> see /public/locales
  .use(Backend)
  // detect user language
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next
  .use(initReactI18next)
  // init i18next
  .init({
    fallbackLng: 'en',
    react: { useSuspense: false },
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    }
  }, () => setDefaultLanguage());

function setDefaultLanguage() {
  const marker = 'i18nFirstLoad';

  if (!localStorage.getItem(marker)) {
    const defaultLang = 'en';

    i18n.changeLanguage(defaultLang).then();
    localStorage.setItem(marker, 'false');
  }
}

export default i18n;
