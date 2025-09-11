"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

export default function SupportServices() {
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

  const supportServices = [
    {
      title: "Installation & Setup",
      description: "Professional installation by certified technicians",
      icon: "ri-tools-line",
      details: [
        "Site survey and planning",
        "Hardware installation",
        "System configuration",
        "User training",
        "Testing and validation",
      ],
    },
    {
      title: "Maintenance & Updates",
      description:
        "Keep your systems running smoothly with regular maintenance",
      icon: "ri-settings-3-line",
      details: [
        "Preventive maintenance",
        "Software updates",
        "Performance optimization",
        "Security patches",
        "Hardware diagnostics",
      ],
    },
    {
      title: "24/7 Technical Support",
      description: "Round-the-clock assistance for critical issues",
      icon: "ri-customer-service-2-line",
      details: [
        "Phone and email support",
        "Remote diagnostics",
        "Emergency response",
        "Troubleshooting guides",
        "System monitoring",
      ],
    },
    {
      title: "Training & Consultation",
      description: "Comprehensive training programs for your team",
      icon: "ri-graduation-cap-line",
      details: [
        "Administrator training",
        "End-user workshops",
        "Best practices guidance",
        "Workflow optimization",
        "Ongoing consultation",
      ],
    },
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div
          className={`text-center mb-16 transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-amber-900 mb-4">
            Support{" "}
            <span className="text-teal-700 font-pacifico">Services</span>
          </h2>
          <p className="text-xl text-amber-700/80 max-w-3xl mx-auto">
            Comprehensive support to ensure your time management systems operate
            at peak performance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {supportServices.map((service, index) => (
            <div
              key={service.title}
              className={`bg-gradient-to-br from-amber-50 to-teal-50 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 group cursor-pointer ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-orange-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <i className={`${service.icon} text-2xl text-white`}></i>
              </div>

              <h3 className="text-xl font-bold text-amber-900 mb-4 group-hover:text-teal-700 transition-colors duration-300">
                {service.title}
              </h3>

              <p className="text-amber-700/80 mb-6 leading-relaxed">
                {service.description}
              </p>

              <div className="space-y-3">
                {service.details.map((detail, detailIndex) => (
                  <div key={detailIndex} className="flex items-start gap-3">
                    <div className="w-4 h-4 bg-teal-200 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                      <div className="w-2 h-2 bg-teal-600 rounded-full"></div>
                    </div>
                    <span className="text-amber-800 text-sm">{detail}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-amber-200">
                <Link href="/contact">
                  {" "}
                  <button className="flex items-center gap-2 text-teal-600 font-semibold hover:text-teal-700 hover:gap-3 transition-all duration-300 cursor-pointer">
                    <span>Learn More</span>
                    <i className="ri-arrow-right-line"></i>
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Support Stats */}
        <div
          className={`mt-16 bg-gradient-to-r from-teal-600 to-orange-600 rounded-3xl p-8 lg:p-12 shadow-2xl transition-all duration-1000 delay-800 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-white mb-4">
              Trusted Support Excellence
            </h3>
            <p className="text-white/90 text-lg max-w-2xl mx-auto">
              Our commitment to customer satisfaction is reflected in our
              support metrics
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-amber-300 mb-2">98%</div>
              <div className="text-white font-medium">
                Customer Satisfaction
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold text-amber-300 mb-2">
                &lt;2hr
              </div>
              <div className="text-white font-medium">Response Time</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-amber-300 mb-2">
                99.9%
              </div>
              <div className="text-white font-medium">System Uptime</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-amber-300 mb-2">24/7</div>
              <div className="text-white font-medium">Support Available</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
