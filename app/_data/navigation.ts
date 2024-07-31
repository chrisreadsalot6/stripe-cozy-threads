// Defines hierarchical structure of the store navigation bar
// Top-level categories: Apparel and Accessories
// Each top level category has a featured section and a sections section
// Each section has a list of items

export const navigation = {
    categories: [
        {
            id: 'apparel',
            name: 'Apparel',
            href: '#apparel',
            featured: [
                {
                    name: 'New Arrivals',
                    href: '#apparel',
                    imageSrc: '/products/organic-cotton-sweatpants.jpeg',
                    imageAlt: 'Person wearing cozy organic cotton sweatpants',
                },
                {
                    name: 'Eco-Friendly Basics',
                    href: '#apparel',
                    imageSrc: '/products/recycled-down-vest.jpeg',
                    imageAlt: 'Person wearing a puffy recycled down vest',
                },
            ],
            sections: [
                {
                    id: 'apparel',
                    name: 'All Apparel',
                    items: [
                        {name: 'T-Shirts', href: '#apparel'},
                        {name: 'Hoodies & Sweatshirts', href: '#apparel'},
                        {name: 'Pants & Shorts', href: '#apparel'},
                        {name: 'Outerwear', href: '#apparel'},
                        {name: 'Dresses', href: '#apparel'},
                        {name: 'Sweaters', href: '#apparel'},
                        {name: 'Activewear', href: '#apparel'},
                        {name: 'Pajamas', href: '#apparel'},
                        {name: 'Base Layers', href: '#apparel'},
                    ],
                },
            ],
        },
        {
            id: 'accessories',
            name: 'Accessories',
            href: '#accessories',
            featured: [
                {
                    name: 'Eco-Friendly Essentials',
                    href: '#accessories',
                    imageSrc: '/products/organic-cotton-beanie.jpeg',
                    imageAlt: 'Person wearing a cozy organic cotton beanie',
                },
                {
                    name: 'Sustainable Carry',
                    href: '#accessories',
                    imageSrc: '/products/organic-cotton-tote-bag.jpeg',
                    imageAlt: 'Organic cotton tote bag with Cozy Threads logo',
                },
            ],
            sections: [
                {
                    id: 'accessories',
                    name: 'All Accessories',
                    items: [
                        {name: 'Beanies', href: '#accessories'},
                        {name: 'Scarves', href: '#accessories'},
                        {name: 'Tote Bags', href: '#accessories'},
                        {name: 'Socks', href: '#accessories'},
                        {name: 'Wallets', href: '#accessories'},
                    ],
                },
            ],
        },
    ],
};
