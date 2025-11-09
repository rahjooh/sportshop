import type { CatalogPageCopy } from './types';

interface CatalogBundlesProps {
    copy: CatalogPageCopy['bundles'];
}

export default function CatalogBundles({ copy }: CatalogBundlesProps): JSX.Element {
    return (
        <section className="space-y-8">
            <div className="space-y-2">
                <p className="text-sm font-semibold uppercase tracking-widest text-primary">{copy.title}</p>
                <h2 className="text-3xl font-bold text-slate-900">{copy.subtitle}</h2>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
                {copy.items.map((bundle) => (
                    <article key={bundle.id} className="card flex h-full flex-col justify-between border border-slate-100 p-6">
                        <div>
                            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-widest text-primary">
                                <span>{bundle.savings}</span>
                                <span>#{bundle.id}</span>
                            </div>
                            <h3 className="mt-3 text-2xl font-semibold text-slate-900">{bundle.name}</h3>
                            <p className="mt-2 text-sm text-slate-600">{bundle.description}</p>
                        </div>
                        <div className="mt-6">
                            <p className="text-lg font-bold text-slate-900">{bundle.price}</p>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
