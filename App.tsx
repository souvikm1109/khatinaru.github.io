
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Product, CartItem } from './types';
import { PRODUCTS } from './constants';
import Header from './components/Header';
import PhotoGallery from './components/PhotoGallery';
import ProductShowcase from './components/ProductShowcase';
import VideoReviews from './components/VideoReviews';
import SocialMedia from './components/SocialMedia';
import Footer from './components/Footer';
import ProductDetailPage from './components/ProductDetailPage';
import CartModal from './components/modals/CartModal';
import MessageBox from './components/ui/MessageBox';

// FIX: Removed React.FC type annotation to fix incorrect type inference by the compiler, which was causing a cascade of errors.
const App = () => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [viewingProductId, setViewingProductId] = useState<string | null>(null);
    const [isCartModalOpen, setCartModalOpen] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        try {
            const storedCart = localStorage.getItem('bengalibites_cart');
            if (storedCart) {
                setCart(JSON.parse(storedCart));
            }
        } catch (error) {
            console.error("Failed to parse cart from localStorage", error);
            localStorage.removeItem('bengalibites_cart');
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('bengalibites_cart', JSON.stringify(cart));
    }, [cart]);

    const showMessage = (msg: string) => {
        setMessage(msg);
        setTimeout(() => setMessage(null), 3000);
    };

    const handleProductClick = useCallback((productId: string) => {
        setViewingProductId(productId);
        window.scrollTo(0, 0);
    }, []);

    const handleBackToProducts = useCallback(() => {
        setViewingProductId(null);
    }, []);

    const addToCart = useCallback((item: Omit<CartItem, 'cartId'>) => {
        setCart(prevCart => {
            const existingItemIndex = prevCart.findIndex(
                cartItem => cartItem.id === item.id && cartItem.packSize === item.packSize
            );

            const totalItemsInCart = prevCart.reduce((sum, i) => sum + i.quantity, 0);
            const MAX_CART_ITEMS = 20;

            if (totalItemsInCart + item.quantity > MAX_CART_ITEMS) {
                showMessage(`You can only have a total of ${MAX_CART_ITEMS} items in your cart.`);
                return prevCart;
            }

            let newCart;
            if (existingItemIndex > -1) {
                newCart = [...prevCart];
                newCart[existingItemIndex].quantity += item.quantity;
            } else {
                newCart = [...prevCart, { ...item, cartId: `${item.id}-${item.packSize}-${Date.now()}` }];
            }
            showMessage(`${item.name} (${item.packSize}) added to cart.`);
            return newCart;
        });
    }, []);

    const removeFromCart = useCallback((cartId: string) => {
        setCart(prevCart => prevCart.filter(item => item.cartId !== cartId));
    }, []);
    
    useEffect(() => {
        const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
        const handleScrollAnimation = () => {
            const triggerBottom = window.innerHeight * 0.9;
            elementsToAnimate.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                if (elementTop < triggerBottom) {
                    element.classList.add('animate-slide-up');
                }
            });
        };
        window.addEventListener('scroll', handleScrollAnimation);
        handleScrollAnimation(); // Initial check
        return () => window.removeEventListener('scroll', handleScrollAnimation);
    }, [viewingProductId]);

    const viewingProduct = useMemo(() => (
        viewingProductId ? PRODUCTS.find(p => p.id === viewingProductId) : null
    ), [viewingProductId]);

    return (
        <>
            <Header cartItemCount={cart.reduce((acc, item) => acc + item.quantity, 0)} onCartClick={() => setCartModalOpen(true)} />
            
            {viewingProduct ? (
                <ProductDetailPage 
                    product={viewingProduct}
                    onBack={handleBackToProducts}
                    onAddToCart={addToCart}
                />
            ) : (
                <>
                    <PhotoGallery />
                    <main className="py-8 md:py-12">
                        <ProductShowcase products={PRODUCTS} onProductClick={handleProductClick} />
                        <VideoReviews />
                        <SocialMedia />
                    </main>
                </>
            )}

            <Footer />

            <CartModal
                isOpen={isCartModalOpen}
                onClose={() => setCartModalOpen(false)}
                cartItems={cart}
                onRemoveItem={removeFromCart}
                showMessage={showMessage}
            />

            <MessageBox message={message} />
        </>
    );
};

export default App;
