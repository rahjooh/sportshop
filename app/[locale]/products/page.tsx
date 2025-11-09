import type { Metadata } from 'next';
import CatalogHero from '../../../components/catalog/CatalogHero';
import CatalogCategorySlider from '../../../components/catalog/CatalogCategorySlider';
import CatalogProductRail from '../../../components/catalog/CatalogProductRail';
import CatalogCollections from '../../../components/catalog/CatalogCollections';
import CatalogBundles from '../../../components/catalog/CatalogBundles';
import CatalogServices from '../../../components/catalog/CatalogServices';
import CatalogBrandMarquee from '../../../components/catalog/CatalogBrandMarquee';
import CatalogEditorials from '../../../components/catalog/CatalogEditorials';
import CatalogCtaBanner from '../../../components/catalog/CatalogCtaBanner';
import type { Locale } from '../../../lib/i18n-config';
import { getDictionary } from '../../../lib/dictionaries';

interface ProductsPageProps {
    params: { locale: Locale };
}

export async function generateMetadata({ params }: ProductsPageProps): Promise<Metadata> {
    const dictionary = await getDictionary(params.locale);
    const seo = dictionary.catalogPage.seo;

    return {
        title: seo.title,
        description: seo.description
    };
}

export default async function ProductsPage({ params }: ProductsPageProps): Promise<JSX.Element> {
    const dictionary = await getDictionary(params.locale);
    const catalog = dictionary.catalogPage;

    return (
        <div className="space-y-16 pb-12">
            <CatalogHero hero={catalog.hero} />

            <div className="space-y-16" id="catalog-rails">
                <CatalogCategorySlider copy={catalog.categorySlider} />
                <CatalogProductRail railId="catalog-featured" rail={catalog.featuredRail} actions={catalog.actions} />
                <CatalogProductRail railId="catalog-equipment" rail={catalog.equipmentRail} actions={catalog.actions} />
            </div>

            <CatalogCollections copy={catalog.collections} />
            <CatalogBundles copy={catalog.bundles} />

            <div className="space-y-10">
                <CatalogServices copy={catalog.services} />
                <CatalogBrandMarquee copy={catalog.brands} />
            </div>

            <CatalogEditorials copy={catalog.editorials} />
            <CatalogCtaBanner copy={catalog.ctaBanner} />
        </div>
    );
}
