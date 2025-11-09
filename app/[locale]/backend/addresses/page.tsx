import ApiPlayground from '../../../../components/backend/ApiPlayground';
import SectionHeader from '../../../../components/backend/SectionHeader';
import { getDictionary } from '../../../../lib/dictionaries';
import type { Locale } from '../../../../lib/i18n-config';

export default async function BackendAddressesPage({
                                                       params
                                                   }: {
    params: { locale: Locale };
}): Promise<JSX.Element> {
    const dictionary = await getDictionary(params.locale);
    const copy = dictionary.backend.addresses;
    const labels = dictionary.backend.playground;

    return (
        <div className="space-y-10">
            <section className="space-y-4">
                <SectionHeader eyebrow={copy.eyebrow} title={copy.title} subtitle={copy.subtitle} />
                <ul className="grid gap-4 md:grid-cols-2">
                    {copy.highlights.map((highlight) => (
                        <li key={highlight} className="rounded-3xl border border-slate-100 bg-slate-50 p-4 text-sm text-slate-600">
                            {highlight}
                        </li>
                    ))}
                </ul>
            </section>

            <section className="grid gap-6 lg:grid-cols-2">
                <ApiPlayground
                    locale={params.locale}
                    title={copy.createTitle}
                    description={copy.createDescription}
                    path="/api/v1/addresses"
                    method="POST"
                    samplePayload={copy.samples.create}
                    labels={labels}
                    requiresAuth
                />
                <ApiPlayground
                    locale={params.locale}
                    title={copy.listTitle}
                    description={copy.listDescription}
                    path="/api/v1/addresses"
                    method="GET"
                    labels={labels}
                    requiresAuth
                />
            </section>

            <section className="grid gap-6 lg:grid-cols-2">
                <ApiPlayground
                    locale={params.locale}
                    title={copy.defaultTitle}
                    description={copy.defaultDescription}
                    path="/api/v1/addresses/:id/default"
                    method="POST"
                    labels={labels}
                    requiresAuth
                />
                <ApiPlayground
                    locale={params.locale}
                    title={copy.updateTitle}
                    description={copy.updateDescription}
                    path="/api/v1/addresses/:id"
                    method="PUT"
                    samplePayload={copy.samples.update}
                    labels={labels}
                    requiresAuth
                />
            </section>
        </div>
    );
}
