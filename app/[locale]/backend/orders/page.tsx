import ApiPlayground from '../../../../components/backend/ApiPlayground';
import SectionHeader from '../../../../components/backend/SectionHeader';
import { getDictionary } from '../../../../lib/dictionaries';
import type { Locale } from '../../../../lib/i18n-config';

export default async function BackendOrdersPage({
                                                   params
                                               }: {
    params: { locale: Locale };
}): Promise<JSX.Element> {
    const dictionary = await getDictionary(params.locale);
    const copy = dictionary.backend.orders;
    const labels = dictionary.backend.playground;

    return (
        <div className="space-y-10">
            <section className="space-y-4">
                <SectionHeader eyebrow={copy.eyebrow} title={copy.title} subtitle={copy.subtitle} />
                <div className="rounded-3xl border border-slate-100 bg-slate-50/70 p-6">
                    <ul className="list-disc space-y-2 pl-6 text-sm text-slate-600">
                        {copy.requirements.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                </div>
            </section>

            <section className="grid gap-6 lg:grid-cols-2">
                <ApiPlayground
                    locale={params.locale}
                    title={copy.createTitle}
                    description={copy.createDescription}
                    path="/api/v1/orders"
                    method="POST"
                    samplePayload={copy.samples.create}
                    labels={labels}
                    requiresAuth
                />
                <ApiPlayground
                    locale={params.locale}
                    title={copy.listTitle}
                    description={copy.listDescription}
                    path="/api/v1/orders"
                    method="GET"
                    labels={labels}
                    requiresAuth
                />
            </section>

            <section className="grid gap-6 lg:grid-cols-2">
                <ApiPlayground
                    locale={params.locale}
                    title={copy.detailTitle}
                    description={copy.detailDescription}
                    path="/api/v1/orders/:id"
                    method="GET"
                    labels={labels}
                    requiresAuth
                />
                <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50/80 p-6 text-sm text-slate-600">
                    <h3 className="text-base font-semibold text-slate-900">{copy.adminTitle}</h3>
                    <p className="mt-2">{copy.adminDescription}</p>
                </div>
            </section>
        </div>
    );
}
