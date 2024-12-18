import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import landing from '@/public/locales/en/landing.json';
import news from '@/public/locales/en/news.json';
import dashboard from '@/public/locales/en/dashboard.json';

import esLanding from '@/public/locales/es/landing.json';
import esDashboard from '@/public/locales/es/dashboard.json'

i18n.use(initReactI18next).init({
    resources: {
        en: {
          landing,
          dashboard,
          news
        },
        es: {
          landing: esLanding,
          dashboard: esDashboard,
          // todo: add spanish language for news( maybe )
          news
        }
      },
  lng: 'en',
  fallbackLng: 'en',
});

export default i18n;
