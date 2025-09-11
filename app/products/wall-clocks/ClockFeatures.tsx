
'use client';

import { useState, useEffect, useRef } from 'react';

export default function ClockFeatures() {
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
      icon: 'ri-sound-module-line',
      title: 'Silent Movement',
      description: 'Whisper-quiet operation perfect for offices and meeting rooms'
    },
    {
      icon: 'ri-settings-3-line',
      title: 'Easy Installation',
      description: 'Simple wall mounting system with all hardware included'
    },
    {
      icon: 'ri-battery-charge-line',
      title: 'Long Battery Life',
      description: 'High-quality movements ensure years of reliable operation'
    },
    {
      icon: 'ri-eye-line',
      title: 'High Visibility',
      description: 'Large, clear displays readable from across the room'
    },
    {
      icon: 'ri-palette-line',
      title: 'Custom Designs',
      description: 'Personalized options with company logos and branding'
    },
    {
      icon: 'ri-shield-check-line',
      title: '2-Year Warranty',
      description: 'Comprehensive warranty covering all components'
    }
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-br from-orange-50 to-teal-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className={`text-center mb-16 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl lg:text-5xl font-bold text-amber-900 mb-4">
            Key <span className="text-teal-700 font-pacifico">Features</span>
          </h2>
          <p className="text-xl text-amber-700/80 max-w-3xl mx-auto">
            Designed with functionality and aesthetics in mind for professional environments
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
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-teal-500 rounded-xl flex items-center justify-center mb-6">
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
      </div>
    </section>
  );
}
