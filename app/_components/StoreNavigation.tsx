'use client';

import {Fragment, useState, useRef, useEffect} from 'react';
import {usePathname, useRouter} from 'next/navigation';
import {Dialog, Popover, Tab, Transition} from '@headlessui/react';
import {useMediaQuery} from 'react-responsive';
import Link from 'next/link';
import Image from 'next/image';
import {Bars3Icon, ShoppingBagIcon, XMarkIcon} from '@heroicons/react/24/outline';
import {useShoppingCart} from '../_context/ShoppingCartContext';
import {navigation} from '../_data/navigation';

export default function StoreNavigation() {
    const router = useRouter();

    // Magic strings
    const PRODUCT_PATH = '/';
    const MOBILE_BREAKPOINT = 767;

    // State management
    const [showPromo, setShowPromo] = useState(true);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [openPopover, setOpenPopover] = useState<string | null>(null);

    // Hooks: shopping cart, routing, and outside navigation clicks
    const {setOpen, cartItems} = useShoppingCart();
    const pathname = usePathname();
    const navRef = useRef<HTMLDivElement>(null);

    // Responsive design
    const isMobile = useMediaQuery({maxWidth: MOBILE_BREAKPOINT});

    // Event handlers
    const handleNavClick = (href: string) => (event: React.MouseEvent) => {
        event.preventDefault();
        setMobileMenuOpen(false);
        setOpenPopover(null);
        router.push(href);
    };

    const handleCategoryToggle = (categoryName: string) => (event: React.MouseEvent) => {
        event.preventDefault();
        setOpenPopover(openPopover === categoryName ? null : categoryName);
    };

    // Close popover on outside click
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

    // Render company logo and name
    const Logo = () => (
        <div className='ml-4 flex lg:ml-0'>
            <Link href='/' className='flex items-center'>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='size-6'>
                    <path
                        fillRule='evenodd'
                        d='M8.128 9.155a3.751 3.751 0 1 1 .713-1.321l1.136.656a.75.75 0 0 1 .222 1.104l-.006.007a.75.75 0 0 1-1.032.157 1.421 1.421 0 0 0-.113-.072l-.92-.531Zm-4.827-3.53a2.25 2.25 0 0 1 3.994 2.063.756.756 0 0 0-.122.23 2.25 2.25 0 0 1-3.872-2.293ZM13.348 8.272a5.073 5.073 0 0 0-3.428 3.57 5.08 5.08 0 0 0-.165 1.202 1.415 1.415 0 0 1-.707 1.201l-.96.554a3.751 3.751 0 1 0 .734 1.309l13.729-7.926a.75.75 0 0 0-.181-1.374l-.803-.215a5.25 5.25 0 0 0-2.894.05l-5.325 1.629Zm-9.223 7.03a2.25 2.25 0 1 0 2.25 3.897 2.25 2.25 0 0 0-2.25-3.897ZM12 12.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z'
                        clipRule='evenodd'
                    />
                    <path d='M16.372 12.615a.75.75 0 0 1 .75 0l5.43 3.135a.75.75 0 0 1-.182 1.374l-.802.215a5.25 5.25 0 0 1-2.894-.051l-5.147-1.574a.75.75 0 0 1-.156-1.367l3-1.732Z' />
                </svg>
                <span className='ml-2 text-lg font-semibold text-gray-900'>Cozy Threads</span>
            </Link>
        </div>
    );

    // On the checkout page, encourage order completion by only rendering company logo and name
    const CheckOutPageNav = () => {
        return (
            <header className='relative bg-white'>
                <nav aria-label='Top' className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                    <div className='border-b border-gray-200'>
                        <div className='flex h-16 items-center'>
                            <Logo />
                        </div>
                    </div>
                </nav>
            </header>
        );
    };

    // Render checkout page navigation
    const isProductPage = pathname !== PRODUCT_PATH;
    if (isProductPage) {
        return <CheckOutPageNav />;
    }

    // Promo banner (dismissable)
    const PromoBanner = ({onClose}: {onClose: () => void}) => (
        <div className='h-10 bg-indigo-600 px-4 sm:px-6 lg:px-8'>
            <p className='flex h-full items-center justify-center text-sm font-medium text-white'>
                Get free delivery on orders over $100
                <button onClick={onClose} className='ml-2 text-white hover:text-gray-200'>
                    <span className='sr-only'>Close</span>
                    <XMarkIcon className='h-5 w-5' aria-hidden='true' />
                </button>
            </p>
        </div>
    );

    // Render featured items: image, name, and shop now option
    const FeaturedItem = ({item, handleNavClick}: any) => (
        <div key={item.name} className='group relative text-base sm:text-sm'>
            <Link href={item.href} className='block' onClick={handleNavClick(item.href)}>
                <div className='aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75'>
                    <Image
                        src={item.imageSrc}
                        alt={item.imageAlt}
                        fill
                        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                        className='object-cover object-center'
                    />
                </div>
                <h3 className='mt-6 font-medium text-gray-900'>{item.name}</h3>
                <p className='mt-1 text-sm text-gray-500'>Shop now</p>
            </Link>
        </div>
    );

    // Render category sections and subsections
    const CategorySection = ({section, category, isMobile, handleNavClick}: any) => (
        <div key={section.name}>
            {/* Category name */}
            <p
                id={isMobile ? `${category.id}-${section.id}-heading-mobile` : `${section.name}-heading`}
                className='font-medium text-gray-900'>
                {section.name}
            </p>
            {/* Category subsections */}
            <ul
                role='list'
                aria-labelledby={isMobile ? `${category.id}-${section.id}-heading-mobile` : `${section.name}-heading`}
                className={isMobile ? 'mt-6 flex flex-col space-y-6' : 'mt-6 space-y-6 sm:mt-4 sm:space-y-4'}>
                {section.items.map((item: any) => (
                    <li key={item.name} className={isMobile ? 'flow-root' : 'flex'}>
                        <Link
                            href={item.href}
                            className={isMobile ? '-m-2 block p-2 text-gray-500' : 'hover:text-gray-800'}
                            onClick={handleNavClick(item.href)}>
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );

    // Render mobile menu
    const MobileMenu = () => {
        return (
            <Transition.Root show={mobileMenuOpen} as={Fragment}>
                <Dialog as='div' className='relative z-40 lg:hidden' onClose={setMobileMenuOpen}>
                    {/* Backdrop to dim the background when cart is open */}
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
                            <Dialog.Panel className='relative flex w-full max-w-xs flex-col overflow-y-auto bg-white shadow-xl'>
                                <div
                                    className={`${showPromo ? 'pt-[calc(6rem)]' : ''} flex px-4 pb-2 pt-14 mt-2`}
                                    aria-hidden='true'>
                                    {/* Spacing div based on promo banner visibility */}
                                </div>

                                {/* Categories Container */}
                                <Tab.Group as='div' className='mt-2'>
                                    {/* Render category options */}
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
                                    {/* Render a category's featured items and subsections */}
                                    <Tab.Panels as={Fragment}>
                                        {navigation.categories.map(category => (
                                            <Tab.Panel key={category.name} className='space-y-10 px-4 pb-8 pt-10'>
                                                <div className='grid grid-cols-2 gap-x-4'>
                                                    {category.featured.map(item => (
                                                        <FeaturedItem
                                                            key={item.name}
                                                            item={item}
                                                            handleNavClick={handleNavClick}
                                                        />
                                                    ))}
                                                </div>
                                                {category.sections.map(section => (
                                                    <CategorySection
                                                        key={section.name}
                                                        section={section}
                                                        category={category}
                                                        isMobile={isMobile}
                                                        handleNavClick={handleNavClick}
                                                    />
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
        );
    };

    const MobileMenuButton = ({onClick}: {onClick: () => void}) => (
        <button type='button' className='relative rounded-md bg-white p-2 text-gray-400 lg:hidden' onClick={onClick}>
            <span className='absolute -inset-0.5' />
            <span className='sr-only'>Open menu</span>
            <Bars3Icon className='h-6 w-6' aria-hidden='true' />
        </button>
    );

    // Render flyout menu
    const FlyoutMenu = () => {
        return (
            <Popover.Group className='hidden lg:ml-8 lg:block lg:self-stretch'>
                <div className='flex h-full space-x-8'>
                    {navigation.categories.map(category => (
                        <Popover key={category.name} className='flex'>
                            {({open}) => (
                                <>
                                    {/* Render category options */}
                                    <div className='relative flex'>
                                        <Popover.Button
                                            className={`relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out ${
                                                open
                                                    ? 'border-indigo-600 text-indigo-600'
                                                    : 'border-transparent text-gray-700 hover:text-gray-800'
                                            }`}
                                            onClick={handleCategoryToggle(category.name)}>
                                            {category.name}
                                        </Popover.Button>
                                    </div>
                                    {/* Transition controls animation for appearing/disappearing */}
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
                                            {/* Shadow overlay */}
                                            <div
                                                className='absolute inset-0 top-1/2 bg-white shadow'
                                                aria-hidden='true'
                                            />

                                            {/* Featured items and category sections */}
                                            <div className='relative bg-white'>
                                                <div className='mx-auto max-w-7xl px-8'>
                                                    <div className='grid grid-cols-2 gap-x-8 gap-y-10 py-16'>
                                                        <div className='col-start-2 grid grid-cols-2 gap-x-8'>
                                                            {category.featured.map((item: any) => (
                                                                <FeaturedItem
                                                                    key={item.name}
                                                                    item={item}
                                                                    handleNavClick={handleNavClick}
                                                                />
                                                            ))}
                                                        </div>
                                                        <div className='row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm'>
                                                            {category.sections.map((section: any) => (
                                                                <CategorySection
                                                                    key={section.name}
                                                                    section={section}
                                                                    category={category}
                                                                    isMobile={isMobile}
                                                                    handleNavClick={handleNavClick}
                                                                />
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
        );
    };

    // Clickable shopping cart icon
    const ShoppingCartIcon = () => {
        const [quantity, setQuantity] = useState<number | null>(null);

        useEffect(() => {
            setQuantity(cartItems.reduce((total, item) => total + item.quantity, 0));
        }, []);

        return (
            <div className='ml-auto flex items-center'>
                <div className='ml-4 flow-root lg:ml-6'>
                    <Link
                        href='#'
                        className='group -m-2 flex items-center p-2'
                        onClick={e => {
                            e.preventDefault();
                            setOpen(true);
                        }}>
                        <ShoppingBagIcon
                            className='h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500'
                            aria-hidden='true'
                        />
                        <span className='ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800'>
                            {quantity}
                        </span>
                        <span className='sr-only'>items in cart, view bag</span>
                    </Link>
                </div>
            </div>
        );
    };

    return (
        <div
            className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${
                showPromo ? 'h-[calc(4rem+2.5rem)]' : 'h-16'
            }`}
            ref={navRef}>
            {/* Promotional banner (dismissable) */}
            {showPromo && <PromoBanner onClose={() => setShowPromo(false)} />}

            {/* Mobile menu (hidden on desktop) */}
            <MobileMenu />

            {/* Main navigation header */}
            <header className='relative bg-white'>
                <nav aria-label='Top' className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                    <div className='border-b border-gray-200'>
                        <div className='flex h-16 items-center'>
                            <MobileMenuButton onClick={() => setMobileMenuOpen(true)} />
                            <Logo />
                            <FlyoutMenu />
                            <ShoppingCartIcon />
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    );
}
