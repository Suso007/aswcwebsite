'use client';

import { useState, useEffect } from 'react';

export default function AboutHero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background */}
      <div className="absolute inset-0">
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url('https://readdy.ai/api/search-image?query=modern%20watch%20manufacturing%20facility%20with%20precision%20machinery%2C%20skilled%20craftsmen%20working%20on%20luxury%20timepieces%2C%20high-tech%20production%20environment%2C%20clean%20industrial%20setting%2C%20professional%20workspace&width=1920&height=1080&seq=about-hero&orientation=landscape')`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-teal-900/80 to-orange-900/60"></div>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center">
          <div className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Crafting Time
              <span className="block text-amber-300 font-pacifico text-4xl lg:text-6xl mt-2">
                Since 1908
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-white/90 max-w-4xl mx-auto mb-8 leading-relaxed">
              From traditional watchmaking to cutting-edge attendance solutions, we've been at the forefront of time management innovation for nearly four decades.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-4xl font-bold text-amber-300 mb-2">{new Date().getFullYear() - 1908}</div>
                <div className="text-white font-medium">Years of Excellence</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-4xl font-bold text-amber-300 mb-2">50K+</div>
                <div className="text-white font-medium">Timepieces Sold</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-4xl font-bold text-amber-300 mb-2">1000+</div>
                <div className="text-white font-medium">Corporate Clients</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}