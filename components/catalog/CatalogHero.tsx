import type { CatalogPageCopy } from './types';

interface CatalogHeroProps {
    hero: CatalogPageCopy['hero'];
}

export default function CatalogHero({ hero }: CatalogHeroProps): JSX.Element {
    return (
        <section className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-primary-dark via-primary to-emerald-500 px-6 py-16 text-white shadow-2xl sm:px-12">
            <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.15),_transparent_60%)] opacity-70 lg:block" />
            <div className="relative z-10 space-y-8">
                <div className="inline-flex items-center gap-3 rounded-full bg-white/15 px-4 py-1 text-sm font-semibold uppercase tracking-widest">
                    <span className="text-white/80">{hero.kicker}</span>
                    <span className="rounded-full bg-white/90 px-3 py-0.5 text-primary-dark">{hero.pill.value}</span>
                </div>
                <div className="space-y-4">
                    <h1 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">{hero.title}</h1>
                    <p className="text-base text-white/80 lg:text-lg">{hero.subtitle}</p>
                </div>
                <div className="flex flex-wrap gap-4 text-sm font-semibold">
                    <a
                        href="#catalog-rails"
                        className="rounded-full bg-white px-6 py-3 text-primary-dark shadow-lg transition hover:-translate-y-0.5"
                    >
                        {hero.primaryCta}
                    </a>
                    <a href="#catalog-services" className="rounded-full border border-white/40 px-6 py-3 text-white transition hover:-translate-y-0.5">
                        {hero.secondaryCta}
                    </a>
                </div>
                <dl className="grid gap-4 text-sm sm:grid-cols-3" aria-label="Catalog hero stats">
                    {hero.stats.map((stat) => (
                        <div key={stat.label} className="rounded-2xl border border-white/30 bg-white/10 p-4 shadow-inner">
                            <dt className="text-white/80">{stat.label}</dt>
                            <dd className="text-2xl font-bold">{stat.value}</dd>
                        </div>
                    ))}
                </dl>
                <div className="grid gap-4 rounded-3xl border border-white/20 bg-white/10 p-4 text-sm lg:grid-cols-2">
                    {hero.serviceNotes.map((note) => (
                        <article key={note.title}>
                            <h3 className="font-semibold">{note.title}</h3>
                            <p className="mt-1 text-white/80">{note.description}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
