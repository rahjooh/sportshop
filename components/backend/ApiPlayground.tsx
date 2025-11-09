'use client';

import { useMemo, useState } from 'react';
import clsx from 'clsx';
import { apiClient } from '../../lib/api-client';
import type { Locale } from '../../lib/i18n-config';

export interface PlaygroundLabels {
    requestTitle: string;
    responseTitle: string;
    send: string;
    sending: string;
    requiresAuth: string;
    invalidJson: string;
    emptyResponse: string;
}

export interface ApiPlaygroundProps {
    locale: Locale;
    title: string;
    description: string;
    path: string;
    method?: string;
    samplePayload?: Record<string, unknown>;
    requiresAuth?: boolean;
    labels: PlaygroundLabels;
}

export default function ApiPlayground({
                                          locale,
                                          title,
                                          description,
                                          path,
                                          method = 'GET',
                                          samplePayload,
                                          requiresAuth,
                                          labels
                                      }: ApiPlaygroundProps): JSX.Element {
    const [payload, setPayload] = useState(() => (samplePayload ? JSON.stringify(samplePayload, null, 2) : ''));
    const [response, setResponse] = useState<string>(labels.emptyResponse);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const displayMethod = method.toUpperCase();
    const canSendBody = displayMethod !== 'GET' && displayMethod !== 'DELETE';

    const prettyResponse = useMemo(() => {
        try {
            const parsed = JSON.parse(response);
            return JSON.stringify(parsed, null, 2);
        } catch {
            return response;
        }
    }, [response]);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();
        setLoading(true);
        setError(null);

        let parsedBody: unknown = undefined;
        if (canSendBody && payload.trim().length > 0) {
            try {
                parsedBody = JSON.parse(payload);
            } catch (err) {
                setError(labels.invalidJson);
                setLoading(false);
                return;
            }
        }

        const apiResponse = await apiClient(path, locale, {
            method: displayMethod,
            body: parsedBody ? JSON.stringify(parsedBody) : undefined
        });

        if (!apiResponse.ok) {
            setError(apiResponse.error ?? labels.emptyResponse);
        }

        setResponse(
            JSON.stringify(
                {
                    ok: apiResponse.ok,
                    status: apiResponse.status,
                    data: apiResponse.data ?? apiResponse.error
                },
                null,
                2
            )
        );
        setLoading(false);
    }

    return (
        <div className="space-y-4 rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-lg">
            <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-primary/80">
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-primary">{displayMethod}</span>
                    <span>{path}</span>
                </div>
                <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
                <p className="text-sm text-slate-500">{description}</p>
                {requiresAuth && (
                    <p className="text-xs font-semibold text-amber-600">{labels.requiresAuth}</p>
                )}
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
                {canSendBody && (
                    <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                            {labels.requestTitle}
                        </label>
                        <textarea
                            className="min-h-[160px] w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 font-mono text-xs text-slate-800 shadow-inner focus:border-primary focus:outline-none"
                            value={payload}
                            onChange={(event) => setPayload(event.target.value)}
                            spellCheck={false}
                        />
                    </div>
                )}

                <button
                    type="submit"
                    className={clsx(
                        'w-full rounded-2xl px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 focus:outline-none',
                        loading ? 'bg-primary/70' : 'bg-primary'
                    )}
                    disabled={loading}
                >
                    {loading ? labels.sending : labels.send}
                </button>
            </form>

            <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {labels.responseTitle}
                </label>
                {error && <p className="rounded-2xl bg-red-50 px-3 py-2 text-xs text-red-600">{error}</p>}
                <pre className="max-h-80 overflow-auto rounded-2xl border border-slate-100 bg-slate-900/90 p-4 text-xs text-slate-100">
                    {prettyResponse}
                </pre>
            </div>
        </div>
    );
}
