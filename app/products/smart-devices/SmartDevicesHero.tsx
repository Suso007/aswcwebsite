'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SmartDevicesHero() {
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
            backgroundImage: `url('https://readdy.ai/api/search-image?query=modern%20biometric%20attendance%20systems%20and%20smart%20devices%20in%20corporate%20office%2C%20advanced%20technology%20display%2C%20professional%20workplace%20solutions%2C%20cutting-edge%20time%20tracking%20equipment&width=1920&height=1080&seq=smart-devices-hero&orientation=landscape')`,
            transform: `translateY(${scrollY * 0.5}px)`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
        </div>
      </div>

      {/* Floating elements with parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute top-32 right-32 w-40 h-40 bg-emerald-200/30 rounded-full blur-2xl animate-pulse parallax-element animate-float"
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
              Smart <span className="text-emerald-400 font-pacifico">Devices</span>
            </h1>
            
            <p className="text-lg sm:text-xl lg:text-2xl text-white/90 font-medium mb-8 drop-shadow-lg">
              Revolutionize your workplace with advanced biometric systems, smart attendance tracking, and AI-powered time management solutions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link href="/buy-now">
                <button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl whitespace-nowrap cursor-pointer">
                  <span className="flex items-center gap-3">
                    <i className="ri-fingerprint-fill text-xl"></i>
                    Explore Tech
                  </span>
                </button>
              </Link>
              
              <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 border-2 border-white/30 whitespace-nowrap cursor-pointer">
                <span className="flex items-center gap-3">
                  <i className="ri-live-line text-xl"></i>
                  Live Demo
                </span>
              </button>
            </div>

            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2 text-white">
                <i className="ri-robot-fill text-2xl text-emerald-300"></i>
                <span className="font-semibold">AI Powered</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <i className="ri-cloud-fill text-2xl text-teal-300"></i>
                <span className="font-semibold">Cloud Ready</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <i className="ri-shield-check-fill text-2xl text-emerald-300"></i>
                <span className="font-semibold">Enterprise Security</span>
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