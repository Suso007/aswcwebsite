'use client';

import { useState, useEffect, useRef } from 'react';

export default function ProductSpecs() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSpec, setActiveSpec] = useState(0);
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

  const specifications = [
    {
      title: 'Luxury Watches',
      icon: 'ri-vip-crown-fill',
      specs: [
        { label: 'Movement', value: 'Swiss Automatic/Quartz' },
        { label: 'Case Material', value: 'Stainless Steel/Gold' },
        { label: 'Crystal', value: 'Sapphire Crystal' },
        { label: 'Water Resistance', value: '100m - 300m' },
        { label: 'Power Reserve', value: '38-42 Hours' },
        { label: 'Warranty', value: '2-5 Years International' }
      ],
      features: [
        'Swiss certified movements',
        'Scratch-resistant sapphire crystal',
        'Premium leather/metal straps',
        'Luminescent hands and markers',
        'Date/chronograph functions'
      ]
    },
    {
      title: 'Wall Clocks',
      icon: 'ri-home-2-fill',
      specs: [
        { label: 'Display Type', value: 'Analog/Digital/Hybrid' },
        { label: 'Size Range', value: '12" - 24" Diameter' },
        { label: 'Power Source', value: 'Battery/AC Adapter' },
        { label: 'Accuracy', value: '±15 seconds/month' },
        { label: 'Material', value: 'Metal/Wood/Acrylic' },
        { label: 'Mounting', value: 'Wall Mount/Bracket' }
      ],
      features: [
        'Silent quartz movement',
        'LED backlighting options',
        'Weather-resistant finishes',
        'Remote control capability',
        'Multiple time zone display'
      ]
    },
    {
      title: 'Attendance Systems',
      icon: 'ri-smartphone-fill',
      specs: [
        { label: 'Recognition Type', value: 'Biometric/RFID/PIN' },
        { label: 'Capacity', value: '500-10,000 Users' },
        { label: 'Connectivity', value: 'WiFi/Ethernet/4G' },
        { label: 'Display', value: '4.3" - 10" Touchscreen' },
        { label: 'Storage', value: '100,000+ Records' },
        { label: 'Operating Temp', value: '-10°C to 60°C' }
      ],
      features: [
        'Multi-modal biometric verification',
        'Real-time cloud synchronization',
        'Advanced reporting dashboard',
        'Mobile app integration',
        'Access control integration'
      ]
    }
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-br from-amber-50 to-teal-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className={`text-center mb-16 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl lg:text-5xl font-bold text-amber-900 mb-4">
            Technical <span className="text-teal-700 font-pacifico">Specifications</span>
          </h2>
          <p className="text-xl text-amber-700/80 max-w-3xl mx-auto">
            Detailed specifications and features for our premium product categories
          </p>
        </div>

        {/* Spec Tabs */}
        <div className={`flex justify-center mb-12 transition-all duration-1000 delay-300 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex bg-white rounded-full p-2 shadow-lg">
            {specifications.map((spec, index) => (
              <button
                key={index}
                onClick={() => setActiveSpec(index)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer ${
                  activeSpec === index
                    ? 'bg-teal-600 text-white shadow-lg'
                    : 'text-amber-800 hover:bg-teal-50'
                }`}
              >
                <i className={`${spec.icon} text-lg`}></i>
                {spec.title}
              </button>
            ))}
          </div>
        </div>

        {/* Active Specification */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Specifications Table */}
          <div className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-orange-500 rounded-xl flex items-center justify-center">
                  <i className={`${specifications[activeSpec].icon} text-2xl text-white`}></i>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-amber-900">{specifications[activeSpec].title}</h3>
                  <p className="text-teal-600 font-medium">Technical Specifications</p>
                </div>
              </div>

              <div className="space-y-4">
                {specifications[activeSpec].specs.map((spec, index) => (
                  <div key={index} className="flex items-center justify-between py-3 px-4 bg-gradient-to-r from-amber-50 to-teal-50 rounded-lg">
                    <span className="text-amber-800 font-medium">{spec.label}</span>
                    <span className="text-teal-700 font-semibold">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Features */}
          <div className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <h4 className="text-2xl font-bold text-amber-900 mb-8 flex items-center gap-3">
                <i className="ri-star-fill text-orange-500"></i>
                Key Features
              </h4>

              <div className="space-y-6">
                {specifications[activeSpec].features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <i className="ri-check-line text-teal-600"></i>
                    </div>
                    <div>
                      <p className="text-amber-800 font-medium leading-relaxed">{feature}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-amber-100">
                <div className="flex gap-4">
                  <button className="flex-1 bg-gradient-to-r from-teal-600 to-orange-600 hover:from-teal-700 hover:to-orange-700 text-white py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 whitespace-nowrap cursor-pointer">
                    Request Detailed Specs
                  </button>
                  <button className="px-6 py-3 border-2 border-teal-300 text-teal-700 rounded-full font-semibold hover:bg-teal-50 transition-all duration-300 whitespace-nowrap cursor-pointer">
                    Download PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Certification Badges */}
        <div className={`mt-16 transition-all duration-1000 delay-800 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-white rounded-3xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-amber-900 text-center mb-8">
              Certifications & Quality Standards
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 text-center">
              <div className="group">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                  <i className="ri-award-fill text-2xl text-white"></i>
                </div>
                <p className="text-amber-800 font-medium text-sm">ISO 9001</p>
              </div>
              
              <div className="group">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                  <i className="ri-shield-check-fill text-2xl text-white"></i>
                </div>
                <p className="text-amber-800 font-medium text-sm">CE Certified</p>
              </div>
              
              <div className="group">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                  <i className="ri-leaf-fill text-2xl text-white"></i>
                </div>
                <p className="text-amber-800 font-medium text-sm">RoHS Compliant</p>
              </div>
              
              <div className="group">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-600 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                  <i className="ri-global-line text-2xl text-white"></i>
                </div>
                <p className="text-amber-800 font-medium text-sm">FCC Approved</p>
              </div>
              
              <div className="group">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                  <i className="ri-secure-payment-fill text-2xl text-white"></i>
                </div>
                <p className="text-amber-800 font-medium text-sm">Swiss Made</p>
              </div>
              
              <div className="group">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                  <i className="ri-thumb-up-fill text-2xl text-white"></i>
                </div>
                <p className="text-amber-800 font-medium text-sm">Quality Assured</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}