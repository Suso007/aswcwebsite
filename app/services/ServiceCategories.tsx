"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

export type Service = {
  id: number;
  title: string;
  description: string;
  icon: string;
  image: string;
  features: string[];
  price?: number | null;
  duration?: string | null;
  category?: string;
};

export default function ServiceCategories() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  // Intersection Observer for animation
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

  // Fetch services from API
  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await fetch("/api/servicescategories");
        if (!res.ok) throw new Error("Failed to fetch services");
        const data = await res.json();
        setServices(data);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchServices();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-white/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div
          className={`text-center mb-16 transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-amber-900 mb-4">
            Service{" "}
            <span className="text-teal-700 font-pacifico">Categories</span>
          </h2>
          <p className="text-xl text-amber-700/80 max-w-3xl mx-auto">
            Comprehensive time and attendance solutions tailored to your
            business needs
          </p>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading services...</p>
        ) : services.length === 0 ? (
          <p className="text-center text-gray-500">No services available.</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={service.id}
                className={`bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 group cursor-pointer ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                    <div className="absolute bottom-4 left-4">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                        <i
                          className={`${service.icon} text-2xl text-white`}
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="text-2xl font-bold text-amber-900 mb-4 group-hover:text-teal-700 transition-colors duration-300">
                    {service.title}
                  </h3>

                  <p className="text-amber-700/80 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {service.features && service.features.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="font-semibold text-teal-700 mb-3">
                        Key Features:
                      </h4>
                      {service.features.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className="flex items-center gap-3"
                        >
                          <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <i className="ri-check-line text-teal-600 text-sm"></i>
                          </div>
                          <span className="text-amber-800">{feature}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-6 pt-6 border-t border-amber-100">
                    <Link href="/contact">
                      <button className="flex items-center gap-2 text-teal-600 font-semibold hover:text-teal-700 hover:gap-3 transition-all duration-300 cursor-pointer">
                        <span>Learn More</span>
                        <i className="ri-arrow-right-line"></i>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
