'use client';

import { useEffect } from 'react';
import type { Locale } from '../lib/i18n-config';

interface LocaleHydratorProps {
    locale: Locale;
}

export default function LocaleHydrator({ locale }: LocaleHydratorProps): null {
    useEffect(() => {
        const isRTL = locale === 'fa';
        const root = document.documentElement;
        root.lang = locale;
        root.dir = isRTL ? 'rtl' : 'ltr';

        document.body.classList.toggle('rtl', isRTL);
        document.body.classList.toggle('ltr', !isRTL);
    }, [locale]);

    return null;
}