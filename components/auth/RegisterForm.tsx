'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { apiClient } from '../../lib/api-client';
import type { Locale } from '../../lib/i18n-config';
import type { Dictionary } from '../../lib/dictionaries';

interface RegisterFormProps {
    locale: Locale;
    copy: Dictionary['auth']['register'];
    shared: Dictionary['auth']['shared'];
    links: Dictionary['auth']['links'];
}

export default function RegisterForm({ locale, copy, shared, links }: RegisterFormProps): JSX.Element {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const loginHref = useMemo(() => `/${locale}/auth/login`, [locale]);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        const response = await apiClient('/api/v1/users', locale, {
            method: 'POST',
            body: JSON.stringify({ name, email, mobile, password })
        });

        if (!response.ok) {
            setError(response.error ?? shared.error);
        } else {
            setSuccess(true);
        }

        setLoading(false);
    }

    return (
        <div className="rounded-3xl border border-slate-200 bg-white/80 p-8 shadow-2xl backdrop-blur">
            <div className="mb-8 space-y-2">
                <h1 className="text-2xl font-semibold text-slate-900">{copy.title}</h1>
                <p className="text-sm text-slate-500">{copy.subtitle}</p>
            </div>
            {success ? (
                <div className="space-y-4 rounded-3xl bg-primary/5 p-6 text-sm text-slate-600">
                    <p className="font-semibold text-primary-dark">{copy.successTitle}</p>
                    <p>{copy.successBody}</p>
                    <p className="text-xs text-slate-400">{shared.activationHint}</p>
                    <Link href={loginHref} className="inline-flex items-center font-semibold text-primary">
                        {links.login}
                    </Link>
                </div>
            ) : (
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700" htmlFor="name">
                            {shared.nameLabel}
                        </label>
                        <input
                            id="name"
                            name="name"
                            required
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none ring-primary/10 transition focus:ring-4"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700" htmlFor="email">
                            {shared.emailLabel}
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none ring-primary/10 transition focus:ring-4"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700" htmlFor="mobile">
                            {shared.mobileLabel}
                        </label>
                        <input
                            id="mobile"
                            name="mobile"
                            type="tel"
                            required
                            value={mobile}
                            onChange={(event) => setMobile(event.target.value)}
                            placeholder={shared.mobilePlaceholder}
                            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none ring-primary/10 transition focus:ring-4"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700" htmlFor="password">
                            {shared.passwordLabel}
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            placeholder={shared.passwordPlaceholder}
                            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none ring-primary/10 transition focus:ring-4"
                        />
                    </div>
                    {error && <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}
                    <button
                        type="submit"
                        className="w-full rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                        disabled={loading}
                    >
                        {loading ? '…' : copy.submit}
                    </button>
                    <p className="text-center text-sm text-slate-500">
                        {copy.switchToLogin}{' '}
                        <Link href={loginHref} className="font-semibold text-primary">
                            {links.login}
                        </Link>
                    </p>
                </form>
            )}
        </div>
    );
}
