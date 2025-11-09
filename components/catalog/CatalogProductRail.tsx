'use client';

import HorizontalSlider from './HorizontalSlider';
import type { CatalogPageCopy } from './types';
import { logClientEvent } from '../../lib/logger';

interface CatalogProductRailProps {
    railId: string;
    rail: CatalogPageCopy['featuredRail'];
    actions: CatalogPageCopy['actions'];
}

export default function CatalogProductRail({ rail, railId, actions }: CatalogProductRailProps): JSX.Element {
    const handleAdd = (productId: string): void => {
        logClientEvent({ name: 'catalog.add_to_list', context: railId, payload: { productId } });
    };

    return (
        <section id={railId} className="space-y-6">
            <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-widest text-slate-500">{rail.title}</p>
                    <h2 className="text-2xl font-bold text-slate-900">{rail.subtitle}</h2>
                </div>
                <a href="#catalog-cta" className="text-sm font-semibold text-primary transition hover:text-primary-dark">
                    {rail.cta}
                </a>
            </div>
            <HorizontalSlider ariaLabel={rail.title}>
                {rail.products.map((product) => (
                    <article key={product.id} className="card flex h-full flex-col justify-between p-5">
                        <div>
                            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-400">
                                <span className="badge bg-primary/10 text-primary">{product.badge}</span>
                                <span>{product.category}</span>
                            </div>
                            <h3 className="mt-4 text-xl font-semibold text-slate-900">{product.name}</h3>
                            <p className="mt-2 text-lg font-bold text-primary-dark">{product.price}</p>
                        </div>
                        <div className="mt-6 flex items-center justify-between">
                            <button
                                type="button"
                                onClick={() => handleAdd(product.id)}
                                className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5"
                            >
                                {actions.addToList}
                            </button>
                            <a href="#catalog-services" className="text-sm font-semibold text-slate-500 hover:text-primary-dark">
                                {actions.viewDetails}
                            </a>
                        </div>
                    </article>
                ))}
            </HorizontalSlider>
        </section>
    );
}
