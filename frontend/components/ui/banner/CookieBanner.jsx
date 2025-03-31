"use client";

import { useState, useEffect } from 'react';

const CookieBanner = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const cookieAccepted = localStorage.getItem('cookieAccepted');
        if (!cookieAccepted) {
            setIsVisible(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookieAccepted', 'true');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <>
            <div
                className="fixed inset-x-0 bottom-0 bg-gray-900 bg-opacity-95 backdrop-blur-sm text-white py-4 px-6 flex items-center justify-center space-x-4 z-50 shadow-lg"
                style={{ animation: 'slideUp 0.5s ease-out forwards' }}
            >
                <p className="text-sm sm:text-base text-white m-0">
                    Этот сайт использует cookies для улучшения вашего опыта.
                </p>
                <button
                    onClick={handleAccept}
                    className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-lg shadow-md text-white bg-[#ff5500] hover:bg-[#ff6600] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff5500] transition-colors"
                >
                    Принять
                </button>
            </div>
            <style jsx>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
        </>
    );
};

export default CookieBanner;