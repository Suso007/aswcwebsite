
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function CTASection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-600 via-teal-700 to-orange-600">
        <div className="absolute inset-0 bg-black/20"></div>
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url('https://readdy.ai/api/search-image?query=elegant%20luxury%20watch%20collection%20displayed%20in%20premium%20showroom%20with%20sophisticated%20lighting%2C%20high-end%20timepieces%2C%20modern%20retail%20environment%2C%20professional%20display%20cases%2C%20warm%20ambient%20lighting&width=1920&height=800&seq=cta1&orientation=landscape')`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-teal-800/80 to-orange-800/80"></div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-orange-300/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-teal-300/20 rounded-full blur-lg animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className={`text-center transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Ready to Upgrade Your
              <span className="block text-amber-300 font-pacifico text-3xl lg:text-5xl mt-2">
                Time Management?
              </span>
            </h2>
            
            <p className="text-xl lg:text-2xl text-white/90 mb-8 leading-relaxed">
              Discover premium timepieces and cutting-edge attendance solutions that transform how you manage time.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <div className="flex items-center gap-3 text-white/90">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <i className="ri-award-fill text-xl"></i>
                </div>
                <span className="font-medium">Premium Quality Guaranteed</span>
              </div>
              <div className="flex items-center gap-3 text-white/90">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <i className="ri-tools-fill text-xl"></i>
                </div>
                <span className="font-medium">Professional Installation</span>
              </div>
              <div className="flex items-center gap-3 text-white/90">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <i className="ri-customer-service-2-fill text-xl"></i>
                </div>
                <span className="font-medium">24/7 Support</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/buy-now"
                className="group bg-white text-teal-700 px-12 py-6 rounded-full text-xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-2xl whitespace-nowrap cursor-pointer inline-block"
              >
                <span className="flex items-center gap-4">
                  <i className="ri-shopping-cart-2-fill text-2xl"></i>
                  Shop Now
                  <i className="ri-arrow-right-line text-xl group-hover:translate-x-2 transition-transform"></i>
                </span>
              </Link>

              <Link
                href="/contact"
                className="group bg-transparent border-2 border-white text-white px-12 py-6 rounded-full text-xl font-bold transition-all duration-300 hover:bg-white hover:text-teal-700 hover:scale-105 whitespace-nowrap cursor-pointer inline-block"
              >
                <span className="flex items-center gap-4">
                  <i className="ri-phone-fill text-2xl"></i>
                  Get Consultation
                </span>
              </Link>
            </div>

            <div className="mt-12 text-center">
              <p className="text-white/80 text-lg">
                Join 1000+ satisfied customers who trust TimeZone
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}