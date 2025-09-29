
import React, { useState, useEffect, useRef } from 'react';
import { Product, ChatMessage } from '../../types';
import { askGeminiAboutProduct } from '../../services/geminiService';

interface GeminiChatModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: Product;
}

const LoadingIndicator: React.FC = () => (
    <div className="flex justify-start items-center gap-2 p-2">
        <div className="w-2 h-2 rounded-full bg-amber-500 animate-bounce"></div>
        <div className="w-2 h-2 rounded-full bg-amber-500 animate-bounce" style={{animationDelay: '0.2s'}}></div>
        <div className="w-2 h-2 rounded-full bg-amber-500 animate-bounce" style={{animationDelay: '0.4s'}}></div>
    </div>
);

const GeminiChatModal: React.FC<GeminiChatModalProps> = ({ isOpen, onClose, product }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatMessagesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            setMessages([{ 
                role: 'assistant', 
                text: `Hello, I'm your Chatbot. How can I help you with the product "${product.name}"?`
            }]);
        }
    }, [isOpen, product]);
    
    useEffect(() => {
        if (chatMessagesRef.current) {
            chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
        }
    }, [messages, isLoading]);

    const handleSendMessage = async () => {
        const userQuery = inputValue.trim();
        if (!userQuery || isLoading) return;

        const newMessages: ChatMessage[] = [...messages, { role: 'user', text: userQuery }];
        setMessages(newMessages);
        setInputValue('');
        setIsLoading(true);

        const historyForApi = newMessages.map(m => ({
            role: m.role === 'assistant' ? 'model' as const : 'user' as const,
            parts: [{ text: m.text }]
        }));

        const assistantResponse = await askGeminiAboutProduct(product, historyForApi);

        setMessages(prev => [...prev, { role: 'assistant', text: assistantResponse }]);
        setIsLoading(false);
    };

    if (!isOpen) return null;

    return (
        <div className={`fixed inset-0 bg-stone-900 bg-opacity-75 flex items-center justify-center p-4 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className={`bg-white rounded-lg shadow-2xl w-full max-w-2xl relative transition-transform duration-300 flex flex-col h-[90vh] max-h-[600px] ${isOpen ? 'scale-100' : 'scale-95'}`}>
                <div className="bg-amber-500 text-white py-3 px-4 flex justify-between items-center rounded-t-lg flex-shrink-0">
                    <h3 className="text-xl font-bold">✨ Chatbot</h3>
                    <button onClick={onClose} className="text-white hover:text-stone-200 text-3xl">&times;</button>
                </div>
                
                <div ref={chatMessagesRef} className="flex-grow p-4 overflow-y-auto flex flex-col gap-3 bg-[#f7f3e8]">
                    {messages.map((msg, index) => (
                        <div key={index} className={`max-w-[85%] py-2 px-4 rounded-2xl break-words ${msg.role === 'user' ? 'bg-stone-200 self-end rounded-br-none' : 'bg-white self-start rounded-bl-none whitespace-pre-wrap'}`}>
                            {msg.text}
                        </div>
                    ))}
                    {isLoading && (
                        <div className="self-start">
                            <LoadingIndicator />
                        </div>
                    )}
                </div>

                <div className="bg-white border-t border-stone-200 flex items-center p-4 rounded-b-lg flex-shrink-0">
                    <input 
                        type="text" 
                        placeholder="Type your question here..." 
                        className="flex-1 px-4 py-2 text-stone-800 bg-stone-100 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        disabled={isLoading}
                    />
                    <button onClick={handleSendMessage} disabled={isLoading} className="bg-amber-500 text-white p-2 rounded-full w-10 h-10 flex items-center justify-center ml-2 hover:bg-amber-600 transition-colors duration-200 disabled:opacity-50">
                        <i className="fas fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GeminiChatModal;