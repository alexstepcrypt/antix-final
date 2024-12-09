import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// import en from '@/public/locales/en.json';

import landing from '@/public/locales/en/landing.json';
import dashboard from '@/public/locales/en/dashboard.json';

i18n.use(initReactI18next).init({
    resources: {
        en: {
          landing,
          dashboard,
        },
      },
  lng: 'en',
  fallbackLng: 'en',
});

export default i18n;
