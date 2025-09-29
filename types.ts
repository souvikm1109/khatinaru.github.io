export interface PackSize {
    weight: string;
    price: number;
    oldPrice?: number;
}

export interface Product {
    id: string;
    name: string;
    images: string[];
    badge?: string;
    description: string;
    approxLadoos: string;
    packSizes: PackSize[];
}

export interface CartItem {
    cartId: string;
    id: string;
    name: string;
    packSize: string;
    price: number;
    quantity: number;
}

export interface ChatMessage {
    role: 'user' | 'assistant';
    text: string;
}