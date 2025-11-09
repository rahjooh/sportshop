import ApiPlayground from '../../../../components/backend/ApiPlayground';
import ProductsGrid from '../../../../components/backend/ProductsGrid';
import SectionHeader from '../../../../components/backend/SectionHeader';
import { fetchProducts } from '../../../../lib/backend-data';
import { getDictionary } from '../../../../lib/dictionaries';
import type { Locale } from '../../../../lib/i18n-config';

export default async function BackendProductsPage({
                                                      params
                                                  }: {
    params: { locale: Locale };
}): Promise<JSX.Element> {
    const dictionary = await getDictionary(params.locale);
    const products = await fetchProducts(params.locale);
    const copy = dictionary.backend.products;
    const labels = dictionary.backend.playground;

    return (
        <div className="space-y-10">
            <section className="space-y-6">
                <SectionHeader eyebrow={copy.eyebrow} title={copy.title} subtitle={copy.subtitle} />
                <ProductsGrid
                    products={products}
                    locale={params.locale}
                    columns={copy.columns}
                    emptyState={copy.empty}
                />
            </section>

            <section className="space-y-6">
                <SectionHeader title={copy.playgroundTitle} subtitle={copy.playgroundSubtitle} />
                <div className="grid gap-6 lg:grid-cols-2">
                    <ApiPlayground
                        locale={params.locale}
                        title={copy.createTitle}
                        description={copy.createDescription}
                        path="/api/v1/products"
                        method="POST"
                        samplePayload={copy.samples.create}
                        labels={labels}
                        requiresAuth
                    />
                    <ApiPlayground
                        locale={params.locale}
                        title={copy.detailTitle}
                        description={copy.detailDescription}
                        path="/api/v1/products/:id"
                        method="GET"
                        labels={labels}
                    />
                </div>
            </section>
        </div>
    );
}
