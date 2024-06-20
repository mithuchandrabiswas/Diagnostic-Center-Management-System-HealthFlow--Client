import React from 'react';

const Footer = () => {
    return (
        <div>
            {/* Footer */}
            <footer className="bg-gray-800 text-white py-10">
                <div className="container mx-auto px-4 md:px-8 lg:px-16">
                    <div className="flex flex-wrap justify-between gap-8">
                        {/* About us */}
                        <div className="flex-1 min-w-[200px]">
                            <h4 className="font-bold text-subheading">About us</h4>
                            <p className="text-paragraph">At HealthFlow, we provide accurate diagnostics with advanced technology, experienced professionals, and patient-focused car</p>
                        </div>

                        {/* Explore */}
                        <div className="flex-1 min-w-[200px]">
                            <h4 className="font-bold text-subheading">Explore</h4>
                            <ul>
                                <li><a href="/" className="link link-hover text-blue-300">Home</a></li>
                                <li><a href="/about-us" className="link link-hover text-blue-300">About us</a></li>
                                <li><a href="/contact-us" className="link link-hover text-blue-300">Contact Us</a></li>
                                <li><a href="/team" className="link link-hover text-blue-300">Specialist Team</a></li>
                            </ul>
                        </div>

                        {/* Recent news */}
                        <div className="flex-1 min-w-[200px]">
                            <h4 className="font-bold text-subheading">Recent news</h4>
                            <ul>
                                <li><a href="#" className="link link-hover text-blue-300">The best recreation areas for general immunity</a></li>
                                <li><a href="#" className="link link-hover text-blue-300">How can women protect themselves from breast cancer</a></li>
                            </ul>
                        </div>
                    </div>

                    {/* Footer bottom */}
                    <div className="mt-10 text-center">
                        <p>&copy; 2024 HealthFlow. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;