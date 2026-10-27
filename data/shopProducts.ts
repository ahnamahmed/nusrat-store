// data/shopProducts.ts

export interface ShopProduct {
    slug: string;
    name: string;
    nameBn?: string;
    category: string;
    categorySlug: string;
    tags: string[];
    price: number;
    originalPrice?: number;
    frontImage: string;
    backImage: string;
    gallery?: string[];
    description?: string;
    fabricDetails?: string;
    sizes?: (string | number)[];
    inStock?: boolean;
}

export const SHOP_CATEGORIES = [
    { label: "All", slug: "all" },
    { label: "Arabian Jubba", slug: "arabian-jubba" },
    { label: "Premium Panjabi", slug: "premium-panjabi" },
    { label: "New Arrival", slug: "new-arrival" },
] as const;

export const SHOP_PRODUCTS: ShopProduct[] = [
    {
        slug: "nusrat-arabian-jubba-black",
        name: "Nusrat Arabian Jubba - Black",
        nameBn: "নুসরাত এরাবিয়ান জুব্বা - কালো",
        category: "Arabian Jubba",
        categorySlug: "arabian-jubba",
        tags: ["all", "arabian-jubba", "new-arrival", "mens"],
        price: 2350,
        originalPrice: 2950,
        frontImage: "/products/jubba-black-front.jpg",
        backImage: "/products/jubba-black-back.jpg",
        gallery: [
            "/products/jubba-black-front.jpg",
            "/products/jubba-black-back.jpg",
        ],
        description: "অভিজাত লুক ও সারাদিনের পরিধানে সর্বোচ্চ আরাম নিশ্চিত করতে প্রিমিয়াম সফট ফ্যাব্রিক এবং নিখুঁত আমিরাতি কাট দিয়ে তৈরি। মিনিমাল কলার স্টিচিং এবং রিঙ্কেল-ফ্রি ফিনিশিং।",
        fabricDetails: "প্রিমিয়াম সফট কটন-ব্লেন্ড (Wrinkle-Resistant Breathable Fabric)",
        sizes: [40, 42, 44, 46, 48],
        inStock: true,
    },
    {
        slug: "nusrat-arabian-jubba-ash",
        name: "Nusrat Arabian Jubba - Ash",
        nameBn: "নুসরাত এরাবিয়ান জুব্বা - ছাই কালার (অ্যাশ)",
        category: "Arabian Jubba",
        categorySlug: "arabian-jubba",
        tags: ["all", "arabian-jubba", "new-arrival", "mens"],
        price: 2350,
        originalPrice: 2950,
        frontImage: "/products/jubba-ash-front.jpg",
        backImage: "/products/jubba-ash-back.jpg",
        gallery: [
            "/products/jubba-ash-front.jpg",
            "/products/jubba-ash-back.jpg",
        ],
        description: "অভিজাত লুক ও সারাদিনের পরিধানে সর্বোচ্চ আরাম নিশ্চিত করতে প্রিমিয়াম সফট ফ্যাব্রিক এবং নিখুঁত আমিরাতি কাট দিয়ে তৈরি। মিনিমাল কলার স্টিচিং এবং রিঙ্কেল-ফ্রি ফিনিশিং।",
        fabricDetails: "প্রিমিয়াম সফট কটন-ব্লেন্ড (Wrinkle-Resistant Breathable Fabric)",
        sizes: [40, 42, 44, 46, 48],
        inStock: true,
    },
    {
        slug: "nusrat-arabian-jubba-deep-blue",
        name: "Nusrat Arabian Jubba - Deep Blue",
        nameBn: "নুসরাত এরাবিয়ান জুব্বা - গাঢ় নীল (ডিপ ব্লু)",
        category: "Arabian Jubba",
        categorySlug: "arabian-jubba",
        tags: ["all", "arabian-jubba", "mens"],
        price: 2350,
        originalPrice: 2950,
        frontImage: "/products/jubba-deepblue-front.jpg",
        backImage: "/products/jubba-deepblue-back.jpg",
        gallery: [
            "/products/jubba-deepblue-front.jpg",
            "/products/jubba-deepblue-back.jpg",
        ],
        description: "অভিজাত লুক ও সারাদিনের পরিধানে সর্বোচ্চ আরাম নিশ্চিত করতে প্রিমিয়াম সফট ফ্যাব্রিক এবং নিখুঁত আমিরাতি কাট দিয়ে তৈরি। মিনিমাল কলার স্টিচিং এবং রিঙ্কেল-ফ্রি ফিনিশিং।",
        fabricDetails: "প্রিমিয়াম সফট কটন-ব্লেন্ড (Wrinkle-Resistant Breathable Fabric)",
        sizes: [40, 42, 44, 46, 48],
        inStock: true,
    },
    {
        slug: "nusrat-arabian-jubba-chocolate",
        name: "Nusrat Arabian Jubba - Chocolate",
        nameBn: "নুসরাত এরাবিয়ান জুব্বা - চকলেট",
        category: "Arabian Jubba",
        categorySlug: "arabian-jubba",
        tags: ["all", "arabian-jubba", "mens"],
        price: 2350,
        originalPrice: 2950,
        frontImage: "/products/jubba-chocolate-front.jpg",
        backImage: "/products/jubba-chocolate-back.jpg",
        gallery: [
            "/products/jubba-chocolate-front.jpg",
            "/products/jubba-chocolate-back.jpg",
        ],
        description: "অভিজাত লুক ও সারাদিনের পরিধানে সর্বোচ্চ আরাম নিশ্চিত করতে প্রিমিয়াম সফট ফ্যাব্রিক এবং নিখুঁত আমিরাতি কাট দিয়ে তৈরি। মিনিমাল কলার স্টিচিং এবং রিঙ্কেল-ফ্রি ফিনিশিং।",
        fabricDetails: "প্রিমিয়াম সফট কটন-ব্লেন্ড (Wrinkle-Resistant Breathable Fabric)",
        sizes: [40, 42, 44, 46, 48],
        inStock: true,
    },
    {
        slug: "nusrat-arabian-jubba-royal-blue",
        name: "Nusrat Arabian Jubba - Royal Blue",
        nameBn: "নুসরাত এরাবিয়ান জুব্বা - রয়্যাল ব্লু",
        category: "Arabian Jubba",
        categorySlug: "arabian-jubba",
        tags: ["all", "arabian-jubba", "new-arrival", "mens"],
        price: 2350,
        originalPrice: 2950,
        frontImage: "/products/jubba-royalblue-front.jpg",
        backImage: "/products/jubba-royalblue-back.jpg",
        gallery: [
            "/products/jubba-royalblue-front.jpg",
            "/products/jubba-royalblue-back.jpg",
        ],
        description: "অভিজাত লুক ও সারাদিনের পরিধানে সর্বোচ্চ আরাম নিশ্চিত করতে প্রিমিয়াম সফট ফ্যাব্রিক এবং নিখুঁত আমিরাতি কাট দিয়ে তৈরি। মিনিমাল কলার স্টিচিং এবং রিঙ্কেল-ফ্রি ফিনিশিং।",
        fabricDetails: "প্রিমিয়াম সফট কটন-ব্লেন্ড (Wrinkle-Resistant Breathable Fabric)",
        sizes: [40, 42, 44, 46, 48],
        inStock: true,
    },
    {
        slug: "nusrat-arabian-jubba-brown",
        name: "Nusrat Arabian Jubba - Brown",
        nameBn: "নুসরাত এরাবিয়ান জুব্বা - বাদামি (ব্রাউন)",
        category: "Arabian Jubba",
        categorySlug: "arabian-jubba",
        tags: ["all", "arabian-jubba", "mens"],
        price: 2350,
        originalPrice: 2950,
        frontImage: "/products/jubba-brown-front.jpg",
        backImage: "/products/jubba-brown-back.jpg",
        gallery: [
            "/products/jubba-brown-front.jpg",
            "/products/jubba-brown-back.jpg",
        ],
        description: "অভিজাত লুক ও সারাদিনের পরিধানে সর্বোচ্চ আরাম নিশ্চিত করতে প্রিমিয়াম সফট ফ্যাব্রিক এবং নিখুঁত আমিরাতি কাট দিয়ে তৈরি। মিনিমাল কলার স্টিচিং এবং রিঙ্কেল-ফ্রি ফিনিশিং।",
        fabricDetails: "প্রিমিয়াম সফট কটন-ব্লেন্ড (Wrinkle-Resistant Breathable Fabric)",
        sizes: [40, 42, 44, 46, 48],
        inStock: true,
    },
    {
        slug: "nusrat-arabian-jubba-cream",
        name: "Nusrat Arabian Jubba - Cream",
        nameBn: "নুসরাত এরাবিয়ান জুব্বা - ক্রিম কালার",
        category: "Arabian Jubba",
        categorySlug: "arabian-jubba",
        tags: ["all", "arabian-jubba", "mens"],
        price: 2350,
        originalPrice: 2950,
        frontImage: "/products/jubba-cream-front.jpg",
        backImage: "/products/jubba-cream-back.jpg",
        gallery: [
            "/products/jubba-cream-front.jpg",
            "/products/jubba-cream-back.jpg",
        ],
        description: "অভিজাত লুক ও সারাদিনের পরিধানে সর্বোচ্চ আরাম নিশ্চিত করতে প্রিমিয়াম সফট ফ্যাব্রিক এবং নিখুঁত আমিরাতি কাট দিয়ে তৈরি। মিনিমাল কলার স্টিচিং এবং রিঙ্কেল-ফ্রি ফিনিশিং।",
        fabricDetails: "প্রিমিয়াম সফট কটন-ব্লেন্ড (Wrinkle-Resistant Breathable Fabric)",
        sizes: [40, 42, 44, 46, 48],
        inStock: true,
    },
    {
        slug: "nusrat-arabian-jubba-white",
        name: "Nusrat Arabian Jubba - White",
        nameBn: "নুসরাত এরাবিয়ান জুব্বা - ধবধবে সাদা (পিওর হোয়াইট)",
        category: "Arabian Jubba",
        categorySlug: "arabian-jubba",
        tags: ["all", "arabian-jubba", "new-arrival", "mens"],
        price: 2350,
        originalPrice: 2950,
        frontImage: "/products/jubba-white-front.jpg",
        backImage: "/products/jubba-white-back.jpg",
        gallery: [
            "/products/jubba-white-front.jpg",
            "/products/jubba-white-back.jpg",
        ],
        description: "অভিজাত লুক ও সারাদিনের পরিধানে সর্বোচ্চ আরাম নিশ্চিত করতে প্রিমিয়াম সফট ফ্যাব্রিক এবং নিখুঁত আমিরাতি কাট দিয়ে তৈরি। মিনিমাল কলার স্টিচিং এবং রিঙ্কেল-ফ্রি ফিনিশিং।",
        fabricDetails: "প্রিমিয়াম সফট কটন-ব্লেন্ড (Wrinkle-Resistant Breathable Fabric)",
        sizes: [40, 42, 44, 46, 48],
        inStock: true,
    },
];