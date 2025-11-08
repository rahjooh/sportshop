const highlightGradient = 'bg-gradient-to-br from-white via-primary/5 to-white';

type Dictionary = typeof import('../content/fa/home.json');

interface ProductHighlightsProps {
    dictionary: Dictionary;
}

export default function ProductHighlights({ dictionary }: ProductHighlightsProps): JSX.Element {
    const highlights = dictionary.highlights;

    return (
        <section id="gear" className="mt-24 space-y-8">
            <div className="max-w-2xl">
                <h2 className="section-title">{highlights.title}</h2>
                <p className="section-subtitle">{highlights.subtitle}</p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
                {highlights.items.map((item) => (
                    <article key={item.title} className={`card flex h-full flex-col justify-between p-6 ${highlightGradient}`}>
                        <div className="space-y-3">
                            <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
                            <p className="text-sm leading-relaxed text-slate-600">{item.description}</p>
                        </div>
                        <div className="mt-6 text-lg font-bold text-primary">{item.price}</div>
                    </article>
                ))}
            </div>
        </section>
    );
}