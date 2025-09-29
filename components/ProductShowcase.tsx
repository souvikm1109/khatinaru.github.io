import React from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';

interface ProductShowcaseProps {
    products: Product[];
    onProductClick: (productId: string) => void;
}

const ProductShowcase: React.FC<ProductShowcaseProps> = ({ products, onProductClick }) => {
    return (
        <section id="products-section" className="container mx-auto px-6 mt-16 md:mt-24">
            <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-8 text-center animate-on-scroll">
                Our Signature Sweets
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {products.map(product => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onProductClick={onProductClick}
                    />
                ))}
            </div>
        </section>
    );
};

export default ProductShowcase;