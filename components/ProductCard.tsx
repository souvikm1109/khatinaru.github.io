import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
    product: Product;
    onProductClick: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onProductClick }) => {
    const handleCardClick = () => {
        onProductClick(product.id);
    };
    
    const defaultPackSize = product.packSizes[0];

    return (
        <div 
            onClick={handleCardClick}
            className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-on-scroll cursor-pointer overflow-hidden flex flex-col"
        >
            <div className="relative w-full aspect-square bg-stone-100">
                <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                {product.badge && (
                    <span className="absolute top-2 right-2 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                        {product.badge}
                    </span>
                )}
            </div>
            <div className="p-6 text-center flex-grow flex flex-col justify-between">
                <div>
                    <h3 className="text-2xl font-bold text-stone-800 mb-1">{product.name}</h3>
                    <div className="text-amber-500 mb-2">
                        <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star-half-stroke"></i>
                        <span className="text-sm text-gray-500 ml-1">(4.5)</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                        <span className="text-2xl font-bold text-amber-900">₹{defaultPackSize.price.toFixed(2)}</span>
                        {defaultPackSize.oldPrice && (
                            <span className="text-sm text-gray-500 line-through">₹{defaultPackSize.oldPrice.toFixed(2)}</span>
                        )}
                    </div>
                </div>
                <button 
                    className="mt-4 w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all transform hover:scale-105"
                >
                    View Details
                </button>
            </div>
        </div>
    );
};

export default ProductCard;