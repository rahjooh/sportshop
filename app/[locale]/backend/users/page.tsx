import ApiPlayground from '../../../../components/backend/ApiPlayground';
import SectionHeader from '../../../../components/backend/SectionHeader';
import { getDictionary } from '../../../../lib/dictionaries';
import type { Locale } from '../../../../lib/i18n-config';

export default async function BackendUsersPage({
                                                   params
                                               }: {
    params: { locale: Locale };
}): Promise<JSX.Element> {
    const dictionary = await getDictionary(params.locale);
    const copy = dictionary.backend.users;
    const labels = dictionary.backend.playground;

    return (
        <div className="space-y-10">
            <section className="space-y-6">
                <SectionHeader eyebrow={copy.eyebrow} title={copy.title} subtitle={copy.subtitle} />
                <ol className="space-y-4">
                    {copy.steps.map((step, index) => (
                        <li key={step.title} className="rounded-3xl border border-dashed border-slate-200 bg-slate-50/80 p-5">
                            <div className="text-xs font-semibold uppercase tracking-wide text-primary/80">
                                {index + 1}. {step.title}
                            </div>
                            <p className="mt-2 text-sm text-slate-600">{step.description}</p>
                        </li>
                    ))}
                </ol>
            </section>

            <section className="grid gap-6 lg:grid-cols-2">
                <ApiPlayground
                    locale={params.locale}
                    title={copy.createTitle}
                    description={copy.createDescription}
                    path="/api/v1/users"
                    method="POST"
                    samplePayload={copy.samples.create}
                    labels={labels}
                />
                <ApiPlayground
                    locale={params.locale}
                    title={copy.activateTitle}
                    description={copy.activateDescription}
                    path="/api/v1/auth/activate"
                    method="POST"
                    samplePayload={copy.samples.activate}
                    labels={labels}
                />
            </section>

            <section className="space-y-4 rounded-3xl border border-amber-200 bg-amber-50/70 p-6 text-sm text-amber-900">
                <h3 className="text-base font-semibold">{copy.adminTitle}</h3>
                <p>{copy.adminDescription}</p>
            </section>
        </div>
    );
}
