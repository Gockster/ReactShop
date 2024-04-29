import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import el from './el.json';
import en from './en.json';

const languageDetector = {
    type: 'languageDetector',
    async: true,
    detect: cb => cb('el'),
    init: () => {},
    cacheUserLanguage: () => {},
};

i18next
    .use(languageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'el',
        debug: false,
        resources: {
            en, el
        },
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        }
    });


export default i18next;
