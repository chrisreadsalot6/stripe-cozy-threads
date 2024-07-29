'use client';

import {useState} from 'react';
import {RadioGroup} from '@headlessui/react';
import {useShoppingCart} from '../context/ShoppingCartContext';
import {products, Product} from '../data/products';

// Utility function for conditional class names
function classNames(...classes: (string | boolean | undefined)[]): string {
    return classes.filter(Boolean).join(' ');
}

export default function ProductList() {
    const [selectedColor, setSelectedColor] = useState('Black');
    const [showSizes, setShowSizes] = useState(false);
    const {addToCart, setOpen} = useShoppingCart();

    const handleQuickAdd = () => {
        setShowSizes(true);
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
            color: selectedColor,
        });
        setShowSizes(false);
        setOpen(true);
    };

    // Filter products by category
    const apparelProducts = products.filter(product => product.category === 'Apparel');
    const accessoryProducts = products.filter(product => product.category === 'Accessories');

    const renderProductGrid = (productList: Product[]) => (
        <div className='mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
            {productList.map(product => (
                <div key={product.id} className='group relative'>
                    {/* Product image */}
                    <div className='aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80 duration-300'>
                        <img
                            alt={product.imageAlt}
                            src={product.imageSrc}
                            className='h-full w-full object-cover object-center lg:h-full lg:w-full'
                        />
                    </div>

                    {/* Quick add overlay */}
                    <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                        {showSizes ? (
                            // Size selection
                            <div className='bg-white p-4 rounded-md shadow-lg'>
                                <RadioGroup>
                                    <div className='grid grid-cols-3 gap-2'>
                                        {product.sizes.map(size => (
                                            <RadioGroup.Option
                                                key={size}
                                                value={size}
                                                className={({active, checked}) =>
                                                    classNames(
                                                        'relative flex cursor-pointer items-center justify-center rounded-md p-3 focus:outline-none z-10 shadow-lg duration-200',
                                                        active && checked ? 'ring-2 ring-indigo-500 ring-offset-2' : '',
                                                        !active && checked ? 'ring-2 ring-indigo-500' : '',
                                                        !checked
                                                            ? 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                                                            : 'bg-indigo-600 text-white'
                                                    )
                                                }
                                                onClick={() => handleSizeSelect(size, product)}>
                                                <span className='text-md font-medium uppercase'>{size}</span>
                                            </RadioGroup.Option>
                                        ))}
                                    </div>
                                </RadioGroup>
                            </div>
                        ) : (
                            // Quick add button
                            <button
                                className='bg-white hover:bg-indigo-500 text-gray-900 hover:text-white px-4 py-2 rounded-md font-medium shadow-md hover:shadow-lg transition-colors duration-200 z-10'
                                onClick={() => handleQuickAdd()}>
                                Quick Add
                            </button>
                        )}
                    </div>

                    {/* Product details */}
                    <div className='mt-4 flex justify-between'>
                        <div>
                            {/* Product name */}
                            <h3 className='text-sm text-gray-700'>
                                <span aria-hidden='true' className='absolute inset-0' />
                                {product.name}
                            </h3>
                            {/* Color selection */}
                            <RadioGroup
                                value={selectedColor}
                                onChange={setSelectedColor}
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
                        </div>

                        {/* Product price */}
                        <p className='text-sm font-medium text-gray-900'>{product.price}</p>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className='bg-white'>
            <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
                {/* Apparel section */}
                <h2 id='apparel' className='text-2xl font-bold tracking-tight text-gray-900 mb-8'>
                    Apparel
                </h2>
                {renderProductGrid(apparelProducts)}

                {/* Accessories section */}
                <h2 id='accessories' className='text-2xl font-bold tracking-tight text-gray-900 mt-16 mb-8'>
                    Accessories
                </h2>
                {renderProductGrid(accessoryProducts)}
            </div>
        </div>
    );
}
