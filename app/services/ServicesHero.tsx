'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ServicesHero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0">
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url('https://readdy.ai/api/search-image?query=modern%20office%20environment%20with%20biometric%20attendance%20system%2C%20professional%20time%20management%20solutions%2C%20corporate%20workspace%20with%20advanced%20technology%2C%20clean%20business%20setting&width=1920&height=1080&seq=services-hero&orientation=landscape')`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-teal-900/80 to-orange-900/60"></div>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center">
          <div className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Watch Services & Time Attendance
              <span className="block text-amber-300 font-pacifico text-4xl lg:text-6xl mt-2">
                Solutions
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-white/90 max-w-4xl mx-auto mb-8 leading-relaxed">
              Streamline your workforce management with our cutting-edge attendance systems and comprehensive support services.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <Link href="/buy-now">
                <button className="group bg-amber-500 hover:bg-amber-600 text-white px-10 py-5 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl whitespace-nowrap cursor-pointer">
                  <span className="flex items-center gap-3">
                    <i className="ri-shopping-cart-fill text-xl"></i>
                    Get Started
                    <i className="ri-arrow-right-line text-xl group-hover:translate-x-1 transition-transform"></i>
                  </span>
                </button>
              </Link>
              
              <Link href="/contact">
                <button className="group bg-transparent border-2 border-white text-white px-10 py-5 rounded-full text-lg font-semibold transition-all duration-300 hover:bg-white hover:text-teal-700 hover:scale-105 whitespace-nowrap cursor-pointer">
                  <span className="flex items-center gap-3">
                    <i className="ri-customer-service-2-line text-xl"></i>
                    Free Consultation
                  </span>
                </button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-4xl font-bold text-amber-300 mb-2">99.9%</div>
                <div className="text-white font-medium">Accuracy Rate</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-4xl font-bold text-amber-300 mb-2">24/7</div>
                <div className="text-white font-medium">System Monitoring</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-4xl font-bold text-amber-300 mb-2">500+</div>
                <div className="text-white font-medium">Installations</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}