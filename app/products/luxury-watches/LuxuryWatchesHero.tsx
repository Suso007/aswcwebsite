'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function LuxuryWatchesHero({ backgroundImage }: { backgroundImage: string }) {
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
            backgroundImage: `url('${backgroundImage}')`,
            transform: `translateY(${scrollY * 0.5}px)`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
        </div>
      </div>

      {/* Floating elements with parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute top-20 right-20 w-32 h-32 bg-amber-200/30 rounded-full blur-2xl animate-pulse parallax-element animate-float"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        ></div>
        <div 
          className="absolute bottom-32 left-20 w-48 h-48 bg-teal-200/20 rounded-full blur-3xl animate-pulse delay-1000 parallax-element"
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-4xl">
          <div className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight drop-shadow-2xl mb-6">
              Premium <span className="text-amber-400 font-pacifico">Watches</span>
            </h1>
            
            <p className="text-lg sm:text-xl lg:text-2xl text-white/90 font-medium mb-8 drop-shadow-lg">
              Discover the finest collection of Swiss luxury timepieces, crafted with precision and elegance for the discerning connoisseur.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link href="/buy-now">
                <button className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl whitespace-nowrap cursor-pointer">
                  <span className="flex items-center gap-3">
                    <i className="ri-vip-crown-fill text-xl"></i>
                    Shop Collection
                  </span>
                </button>
              </Link>
              
              <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 border-2 border-white/30 whitespace-nowrap cursor-pointer">
                <span className="flex items-center gap-3">
                  <i className="ri-play-circle-line text-xl"></i>
                  Watch Story
                </span>
              </button>
            </div>

            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2 text-white">
                <i className="ri-award-fill text-2xl text-amber-300"></i>
                <span className="font-semibold">Swiss Made Certified</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <i className="ri-shield-check-fill text-2xl text-teal-300"></i>
                <span className="font-semibold">Lifetime Warranty</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <i className="ri-star-fill text-2xl text-orange-300"></i>
                <span className="font-semibold">Premium Quality</span>
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