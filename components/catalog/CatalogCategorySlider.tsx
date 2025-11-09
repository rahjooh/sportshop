import HorizontalSlider from './HorizontalSlider';
import type { CatalogPageCopy } from './types';

interface CatalogCategorySliderProps {
    copy: CatalogPageCopy['categorySlider'];
}

export default function CatalogCategorySlider({ copy }: CatalogCategorySliderProps): JSX.Element {
    return (
        <section className="space-y-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-widest text-primary">{copy.title}</p>
                    <h2 className="section-title mt-2 text-2xl">{copy.subtitle}</h2>
                </div>
                <a href="#" className="text-sm font-semibold text-primary transition hover:text-primary-dark">
                    {copy.cta}
                </a>
            </div>
            <HorizontalSlider ariaLabel={copy.title} itemWidthClass="min-w-[240px] sm:min-w-[280px] lg:min-w-[320px]">
                {copy.items.map((item) => (
                    <article
                        key={item.id}
                        className="card relative h-full overflow-hidden rounded-3xl bg-slate-900 text-white"
                        style={{
                            backgroundImage: `linear-gradient(135deg, rgba(10,104,71,0.9), rgba(15,118,110,0.7)), url(${item.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                    >
                        <div className="flex h-full flex-col justify-between p-6">
                            <div>
                                <span className="badge bg-white/20 text-xs">{item.tag}</span>
                                <h3 className="mt-4 text-2xl font-bold">{item.title}</h3>
                                <p className="mt-2 text-sm text-white/80">{item.description}</p>
                            </div>
                            <div className="mt-6 text-sm font-semibold text-white/80">→</div>
                        </div>
                    </article>
                ))}
            </HorizontalSlider>
        </section>
    );
}
