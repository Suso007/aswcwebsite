'use client';

import { useState, useEffect, useRef } from 'react';

export default function Values() {
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

  const values = [
    {
      title: 'Precision',
      description: 'Every timepiece and system we deliver meets the highest standards of accuracy and reliability.',
      icon: 'ri-crosshair-line',
      color: 'from-teal-500 to-teal-600'
    },
    {
      title: 'Innovation',
      description: 'We continuously embrace new technologies to provide cutting-edge time management solutions.',
      icon: 'ri-lightbulb-line',
      color: 'from-orange-500 to-orange-600'
    },
    {
      title: 'Excellence',
      description: 'Our commitment to quality ensures that every product exceeds expectations and stands the test of time.',
      icon: 'ri-medal-line',
      color: 'from-amber-500 to-amber-600'
    },
    {
      title: 'Service',
      description: 'We believe in building lasting relationships through exceptional customer service and support.',
      icon: 'ri-customer-service-2-line',
      color: 'from-teal-600 to-orange-500'
    }
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-br from-teal-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className={`text-center mb-16 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl lg:text-5xl font-bold text-amber-900 mb-4">
            Our Core <span className="text-teal-700 font-pacifico">Values</span>
          </h2>
          <p className="text-xl text-amber-700/80 max-w-3xl mx-auto">
            The principles that guide everything we do and define who we are
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div
              key={value.title}
              className={`bg-white rounded-3xl p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 group cursor-pointer ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className={`w-20 h-20 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <i className={`${value.icon} text-3xl text-white`}></i>
              </div>

              <h3 className="text-2xl font-bold text-amber-900 mb-4 group-hover:text-teal-700 transition-colors duration-300">
                {value.title}
              </h3>

              <p className="text-amber-700/80 leading-relaxed">
                {value.description}
              </p>

              <div className="mt-6 pt-6 border-t border-amber-100">
                <div className="flex items-center justify-center gap-2 text-teal-600 font-medium group-hover:gap-3 transition-all duration-300">
                  <span>Learn More</span>
                  <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform duration-300"></i>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}