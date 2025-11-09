import type { Metadata } from 'next';
import HeroSection from '../../components/HeroSection';
import CategoryGrid from '../../components/CategoryGrid';
import ProductHighlights from '../../components/ProductHighlights';
import FeatureHighlights from '../../components/FeatureHighlights';
import Testimonials from '../../components/Testimonials';
import { getDictionary } from '../../lib/dictionaries';
import { i18n, type Locale } from '../../lib/i18n-config';

export async function generateStaticParams(): Promise<{ locale: Locale }[]> {
    return i18n.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
    const dictionary = await getDictionary(params.locale);
    return {
        title: params.locale === 'fa' ? 'پیتوک | فروشگاه تخصصی ورزش' : 'Pitok | Iranian Sports Marketplace',
        description: dictionary.hero.subtitle
    };
}

export default async function HomePage({ params }: { params: { locale: Locale } }): Promise<JSX.Element> {
    const dictionary = await getDictionary(params.locale);

    return (
        <div className="space-y-24">
            <HeroSection dictionary={dictionary} locale={params.locale} />
            <CategoryGrid dictionary={dictionary} />
            <ProductHighlights dictionary={dictionary} />
            <FeatureHighlights dictionary={dictionary} />
            <Testimonials dictionary={dictionary} />
        </div>
    );
}
