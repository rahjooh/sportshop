import Image from 'next/image';
import clsx from 'clsx';
import type { Dictionary } from '../lib/dictionaries';

interface CategoryGridProps {
    dictionary: Dictionary;
}

const fallbackImageSources = [
    'https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1504439904031-93ded9f93e46?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1526404428533-89bb6848f585?auto=format&fit=crop&w=900&q=80'
];

export default function CategoryGrid({ dictionary }: CategoryGridProps): JSX.Element {
    const categories = dictionary.categories;

    return (
        <section id="collections" className="mt-24 space-y-6">
            <div className="max-w-2xl">
                <h2 className="section-title">{categories.title}</h2>
                <p className="section-subtitle">{categories.subtitle}</p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
                {categories.items.map((item, index) => (
                    <article key={item.title} className="card overflow-hidden">
                        <div className="relative h-64">
                            <Image
                                src={item.image ?? fallbackImageSources[index]}
                                alt={item.imageAlt}
                                fill
                                sizes="(min-width: 768px) 33vw, 100vw"
                                className="object-cover"
                            />
                            <span
                                className={clsx('badge absolute top-4 bg-white/90 text-primary-dark shadow', {
                                    'left-4': index === 1,
                                    'right-4': index !== 1
                                })}
                            >
                {item.badge}
              </span>
                        </div>
                        <div className="space-y-3 p-6">
                            <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
                            <p className="text-sm leading-relaxed text-slate-600">{item.description}</p>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
