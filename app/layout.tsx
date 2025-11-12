import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'پیتوک | فروشگاه ورزشی آنلاین',
    description:
        'Pirok is a bilingual sports marketplace tailored for Iranian athletes. Discover premium gear, apparel, and accessories backed by a Go Gin API.',
    metadataBase: new URL('https://example.com')
};

export default function RootLayout({
                                       children
                                   }: {
    children: React.ReactNode;
}): JSX.Element {
    return (
        <html lang="fa" suppressHydrationWarning>
            <body className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">{children}</body>
        </html>
    );
}