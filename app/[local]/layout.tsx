import type { ReactNode } from 'react';
import clsx from 'clsx';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import LocaleHydrator from '../../components/LocaleHydrator';
import { i18n, type Locale } from '../../lib/i18n-config';
import { getDictionary } from '../../lib/dictionaries';

export const dynamicParams = false;

export function generateStaticParams(): { locale: Locale }[] {
    return i18n.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
                                               children,
                                               params
                                           }: {
    children: ReactNode;
    params: { locale: Locale };
}): Promise<JSX.Element> {
    const { locale } = params;
    const isRTL = locale === 'fa';
    const dictionary = await getDictionary(locale);

    return (
        <div
            className={clsx('min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] antialiased', {
                'font-body rtl': isRTL,
                'ltr font-body': !isRTL
            })}
            style={{ direction: isRTL ? 'rtl' : 'ltr' }}
            data-locale={locale}
        >
            <LocaleHydrator locale={locale} />
            <Header locale={locale} dictionary={dictionary} />
            <main className="mx-auto mt-20 max-w-7xl px-6 pb-24 sm:px-8 lg:px-12">{children}</main>
            <Footer locale={locale} dictionary={dictionary} />
        </div>
    );
}