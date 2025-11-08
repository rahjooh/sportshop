import Image from 'next/image';
import Link from 'next/link';
import type { Locale } from '../lib/i18n-config';
import type { Dictionary } from '../lib/dictionaries';

interface HeroSectionProps {
    dictionary: Dictionary;
    locale: Locale;
}

export default function HeroSection({ dictionary, locale }: HeroSectionProps): JSX.Element {
    const hero = dictionary.hero;
    const stats = dictionary.statistics;

    return (
        <section id="hero" className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-8">
                <div className="badge bg-primary/10 text-primary">{dictionary.navigation.collections}</div>
                <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                    {hero.title}
                </h1>
                <p className="max-w-xl text-lg leading-relaxed text-slate-600">{hero.subtitle}</p>
                <div className="flex flex-wrap gap-4">
                    <Link
                        href={`/${locale}#collections`}
                        className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:-translate-y-1 hover:shadow-xl"
                    >
                        {hero.ctaPrimary}
                    </Link>
                    <Link
                        href={`/${locale}#about`}
                        className="inline-flex items-center justify-center rounded-full border border-primary px-6 py-3 text-sm font-semibold text-primary transition hover:bg-primary/10"
                    >
                        {hero.ctaSecondary}
                    </Link>
                </div>
                <dl className="grid gap-6 sm:grid-cols-3">
                    {stats.map((stat) => (
                        <div key={stat.label} className="rounded-3xl bg-white p-6 text-center shadow-lg">
                            <dt className="text-sm font-medium text-slate-500">{stat.label}</dt>
                            <dd className="mt-2 text-2xl font-bold text-primary-dark">{stat.value}</dd>
                        </div>
                    ))}
                </dl>
            </div>
            <div className="relative">
                <div className="absolute -inset-4 rounded-[3rem] bg-gradient-to-br from-primary/20 via-white to-primary/5 blur-3xl" />
                <div className="relative rounded-[3rem] border border-white/60 bg-white/70 p-3 shadow-2xl backdrop-blur">
                    <Image
                        src="/images/content/iran.jpg"
                        alt={hero.title}
                        width={900}
                        height={600}
                        sizes="(min-width: 1024px) 40vw, 90vw"
                        className="h-full w-full rounded-[2.5rem] object-cover"
                        priority
                    />
                </div>
            </div>
        </section>
    );
}
