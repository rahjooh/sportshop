'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { apiClient } from '../../lib/api-client';
import type { Locale } from '../../lib/i18n-config';
import type { Dictionary } from '../../lib/dictionaries';

interface LoginFormProps {
    locale: Locale;
    copy: Dictionary['auth']['login'];
    shared: Dictionary['auth']['shared'];
    links: Dictionary['auth']['links'];
}

type Step = 'credentials' | 'otp' | 'success';

export default function LoginForm({ locale, copy, shared, links }: LoginFormProps): JSX.Element {
    const [step, setStep] = useState<Step>('credentials');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [message, setMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const registerHref = useMemo(() => `/${locale}/auth/register`, [locale]);

    async function handleCredentialsSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();
        setLoading(true);
        setError(null);
        setMessage(null);

        const response = await apiClient('/api/v1/auth/login', locale, {
            method: 'POST',
            body: JSON.stringify({ mobile, password })
        });

        if (!response.ok) {
            setError(response.error ?? shared.error);
        } else {
            setStep('otp');
            setMessage(copy.passwordHelper);
        }

        setLoading(false);
    }

    async function handleOtpSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();
        setLoading(true);
        setError(null);
        setMessage(null);

        const response = await apiClient('/api/v1/auth/login/verify', locale, {
            method: 'POST',
            body: JSON.stringify({ mobile, code: otp })
        });

        if (!response.ok) {
            setError(response.error ?? shared.error);
        } else {
            setStep('success');
            setMessage(copy.successMessage);
        }

        setLoading(false);
    }

    return (
        <div className="rounded-3xl border border-slate-200 bg-white/80 p-8 shadow-2xl backdrop-blur">
            <div className="mb-8 space-y-2">
                <h1 className="text-2xl font-semibold text-slate-900">{copy.title}</h1>
                <p className="text-sm text-slate-500">{copy.subtitle}</p>
            </div>

            {step === 'credentials' && (
                <form className="space-y-6" onSubmit={handleCredentialsSubmit}>
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
                    <p className="text-xs text-slate-400">{copy.passwordHelper}</p>
                    {error && <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}
                    {message && <p className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">{message}</p>}
                    <button
                        type="submit"
                        className="w-full rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                        disabled={loading}
                    >
                        {loading ? '…' : copy.requestOtp}
                    </button>
                    <p className="text-center text-sm text-slate-500">
                        {copy.switchToRegister}{' '}
                        <Link href={registerHref} className="font-semibold text-primary">
                            {links.register}
                        </Link>
                    </p>
                </form>
            )}

            {step === 'otp' && (
                <form className="space-y-6" onSubmit={handleOtpSubmit}>
                    <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">{copy.otpStepTitle}</h2>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700" htmlFor="otp">
                            {shared.otpLabel}
                        </label>
                        <input
                            id="otp"
                            name="otp"
                            type="text"
                            inputMode="numeric"
                            autoComplete="one-time-code"
                            required
                            value={otp}
                            onChange={(event) => setOtp(event.target.value)}
                            placeholder={shared.otpPlaceholder}
                            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none ring-primary/10 transition focus:ring-4"
                        />
                    </div>
                    <p className="text-xs text-slate-400">{copy.otpHelper}</p>
                    {error && <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}
                    {message && <p className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">{message}</p>}
                    <button
                        type="submit"
                        className="w-full rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                        disabled={loading}
                    >
                        {loading ? '…' : copy.verifyOtp}
                    </button>
                </form>
            )}

            {step === 'success' && (
                <div className="space-y-4 rounded-3xl bg-primary/5 p-6 text-sm text-slate-600">
                    <p className="font-semibold text-primary-dark">{shared.success}</p>
                    <p>{copy.successMessage}</p>
                </div>
            )}
        </div>
    );
}
