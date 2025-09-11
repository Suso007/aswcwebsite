'use client';

import { useState, useEffect, useRef } from 'react';

export default function TechnologyFeatures() {
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
      icon: 'ri-robot-fill',
      title: 'AI-Powered Analytics',
      description: 'Advanced machine learning algorithms for behavior pattern analysis and fraud detection'
    },
    {
      icon: 'ri-cloud-fill',
      title: 'Cloud Integration',
      description: 'Seamless cloud connectivity with real-time data synchronization and remote management'
    },
    {
      icon: 'ri-shield-check-fill',
      title: 'Enterprise Security',
      description: 'Military-grade encryption and multi-layer security protocols for data protection'
    },
    {
      icon: 'ri-smartphone-fill',
      title: 'Mobile Access',
      description: 'Complete mobile app suite for employees and administrators with offline capabilities'
    },
    {
      icon: 'ri-bar-chart-fill',
      title: 'Real-time Reports',
      description: 'Instant analytics dashboard with customizable reports and automated notifications'
    },
    {
      icon: 'ri-links-fill',
      title: 'API Integration',
      description: 'RESTful APIs for seamless integration with existing HR and payroll systems'
    }
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-br from-emerald-50 to-teal-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className={`text-center mb-16 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl lg:text-5xl font-bold text-amber-900 mb-4">
            Advanced <span className="text-teal-700 font-pacifico">Technology</span>
          </h2>
          <p className="text-xl text-amber-700/80 max-w-3xl mx-auto">
            Cutting-edge features that revolutionize workplace time and attendance management
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
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mb-6">
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

        {/* Technology Stats */}
        <div className={`mt-20 text-center transition-all duration-1000 delay-800 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-white rounded-3xl p-12 shadow-2xl">
            <h3 className="text-3xl font-bold text-amber-900 mb-6">
              Technology <span className="text-teal-700">Performance</span>
            </h3>
            <p className="text-lg text-amber-700/80 mb-8 max-w-3xl mx-auto">
              Our smart devices deliver industry-leading performance metrics and reliability standards.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600 mb-2">99.9%</div>
                <div className="text-amber-800 font-medium">Accuracy Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-teal-600 mb-2">&lt;0.5s</div>
                <div className="text-amber-800 font-medium">Recognition Speed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600 mb-2">24/7</div>
                <div className="text-amber-800 font-medium">System Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-teal-600 mb-2">100K+</div>
                <div className="text-amber-800 font-medium">User Capacity</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}