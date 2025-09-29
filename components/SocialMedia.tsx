import React from 'react';

const SocialMedia: React.FC = () => {
    return (
        <section id="social-section" className="mt-16 md:mt-24 max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold text-amber-900 mb-2 animate-on-scroll">Follow Us</h3>
            <p className="text-xl text-stone-700 mb-6 animate-on-scroll">Share with your friends and family!</p>
            <div className="flex justify-center space-x-8">
                <div className="flex flex-col items-center">
                    <a href="https://www.instagram.com/khati_3669?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="block w-16 h-16 mb-2 rounded-full overflow-hidden transition-transform duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-pink-500 focus:ring-opacity-50 flex items-center justify-center bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600">
                        <i className="fab fa-instagram text-3xl text-white"></i>
                    </a>
                    <a href="https://www.instagram.com/khati_3669?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="text-pink-600 font-semibold text-lg transition-colors duration-300 hover:text-pink-800">
                        Instagram Profile
                    </a>
                </div>
            </div>
        </section>
    );
};

export default SocialMedia;
