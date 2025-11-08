import type { Locale } from './i18n-config';
import fa from '../content/fa/home.json';
import en from '../content/en/home.json';

const dictionaries = {
    fa,
    en
} as const satisfies Record<Locale, typeof fa>;

export type Dictionary = (typeof dictionaries)[Locale];

export async function getDictionary(locale: Locale): Promise<Dictionary> {
    const dictionary = dictionaries[locale] ?? dictionaries.fa;
    return dictionary;
}