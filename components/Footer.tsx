
import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-stone-900 text-stone-300 py-10 mt-16">
            <div className="container mx-auto px-6 text-center md:text-left grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Bengali Bites and Socials */}
                <div className="col-span-1">
                    <h4 className="text-2xl font-bold text-white mb-2">Bengali Bites</h4>
                    <p className="text-sm text-stone-400 mb-4">
                        Authentic recipes delivered to your doorstep. Experience the true taste of tradition.
                    </p>
                    <div className="flex justify-center md:justify-start space-x-4">
                        <a href="https://www.instagram.com/khati_3669?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-white transition-colors"><i className="fab fa-instagram text-xl"></i></a>
                        <a href="https://www.facebook.com/profile.php?id=61579913873444" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-white transition-colors"><i className="fab fa-facebook text-xl"></i></a>
                        <a href="#" className="text-stone-400 hover:text-white transition-colors"><i className="fab fa-youtube text-xl"></i></a>
                        <a href="https://wa.me/+917864843669" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-white transition-colors"><i className="fab fa-whatsapp text-xl"></i></a>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="col-span-1">
                    <h4 className="text-xl font-semibold text-white mb-4">Quick Links</h4>
                    <ul className="space-y-2">
                        <li><a href="#" className="text-stone-400 hover:text-white transition-colors">Track Order</a></li>
                        <li><a href="#" className="text-stone-400 hover:text-white transition-colors">Return & Refund Policy</a></li>
                        <li><a href="#" className="text-stone-400 hover:text-white transition-colors">FAQ</a></li>
                        <li><a href="#" className="text-stone-400 hover:text-white transition-colors">Privacy Policy</a></li>
                    </ul>
                </div>

                {/* Company */}
                <div className="col-span-1">
                    <h4 className="text-xl font-semibold text-white mb-4">Company</h4>
                    <ul className="space-y-2">
                        <li><a href="#" className="text-stone-400 hover:text-white transition-colors">Our Story</a></li>
                        <li><a href="#" className="text-stone-400 hover:text-white transition-colors">Contact Us</a></li>
                    </ul>
                </div>

                {/* Get in Touch */}
                <div className="col-span-1">
                    <h4 className="text-xl font-semibold text-white mb-4">Get in Touch</h4>
                    <div className="space-y-2">
                        <p className="flex items-start justify-center md:justify-start">
                            <i className="fa-solid fa-location-dot text-lg mr-2 mt-1 text-amber-500 flex-shrink-0"></i>
                            <span>Coopers Camp, 7 no ward, Ranaghat, West Bengal 741232, India.</span>
                        </p>
                        <p className="flex items-center justify-center md:justify-start">
                            <i className="fa-solid fa-phone text-lg mr-2 text-amber-500"></i>
                            <a href="tel:+917864843669" className="text-stone-400 hover:text-white transition-colors">+91 7864843669</a>
                        </p>
                        <p className="flex items-center justify-center md:justify-start">
                            <i className="fa-solid fa-envelope text-lg mr-2 text-amber-500"></i>
                            <a href="mailto:sodaighar2025@gmail.com" className="text-stone-400 hover:text-white transition-colors">sodaighar2025@gmail.com</a>
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 border-t border-stone-700 mt-8 pt-6 text-center">
                <p className="text-sm text-stone-400">&copy; {new Date().getFullYear()} Bengali Bites. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;