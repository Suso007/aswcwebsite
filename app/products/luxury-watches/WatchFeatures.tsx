'use client';

import { useState, useEffect, useRef } from 'react';

export default function WatchFeatures() {
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

  const features = [
    {
      icon: 'ri-settings-3-fill',
      title: 'Swiss Movement',
      description: 'Precision mechanical movements crafted by Swiss master watchmakers'
    },
    {
      icon: 'ri-shield-check-fill',
      title: 'Lifetime Warranty',
      description: 'Comprehensive warranty covering all mechanical components'
    },
    {
      icon: 'ri-drop-fill',
      title: 'Water Resistant',
      description: 'Professional water resistance up to 300 meters depth'
    },
    {
      icon: 'ri-vip-crown-fill',
      title: 'Premium Materials',
      description: 'Only the finest gold, platinum, and diamond accents'
    },
    {
      icon: 'ri-award-fill',
      title: 'Certified Authentic',
      description: 'Each watch comes with official Swiss certification'
    },
    {
      icon: 'ri-customer-service-fill',
      title: '24/7 Support',
      description: 'Dedicated customer service and maintenance support'
    }
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-br from-teal-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className={`text-center mb-16 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl lg:text-5xl font-bold text-amber-900 mb-4">
            Premium <span className="text-teal-700 font-pacifico">Features</span>
          </h2>
          <p className="text-xl text-amber-700/80 max-w-3xl mx-auto">
            Every detail crafted to perfection with uncompromising quality standards
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 cursor-pointer ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-orange-500 rounded-xl flex items-center justify-center mb-6">
                <i className={`${feature.icon} text-2xl text-white`}></i>
              </div>
              
              <h3 className="text-xl font-bold text-amber-900 mb-4">
                {feature.title}
              </h3>
              
              <p className="text-amber-700/80 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Quality Assurance Section */}
        <div className={`mt-20 text-center transition-all duration-1000 delay-800 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-white rounded-3xl p-12 shadow-2xl">
            <h3 className="text-3xl font-bold text-amber-900 mb-6">
              Quality <span className="text-teal-700">Assurance</span>
            </h3>
            <p className="text-lg text-amber-700/80 mb-8 max-w-3xl mx-auto">
              Each timepiece undergoes rigorous testing and quality control processes to ensure it meets our exceptional standards of excellence.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-teal-600 mb-2">300+</div>
                <div className="text-amber-800 font-medium">Quality Checks</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">48h</div>
                <div className="text-amber-800 font-medium">Testing Period</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-teal-600 mb-2">99.9%</div>
                <div className="text-amber-800 font-medium">Accuracy Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">25+</div>
                <div className="text-amber-800 font-medium">Years Expertise</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}