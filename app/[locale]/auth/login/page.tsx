import Link from 'next/link';
import LoginForm from '../../../../components/auth/LoginForm';
import type { Locale } from '../../../../lib/i18n-config';
import { getDictionary } from '../../../../lib/dictionaries';

export default async function LoginPage({ params }: { params: { locale: Locale } }): Promise<JSX.Element> {
    const dictionary = await getDictionary(params.locale);
    const { auth, navigation } = dictionary;

    return (
        <section className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-6 rounded-3xl border border-dashed border-slate-200 bg-white/70 p-8 shadow-inner">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-primary">{navigation.about}</p>
                    <h2 className="mt-2 text-2xl font-bold text-slate-900">OTP-first security</h2>
                    <p className="mt-2 text-sm text-slate-600">
                        Every login mirrors the boofback API journey:
                    </p>
                </div>
                <ol className="space-y-3 text-sm text-slate-600">
                    <li>
                        <span className="font-semibold text-primary-dark">1.</span> POST <code className="rounded bg-slate-900/5 px-2 py-0.5 text-xs">/api/v1/auth/login</code> with mobile +
                        password to trigger an OTP.
                    </li>
                    <li>
                        <span className="font-semibold text-primary-dark">2.</span> Grab the OTP from backend logs (treat it as a temporary password).
                    </li>
                    <li>
                        <span className="font-semibold text-primary-dark">3.</span> POST{' '}
                        <code className="rounded bg-slate-900/5 px-2 py-0.5 text-xs">/api/v1/auth/login/verify</code> with mobile + OTP to receive the
                        secure cookie.
                    </li>
                </ol>
                <p className="text-xs text-slate-400">
                    Once verified, reload the home page to see authenticated-only features served by the Go API.
                </p>
                <div className="rounded-2xl bg-primary/5 p-4 text-xs text-primary-dark">
                    {auth.shared.activationHint}
                </div>
                <Link href={`/${params.locale}`} className="inline-flex text-sm font-semibold text-primary">
                    ← {navigation.collections}
                </Link>
            </div>
            <LoginForm locale={params.locale} copy={auth.login} shared={auth.shared} links={auth.links} />
        </section>
    );
}
