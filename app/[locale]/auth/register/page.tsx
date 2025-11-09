import Link from 'next/link';
import RegisterForm from '../../../../components/auth/RegisterForm';
import type { Locale } from '../../../../lib/i18n-config';
import { getDictionary } from '../../../../lib/dictionaries';

export default async function RegisterPage({ params }: { params: { locale: Locale } }): Promise<JSX.Element> {
    const dictionary = await getDictionary(params.locale);
    const { auth, navigation } = dictionary;

    return (
        <section className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <RegisterForm locale={params.locale} copy={auth.register} shared={auth.shared} links={auth.links} />
            <div className="space-y-6 rounded-3xl border border-dashed border-slate-200 bg-white/70 p-8 shadow-inner">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-primary">{navigation.about}</p>
                    <h2 className="mt-2 text-2xl font-bold text-slate-900">How onboarding works</h2>
                    <p className="mt-2 text-sm text-slate-600">
                        boofback keeps the flow lightweight but secure:
                    </p>
                </div>
                <ol className="space-y-3 text-sm text-slate-600">
                    <li>
                        <span className="font-semibold text-primary-dark">1.</span> POST <code className="rounded bg-slate-900/5 px-2 py-0.5 text-xs">/api/v1/users</code> with name, email,
                        mobile (your username), and password.
                    </li>
                    <li>
                        <span className="font-semibold text-primary-dark">2.</span> Check the server log for the activation OTP tied to that mobile.
                    </li>
                    <li>
                        <span className="font-semibold text-primary-dark">3.</span> POST{' '}
                        <code className="rounded bg-slate-900/5 px-2 py-0.5 text-xs">/api/v1/auth/activate</code> with mobile + OTP to unlock login.
                    </li>
                </ol>
                <p className="text-xs text-slate-400">
                    After activation you can immediately jump to the login page, request a fresh OTP, and receive your session cookie.
                </p>
                <Link href={`/${params.locale}/auth/login`} className="inline-flex text-sm font-semibold text-primary">
                    {auth.links.login} →
                </Link>
            </div>
        </section>
    );
}
