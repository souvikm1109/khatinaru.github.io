

import React, { useState, useEffect, useRef } from 'react';
import { Product, PackSize } from '../types';
import GeminiChatModal from './modals/GeminiChatModal';

interface ProductDetailPageProps {
    product: Product;
    onBack: () => void;
    onAddToCart: (item: { id: string; name: string; packSize: string; price: number; quantity: number }) => void;
}

const ImageZoom: React.FC<{ src: string, alt: string }> = ({ src, alt }) => {
    const [isZoomReady, setIsZoomReady] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);
    const resultRef = useRef<HTMLDivElement>(null);
    const lensRef = useRef<HTMLDivElement>(null);

    // Set background image for zoom result when src changes
    useEffect(() => {
        setIsZoomReady(false); // Reset readiness on src change
        if (resultRef.current) {
            resultRef.current.style.backgroundImage = `url('${src}')`;
        }
    }, [src]);

    const handleImageLoad = () => {
        // Image is loaded, we can now perform zoom calculations
        setIsZoomReady(true);
    };

    const moveLens = (e: React.MouseEvent) => {
        if (!isZoomReady) return;

        const img = imgRef.current;
        const result = resultRef.current;
        const lens = lensRef.current;
        if (!img || !result || !lens) return;

        e.preventDefault();
        
        const { left, top, width, height } = img.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;

        const lensW = lens.offsetWidth;
        const lensH = lens.offsetHeight;

        let lensX = x - lensW / 2;
        let lensY = y - lensH / 2;

        if (lensX < 0) lensX = 0;
        if (lensY < 0) lensY = 0;
        if (lensX > width - lensW) lensX = width - lensW;
        if (lensY > height - lensH) lensY = height - lensH;

        lens.style.left = `${lensX}px`;
        lens.style.top = `${lensY}px`;

        const cx = result.offsetWidth / lensW;
        const cy = result.offsetHeight / lensH;

        result.style.backgroundSize = `${width * cx}px ${height * cy}px`;
        result.style.backgroundPosition = `-${lensX * cx}px -${lensY * cy}px`;
    };

    const handleMouseEnter = () => {
        if (isZoomReady && resultRef.current && lensRef.current) {
            resultRef.current.style.display = 'block';
            lensRef.current.style.display = 'block';
        }
    };

    const handleMouseLeave = () => {
        if (resultRef.current && lensRef.current) {
            resultRef.current.style.display = 'none';
            lensRef.current.style.display = 'none';
        }
    };

    return (
        <div 
            className="img-zoom-container w-full h-full"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={moveLens}
        >
            <img 
                ref={imgRef} 
                src={src} 
                alt={alt} 
                className="w-full h-full object-contain"
                onLoad={handleImageLoad} 
            />
            <div ref={resultRef} className="img-zoom-result right-[-410px] top-0 hidden"></div> 
            <div ref={lensRef} className="img-zoom-lens hidden"></div>
        </div>
    );
};


const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ product, onBack, onAddToCart }) => {
    const [selectedPackSize, setSelectedPackSize] = useState<PackSize>(product.packSizes[0]);
    const [quantity, setQuantity] = useState(1);
    const [currentImage, setCurrentImage] = useState(product.images[0]);
    const [isChatModalOpen, setIsChatModalOpen] = useState(false);

    useEffect(() => {
        setSelectedPackSize(product.packSizes[0]);
        setQuantity(1);
        setCurrentImage(product.images[0]);
    }, [product]);

    const handleQuantityChange = (amount: number) => {
        setQuantity(prev => {
            const newQuantity = prev + amount;
            if (newQuantity < 1) return 1;
            if (newQuantity > 20) return 20; // Max limit
            return newQuantity;
        });
    };

    const handleAddToCartClick = () => {
        onAddToCart({
            id: product.id,
            name: product.name,
            packSize: selectedPackSize.weight,
            price: selectedPackSize.price,
            quantity: quantity,
        });
        onBack(); // Go back to product list after adding to cart
    };

    const handleBuyNow = () => {
        const item = {
            name: product.name,
            packSize: selectedPackSize.weight,
            quantity: quantity,
            price: selectedPackSize.price
        };
        const itemTotal = item.price * item.quantity;
        
        let message = `Hello, I would like to buy the following item from Bengali Bites:\n\n`;
        message += `* ${item.name} (${item.packSize}) - Qty: ${item.quantity} - Price: ₹${itemTotal.toFixed(2)}\n`;
        message += `\n*Total: ₹${itemTotal.toFixed(2)}*\n\nPlease provide payment and shipping details.`;
        
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/+917864843669?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <>
            <main className="container mx-auto px-6 py-8 md:py-12 animate-slide-up">
                <button onClick={onBack} className="mb-6 text-amber-700 hover:text-amber-900 font-semibold flex items-center gap-2">
                    <i className="fas fa-arrow-left"></i>
                    Back to Products
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {/* Image Gallery */}
                    <div className="flex flex-col gap-4">
                        <div className="bg-[#F8F5EE] rounded-lg shadow-inner aspect-square flex items-center justify-center p-4">
                           <ImageZoom src={currentImage} alt={product.name} />
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            {product.images.map((img, index) => (
                                <div 
                                    key={index} 
                                    className={`aspect-square bg-stone-100 rounded-md cursor-pointer border-2 transition ${currentImage === img ? 'border-amber-500' : 'border-transparent hover:border-amber-300'}`}
                                    onClick={() => setCurrentImage(img)}
                                >
                                    <img src={img} alt={`${product.name} thumbnail ${index + 1}`} className="w-full h-full object-cover rounded-sm" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex flex-col">
                        <h1 className="text-4xl font-bold text-amber-900 mb-2">{product.name}</h1>
                        
                        <div className="mb-4">
                            <span className="text-4xl font-extrabold text-[#4B3A2C] mr-3">₹{selectedPackSize.price.toFixed(2)}</span>
                            {selectedPackSize.oldPrice && <span className="text-xl text-gray-500 line-through">₹{selectedPackSize.oldPrice.toFixed(2)}</span>}
                        </div>

                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Select Pack Size:</h3>
                            <div className="flex flex-wrap gap-3">
                                {product.packSizes.map(size => (
                                    <button
                                        key={size.weight}
                                        onClick={() => setSelectedPackSize(size)}
                                        className={`pack-size-card p-3 text-center border-2 rounded-lg cursor-pointer transition-all duration-200 min-w-[100px] ${selectedPackSize.weight === size.weight ? 'bg-amber-50 shadow-md border-amber-500' : 'bg-[#F2EFE8] border-transparent hover:border-amber-400'}`}
                                    >
                                        <h4 className="text-md font-bold text-gray-800">{size.weight}</h4>
                                        <p className="text-sm text-gray-600">₹{size.price.toFixed(2)}</p>
                                    </button>
                                ))}
                            </div>
                        </div>
                        
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center space-x-2 border rounded-lg bg-white p-1">
                                    <button onClick={() => handleQuantityChange(-1)} className="quantity-btn w-12 h-12 flex items-center justify-center text-2xl bg-[#F2EFE8] rounded-md hover:bg-stone-200 transition">-</button>
                                    <span className="w-16 text-center text-2xl font-semibold bg-transparent">{quantity}</span>
                                    <button onClick={() => handleQuantityChange(1)} className="quantity-btn w-12 h-12 flex items-center justify-center text-2xl bg-[#F2EFE8] rounded-md hover:bg-stone-200 transition">+</button>
                                </div>
                                <button onClick={handleAddToCartClick} className="w-full sm:w-auto flex-1 bg-amber-500 hover:bg-amber-600 text-white py-3 px-6 rounded-lg font-bold text-lg transition-all transform hover:scale-105 shadow-lg h-full">Add to Cart</button>
                            </div>
                            <button onClick={handleBuyNow} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-md text-lg font-bold shadow-lg transition-colors duration-200 flex items-center justify-center gap-2">
                                 <i className="fab fa-whatsapp text-xl"></i> Buy Now
                            </button>
                        </div>


                        <div className="mt-8 text-stone-700 space-y-2" dangerouslySetInnerHTML={{ __html: product.description }} />
                    </div>
                </div>
            </main>
            
            <button
                onClick={() => setIsChatModalOpen(true)}
                className="fixed bottom-6 right-6 bg-amber-500 hover:bg-amber-600 text-white font-bold p-4 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110 flex items-center gap-3 z-30"
                aria-label="Ask our Chatbot about this product"
            >
                <i className="fa-solid fa-wand-magic-sparkles text-2xl"></i>
                <span className="hidden sm:inline">Ask Chatbot</span>
            </button>
            
            <GeminiChatModal
                isOpen={isChatModalOpen}
                onClose={() => setIsChatModalOpen(false)}
                product={product}
            />
        </>
    );
};

export default ProductDetailPage;