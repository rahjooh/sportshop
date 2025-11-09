import type { CatalogPageCopy } from './types';

interface CatalogEditorialsProps {
    copy: CatalogPageCopy['editorials'];
}

export default function CatalogEditorials({ copy }: CatalogEditorialsProps): JSX.Element {
    return (
        <section className="space-y-8">
            <div className="max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-widest text-primary">{copy.title}</p>
                <h2 className="section-subtitle mt-1">{copy.subtitle}</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
                {copy.cards.map((card) => (
                    <article key={card.title} className="card h-full border border-slate-100 p-6">
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">{card.kicker}</p>
                        <h3 className="mt-3 text-2xl font-semibold text-slate-900">{card.title}</h3>
                        <p className="mt-2 text-sm text-slate-600">{card.description}</p>
                    </article>
                ))}
            </div>
        </section>
    );
}
