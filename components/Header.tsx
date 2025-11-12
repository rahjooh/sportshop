'use client';

import { Fragment } from 'react';
import Link from 'next/link';
import { Menu, Transition } from '@headlessui/react';
import { Bars3Icon, LanguageIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import type { Locale } from '../lib/i18n-config';
import type { Dictionary } from '../lib/dictionaries';

interface HeaderProps {
    locale: Locale;
    dictionary: Dictionary;
}

const navLinks = ['collections', 'gear', 'apparel', 'nutrition', 'about'] as const;

export default function Header({ locale, dictionary }: HeaderProps): JSX.Element {
    const t = dictionary.navigation;
    const languageLabels = dictionary.languageSwitcher;
    const authCopy = dictionary.auth;
    const backendCopy = dictionary.backend;
    // const isRTL = locale === 'fa';

    const switcher = (
        <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
            <LanguageIcon className="h-5 w-5 text-primary" aria-hidden="true" />
            <span>{languageLabels.label}</span>
            <div className="flex items-center gap-1 rounded-full bg-slate-100 p-1">
                <Link
                    href="/fa"
                    aria-label={languageLabels.fa}
                    className={clsx('rounded-full px-3 py-1 transition-colors', {
                        'bg-white text-primary-dark shadow': locale === 'fa'
                    })}
                >
                    <span aria-hidden="true" className="text-lg">🇮🇷</span>
                </Link>
                <Link
                    href="/en"
                    aria-label={languageLabels.en}
                    className={clsx('rounded-full px-3 py-1 transition-colors', {
                        'bg-white text-primary-dark shadow': locale === 'en'
                    })}
                >
                    <span aria-hidden="true" className="text-lg">🇺🇸</span>
                </Link>
            </div>
        </div>
    );

    return (
        <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--color-border)] bg-white/90 backdrop-blur">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8 lg:px-12">
                <Link href={`/${locale}`} className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-lg font-semibold text-white shadow-lg">
            Pitok
          </span>
                    <div className="leading-tight">
                        {/* <span className="block text-lg font-bold text-primary-dark">Pitok</span> */}
                        {/* <span className="block text-xs text-slate-500">Elite Sports Marketplace</span> */}
                    </div>
                </Link>
                <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-600 lg:flex">
                    {navLinks.map((linkKey) => (
                        <Link key={linkKey} href={`/${locale}#${linkKey}`} className="transition-colors hover:text-primary-dark">
                            {t[linkKey]}
                        </Link>
                    ))}
                    <Link href={`/${locale}/products`} className="transition-colors hover:text-primary-dark">
                        {t.catalog}
                    </Link>
                    <Link
                        href={`/${locale}/backend`}
                        className="rounded-full border border-primary/40 px-4 py-1.5 text-primary transition hover:bg-primary/10"
                    >
                        {backendCopy.nav.cta}
                    </Link>
                </nav>
                <div className="hidden items-center gap-3 lg:flex">
                    <Link
                        href={`/${locale}/auth/login`}
                        className="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 transition hover:text-primary-dark"
                    >
                        {authCopy.links.login}
                    </Link>
                    <Link
                        href={`/${locale}/auth/register`}
                        className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5"
                    >
                        {authCopy.links.register}
                    </Link>
                </div>
                <div className="hidden lg:block">{switcher}</div>
                <div className="lg:hidden">
                    <Menu as="div" className="relative inline-block text-left">
                        <Menu.Button className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 shadow-sm">
                            <Bars3Icon className="h-5 w-5" aria-hidden="true" />
                        </Menu.Button>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items
                                className={clsx(
                                    'absolute mt-2 w-64 divide-y divide-slate-100 overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-black/5 focus:outline-none',
                                    locale === 'fa' ? 'left-0 origin-top-left' : 'right-0 origin-top-right'
                                )}
                            >
                                <div className="px-4 py-4">
                                    <div className="mb-4 border-b border-dashed border-slate-200 pb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                                        پیتوک
                                    </div>
                                    <div className="space-y-3">
                                        {navLinks.map((linkKey) => (
                                            <Menu.Item key={linkKey}>
                                                {({ active }) => (
                                                    <Link
                                                        href={`/${locale}#${linkKey}`}
                                                        className={clsx('block rounded-xl px-3 py-2 text-sm font-medium', {
                                                            'bg-primary/10 text-primary-dark': active
                                                        })}
                                                    >
                                                        {t[linkKey]}
                                                    </Link>
                                                )}
                                            </Menu.Item>
                                        ))}
                                        <Menu.Item>
                                            {({ active }) => (
                                                <Link
                                                    href={`/${locale}/products`}
                                                    className={clsx('block rounded-xl px-3 py-2 text-sm font-medium', {
                                                        'bg-primary/10 text-primary-dark': active
                                                    })}
                                                >
                                                    {t.catalog}
                                                </Link>
                                            )}
                                        </Menu.Item>
                                    </div>
                                    <div className="mt-6 grid gap-3">
                                        <Menu.Item>
                                            {({ active }) => (
                                                <Link
                                                    href={`/${locale}/auth/login`}
                                                    className={clsx(
                                                        'block rounded-xl border border-slate-200 px-3 py-2 text-center text-sm font-semibold',
                                                        {
                                                            'bg-slate-50 text-primary-dark': active,
                                                            'text-slate-600': !active
                                                        }
                                                    )}
                                                >
                                                    {authCopy.links.login}
                                                </Link>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <Link
                                                    href={`/${locale}/auth/register`}
                                                    className={clsx(
                                                        'block rounded-xl px-3 py-2 text-center text-sm font-semibold text-white shadow',
                                                        {
                                                            'bg-primary-dark': active,
                                                            'bg-primary': !active
                                                        }
                                                    )}
                                                >
                                                    {authCopy.links.register}
                                                </Link>
                                            )}
                                        </Menu.Item>
                                    </div>
                                    <div className="mt-6">
                                        <Menu.Item>
                                            {({ active }) => (
                                                <Link
                                                    href={`/${locale}/backend`}
                                                    className={clsx(
                                                        'block rounded-xl border border-primary/30 px-3 py-2 text-center text-sm font-semibold',
                                                        active ? 'bg-primary/10 text-primary-dark' : 'text-primary'
                                                    )}
                                                >
                                                    {backendCopy.nav.cta}
                                                </Link>
                                            )}
                                        </Menu.Item>
                                    </div>
                                </div>
                                <div className="px-4 py-3">{switcher}</div>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                </div>
            </div>
        </header>
    );
}
