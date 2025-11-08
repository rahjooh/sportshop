import { CreditCardIcon, ShieldCheckIcon, TruckIcon } from '@heroicons/react/24/outline';
import type { Dictionary } from '../lib/dictionaries';

interface FeatureHighlightsProps {
    dictionary: Dictionary;
}

const iconMap = {
    CreditCardIcon,
    ShieldCheckIcon,
    TruckIcon
};

export default function FeatureHighlights({ dictionary }: FeatureHighlightsProps): JSX.Element {
    const features = dictionary.features;

    return (
        <section id="about" className="mt-24 space-y-8">
            <div className="max-w-2xl">
                <h2 className="section-title">{features.title}</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
                {features.items.map((feature) => {
                    const Icon = iconMap[feature.icon as keyof typeof iconMap] ?? CreditCardIcon;
                    return (
                        <article key={feature.title} className="card space-y-4 p-6">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
                            <h3 className="text-xl font-semibold text-slate-900">{feature.title}</h3>
                            <p className="text-sm leading-relaxed text-slate-600">{feature.description}</p>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}