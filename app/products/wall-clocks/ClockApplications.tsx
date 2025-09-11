'use client';

import { useState, useEffect, useRef } from 'react';

export default function ClockApplications() {
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

  const applications = [
    {
      title: 'Corporate Offices',
      description: 'Executive boardrooms, meeting rooms, and reception areas',
      image: 'https://readdy.ai/api/search-image?query=modern%20corporate%20office%20with%20elegant%20wall%20clock%2C%20professional%20business%20environment%2C%20executive%20boardroom%20setting%2C%20contemporary%20workplace%20design&width=600&height=400&seq=app1&orientation=landscape',
      features: ['Digital displays', 'Silent operation', 'Professional aesthetics']
    },
    {
      title: 'Educational Institutions',
      description: 'Classrooms, libraries, and administrative offices',
      image: 'https://readdy.ai/api/search-image?query=modern%20classroom%20with%20wall%20clock%2C%20educational%20institution%20setting%2C%20professional%20learning%20environment%2C%20clean%20academic%20space&width=600&height=400&seq=app2&orientation=landscape',
      features: ['Large visibility', 'Durable construction', 'Low maintenance']
    },
    {
      title: 'Healthcare Facilities',
      description: 'Hospitals, clinics, and waiting areas',
      image: 'https://readdy.ai/api/search-image?query=modern%20healthcare%20facility%20with%20wall%20clock%2C%20hospital%20waiting%20area%2C%20medical%20office%20setting%2C%20clean%20professional%20environment&width=600&height=400&seq=app3&orientation=landscape',
      features: ['Easy cleaning', 'Quiet operation', 'Reliable timing']
    },
    {
      title: 'Retail Environments',
      description: 'Stores, boutiques, and commercial spaces',
      image: 'https://readdy.ai/api/search-image?query=modern%20retail%20store%20with%20stylish%20wall%20clock%2C%20commercial%20space%2C%20boutique%20interior%20design%2C%20professional%20shopping%20environment&width=600&height=400&seq=app4&orientation=landscape',
      features: ['Attractive designs', 'Brand customization', 'Customer appeal']
    }
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className={`text-center mb-16 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl lg:text-5xl font-bold text-amber-900 mb-4">
            Perfect <span className="text-teal-700 font-pacifico">Applications</span>
          </h2>
          <p className="text-xl text-amber-700/80 max-w-3xl mx-auto">
            Our wall clocks are designed to enhance various professional and commercial environments
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {applications.map((app, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br from-amber-50 to-teal-50 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 cursor-pointer ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={app.image}
                  alt={app.title}
                  className="w-full h-64 object-cover transition-transform duration-700 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              </div>
              
              <div className="p-8">
                <h3 className="text-2xl font-bold text-amber-900 mb-4">
                  {app.title}
                </h3>
                
                <p className="text-amber-700/80 mb-6 leading-relaxed">
                  {app.description}
                </p>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-teal-700">Key Benefits:</h4>
                  {app.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="text-amber-800 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Installation Support */}
        <div className={`mt-20 text-center transition-all duration-1000 delay-800 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-gradient-to-r from-teal-600 to-orange-600 rounded-3xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-6">
              Professional Installation & Support
            </h3>
            <p className="text-lg mb-8 max-w-3xl mx-auto">
              Our expert team provides complete installation services and ongoing support for all commercial applications.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <i className="ri-tools-fill text-4xl mb-4"></i>
                <h4 className="font-bold text-lg mb-2">Free Installation</h4>
                <p className="text-white/90">Professional mounting and setup included</p>
              </div>
              <div className="text-center">
                <i className="ri-customer-service-2-fill text-4xl mb-4"></i>
                <h4 className="font-bold text-lg mb-2">24/7 Support</h4>
                <p className="text-white/90">Round-the-clock technical assistance</p>
              </div>
              <div className="text-center">
                <i className="ri-refresh-line text-4xl mb-4"></i>
                <h4 className="font-bold text-lg mb-2">Maintenance Service</h4>
                <p className="text-white/90">Regular maintenance and battery replacement</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}