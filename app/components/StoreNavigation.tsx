'use client';

import {Fragment, useState, useRef, useEffect} from 'react';
import {usePathname} from 'next/navigation';
import {Dialog, Popover, Tab, Transition} from '@headlessui/react';
import Link from 'next/link';
import {Bars3Icon, ShoppingBagIcon, XMarkIcon} from '@heroicons/react/24/outline';
import {useShoppingCart} from '../context/ShoppingCartContext';
import {navigation} from '../data/navigation';

export default function StoreNavigation() {
    // State management for UI elements
    const [showPromo, setShowPromo] = useState(true);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [openPopover, setOpenPopover] = useState<string | null>(null);

    // Shopping cart context and routing hooks
    const {setOpen, cartItems} = useShoppingCart();
    const pathname = usePathname();

    // Ref for handling clicks outside navigation
    const navRef = useRef<HTMLDivElement>(null);

    // Event handlers for navigation interactions
    const handleNavClick = () => {
        setMobileMenuOpen(false);
        setOpenPopover(null);
    };
    const handleCategoryClick = (categoryName: string) => (event: React.MouseEvent) => {
        event.preventDefault();
        setOpenPopover(openPopover === categoryName ? null : categoryName);
    };

    // Effect for closing popover when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (navRef.current && !navRef.current.contains(event.target as Node)) {
                setOpenPopover(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const cartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

    const isCheckoutPage = pathname === '/checkout';

    if (isCheckoutPage) {
        return (
            <header className='relative bg-white'>
                <nav aria-label='Top' className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                    <div className='border-b border-gray-200'>
                        <div className='flex h-16 items-center'>
                            {/* Logo */}
                            <div className='ml-4 flex lg:ml-0'>
                                <a href='/' className='flex items-center'>
                                    <span className='sr-only'>Cozy Threads</span>
                                    <img
                                        className='h-8 w-auto mr-2'
                                        src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
                                        alt=''
                                    />
                                    <span className='text-lg font-semibold text-gray-900'>Cozy Threads</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        );
    }

    return (
        <div
            className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${
                showPromo ? 'h-[calc(4rem+2.5rem)]' : 'h-16'
            }`}
            ref={navRef}>
            {/* Mobile menu */}
            <Transition.Root show={mobileMenuOpen} as={Fragment}>
                <Dialog as='div' className='relative z-40 lg:hidden' onClose={setMobileMenuOpen}>
                    {/* Backdrop */}
                    <Transition.Child
                        as={Fragment}
                        enter='transition-opacity ease-linear duration-300'
                        enterFrom='opacity-0'
                        enterTo='opacity-100'
                        leave='transition-opacity ease-linear duration-300'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'>
                        <div className='fixed inset-0 bg-black bg-opacity-25' />
                    </Transition.Child>

                    {/* Mobile menu panel */}
                    <div className='fixed inset-0 z-40 flex'>
                        <Transition.Child
                            as={Fragment}
                            enter='transition ease-in-out duration-300 transform'
                            enterFrom='-translate-x-full'
                            enterTo='translate-x-0'
                            leave='transition ease-in-out duration-300 transform'
                            leaveFrom='translate-x-0'
                            leaveTo='-translate-x-full'>
                            <Dialog.Panel className='relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl'>
                                {/* Close button */}
                                <div className='flex px-4 pb-2 pt-5'>
                                    <button
                                        type='button'
                                        className='relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400'
                                        onClick={() => setMobileMenuOpen(false)}>
                                        <span className='absolute -inset-0.5' />
                                        <span className='sr-only'>Close menu</span>
                                        <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                                    </button>
                                </div>

                                {/* Mobile navigation links */}
                                <Tab.Group as='div' className='mt-2'>
                                    <div className='border-b border-gray-200'>
                                        <Tab.List className='-mb-px flex space-x-8 px-4'>
                                            {navigation.categories.map(category => (
                                                <Tab
                                                    key={category.name}
                                                    className={({selected}) =>
                                                        `flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium ${
                                                            selected
                                                                ? 'border-indigo-600 text-indigo-600'
                                                                : 'border-transparent text-gray-900'
                                                        }`
                                                    }>
                                                    {category.name}
                                                </Tab>
                                            ))}
                                        </Tab.List>
                                    </div>
                                    <Tab.Panels as={Fragment}>
                                        {navigation.categories.map(category => (
                                            <Tab.Panel key={category.name} className='space-y-10 px-4 pb-8 pt-10'>
                                                <div className='grid grid-cols-2 gap-x-4'>
                                                    {category.featured.map(item => (
                                                        <div key={item.name} className='group relative text-sm'>
                                                            <div className='aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75'>
                                                                <img
                                                                    src={item.imageSrc}
                                                                    alt={item.imageAlt}
                                                                    className='object-cover object-center'
                                                                />
                                                            </div>
                                                            <a
                                                                href={item.href}
                                                                className='mt-6 block font-medium text-gray-900'>
                                                                <span
                                                                    className='absolute inset-0 z-10'
                                                                    aria-hidden='true'
                                                                />
                                                                {item.name}
                                                            </a>
                                                            <p aria-hidden='true' className='mt-1'>
                                                                Shop now
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>
                                                {category.sections.map(section => (
                                                    <div key={section.name}>
                                                        <p
                                                            id={`${category.id}-${section.id}-heading-mobile`}
                                                            className='font-medium text-gray-900'>
                                                            {section.name}
                                                        </p>
                                                        <ul
                                                            role='list'
                                                            aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                                                            className='mt-6 flex flex-col space-y-6'>
                                                            {section.items.map(item => (
                                                                <li key={item.name} className='flow-root'>
                                                                    <Link
                                                                        href={item.href}
                                                                        className='-m-2 block p-2 text-gray-500'
                                                                        onClick={handleNavClick}>
                                                                        {category.name}
                                                                    </Link>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ))}
                                            </Tab.Panel>
                                        ))}
                                    </Tab.Panels>
                                </Tab.Group>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

            {/* Promotional banner */}
            {showPromo && (
                <div className='h-10 bg-indigo-600 px-4 sm:px-6 lg:px-8'>
                    <p className='flex h-full items-center justify-center text-sm font-medium text-white'>
                        Get free delivery on orders over $100
                        <button onClick={() => setShowPromo(false)} className='ml-2 text-white hover:text-gray-200'>
                            <span className='sr-only'>Close</span>
                            <XMarkIcon className='h-5 w-5' aria-hidden='true' />
                        </button>
                    </p>
                </div>
            )}

            {/* Main navigation header */}
            <header className='relative bg-white'>
                <nav aria-label='Top' className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                    <div className='border-b border-gray-200'>
                        <div className='flex h-16 items-center'>
                            {/* Mobile menu button */}
                            <button
                                type='button'
                                className='relative rounded-md bg-white p-2 text-gray-400 lg:hidden'
                                onClick={() => setMobileMenuOpen(true)}>
                                <span className='absolute -inset-0.5' />
                                <span className='sr-only'>Open menu</span>
                                <Bars3Icon className='h-6 w-6' aria-hidden='true' />
                            </button>

                            {/* Logo */}
                            <div className='ml-4 flex lg:ml-0'>
                                <a href='/' className='flex items-center'>
                                    <span className='sr-only'>Cozy Threads</span>
                                    <img
                                        className='h-8 w-auto mr-2'
                                        src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
                                        alt=''
                                    />
                                    <span className='text-lg font-semibold text-gray-900'>Cozy Threads</span>
                                </a>
                            </div>

                            {/* Flyout/Desktop menus */}
                            <Popover.Group className='hidden lg:ml-8 lg:block lg:self-stretch'>
                                <div className='flex h-full space-x-8'>
                                    {navigation.categories.map(category => (
                                        <Popover key={category.name} className='flex'>
                                            {({open}) => (
                                                <>
                                                    {/* Category button */}
                                                    <div className='relative flex'>
                                                        <Popover.Button
                                                            className={`
                                relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out
                                ${
                                    open
                                        ? 'border-indigo-600 text-indigo-600'
                                        : 'border-transparent text-gray-700 hover:text-gray-800'
                                }
                              `}
                                                            onClick={handleCategoryClick(category.name)}>
                                                            {category.name}
                                                        </Popover.Button>
                                                    </div>

                                                    {/* Category dropdown */}
                                                    <Transition
                                                        show={openPopover === category.name}
                                                        as={Fragment}
                                                        enter='transition ease-out duration-200'
                                                        enterFrom='opacity-0'
                                                        enterTo='opacity-100'
                                                        leave='transition ease-in duration-150'
                                                        leaveFrom='opacity-100'
                                                        leaveTo='opacity-0'>
                                                        <Popover.Panel className='absolute inset-x-0 top-full z-10 text-sm text-gray-500'>
                                                            {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                                                            <div
                                                                className='absolute inset-0 top-1/2 bg-white shadow'
                                                                aria-hidden='true'
                                                            />

                                                            <div className='relative bg-white'>
                                                                <div className='mx-auto max-w-7xl px-8'>
                                                                    <div className='grid grid-cols-2 gap-x-8 gap-y-10 py-16'>
                                                                        <div className='col-start-2 grid grid-cols-2 gap-x-8'>
                                                                            {category.featured.map(item => (
                                                                                <div
                                                                                    key={item.name}
                                                                                    className='group relative text-base sm:text-sm'>
                                                                                    <div className='aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75'>
                                                                                        <img
                                                                                            src={item.imageSrc}
                                                                                            alt={item.imageAlt}
                                                                                            className='object-cover object-center'
                                                                                        />
                                                                                    </div>
                                                                                    <a
                                                                                        href={item.href}
                                                                                        className='mt-6 block font-medium text-gray-900'>
                                                                                        <span
                                                                                            className='absolute inset-0 z-10'
                                                                                            aria-hidden='true'
                                                                                        />
                                                                                        {item.name}
                                                                                    </a>
                                                                                    <p
                                                                                        aria-hidden='true'
                                                                                        className='mt-1'>
                                                                                        Shop now
                                                                                    </p>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                        <div className='row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm'>
                                                                            {category.sections.map(section => (
                                                                                <div key={section.name}>
                                                                                    <p
                                                                                        id={`${section.name}-heading`}
                                                                                        className='font-medium text-gray-900'>
                                                                                        {section.name}
                                                                                    </p>
                                                                                    <ul
                                                                                        role='list'
                                                                                        aria-labelledby={`${section.name}-heading`}
                                                                                        className='mt-6 space-y-6 sm:mt-4 sm:space-y-4'>
                                                                                        {section.items.map(item => (
                                                                                            <li
                                                                                                key={item.name}
                                                                                                className='flex'>
                                                                                                <Link
                                                                                                    href={item.href}
                                                                                                    className='hover:text-gray-800'
                                                                                                    onClick={
                                                                                                        handleNavClick
                                                                                                    }>
                                                                                                    {item.name}
                                                                                                </Link>
                                                                                            </li>
                                                                                        ))}
                                                                                    </ul>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Popover.Panel>
                                                    </Transition>
                                                </>
                                            )}
                                        </Popover>
                                    ))}
                                </div>
                            </Popover.Group>

                            {/* Right side items */}
                            <div className='ml-auto flex items-center'>
                                {/* Cart */}
                                <div className='ml-4 flow-root lg:ml-6'>
                                    <a
                                        href='#'
                                        className='group -m-2 flex items-center p-2'
                                        onClick={() => setOpen(true)}>
                                        <ShoppingBagIcon
                                            className='h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500'
                                            aria-hidden='true'
                                        />
                                        <span className='ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800'>
                                            {cartQuantity}
                                        </span>
                                        <span className='sr-only'>items in cart, view bag</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    );
}
