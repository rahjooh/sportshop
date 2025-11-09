import type { CatalogPageCopy } from './types';

interface CatalogBrandMarqueeProps {
    copy: CatalogPageCopy['brands'];
}

export default function CatalogBrandMarquee({ copy }: CatalogBrandMarqueeProps): JSX.Element {
    return (
        <section className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">{copy.title}</p>
            <div className="flex flex-wrap gap-3 rounded-3xl bg-white p-6 text-sm font-semibold text-slate-600 shadow">
                {copy.items.map((brand) => (
                    <span key={brand} className="rounded-full border border-slate-200 px-4 py-1">
                        {brand}
                    </span>
                ))}
            </div>
        </section>
    );
}
