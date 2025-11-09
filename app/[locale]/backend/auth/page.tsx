import ApiPlayground from '../../../../components/backend/ApiPlayground';
import SectionHeader from '../../../../components/backend/SectionHeader';
import { getDictionary } from '../../../../lib/dictionaries';
import type { Locale } from '../../../../lib/i18n-config';

export default async function BackendAuthPage({
                                                   params
                                               }: {
    params: { locale: Locale };
}): Promise<JSX.Element> {
    const dictionary = await getDictionary(params.locale);
    const copy = dictionary.backend.authFlows;
    const labels = dictionary.backend.playground;

    return (
        <div className="space-y-10">
            <section className="space-y-4">
                <SectionHeader eyebrow={copy.eyebrow} title={copy.title} subtitle={copy.subtitle} />
                <ul className="space-y-3 text-sm text-slate-600">
                    {copy.notes.map((note) => (
                        <li key={note} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                            {note}
                        </li>
                    ))}
                </ul>
            </section>

            <section className="space-y-6">
                <SectionHeader title={copy.loginSection.title} subtitle={copy.loginSection.subtitle} />
                <div className="grid gap-6 lg:grid-cols-2">
                    <ApiPlayground
                        locale={params.locale}
                        title={copy.loginSection.initiateTitle}
                        description={copy.loginSection.initiateDescription}
                        path="/api/v1/auth/login"
                        method="POST"
                        samplePayload={copy.samples.login}
                        labels={labels}
                    />
                    <ApiPlayground
                        locale={params.locale}
                        title={copy.loginSection.verifyTitle}
                        description={copy.loginSection.verifyDescription}
                        path="/api/v1/auth/login/verify"
                        method="POST"
                        samplePayload={copy.samples.verify}
                        labels={labels}
                    />
                </div>
            </section>

            <section className="grid gap-6 lg:grid-cols-2">
                <ApiPlayground
                    locale={params.locale}
                    title={copy.sessionSection.meTitle}
                    description={copy.sessionSection.meDescription}
                    path="/api/v1/auth/me"
                    method="GET"
                    labels={labels}
                    requiresAuth
                />
                <ApiPlayground
                    locale={params.locale}
                    title={copy.sessionSection.logoutTitle}
                    description={copy.sessionSection.logoutDescription}
                    path="/api/v1/auth/logout"
                    method="POST"
                    labels={labels}
                    requiresAuth
                />
            </section>

            <section className="space-y-6">
                <SectionHeader title={copy.resetSection.title} subtitle={copy.resetSection.subtitle} />
                <div className="grid gap-6 lg:grid-cols-2">
                    <ApiPlayground
                        locale={params.locale}
                        title={copy.resetSection.forgotTitle}
                        description={copy.resetSection.forgotDescription}
                        path="/api/v1/auth/password/forgot"
                        method="POST"
                        samplePayload={copy.samples.forgot}
                        labels={labels}
                    />
                    <ApiPlayground
                        locale={params.locale}
                        title={copy.resetSection.resetTitle}
                        description={copy.resetSection.resetDescription}
                        path="/api/v1/auth/password/reset"
                        method="POST"
                        samplePayload={copy.samples.reset}
                        labels={labels}
                    />
                </div>
            </section>
        </div>
    );
}
