import SectionHeader from '../../../components/backend/SectionHeader';
import { getDictionary } from '../../../lib/dictionaries';
import type { Locale } from '../../../lib/i18n-config';

export default async function BackendOverviewPage({
                                                      params
                                                  }: {
    params: { locale: Locale };
}): Promise<JSX.Element> {
    const dictionary = await getDictionary(params.locale);
    const backend = dictionary.backend.overview;

    return (
        <div className="space-y-12">
            <section className="space-y-6">
                <SectionHeader
                    eyebrow={backend.layersEyebrow}
                    title={backend.layersTitle}
                    subtitle={backend.layersSubtitle}
                />
                <div className="grid gap-6 md:grid-cols-2">
                    {backend.layers.map((layer) => (
                        <article key={layer.title} className="space-y-3 rounded-3xl border border-slate-100 bg-slate-50/70 p-6">
                            <div className="text-xs font-semibold uppercase tracking-wide text-primary/80">
                                {layer.layer}
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900">{layer.title}</h3>
                            <p className="text-sm text-slate-600">{layer.description}</p>
                            <p className="text-xs font-semibold text-slate-400">{layer.location}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section className="space-y-6 rounded-3xl border border-slate-100 bg-slate-50/70 p-6">
                <SectionHeader
                    eyebrow={backend.workflowEyebrow}
                    title={backend.workflowTitle}
                    subtitle={backend.workflowSubtitle}
                />
                <ol className="space-y-4">
                    {backend.workflowSteps.map((step, index) => (
                        <li key={step.title} className="rounded-2xl border border-dashed border-slate-200 bg-white p-4">
                            <div className="text-xs font-semibold uppercase tracking-wide text-primary/80">
                                {index + 1}. {step.title}
                            </div>
                            <p className="mt-2 text-sm text-slate-600">{step.description}</p>
                        </li>
                    ))}
                </ol>
            </section>

            <section className="space-y-6">
                <SectionHeader eyebrow={backend.apiEyebrow} title={backend.apiTitle} subtitle={backend.apiSubtitle} />
                <div className="overflow-hidden rounded-3xl border border-slate-200">
                    <table className="min-w-full divide-y divide-slate-200 text-sm">
                        <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
                            <tr>
                                <th className="px-4 py-3 text-left">{backend.apiTable.method}</th>
                                <th className="px-4 py-3 text-left">{backend.apiTable.path}</th>
                                <th className="px-4 py-3 text-left">{backend.apiTable.description}</th>
                                <th className="px-4 py-3 text-left">{backend.apiTable.access}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white text-slate-700">
                            {backend.apiEndpoints.map((endpoint) => (
                                <tr key={`${endpoint.method}-${endpoint.path}`}>
                                    <td className="px-4 py-3 font-semibold">{endpoint.method}</td>
                                    <td className="px-4 py-3 font-mono text-xs">{endpoint.path}</td>
                                    <td className="px-4 py-3">{endpoint.description}</td>
                                    <td className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                                        {endpoint.scope}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}
