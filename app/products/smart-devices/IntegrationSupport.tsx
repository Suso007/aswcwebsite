'use client';

import { useState, useEffect, useRef } from 'react';

export default function IntegrationSupport() {
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

  const integrations = [
    {
      category: 'HR Systems',
      description: 'Seamless integration with popular HR management platforms',
      systems: ['SAP SuccessFactors', 'Workday', 'BambooHR', 'ADP Workforce'],
      icon: 'ri-team-fill',
      color: 'from-blue-500 to-indigo-500'
    },
    {
      category: 'Payroll Solutions',
      description: 'Direct connectivity to payroll processing systems',
      systems: ['QuickBooks', 'Sage Payroll', 'Paychex', 'Gusto'],
      icon: 'ri-money-dollar-circle-fill',
      color: 'from-green-500 to-emerald-500'
    },
    {
      category: 'Access Control',
      description: 'Integration with building security and access systems',
      systems: ['HID Global', 'Honeywell', 'Bosch Security', 'Axis Communications'],
      icon: 'ri-shield-keyhole-fill',
      color: 'from-orange-500 to-red-500'
    },
    {
      category: 'Communication',
      description: 'Connect with enterprise communication platforms',
      systems: ['Microsoft Teams', 'Slack', 'Zoom', 'Google Workspace'],
      icon: 'ri-message-3-fill',
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const supportServices = [
    {
      title: 'Free Consultation',
      description: 'Expert analysis of your requirements and system recommendations',
      icon: 'ri-customer-service-2-fill'
    },
    {
      title: 'Professional Installation',
      description: 'Complete setup and configuration by certified technicians',
      icon: 'ri-tools-fill'
    },
    {
      title: 'Training & Onboarding',
      description: 'Comprehensive training for administrators and end users',
      icon: 'ri-graduation-cap-fill'
    },
    {
      title: '24/7 Technical Support',
      description: 'Round-the-clock assistance and system monitoring',
      icon: 'ri-headphone-fill'
    }
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className={`text-center mb-16 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl lg:text-5xl font-bold text-amber-900 mb-4">
            Integration & <span className="text-teal-700 font-pacifico">Support</span>
          </h2>
          <p className="text-xl text-amber-700/80 max-w-3xl mx-auto">
            Seamless integration with existing systems and comprehensive support services
          </p>
        </div>

        {/* Integration Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {integrations.map((integration, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 cursor-pointer ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-16 h-16 bg-gradient-to-br ${integration.color} rounded-xl flex items-center justify-center`}>
                  <i className={`${integration.icon} text-2xl text-white`}></i>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-amber-900">{integration.category}</h3>
                  <p className="text-teal-600 font-medium">{integration.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {integration.systems.map((system, systemIndex) => (
                  <div
                    key={systemIndex}
                    className="bg-white rounded-lg p-3 text-center shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    <span className="text-amber-800 font-medium text-sm">{system}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Support Services */}
        <div className={`transition-all duration-1000 delay-600 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-amber-900 mb-4">
              Comprehensive <span className="text-teal-700">Support Services</span>
            </h3>
            <p className="text-lg text-amber-700/80 max-w-3xl mx-auto">
              From initial consultation to ongoing maintenance, we provide complete support throughout your journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {supportServices.map((service, index) => (
              <div
                key={index}
                className="text-center bg-gradient-to-br from-teal-50 to-emerald-50 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 cursor-pointer"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className={`${service.icon} text-2xl text-white`}></i>
                </div>
                
                <h4 className="text-lg font-bold text-amber-900 mb-4">
                  {service.title}
                </h4>
                
                <p className="text-amber-700/80 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className={`mt-20 text-center transition-all duration-1000 delay-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-6">
              Ready to Transform Your Workplace?
            </h3>
            <p className="text-lg mb-8 max-w-3xl mx-auto">
              Get started with a free consultation and discover how our smart devices can revolutionize your time and attendance management.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-emerald-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 whitespace-nowrap cursor-pointer">
                <span className="flex items-center gap-3 justify-center">
                  <i className="ri-phone-fill"></i>
                  Schedule Consultation
                </span>
              </button>
              
              <button className="bg-emerald-700 hover:bg-emerald-800 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 whitespace-nowrap cursor-pointer">
                <span className="flex items-center gap-3 justify-center">
                  <i className="ri-download-fill"></i>
                  Download Brochure
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}