'use client';

import { useState, useEffect } from 'react';

export default function ContactHero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative py-32 pt-40 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-teal-600 to-orange-600">
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12">
        <div className={`text-center transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Get in
            <span className="block text-amber-300 font-pacifico text-4xl lg:text-6xl mt-2">
              Touch
            </span>
          </h1>
          
          <p className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto mb-8">
            Ready to transform your time management? Our experts are here to help you find the perfect solution.
          </p>

          <div className="flex items-center justify-center gap-8">
            <div className="flex items-center gap-3 text-white/90">
              <i className="ri-phone-fill text-2xl"></i>
              <span className="font-medium">Call Us Today</span>
            </div>
            <div className="flex items-center gap-3 text-white/90">
              <i className="ri-mail-fill text-2xl"></i>
              <span className="font-medium">Email Support</span>
            </div>
            <div className="flex items-center gap-3 text-white/90">
              <i className="ri-map-pin-fill text-2xl"></i>
              <span className="font-medium">Visit Showroom</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}