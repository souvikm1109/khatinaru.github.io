
import React, { useEffect, useState } from 'react';

interface MessageBoxProps {
    message: string | null;
}

const MessageBox: React.FC<MessageBoxProps> = ({ message }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (message) {
            setIsVisible(true);
            const timer = setTimeout(() => {
                setIsVisible(false);
            }, 2700); // A bit shorter than the CSS transition to allow fade-out
            return () => clearTimeout(timer);
        }
    }, [message]);

    return (
        <div 
            className={`fixed bottom-0 left-0 right-0 p-4 transition-transform duration-300 z-50 ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}
        >
            <div className="bg-green-500 text-white text-center font-semibold py-3 px-6 rounded-lg shadow-xl max-w-md mx-auto">
                <p>{message}</p>
            </div>
        </div>
    );
};

export default MessageBox;
