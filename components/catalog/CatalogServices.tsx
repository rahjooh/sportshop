import type { CatalogPageCopy } from './types';

interface CatalogServicesProps {
    copy: CatalogPageCopy['services'];
}

export default function CatalogServices({ copy }: CatalogServicesProps): JSX.Element {
    return (
        <section id="catalog-services" className="space-y-6 rounded-[2rem] bg-white p-8 shadow-xl">
            <div className="space-y-2">
                <p className="text-sm font-semibold uppercase tracking-widest text-primary">{copy.title}</p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
                {copy.items.map((service) => (
                    <article key={service.title} className="space-y-2 rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
                        <h3 className="text-lg font-semibold text-slate-900">{service.title}</h3>
                        <p className="text-sm text-slate-600">{service.description}</p>
                    </article>
                ))}
            </div>
        </section>
    );
}
