import type { Locale } from './i18n-config';

type Dictionary = typeof import('../content/fa/home.json');

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
    fa: () => import('../content/fa/home.json'),
    en: () => import('../content/en/home.json')
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
    const dictionaryLoader = dictionaries[locale] ?? dictionaries.fa;
    try {
        return await dictionaryLoader();
    } catch (error) {
        console.error('Failed to load dictionary', { locale, error });
        return dictionaries.fa();
    }
}