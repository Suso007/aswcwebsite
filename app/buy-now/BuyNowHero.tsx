'use client';

import { useState, useEffect } from 'react';

export default function BuyNowHero() {
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
            Ready to
            <span className="block text-amber-300 font-pacifico text-4xl lg:text-6xl mt-2">
              Buy Now?
            </span>
          </h1>
          
          <p className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto mb-8">
            Choose from our premium collection and experience the finest in timekeeping excellence.
          </p>

          <div className="flex items-center justify-center gap-6">
            <div className="flex items-center gap-2 text-white/90">
              <i className="ri-shield-check-fill text-2xl"></i>
              <span className="font-medium">Warranty Included</span>
            </div>
            <div className="flex items-center gap-2 text-white/90">
              <i className="ri-truck-fill text-2xl"></i>
              <span className="font-medium">Free Shipping</span>
            </div>
            <div className="flex items-center gap-2 text-white/90">
              <i className="ri-customer-service-2-fill text-2xl"></i>
              <span className="font-medium">Expert Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}