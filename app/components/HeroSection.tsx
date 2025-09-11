
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden parallax-container">
      {/* Parallax Background */}
      <div className="absolute inset-0">
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat parallax-element"
          style={{
            backgroundImage: `url(/images/FRONT.JPG)`,
            transform: `translateY(${scrollY * 0.5}px)`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent"></div>
        </div>
      </div>

      {/* Floating clock elements with parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute top-20 right-20 w-32 h-20 bg-teal-100/30 rounded-full blur-xl animate-pulse parallax-element"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        ></div>
        <div 
          className="absolute top-40 left-20 w-24 h-16 bg-white/20 rounded-full blur-lg animate-pulse delay-1000 parallax-element"
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        ></div>
        <div 
          className="absolute bottom-40 right-1/4 w-40 h-24 bg-emerald-200/20 rounded-full blur-xl animate-pulse delay-2000 parallax-element animate-float"
          style={{ transform: `translateY(${scrollY * 0.4}px)` }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid lg:grid-cols-[4fr_1fr] gap-12 items-center min-h-screen">
          {/* Left Content */}
          <div className="space-y-4 lg:space-y-6">
            <div className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight drop-shadow-2xl">
                Precision Meets
                <span className="block text-teal-400 font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl mt-2">
                  Swiss Excellence
                </span>
              </h1>
            </div>
            
            <div className={`transition-all duration-1000 delay-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 font-medium mb-4 lg:mb-6 drop-shadow-lg">
                Discover luxury timepieces and advanced attendance solutions crafted with Swiss precision.
              </p>
              
            </div>

            <div className={`transition-all duration-1000 delay-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
                <Link href="/products">
                  <button className="group relative bg-gradient-to-r from-teal-600 to-emerald-700 hover:from-teal-700 hover:to-emerald-800 text-white px-5 sm:px-6 lg:px-8 py-3 lg:py-4 rounded-full text-sm sm:text-base lg:text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl whitespace-nowrap cursor-pointer w-full sm:w-auto">
                    <span className="flex items-center justify-center gap-2">
                      <i className="ri-time-fill text-base lg:text-lg"></i>
                      Explore Collection
                      <i className="ri-arrow-right-line text-base lg:text-lg group-hover:translate-x-2 transition-transform"></i>
                    </span>
                  </button>
                </Link>
                
                <Link href="/services">
                  <button className="group relative bg-white/95 hover:bg-white text-teal-700 px-5 sm:px-6 lg:px-8 py-3 lg:py-4 rounded-full text-sm sm:text-base lg:text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl whitespace-nowrap cursor-pointer border-2 border-white/50 w-full sm:w-auto">
                    <span className="flex items-center justify-center gap-2">
                      <i className="ri-settings-3-line text-base lg:text-lg"></i>
                      Business Solutions
                    </span>
                  </button>
                </Link>
              </div>
            </div>

            <div className={`flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3 sm:gap-4 lg:gap-6 transition-all duration-1000 delay-1500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="flex items-center gap-2 text-white bg-white/10 backdrop-blur-sm rounded-full px-3 lg:px-4 py-2">
                <i className="ri-award-fill text-lg lg:text-xl text-teal-300"></i>
                <span className="font-semibold text-xs lg:text-sm">50+ Swiss Brands</span>
              </div>
              <div className="flex items-center gap-2 text-white bg-white/10 backdrop-blur-sm rounded-full px-3 lg:px-4 py-2">
                <i className="ri-building-line text-lg lg:text-xl text-teal-300"></i>
                <span className="font-semibold text-xs lg:text-sm">1000+ Clients Served</span>
              </div>
              <div className="flex items-center gap-2 text-white bg-white/10 backdrop-blur-sm rounded-full px-3 lg:px-4 py-2">
                <i className="ri-shield-check-fill text-lg lg:text-xl text-teal-300"></i>
                <span className="font-semibold text-xs lg:text-sm">Lifetime Warranty</span>
              </div>
            </div>
          </div>

          {/* Right Side - Statistics & Info Cards */}
          <div className={`transition-all duration-1000 delay-800 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="space-y-6">
              {/* Feature Cards */}
              {/* Live Clock Display */}
              
              <div className="bg-white/15 backdrop-blur-sm rounded-xl lg:rounded-2xl p-3 sm:p-4 lg:p-6 inline-block shadow-2xl border border-white/20">
                <div className="text-center">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-teal-600 mb-1" suppressHydrationWarning={true}>
                    {currentTime.toLocaleTimeString()}
                  </div>
                  <div className="text-gray-700 font-medium text-xs sm:text-sm lg:text-base" suppressHydrationWarning={true}>
                    {currentTime.toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 lg:bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-5 h-8 lg:w-6 lg:h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-0.5 h-2 bg-white rounded-full mt-1.5 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
