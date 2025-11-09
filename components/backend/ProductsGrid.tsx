import type { Locale } from '../../lib/i18n-config';
import type { Product } from '../../lib/types';

interface ProductsGridProps {
    products: Product[] | null;
    locale: Locale;
    columns: {
        name: string;
        description: string;
        price: string;
        stock: string;
    };
    emptyState: string;
}

export default function ProductsGrid({
                                         products,
                                         locale,
                                         columns,
                                         emptyState
                                     }: ProductsGridProps): JSX.Element {
    if (!products || products.length === 0) {
        return (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white/70 p-8 text-center text-sm text-slate-500">
                {emptyState}
            </div>
        );
    }

    const currency = locale === 'fa' ? 'IRR' : 'USD';
    const numberLocale = locale === 'fa' ? 'fa-IR' : 'en-US';

    return (
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow">
            <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    <tr>
                        <th className="px-6 py-3">{columns.name}</th>
                        <th className="px-6 py-3">{columns.description}</th>
                        <th className="px-6 py-3">{columns.price}</th>
                        <th className="px-6 py-3">{columns.stock}</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td className="px-6 py-4 font-semibold text-slate-900">{product.name}</td>
                            <td className="px-6 py-4 text-slate-500">
                                {product.description ?? '—'}
                            </td>
                            <td className="px-6 py-4">
                                {Intl.NumberFormat(numberLocale, {
                                    style: 'currency',
                                    currency
                                }).format(product.price)}
                            </td>
                            <td className="px-6 py-4">{product.stock}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
