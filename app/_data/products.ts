export type Product = {
    id: number;
    name: string;
    description: string;
    price: string;
    imageSrc: string;
    imageAlt: string;
    colors: {
        name: string;
        class: string;
        selectedClass: string;
    }[];
    sizes: string[];
    category: 'Apparel' | 'Accessories';
};

export const products: Product[] = [
    // Apparel (15 items)
    {
        id: 101,
        name: 'Organic Cotton Hoodie',
        description: 'Ultra-soft, ethically-sourced organic cotton hoodie',
        price: '$75',
        imageSrc: '/products/organic-cotton-hoodie.jpeg',
        imageAlt: 'Person wearing a comfortable organic cotton hoodie',
        colors: [
            {
                name: 'Heather Gray',
                class: 'bg-gray-400',
                selectedClass: 'ring-gray-500',
            },
            {
                name: 'Sage Green',
                class: 'bg-green-300',
                selectedClass: 'ring-green-400',
            },
            {
                name: 'Dusty Rose',
                class: 'bg-pink-200',
                selectedClass: 'ring-pink-300',
            },
        ],
        sizes: ['S', 'M', 'L'],
        category: 'Apparel',
    },
    {
        id: 102,
        name: 'Bamboo Lounge Pants',
        description: 'Breathable and eco-friendly bamboo lounge pants',
        price: '$65',
        imageSrc: '/products/bamboo-lounge-pants.jpeg',
        imageAlt: 'Model wearing comfortable bamboo lounge pants',
        colors: [
            {
                name: 'Charcoal',
                class: 'bg-gray-700',
                selectedClass: 'ring-gray-800',
            },
            {
                name: 'Navy',
                class: 'bg-blue-900',
                selectedClass: 'ring-blue-950',
            },
            {
                name: 'Oatmeal',
                class: 'bg-yellow-100',
                selectedClass: 'ring-yellow-200',
            },
        ],
        sizes: ['S', 'M', 'L'],
        category: 'Apparel',
    },
    {
        id: 103,
        name: 'Merino Wool Sweater',
        description: 'Luxuriously soft, ethically-sourced merino wool sweater',
        price: '$120',
        imageSrc: '/products/merino-wool-sweater.jpeg',
        imageAlt: 'Person wearing a cozy merino wool sweater',
        colors: [
            {
                name: 'Cream',
                class: 'bg-yellow-50',
                selectedClass: 'ring-yellow-100',
            },
            {
                name: 'Forest Green',
                class: 'bg-green-800',
                selectedClass: 'ring-green-900',
            },
            {
                name: 'Burgundy',
                class: 'bg-red-800',
                selectedClass: 'ring-red-900',
            },
        ],
        sizes: ['S', 'M', 'L'],
        category: 'Apparel',
    },
    {
        id: 104,
        name: 'Organic Linen Shirt',
        description: 'Breathable and durable organic linen button-up shirt',
        price: '$85',
        imageSrc: '/products/organic-linen-shirt.jpeg',
        imageAlt: 'Model wearing a crisp organic linen shirt',
        colors: [
            {
                name: 'White',
                class: 'bg-white',
                selectedClass: 'ring-gray-200',
            },
            {
                name: 'Sky Blue',
                class: 'bg-blue-200',
                selectedClass: 'ring-blue-300',
            },
            {
                name: 'Sand',
                class: 'bg-yellow-200',
                selectedClass: 'ring-yellow-300',
            },
        ],
        sizes: ['S', 'M', 'L'],
        category: 'Apparel',
    },
    {
        id: 105,
        name: 'Recycled Fleece Jacket',
        description: 'Warm and eco-friendly jacket made from recycled materials',
        price: '$95',
        imageSrc: '/products/recycled-fleece-jacket.jpeg',
        imageAlt: 'Person wearing a cozy recycled fleece jacket',
        colors: [
            {
                name: 'Heather Gray',
                class: 'bg-gray-400',
                selectedClass: 'ring-gray-500',
            },
            {
                name: 'Navy',
                class: 'bg-blue-900',
                selectedClass: 'ring-blue-950',
            },
            {
                name: 'Olive',
                class: 'bg-green-700',
                selectedClass: 'ring-green-800',
            },
        ],
        sizes: ['S', 'M', 'L'],
        category: 'Apparel',
    },
    {
        id: 106,
        name: 'Organic Cotton T-Shirt',
        description: 'Classic, comfortable organic cotton tee',
        price: '$35',
        imageSrc: '/products/organic-cotton-t-shirt.jpeg',
        imageAlt: 'Model wearing a soft organic cotton t-shirt',
        colors: [
            {
                name: 'White',
                class: 'bg-white',
                selectedClass: 'ring-gray-200',
            },
            {
                name: 'Black',
                class: 'bg-gray-900',
                selectedClass: 'ring-gray-950',
            },
            {
                name: 'Sage',
                class: 'bg-green-300',
                selectedClass: 'ring-green-400',
            },
        ],
        sizes: ['S', 'M', 'L'],
        category: 'Apparel',
    },
    {
        id: 107,
        name: 'Hemp Denim Jeans',
        description: 'Durable and eco-friendly hemp blend denim jeans',
        price: '$110',
        imageSrc: '/products/hemp-denim-jeans.jpeg',
        imageAlt: 'Person wearing comfortable hemp denim jeans',
        colors: [
            {
                name: 'Indigo',
                class: 'bg-indigo-900',
                selectedClass: 'ring-indigo-950',
            },
            {
                name: 'Black',
                class: 'bg-gray-900',
                selectedClass: 'ring-gray-950',
            },
        ],
        sizes: ['30', '32', '34'],
        category: 'Apparel',
    },
    {
        id: 108,
        name: 'Alpaca Wool Cardigan',
        description: 'Luxuriously soft and warm alpaca wool cardigan',
        price: '$135',
        imageSrc: '/products/alpaca-wool-cardigan.jpeg',
        imageAlt: 'Model wearing a cozy alpaca wool cardigan',
        colors: [
            {
                name: 'Oatmeal',
                class: 'bg-yellow-100',
                selectedClass: 'ring-yellow-200',
            },
            {
                name: 'Charcoal',
                class: 'bg-gray-700',
                selectedClass: 'ring-gray-800',
            },
            {
                name: 'Dusty Rose',
                class: 'bg-pink-200',
                selectedClass: 'ring-pink-300',
            },
        ],
        sizes: ['S', 'M', 'L'],
        category: 'Apparel',
    },
    {
        id: 109,
        name: 'Organic Cotton Sweatpants',
        description: 'Comfortable, ethically-made organic cotton sweatpants',
        price: '$60',
        imageSrc: '/products/organic-cotton-sweatpants.jpeg',
        imageAlt: 'Person wearing cozy organic cotton sweatpants',
        colors: [
            {
                name: 'Heather Gray',
                class: 'bg-gray-400',
                selectedClass: 'ring-gray-500',
            },
            {
                name: 'Navy',
                class: 'bg-blue-900',
                selectedClass: 'ring-blue-950',
            },
            {
                name: 'Sage',
                class: 'bg-green-300',
                selectedClass: 'ring-green-400',
            },
        ],
        sizes: ['S', 'M', 'L'],
        category: 'Apparel',
    },
    {
        id: 110,
        name: 'Tencel Wrap Dress',
        description: 'Elegant and eco-friendly Tencel wrap dress',
        price: '$95',
        imageSrc: '/products/tencel-wrap-dress.jpeg',
        imageAlt: 'Model wearing a flowing Tencel wrap dress',
        colors: [
            {
                name: 'Dusty Blue',
                class: 'bg-blue-300',
                selectedClass: 'ring-blue-400',
            },
            {
                name: 'Terracotta',
                class: 'bg-orange-300',
                selectedClass: 'ring-orange-400',
            },
            {
                name: 'Olive',
                class: 'bg-green-700',
                selectedClass: 'ring-green-800',
            },
        ],
        sizes: ['S', 'M', 'L'],
        category: 'Apparel',
    },
    {
        id: 111,
        name: 'Recycled Down Vest',
        description: 'Warm vest made with ethically-sourced recycled down',
        price: '$85',
        imageSrc: '/products/recycled-down-vest.jpeg',
        imageAlt: 'Person wearing a puffy recycled down vest',
        colors: [
            {
                name: 'Black',
                class: 'bg-gray-900',
                selectedClass: 'ring-gray-950',
            },
            {
                name: 'Navy',
                class: 'bg-blue-900',
                selectedClass: 'ring-blue-950',
            },
            {
                name: 'Burgundy',
                class: 'bg-red-800',
                selectedClass: 'ring-red-900',
            },
        ],
        sizes: ['S', 'M', 'L'],
        category: 'Apparel',
    },
    {
        id: 112,
        name: 'Organic Cotton Pajama Set',
        description: 'Soft and comfortable organic cotton pajama set',
        price: '$70',
        imageSrc: '/products/organic-cotton-pajama-set.jpeg',
        imageAlt: 'Model wearing a cozy organic cotton pajama set',
        colors: [
            {
                name: 'Sky Blue',
                class: 'bg-blue-200',
                selectedClass: 'ring-blue-300',
            },
            {
                name: 'Lavender',
                class: 'bg-purple-200',
                selectedClass: 'ring-purple-300',
            },
            {
                name: 'Sage',
                class: 'bg-green-300',
                selectedClass: 'ring-green-400',
            },
        ],
        sizes: ['S', 'M', 'L'],
        category: 'Apparel',
    },
    {
        id: 113,
        name: 'Merino Wool Base Layer',
        description: 'Thermal base layer made from ethically-sourced merino wool',
        price: '$65',
        imageSrc: '/products/merino-wool-base-layer.jpeg',
        imageAlt: 'Person wearing a form-fitting merino wool base layer',
        colors: [
            {
                name: 'Black',
                class: 'bg-gray-900',
                selectedClass: 'ring-gray-950',
            },
            {
                name: 'Navy',
                class: 'bg-blue-900',
                selectedClass: 'ring-blue-950',
            },
        ],
        sizes: ['S', 'M', 'L'],
        category: 'Apparel',
    },
    {
        id: 114,
        name: 'Organic Linen Shorts',
        description: 'Breathable and comfortable organic linen shorts',
        price: '$55',
        imageSrc: '/products/organic-linen-shorts.jpeg',
        imageAlt: 'Model wearing relaxed organic linen shorts',
        colors: [
            {
                name: 'Khaki',
                class: 'bg-yellow-200',
                selectedClass: 'ring-yellow-300',
            },
            {
                name: 'Navy',
                class: 'bg-blue-900',
                selectedClass: 'ring-blue-950',
            },
            {
                name: 'Olive',
                class: 'bg-green-700',
                selectedClass: 'ring-green-800',
            },
        ],
        sizes: ['S', 'M', 'L'],
        category: 'Apparel',
    },
    {
        id: 115,
        name: 'Recycled Polyester Raincoat',
        description: 'Waterproof raincoat made from recycled polyester',
        price: '$110',
        imageSrc: '/products/recycled-polyester-raincoat.jpeg',
        imageAlt: 'Person wearing a sleek recycled polyester raincoat',
        colors: [
            {
                name: 'Yellow',
                class: 'bg-yellow-400',
                selectedClass: 'ring-yellow-500',
            },
            {
                name: 'Navy',
                class: 'bg-blue-900',
                selectedClass: 'ring-blue-950',
            },
            {
                name: 'Forest Green',
                class: 'bg-green-800',
                selectedClass: 'ring-green-900',
            },
        ],
        sizes: ['S', 'M', 'L'],
        category: 'Apparel',
    },

    // Accessories (5 items)
    {
        id: 201,
        name: 'Organic Cotton Beanie',
        description: 'Soft and warm organic cotton beanie',
        price: '$25',
        imageSrc: '/products/organic-cotton-beanie.jpeg',
        imageAlt: 'Person wearing a cozy organic cotton beanie',
        colors: [
            {
                name: 'Heather Gray',
                class: 'bg-gray-400',
                selectedClass: 'ring-gray-500',
            },
            {
                name: 'Black',
                class: 'bg-gray-900',
                selectedClass: 'ring-gray-950',
            },
            {
                name: 'Burgundy',
                class: 'bg-red-800',
                selectedClass: 'ring-red-900',
            },
        ],
        sizes: ['S', 'M', 'L'],
        category: 'Accessories',
    },
    {
        id: 202,
        name: 'Recycled Wool Scarf',
        description: 'Warm and eco-friendly scarf made from recycled wool',
        price: '$45',
        imageSrc: '/products/recycled-wool-scarf.jpeg',
        imageAlt: 'Model wearing a cozy recycled wool scarf',
        colors: [
            {
                name: 'Oatmeal',
                class: 'bg-yellow-100',
                selectedClass: 'ring-yellow-200',
            },
            {
                name: 'Charcoal',
                class: 'bg-gray-700',
                selectedClass: 'ring-gray-800',
            },
            {
                name: 'Forest Green',
                class: 'bg-green-800',
                selectedClass: 'ring-green-900',
            },
        ],
        sizes: ['S', 'M', 'L'],
        category: 'Accessories',
    },
    {
        id: 203,
        name: 'Organic Cotton Tote Bag',
        description: 'Durable and eco-friendly organic cotton tote bag',
        price: '$30',
        imageSrc: '/products/organic-cotton-tote-bag.jpeg',
        imageAlt: 'Organic cotton tote bag with Cozy Threads logo',
        colors: [
            {
                name: 'Natural',
                class: 'bg-yellow-50',
                selectedClass: 'ring-yellow-100',
            },
            {
                name: 'Black',
                class: 'bg-gray-900',
                selectedClass: 'ring-gray-950',
            },
        ],
        sizes: ['S', 'M', 'L'],
        category: 'Accessories',
    },
    {
        id: 204,
        name: 'Bamboo Fiber Socks',
        description: 'Soft and breathable socks made from bamboo fiber',
        price: '$15',
        imageSrc: '/products/bamboo-fiber-socks.jpeg',
        imageAlt: 'Pack of bamboo fiber socks in various colors',
        colors: [
            {
                name: 'Mixed Pack',
                class: 'bg-gradient-to-r from-gray-400 via-blue-500 to-green-500',
                selectedClass: 'ring-gray-400',
            },
        ],
        sizes: ['S', 'M', 'L'],
        category: 'Accessories',
    },
    {
        id: 205,
        name: 'Upcycled Leather Wallet',
        description: 'Stylish wallet made from upcycled leather',
        price: '$55',
        imageSrc: '/products/upcycled-leather-wallet.jpeg',
        imageAlt: 'Upcycled leather wallet with multiple card slots',
        colors: [
            {
                name: 'Brown',
                class: 'bg-yellow-800',
                selectedClass: 'ring-yellow-900',
            },
            {
                name: 'Black',
                class: 'bg-gray-900',
                selectedClass: 'ring-gray-950',
            },
        ],
        sizes: ['S', 'M', 'L'],
        category: 'Accessories',
    },
];
