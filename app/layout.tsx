import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import './globals.css';
import {AppProviders} from './_context/AppProviders';
import StoreNavigation from './_components/StoreNavigation';

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
        <html lang='en' className='h-full bg-white'>
            <body className={`${inter.className} flex flex-col min-h-screen bg-white`}>
                <AppProviders>
                    <StoreNavigation />
                    <main>{children}</main>
                </AppProviders>
            </body>
        </html>
    );
}
