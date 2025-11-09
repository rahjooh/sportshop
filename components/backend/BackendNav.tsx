'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

export interface BackendNavItem {
    href: string;
    label: string;
}

interface BackendNavProps {
    items: BackendNavItem[];
    description: string;
}

export default function BackendNav({ items, description }: BackendNavProps): JSX.Element {
    const pathname = usePathname();

    return (
        <nav aria-label={description} className="overflow-x-auto">
            <ul className="flex min-w-full gap-3 rounded-3xl border border-slate-200 bg-white/90 p-2 shadow-inner">
                {items.map((item) => {
                    const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));

                    return (
                        <li key={item.href} className="flex-1">
                            <Link
                                href={item.href}
                                className={clsx(
                                    'block rounded-2xl px-4 py-3 text-center text-sm font-semibold transition',
                                    isActive
                                        ? 'bg-primary text-white shadow'
                                        : 'text-slate-600 hover:bg-primary/10 hover:text-primary-dark'
                                )}
                            >
                                {item.label}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
