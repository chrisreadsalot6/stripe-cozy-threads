import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import './globals.css';
import {AppProviders} from './context/AppProviders';
import StoreNavigation from './components/StoreNavigation';

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
    title: 'Cozy Threads',
    description: 'High-quality, ethically-sourced apparel and accessories',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body className={inter.className}>
                <AppProviders>
                    <StoreNavigation />
                    <main className='pt-[calc(4rem+2.5rem)]'>{children}</main>
                </AppProviders>
            </body>
        </html>
    );
}
