
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function ProductsHero() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden parallax-container">
      {/* Parallax Background */}
      <div className="absolute inset-0">
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat parallax-element"
          style={{
            backgroundImage: `url('https://readdy.ai/api/search-image?query=luxury%20timepiece%20showroom%20with%20Swiss%20watches%2C%20wall%20clocks%20and%20smart%20devices%20display%2C%20elegant%20retail%20environment%2C%20premium%20product%20showcase%2C%20professional%20lighting&width=1920&height=1080&seq=products-hero&orientation=landscape')`,
            transform: `translateY(${scrollY * 0.5}px)`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent"></div>
        </div>
      </div>

      {/* Floating elements with parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute top-32 right-32 w-40 h-40 bg-teal-200/20 rounded-full blur-2xl animate-pulse parallax-element"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        ></div>
        <div 
          className="absolute bottom-32 left-32 w-56 h-56 bg-orange-200/20 rounded-full blur-3xl animate-pulse delay-1000 parallax-element"
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 text-center">
        <div className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight drop-shadow-2xl mb-6">
            Premium <span className="text-teal-400 font-pacifico">Products</span>
          </h1>
          
          <p className="text-lg sm:text-xl lg:text-2xl text-white/90 font-medium max-w-4xl mx-auto mb-8 drop-shadow-lg">
            Discover our comprehensive collection of Swiss timepieces, elegant wall clocks, and advanced smart attendance solutions
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/products/luxury-watches">
                  <button className="group relative text-white bg-white/10 backdrop-blur-sm px-5 sm:px-6 lg:px-8 py-3 lg:py-4 rounded-full text-sm sm:text-base lg:text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl whitespace-nowrap cursor-pointer w-full sm:w-auto">
                    <span className="flex items-center justify-center gap-2">
                      {/*<i className="ri-time-fill text-base lg:text-lg text-orange-300"></i>*/}
                      Primium Watches
                      <i className="ri-arrow-right-line text-base lg:text-lg group-hover:translate-x-2 transition-transform"></i>
                    </span>
                  </button>
                </Link>
            <Link href="/products/wall-clocks">
                  <button className="group relative text-white bg-white/10 backdrop-blur-sm px-5 sm:px-6 lg:px-8 py-3 lg:py-4 rounded-full text-sm sm:text-base lg:text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl whitespace-nowrap cursor-pointer w-full sm:w-auto">
                    <span className="flex items-center justify-center gap-2">
                      {/*<i className="ri-time-fill text-base lg:text-lg text-orange-300"></i>*/}
                      Wall Clocks
                      <i className="ri-arrow-right-line text-base lg:text-lg group-hover:translate-x-2 transition-transform"></i>
                    </span>
                  </button>
                </Link>
                <Link href="/products/smart-devices">
                  <button className="group relative text-white bg-white/10 backdrop-blur-sm px-5 sm:px-6 lg:px-8 py-3 lg:py-4 rounded-full text-sm sm:text-base lg:text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl whitespace-nowrap cursor-pointer w-full sm:w-auto">
                    <span className="flex items-center justify-center gap-2">
                      {/*<i className="ri-time-fill text-base lg:text-lg text-orange-300"></i>*/}
                      Smart Devices
                      <i className="ri-arrow-right-line text-base lg:text-lg group-hover:translate-x-2 transition-transform"></i>
                    </span>
                  </button>
                </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-0.5 h-2 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
