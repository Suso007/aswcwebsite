'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function WallClocksHero() {
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
            backgroundImage: `url('https://readdy.ai/api/search-image?query=modern%20wall%20clocks%20display%20in%20executive%20office%20showroom%2C%20contemporary%20timepiece%20designs%2C%20professional%20business%20environment%2C%20elegant%20presentation%2C%20various%20clock%20styles&width=1920&height=1080&seq=wall-clocks-hero&orientation=landscape')`,
            transform: `translateY(${scrollY * 0.5}px)`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
        </div>
      </div>

      {/* Floating elements with parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute top-32 right-32 w-40 h-40 bg-orange-200/30 rounded-full blur-2xl animate-pulse parallax-element animate-float"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        ></div>
        <div 
          className="absolute bottom-40 left-32 w-56 h-56 bg-teal-200/20 rounded-full blur-3xl animate-pulse delay-1000 parallax-element"
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-4xl">
          <div className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight drop-shadow-2xl mb-6">
              Wall <span className="text-orange-400 font-pacifico">Clocks</span>
            </h1>
            
            <p className="text-lg sm:text-xl lg:text-2xl text-white/90 font-medium mb-8 drop-shadow-lg">
              Transform your spaces with our collection of modern and classic wall clocks, designed for offices, homes, and commercial environments.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link href="/buy-now">
                <button className="bg-gradient-to-r from-orange-600 to-teal-600 hover:from-orange-700 hover:to-teal-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl whitespace-nowrap cursor-pointer">
                  <span className="flex items-center gap-3">
                    <i className="ri-time-line text-xl"></i>
                    Shop Clocks
                  </span>
                </button>
              </Link>
              
              <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 border-2 border-white/30 whitespace-nowrap cursor-pointer">
                <span className="flex items-center gap-3">
                  <i className="ri-calculator-line text-xl"></i>
                  Size Calculator
                </span>
              </button>
            </div>

            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2 text-white">
                <i className="ri-home-2-fill text-2xl text-orange-300"></i>
                <span className="font-semibold">Office & Home</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <i className="ri-sound-module-fill text-2xl text-teal-300"></i>
                <span className="font-semibold">Silent Movement</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <i className="ri-settings-3-fill text-2xl text-orange-300"></i>
                <span className="font-semibold">Easy Installation</span>
              </div>
            </div>
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