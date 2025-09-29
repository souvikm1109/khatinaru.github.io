

import React from 'react';
import { CartItem } from '../../types';

interface CartModalProps {
    isOpen: boolean;
    onClose: () => void;
    cartItems: CartItem[];
    onRemoveItem: (cartId: string) => void;
    showMessage: (message: string) => void;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose, cartItems, onRemoveItem, showMessage }) => {
    if (!isOpen) return null;

    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const handleWhatsAppOrder = () => {
        if (cartItems.length === 0) {
            showMessage('Your cart is empty. Please add items before ordering.');
            return;
        }

        let message = `Hello, I would like to place an order from Bengali Bites. Here is my cart:\n\n`;
        let total = 0;

        cartItems.forEach(item => {
            const itemTotal = item.price * item.quantity;
            message += `* ${item.name} (${item.packSize}) - Qty: ${item.quantity} - Price: ₹${itemTotal.toFixed(2)}\n`;
            total += itemTotal;
        });
        
        message += `\n*Total: ₹${total.toFixed(2)}*\n\nPlease provide payment and shipping details.`;
        
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/+917864843669?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <div className={`fixed inset-0 bg-stone-900 bg-opacity-75 flex items-center justify-center p-4 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className={`bg-white rounded-lg p-6 sm:p-8 shadow-2xl max-w-lg w-full relative transition-transform duration-300 ${isOpen ? 'scale-100' : 'scale-95'}`}>
                <button onClick={onClose} className="absolute top-4 right-4 text-stone-500 hover:text-stone-800 text-3xl">&times;</button>
                <h4 className="text-2xl font-bold text-amber-800 mb-4">Your Cart</h4>
                <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
                    {cartItems.length === 0 ? (
                        <div className="text-center py-8 text-stone-500">Your cart is empty.</div>
                    ) : (
                        cartItems.map(item => (
                            <div key={item.cartId} className="flex justify-between items-center py-2 border-b last:border-b-0 border-stone-200">
                                <div>
                                    <h5 className="font-semibold text-stone-800">{item.name}</h5>
                                    <p className="text-sm text-stone-600">{item.packSize} x {item.quantity}</p>
                                    <p className="text-sm font-bold text-amber-800">₹{(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                                <button onClick={() => onRemoveItem(item.cartId)} className="text-red-500 hover:text-red-700 transition-colors text-lg p-2">
                                    <i className="fas fa-trash"></i>
                                </button>
                            </div>
                        ))
                    )}
                </div>
                {cartItems.length > 0 && (
                    <div className="mt-6 pt-4 border-t border-stone-200">
                        <p className="text-lg font-bold text-stone-800 flex justify-between">
                            Total: <span>₹{totalPrice.toFixed(2)}</span>
                        </p>
                        <button onClick={handleWhatsAppOrder} className="bg-emerald-600 hover:bg-emerald-700 text-white w-full py-3 rounded-md text-lg font-bold shadow-lg transition-colors duration-200 flex items-center justify-center gap-2 mt-4">
                            <i className="fab fa-whatsapp text-xl"></i> Order via WhatsApp
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartModal;