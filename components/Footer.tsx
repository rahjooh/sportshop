import Link from 'next/link';
import type { Locale } from '../lib/i18n-config';
import type { Dictionary } from '../lib/dictionaries';

interface FooterProps {
    locale: Locale;
    dictionary: Dictionary;
}

export default function Footer({ locale, dictionary }: FooterProps): JSX.Element {
    const footer = dictionary.footer;

    return (
        <footer className="border-t border-[var(--color-border)] bg-white py-12">
            <div className="mx-auto grid max-w-7xl gap-10 px-6 sm:grid-cols-3 sm:px-8 lg:px-12">
                <div className="space-y-4">
                    <div className="text-xl font-bold text-primary-dark">SportShop</div>
                    <p className="text-sm leading-relaxed text-slate-600">{footer.description}</p>
                    <p className="text-sm font-semibold text-primary">{footer.tagline}</p>
                </div>
                <div className="space-y-2 text-sm text-slate-600">
                    <Link href={`/${locale}`} className="block transition hover:text-primary">
                        {footer.links.support}
                    </Link>
                    <Link href={`/${locale}`} className="block transition hover:text-primary">
                        {footer.links.partnerships}
                    </Link>
                    <Link href={`/${locale}`} className="block transition hover:text-primary">
                        {footer.links.privacy}
                    </Link>
                    <Link href={`/${locale}`} className="block transition hover:text-primary">
                        {footer.links.terms}
                    </Link>
                </div>
                <div className="space-y-4 text-sm text-slate-600">
                    <h3 className="text-base font-semibold text-slate-900">API</h3>
                    <div className="rounded-2xl border border-dashed border-primary/40 bg-primary/5 p-4">
                        <div className="text-xs font-semibold uppercase tracking-wide text-primary/80">
                            {dictionary.api.status}
                        </div>
                        <div className="mt-2 text-sm text-primary-dark">{dictionary.api.connected}</div>
                    </div>
                    <p className="text-xs text-slate-400">
                        © {new Date().getFullYear()} SportShop. Crafted with Go Gin & Next.js.
                    </p>
                </div>
            </div>
        </footer>
    );
}
