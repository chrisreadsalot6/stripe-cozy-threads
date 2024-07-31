'use client';

import {useState} from 'react';
import {RadioGroup} from '@headlessui/react';
import {useShoppingCart} from '../_context/ShoppingCartContext';
import {products, Product} from '../_data/products';
import Image from 'next/image';

// Utility function for conditional class names
function classNames(...classes: (string | boolean | undefined)[]): string {
    return classes.filter(Boolean).join(' ');
}

export default function ProductCatalogue() {
    // State for color and size selections
    const [selectedColors, setSelectedColors] = useState<{[key: number]: string}>({});
    const [showSizes, setShowSizes] = useState<{[key: number]: boolean}>({});

    // Shopping cart context hooks
    const {addToCart, setOpen} = useShoppingCart();

    const handleQuickAdd = (productId: number) => {
        setShowSizes(prev => ({...prev, [productId]: true}));
    };

    const handleSizeSelect = (size: string, product: any) => {
        addToCart({
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            quantity: 1,
            size: size,
            imageSrc: product.imageSrc,
            imageAlt: product.imageAlt,
            color: selectedColors[product.id] || product.colors[0].name,
        });
        setShowSizes(prev => ({...prev, [product.id]: false}));
        setOpen(true);
    };

    const renderSectionTitle = (title: string) => (
        // Id is lowercase title to enable navigation links
        <div id={title.toLowerCase()} className='relative py-4 mb-12 scroll-mt-28'>
            <h2 className='text-3xl font-extrabold tracking-tight text-gray-900 mb-0 inline-block'>{title}</h2>
            <div className='absolute bottom-0 left-0 w-1/4 h-1 bg-indigo-600'></div>
        </div>
    );

    const renderSizeOptions = (product: Product) => (
        <RadioGroup>
            <div className='grid grid-cols-3 gap-2'>
                {product.sizes.map(size => (
                    <RadioGroup.Option
                        key={size}
                        value={size}
                        className={({active, checked}) =>
                            classNames(
                                'relative flex cursor-pointer items-center justify-center rounded-md p-3 focus:outline-none shadow-lg duration-200',
                                active && checked ? 'ring-2 ring-indigo-500 ring-offset-2' : '',
                                !active && checked ? 'ring-2 ring-indigo-500' : '',
                                !checked
                                    ? 'bg-gray-100 text-gray-900 hover:bg-indigo-500 hover:text-white'
                                    : 'bg-indigo-600 text-white'
                            )
                        }
                        onClick={() => handleSizeSelect(size, product)}>
                        <span className='text-md font-medium uppercase'>{size}</span>
                    </RadioGroup.Option>
                ))}
            </div>
        </RadioGroup>
    );

    const renderColorOptions = (product: Product) => (
        <RadioGroup
            value={selectedColors[product.id] || product.colors[0].name}
            onChange={color => setSelectedColors(prev => ({...prev, [product.id]: color}))}
            className='mt-2 flex items-center space-x-2'>
            {product.colors.map(color => (
                <RadioGroup.Option
                    key={color.name}
                    value={color.name}
                    className={({active, checked}) =>
                        classNames(
                            color.selectedClass,
                            active && checked ? 'ring ring-offset-1' : '',
                            !active && checked ? 'ring-2' : '',
                            'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none'
                        )
                    }>
                    <span
                        aria-hidden='true'
                        className={classNames(
                            color.class,
                            'h-5 w-5 rounded-full border border-black border-opacity-10'
                        )}
                    />
                </RadioGroup.Option>
            ))}
        </RadioGroup>
    );

    // 1. On hover of a product, show quick add button.
    // 2. On quick add click, show size selection.
    // 3. On size selection click, add product to cart. Cart will also show.
    const quickAddOverlay = (product: Product) => {
        return (
            <div className='absolute inset-0 flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                {!showSizes[product.id] ? (
                    // Quick add button
                    <button
                        className='bg-white text-gray-900 hover:bg-indigo-500 hover:text-white hover:shadow-lg px-4 py-2 rounded-md font-medium shadow-md transition-colors duration-200 cursor-pointer'
                        onClick={() => handleQuickAdd(product.id)}>
                        Quick Add
                    </button>
                ) : (
                    // Size selection
                    <div className='bg-white p-4 rounded-md shadow-lg'>{renderSizeOptions(product)}</div>
                )}
            </div>
        );
    };

    // Renders product name, description, color options, and price
    const productDetails = (product: Product) => {
        return (
            <div className='mt-4 flex justify-between'>
                <div>
                    <h3 className='text-sm text-gray-700'>
                        <span aria-hidden='true' className='absolute inset-0' />
                        {product.name}
                    </h3>
                    <p className='mt-1 text-sm text-gray-500 line-clamp-2'>{product.description}</p>
                    {renderColorOptions(product)}
                </div>
                <p className='text-sm font-medium text-gray-900'>{product.price}</p>
            </div>
        );
    };

    // For a store section: like apparel or accessories
    const renderProductGrid = (productList: Product[]) => (
        <div className='mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
            {productList.map(product => (
                <div className='group relative' key={product.id}>
                    {/* Product image with quick add overlay */}
                    <div className='w-full overflow-hidden rounded-md bg-gray-200 aspect-w-1 aspect-h-1'>
                        <Image
                            alt={product.imageAlt}
                            src={product.imageSrc}
                            fill
                            className='object-cover object-center group-hover:opacity-75 transition-opacity duration-300'
                            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw'
                        />
                        {quickAddOverlay(product)}
                    </div>
                    {productDetails(product)}
                </div>
            ))}
        </div>
    );

    // Filter products by category
    const apparelProducts = products.filter(product => product.category === 'Apparel');
    const accessoryProducts = products.filter(product => product.category === 'Accessories');

    return (
        <div className='bg-white'>
            <div className='mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8'>
                {/* Apparel Section */}
                {renderSectionTitle(apparelProducts[0].category)}
                {renderProductGrid(apparelProducts)}
                {/* Accessories Section */}
                <div className='my-12'>
                    {renderSectionTitle(accessoryProducts[0].category)}
                    {renderProductGrid(accessoryProducts)}
                </div>
            </div>
        </div>
    );
}
