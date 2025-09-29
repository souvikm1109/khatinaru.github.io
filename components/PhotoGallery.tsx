
import React, { useState, useEffect, useCallback } from 'react';
import { PRODUCTS } from '../constants';

const galleryImages = [
    "https://i.imgur.com/rMUM5Yp.jpg", // The main promotional image from the constants
    PRODUCTS[0].images[0], // Narkel Naru (Coconut Laddoo )
    PRODUCTS[2].images[0], // Nolen Gurer Sandesh
    PRODUCTS[3].images[2], // Mihidana
    PRODUCTS[1].images[1], // Narkel Naru (Coconut Ladoo With Jaggery) - alt
];

const PhotoGallery: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToNext = useCallback(() => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % galleryImages.length);
    }, []);

    const goToPrevious = () => {
        setCurrentIndex(prevIndex => (prevIndex - 1 + galleryImages.length) % galleryImages.length);
    };

    const goToSlide = (slideIndex: number) => {
        setCurrentIndex(slideIndex);
    };

    useEffect(() => {
        const timer = setInterval(() => {
            goToNext();
        }, 5000); // Change slide every 5 seconds

        return () => {
            clearInterval(timer); // Cleanup interval on component unmount
        };
    }, [goToNext]);

    return (
        <section id="photo-gallery-hero">
            <div className="relative w-full aspect-[21/9] overflow-hidden group bg-stone-200">
                {/* Slides Container */}
                <div className="w-full h-full">
                    {galleryImages.map((src, index) => (
                        <div
                            key={index}
                            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                        >
                            <img 
                                src={src} 
                                alt={`Promotional image of Bengali sweets ${index + 1}`} 
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>

                {/* Left Arrow */}
                <button
                    onClick={goToPrevious}
                    className="absolute top-1/2 left-4 -translate-y-1/2 bg-black bg-opacity-30 text-white rounded-full w-10 h-10 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100"
                    aria-label="Previous image"
                >
                    <i className="fas fa-chevron-left"></i>
                </button>

                {/* Right Arrow */}
                <button
                    onClick={goToNext}
                    className="absolute top-1/2 right-4 -translate-y-1/2 bg-black bg-opacity-30 text-white rounded-full w-10 h-10 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100"
                    aria-label="Next image"
                >
                    <i className="fas fa-chevron-right"></i>
                </button>
                
                {/* Dot Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
                    {galleryImages.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-3 h-3 rounded-full transition-colors ${index === currentIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/75'}`}
                            aria-label={`Go to slide ${index + 1}`}
                        ></button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PhotoGallery;