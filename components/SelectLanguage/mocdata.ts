export const languages: LanguageItem[] = [
   { icon: '/images/flags/English.png', label: 'English', idioma: 'en' },
   { icon: '/images/flags/Spanish.png', label: 'Español', idioma: 'es' }
]

export interface LanguageItem {
   icon: string;
   label: string;
   idioma: string;
}