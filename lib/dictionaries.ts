import type { Locale } from './i18n-config';

type Dictionary = typeof import('../content/fa/home.json').default;

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
    fa: () => import('../content/fa/home.json').then((module) => module.default),
    en: () => import('../content/en/home.json').then((module) => module.default)
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