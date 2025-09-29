import { Product } from './types';

export const PRODUCTS: Product[] = [
    {
        id: 'sada-naru',
        name: 'Narkel Naru (Coconut Laddoo )',
        images: [
            "https://i.imgur.com/6g6sE1j.jpg",
            "https://i.imgur.com/k2A4dY7.jpg",
            "https://i.imgur.com/d5yY0bM.jpg",
            "https://i.imgur.com/bX3v4vX.jpg",
        ],
        badge: 'Sweet & Simple',
        description: `
            <p>A timeless Bengali classic, <strong>Sada Naru</strong> are delectable coconut ladoos that melt in your mouth. Made from freshly grated coconut and slow-cooked with fine sugar (Chini), these little spheres of joy offer a clean and purely sweet taste of nostalgia.</p>
            <ul>
                <li>Made with premium quality coconut and pure sugar</li>
                <li>Hand-rolled to perfection for a delicate texture</li>
                <li>A perfect sweet snack for any time of the day</li>
            </ul>
        `,
        approxLadoos: 'Approx. 15-18 pieces per 500g',
        packSizes: [
            { weight: '250g', price: 190, oldPrice: 210 },
            { weight: '500g', price: 370, oldPrice: 400 },
            { weight: '1kg', price: 720, oldPrice: 780 },
        ],
    },
    {
        id: 'gurer-naru',
        name: 'Narkel Naru (Coconut Ladoo With Jaggery)',
        images: [
            "https://i.imgur.com/rMUM5Yp.jpg",
            "https://i.imgur.com/UfO2gTj.jpg",
            "https://i.imgur.com/uG26b0D.jpg",
            "https://i.imgur.com/P0s1nJk.jpg",
        ],
        badge: 'Classic Favourite',
        description: `
            <p>170g. A timeless Bengali classic, <strong>Gurer Naru</strong> are delectable coconut ladoos that melt in your mouth. Made from freshly grated coconut and slow-cooked with fragrant jaggery (Gur), these little spheres of joy are a taste of pure nostalgia.</p>
            <ul>
                <li>Made with premium quality coconut and fragrant jaggery</li>
                <li>Hand-rolled to perfection for an authentic taste</li>
                <li>A perfect sweet snack for any time of the day</li>
            </ul>
        `,
        approxLadoos: 'Approx. 15-18 pieces per 500g',
        packSizes: [
            { weight: '250g', price: 190, oldPrice: 210 },
            { weight: '500g', price: 370, oldPrice: 400 },
            { weight: '1kg', price: 720, oldPrice: 780 },
        ],
    },
    {
        id: 'sada-naru-combo',
        name: 'Narkel Naru (Coconut Laddoo) - Combo Pack',
        images: [
            "https://i.imgur.com/6g6sE1j.jpg",
            "https://i.imgur.com/k2A4dY7.jpg",
            "https://i.imgur.com/d5yY0bM.jpg",
            "https://i.imgur.com/bX3v4vX.jpg",
        ],
        badge: 'Value Combo',
        description: `
            <p>Can't get enough of our classic <strong>Sada Naru</strong>? This special combo pack is perfect for you! Stock up on your favorite sweet or share the joy with family and friends. It's the same delicious, melt-in-your-mouth coconut laddoo, now in a value-packed offer.</p>
            <ul>
                <li>Great savings on a larger quantity</li>
                <li>Perfect for gifting or family gatherings</li>
                <li>Made with the same premium quality coconut and pure sugar</li>
            </ul>
        `,
        approxLadoos: 'Approx. 30-36 pieces per pack',
        packSizes: [
            { weight: '500g (2x250g)', price: 360, oldPrice: 380 },
            { weight: '1kg (2x500g)', price: 700, oldPrice: 740 },
        ],
    },
    {
        id: 'gurer-naru-combo',
        name: 'Narkel Naru (Coconut Ladoo With Jaggery) - Combo Pack',
        images: [
            "https://i.imgur.com/rMUM5Yp.jpg",
            "https://i.imgur.com/UfO2gTj.jpg",
            "https://i.imgur.com/uG26b0D.jpg",
            "https://i.imgur.com/P0s1nJk.jpg",
        ],
        badge: 'Jaggery Delight',
        description: `
            <p>Enjoy more of the authentic, fragrant taste of <strong>Gurer Naru</strong> with our special combo offer. Made with rich, date palm jaggery, this pack is ideal for those who love the traditional flavor of Bengal. Perfect for festive occasions or as a heartfelt gift.</p>
            <ul>
                <li>Special value pack for our classic jaggery naru</li>
                <li>Ideal for sharing during festivals and celebrations</li>
                <li>Made with the same premium quality coconut and fragrant jaggery</li>
            </ul>
        `,
        approxLadoos: 'Approx. 30-36 pieces per pack',
        packSizes: [
            { weight: '500g (2x250g)', price: 360, oldPrice: 380 },
            { weight: '1kg (2x500g)', price: 700, oldPrice: 740 },
        ],
    },
];