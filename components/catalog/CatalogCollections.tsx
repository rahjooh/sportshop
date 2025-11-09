import type { CatalogPageCopy } from './types';

interface CatalogCollectionsProps {
    copy: CatalogPageCopy['collections'];
}

export default function CatalogCollections({ copy }: CatalogCollectionsProps): JSX.Element {
    return (
        <section className="space-y-8">
            <div className="max-w-2xl space-y-2">
                <p className="text-sm font-semibold uppercase tracking-widest text-primary">{copy.title}</p>
                <h2 className="text-3xl font-bold text-slate-900">{copy.subtitle}</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
                {copy.items.map((collection) => (
                    <article key={collection.title} className="card h-full p-6">
                        <h3 className="text-xl font-semibold text-slate-900">{collection.title}</h3>
                        <p className="mt-2 text-sm text-slate-600">{collection.description}</p>
                        <ul className="mt-4 space-y-2 text-sm text-slate-700">
                            {collection.highlights.map((highlight) => (
                                <li key={highlight} className="flex items-center gap-2">
                                    <span className="h-2 w-2 rounded-full bg-primary" />
                                    {highlight}
                                </li>
                            ))}
                        </ul>
                    </article>
                ))}
            </div>
        </section>
    );
}
