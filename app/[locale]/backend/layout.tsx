import type { ReactNode } from 'react';
import BackendNav from '../../../components/backend/BackendNav';
import { getDictionary } from '../../../lib/dictionaries';
import type { Locale } from '../../../lib/i18n-config';

export default async function BackendLayout({
                                                children,
                                                params
                                            }: {
    children: ReactNode;
    params: { locale: Locale };
}): Promise<JSX.Element> {
    const dictionary = await getDictionary(params.locale);
    const backend = dictionary.backend;
    const navItems = [
        { href: `/${params.locale}/backend`, label: backend.nav.overview },
        { href: `/${params.locale}/backend/status`, label: backend.nav.status },
        { href: `/${params.locale}/backend/products`, label: backend.nav.products },
        { href: `/${params.locale}/backend/users`, label: backend.nav.users },
        { href: `/${params.locale}/backend/auth`, label: backend.nav.auth },
        { href: `/${params.locale}/backend/addresses`, label: backend.nav.addresses },
        { href: `/${params.locale}/backend/orders`, label: backend.nav.orders }
    ];

    return (
        <div className="space-y-10">
            <section className="rounded-[2.5rem] border border-slate-200 bg-gradient-to-br from-primary/5 via-white to-primary/10 p-10 shadow-xl">
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">{backend.hero.kicker}</p>
                <div className="mt-4 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                    <div className="space-y-6">
                        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">{backend.hero.title}</h1>
                        <p className="text-base leading-relaxed text-slate-600">{backend.hero.subtitle}</p>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-3">
                        {backend.hero.metrics.map((metric) => (
                            <div
                                key={metric.label}
                                className="rounded-3xl border border-slate-100 bg-white/80 p-4 text-center shadow"
                            >
                                <p className="text-2xl font-bold text-primary-dark">{metric.value}</p>
                                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                    {metric.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <BackendNav items={navItems} description={backend.hero.kicker} />
            <div className="space-y-10 rounded-[2rem] border border-slate-200 bg-white/80 p-8 shadow-lg">
                {children}
            </div>
        </div>
    );
}
