'use client';

import ProductCatalogue from './_components/ProductCatalogue';
import ShoppingCart from './_components/ShoppingCart';
import WelcomeImage from './_components/WelcomeImage';

export default function Home() {
    return (
        <>
            <div className='flex-grow pt-8 sm:pt-12'>
                <WelcomeImage />
                <ProductCatalogue />
            </div>
            <ShoppingCart />
        </>
    );
}
