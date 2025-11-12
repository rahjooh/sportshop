'use client';

import { Children, isValidElement, type ReactNode, useId, useRef } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { logClientEvent } from '../../lib/logger';

interface HorizontalSliderProps {
    ariaLabel: string;
    children: ReactNode;
    itemWidthClass?: string;
    className?: string;
}

/**
 * Scrollable rail with accessible controls. Falls back to native scrolling on touch devices.
 */
export default function HorizontalSlider({
                                             ariaLabel,
                                             children,
                                             itemWidthClass = 'min-w-[260px] md:min-w-[320px]',
                                             className
                                         }: HorizontalSliderProps): JSX.Element {
    const sliderId = useId();
    const viewportRef = useRef<HTMLDivElement>(null);
    const slides = Children.toArray(children);

    const scroll = (direction: 'previous' | 'next'): void => {
        const viewport = viewportRef.current;
        if (!viewport) {
            return;
        }
        const offset = direction === 'next' ? viewport.clientWidth : -viewport.clientWidth;
        viewport.scrollBy({ left: offset, behavior: 'smooth' });
        logClientEvent({ name: 'catalog.slider', context: ariaLabel, payload: { direction } });
    };

    return (
        <div className={clsx('relative', className)}>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent" />
            <div ref={viewportRef} id={sliderId} className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4" aria-label={ariaLabel} role="list">
                {slides.map((child, index) => {
                    const key = isValidElement(child) && child.key !== null ? child.key : index;
                    return (
                        <div key={key ?? index} role="listitem" className={clsx('snap-start', itemWidthClass)} aria-roledescription="slide">
                            {child}
                        </div>
                    );
                })}
            </div>
            <div className="absolute -bottom-2 right-4 flex gap-2">
                <button
                    type="button"
                    onClick={() => scroll('previous')}
                    className="rounded-full border border-slate-200 bg-white p-2 text-slate-500 shadow-sm transition hover:-translate-y-0.5 hover:text-primary"
                    aria-controls={sliderId}
                    aria-label="Scroll previous"
                >
                    <ChevronLeftIcon className="h-5 w-5" />
                </button>
                <button
                    type="button"
                    onClick={() => scroll('next')}
                    className="rounded-full border border-slate-200 bg-white p-2 text-slate-500 shadow-sm transition hover:-translate-y-0.5 hover:text-primary"
                    aria-controls={sliderId}
                    aria-label="Scroll next"
                >
                    <ChevronRightIcon className="h-5 w-5" />
                </button>
            </div>
        </div>
    );
}
