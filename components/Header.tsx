import React, { useState } from 'react';

interface HeaderProps {
    cartItemCount: number;
    onCartClick: () => void;
}

const Sidebar: React.FC<{ isOpen: boolean, onClose: () => void }> = ({ isOpen, onClose }) => (
    <>
        {/* Overlay */}
        <div
            className={`sidebar-overlay fixed inset-0 bg-black bg-opacity-50 z-30 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            onClick={onClose}
        ></div>
        
        {/* Sidebar Panel */}
        <div
            id="sidebar"
            className={`fixed top-0 left-0 h-full w-72 bg-[#f7f3e8] shadow-lg z-40 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
            <div className="p-4 flex justify-start items-center border-b border-stone-300 gap-6">
                 <button onClick={onClose} className="text-3xl text-stone-600 hover:text-stone-900">
                    <i className="fa-solid fa-xmark"></i>
                </button>
                <button aria-label="Search">
                    <i className="fa-solid fa-magnifying-glass text-2xl text-stone-700"></i>
                </button>
            </div>
            <nav className="flex flex-col text-xl text-stone-800">
                <a href="#" onClick={onClose} className="p-4 hover:bg-stone-200 transition-colors">Home</a>
                <a href="#" onClick={onClose} className="p-4 hover:bg-stone-200 transition-colors">Orders</a>
                <a href="#" onClick={onClose} className="p-4 hover:bg-stone-200 transition-colors">Track your order</a>
                <a href="#products-section" onClick={onClose} className="p-4 bg-stone-200 font-semibold">Products</a>
                <a href="#" onClick={onClose} className="p-4 hover:bg-stone-200 transition-colors">Return Policy</a>
                <a href="#" onClick={onClose} className="p-4 hover:bg-stone-200 transition-colors">About us</a>
                <a href="#" onClick={onClose} className="p-4 hover:bg-stone-200 transition-colors">Contact us</a>
                <a href="#" onClick={onClose} className="p-4 hover:bg-stone-200 transition-colors">Shipping Policy</a>
                <a href="#" onClick={onClose} className="p-4 hover:bg-stone-200 transition-colors">Terms of Service</a>
            </nav>
        </div>
    </>
);

const Header: React.FC<HeaderProps> = ({ cartItemCount, onCartClick }) => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    return (
        <>
            <header className="sticky top-0 bg-white shadow-sm z-20">
                <div className="container mx-auto px-6 py-3 flex justify-between items-center">
                    
                    {/* --- Desktop View --- */}
                    <a href="#" className="hidden md:flex items-center">
                        <h1 className="text-3xl font-bold text-amber-800">Bengali Bites</h1>
                    </a>
                    
                    <nav className="hidden md:flex space-x-8 text-lg font-semibold">
                        <a href="#" className="text-stone-700 hover:text-amber-800 transition-colors">Home</a>
                        <a href="#" className="text-stone-700 hover:text-amber-800 transition-colors">Orders</a>
                        <a href="#products-section" className="text-stone-700 hover:text-amber-800 transition-colors">Products</a>
                        <a href="#video-reviews-section" className="text-stone-700 hover:text-amber-800 transition-colors">Reviews</a>
                    </nav>

                    {/* --- Mobile View --- */}
                    <div className="flex items-center gap-6 md:hidden">
                        <button onClick={() => setSidebarOpen(true)} aria-label="Open menu">
                            <i className="fa-solid fa-bars text-2xl text-stone-700"></i>
                        </button>
                        <button aria-label="Search">
                            <i className="fa-solid fa-magnifying-glass text-xl text-stone-700"></i>
                        </button>
                    </div>

                    {/* --- Cart Button (Visible on all sizes) --- */}
                    <button 
                        onClick={onCartClick}
                        className="relative bg-teal-500 hover:bg-teal-600 text-white font-bold p-2 md:py-2 md:px-4 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center gap-2"
                        aria-label={`View cart with ${cartItemCount} items`}
                    >
                        <i className="fa-solid fa-cart-shopping text-xl"></i> 
                        <span className="hidden sm:inline">Cart</span>
                        {cartItemCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                {cartItemCount}
                            </span>
                        )}
                    </button>
                </div>
            </header>
            <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
        </>
    );
};

export default Header;