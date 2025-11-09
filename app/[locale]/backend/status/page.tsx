import ApiPlayground from '../../../../components/backend/ApiPlayground';
import SectionHeader from '../../../../components/backend/SectionHeader';
import { fetchHealth } from '../../../../lib/backend-data';
import { getDictionary } from '../../../../lib/dictionaries';
import type { Locale } from '../../../../lib/i18n-config';

export default async function BackendStatusPage({
                                                    params
                                                }: {
    params: { locale: Locale };
}): Promise<JSX.Element> {
    const dictionary = await getDictionary(params.locale);
    const health = await fetchHealth(params.locale);
    const copy = dictionary.backend.status;

    const cards = [
        { label: copy.cards.status, value: health?.status ?? copy.cards.unknown },
        { label: copy.cards.uptime, value: health?.uptime ?? copy.cards.na },
        { label: copy.cards.region, value: health?.region ?? copy.cards.na }
    ];

    return (
        <div className="space-y-10">
            <section className="space-y-6">
                <SectionHeader eyebrow={copy.eyebrow} title={copy.title} subtitle={copy.subtitle} />
                <div className="grid gap-4 sm:grid-cols-3">
                    {cards.map((card) => (
                        <div key={card.label} className="rounded-3xl border border-slate-100 bg-slate-50/70 p-5 text-center shadow-inner">
                            <p className="text-2xl font-bold text-primary-dark">{card.value}</p>
                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{card.label}</p>
                        </div>
                    ))}
                </div>
                {!health && (
                    <p className="rounded-3xl border border-dashed border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-700">
                        {copy.unreachable}
                    </p>
                )}
            </section>

            <section className="space-y-6">
                <SectionHeader title={copy.diagnosticsTitle} subtitle={copy.diagnosticsSubtitle} />
                <ApiPlayground
                    locale={params.locale}
                    title={copy.playground.title}
                    description={copy.playground.description}
                    path="/health"
                    method="GET"
                    labels={dictionary.backend.playground}
                />
            </section>
        </div>
    );
}
