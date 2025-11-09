import type { CatalogPageCopy } from './types';

interface CatalogCtaBannerProps {
    copy: CatalogPageCopy['ctaBanner'];
}

export default function CatalogCtaBanner({ copy }: CatalogCtaBannerProps): JSX.Element {
    return (
        <section
            id="catalog-cta"
            className="rounded-[2rem] border border-primary/20 bg-gradient-to-br from-primary/10 via-white to-white p-10 text-center shadow-xl"
        >
            <p className="text-sm font-semibold uppercase tracking-[0.4em] text-primary">پیتوک Studio</p>
            <h2 className="mt-4 text-3xl font-bold text-slate-900">{copy.title}</h2>
            <p className="mt-2 text-base text-slate-600">{copy.subtitle}</p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
                <a href="#catalog-services" className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-md">
                    {copy.primaryCta}
                </a>
                <a href="#catalog-rails" className="rounded-full border border-primary px-6 py-3 text-sm font-semibold text-primary">
                    {copy.secondaryCta}
                </a>
            </div>
        </section>
    );
}
