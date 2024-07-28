'use client'

import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import { useShoppingCart } from '../context/ShoppingCartContext';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const products = [
  {
    id: 1,
    name: 'Basic Tee',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    colors: [
        { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
        { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
        { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
        { name: 'Sage Green', class: 'bg-green-200', selectedClass: 'ring-green-400' },
        { name: 'Terracotta', class: 'bg-orange-300', selectedClass: 'ring-orange-500' },
        { name: 'Ocean Blue', class: 'bg-blue-400', selectedClass: 'ring-blue-600' },
        { name: 'Natural Beige', class: 'bg-yellow-100', selectedClass: 'ring-yellow-300' },
    ],
    sizes: ['S', 'M', 'L'],
  },
  // More products...
]

export default function ProductList() {
    const [selectedColor, setSelectedColor] = useState('Black')
    const [showSizes, setShowSizes] = useState(false)
    const { addToCart, setOpen } = useShoppingCart();

    const handleQuickAdd = () => {
        setShowSizes(true)
    }

    const handleSizeSelect = (size: string, product: any) => {
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            size: size,
            imageSrc: product.imageSrc,
            imageAlt: product.imageAlt,
            description: product.description,
            color: product.color,
        });
        setShowSizes(false)
        setOpen(true)
    }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Apparel & Accessories</h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80 duration-300">
                <img
                  alt={product.imageAlt}
                  src={product.imageSrc}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {showSizes ? (
                    <div className="bg-white p-4 rounded-md shadow-lg">
                        <RadioGroup>
                            <div className="grid grid-cols-3 gap-2">
                                {product.sizes.map((size) => (
                                    <RadioGroup.Option
                                        key={size}
                                        value={size}
                                        className={({ active, checked }) =>
                                                        classNames(
                                                            'relative flex cursor-pointer items-center justify-center rounded-md p-3 focus:outline-none z-10 shadow-lg duration-200',
                                                            active && checked ? 'ring-2 ring-indigo-500 ring-offset-2' : '',
                                                            !active && checked ? 'ring-2 ring-indigo-500' : '',
                                                            !checked ? 'bg-gray-100 text-gray-900 hover:bg-gray-200' : 'bg-indigo-600 text-white'
                                                        )
                                                    }
                                        onClick={() => handleSizeSelect(size, product)}
                                    >
                                    <span className="text-md font-medium uppercase">
                                            {size}
                                        </span>
                                    </RadioGroup.Option>
                                ))}
                            </div>
                        </RadioGroup>
                    </div>
                    ) :
                    (
                    <button
                        className="bg-white hover:bg-indigo-500 text-gray-900 hover:text-white px-4 py-2 rounded-md font-medium shadow-md hover:shadow-lg transition-colors duration-200 z-10" // focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 
                        onClick={() => handleQuickAdd()}
                    >
                        Quick Add
                    </button>)
                }
                </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={product.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </a>
                  </h3>
                  <RadioGroup
                    value={selectedColor}
                    onChange={setSelectedColor}
                    className="mt-2 flex items-center space-x-2"
                    >
                    {product.colors.map((color) => (
                        <RadioGroup.Option
                            key={color.name}
                            value={color.name}
                            className={({ active, checked }) =>
                            classNames(
                                color.selectedClass,
                                active && checked ? 'ring ring-offset-1' : '',
                                !active && checked ? 'ring-2' : '',
                                'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none'
                            )
                            }
                        >
                            <span
                            aria-hidden="true"
                            className={classNames(
                                color.class,
                                'h-5 w-5 rounded-full border border-black border-opacity-10'
                            )}
                            />
                        </RadioGroup.Option>
                    ))}
                  </RadioGroup>
                </div>
                <p className="text-sm font-medium text-gray-900">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

               {/* <form> */}
                      {/* Colors */}
                      {/* <fieldset aria-label="Choose a color">
                        <legend className="text-sm font-medium text-gray-900">Color</legend>

                        <RadioGroup
                          value={selectedColor}
                          onChange={setSelectedColor}
                          className="mt-4 flex items-center space-x-3"
                        >
                          {product.colors.map((color) => (
                            <Radio
                              key={color.name}
                              value={color.name}
                              aria-label={color.name}
                              className={classNames(
                                color.selectedClass,
                                'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none data-[checked]:ring-2 data-[focus]:data-[checked]:ring data-[focus]:data-[checked]:ring-offset-1',
                              )}
                            >
                              <span
                                aria-hidden="true"
                                className={classNames(
                                  color.class,
                                  'h-8 w-8 rounded-full border border-black border-opacity-10',
                                )}
                              />
                            </Radio>
                          ))}
                        </RadioGroup>
                      </fieldset> */}

                      {/* Sizes */}
                      {/* <fieldset aria-label="Choose a size" className="mt-10">
                        <RadioGroup
                          value={selectedSize}
                          onChange={setSelectedSize}
                          className="mt-4 grid grid-cols-4 gap-4"
                        >
                          {product.sizes.map((size) => (
                            <Radio
                              key={size}
                              value={size}
                              className={'cursor-pointer bg-white text-gray-900 shadow-sm group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none data-[focus]:ring-2 data-[focus]:ring-indigo-500 sm:flex-1'}
                            >
                              <span>{size}</span>
                              {(
                                <span
                                  aria-hidden="true"
                                  className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                >
                                  <svg
                                    stroke="currentColor"
                                    viewBox="0 0 100 100"
                                    preserveAspectRatio="none"
                                    className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                  >
                                    <line x1={0} x2={100} y1={100} y2={0} vectorEffect="non-scaling-stroke" />
                                  </svg>
                                </span>
                              )}
                            </Radio>
                          ))}
                        </RadioGroup>
                      </fieldset> */}

                      {/* <button
                        type="submit"
                        className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Add to bag
                      </button> */}
                    {/* </form> */}