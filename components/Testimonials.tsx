import type { Dictionary } from '../lib/dictionaries';

interface TestimonialsProps {
    dictionary: Dictionary;
}

export default function Testimonials({ dictionary }: TestimonialsProps): JSX.Element {
    const testimonials = dictionary.testimonials;

    return (
        <section id="apparel" className="mt-24 space-y-8">
            <div className="max-w-2xl">
                <h2 className="section-title">{testimonials.title}</h2>
                <p className="section-subtitle">{testimonials.subtitle}</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
                {testimonials.items.map((testimonial) => (
                    <blockquote key={testimonial.name} className="card space-y-4 p-6">
                        <p className="text-base leading-relaxed text-slate-600">“{testimonial.quote}”</p>
                        <footer className="text-sm font-semibold text-slate-900">
                            {testimonial.name}{' '}
                            <span className="ml-2 text-xs font-medium uppercase tracking-wide text-primary/70">
                {testimonial.role}
              </span>
                        </footer>
                    </blockquote>
                ))}
            </div>
        </section>
    );
}
