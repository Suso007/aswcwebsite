'use client';

import { useState, useEffect, useRef } from 'react';

export default function TestimonialsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  // Animate section on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [testimonials,testimonials.length]);

  // Auto-slide every 5 seconds
  useEffect(() => {
    if (testimonials.length === 0) return;
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Fetch testimonials from API
  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const res = await fetch('/api/testimonials');
        if (res.ok) {
          const data = await res.json();
          setTestimonials(data);
        }
      } catch (error) {
        console.error('Failed to fetch testimonials', error);
      }
    }
    fetchTestimonials();
  }, []);

  if (testimonials.length === 0) {
    return (
      <section className="py-24 text-center">
        <p className="text-gray-500">Loading testimonials...</p>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-gradient-to-br from-amber-50 to-teal-50 relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-32 left-10 w-64 h-64 bg-orange-200/20 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-32 right-10 w-80 h-80 bg-teal-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-amber-200/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div
          className={`text-center mb-16 transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-amber-900 mb-6">
            Client <span className="text-teal-700 font-pacifico">Testimonials</span>
          </h2>
          <p className="text-xl text-amber-700/80 max-w-3xl mx-auto">
            Discover what our satisfied clients say about our timepieces and attendance solutions
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-700 cursor-pointer group ${
                activeTestimonial === index
                  ? 'scale-105 ring-4 ring-teal-200 shadow-2xl'
                  : 'hover:scale-102'
              } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${index * 200}ms` }}
              onClick={() => setActiveTestimonial(index)}
            >
              {/* Profile */}
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover border-4 border-teal-100 group-hover:border-teal-300 transition-colors duration-300"
                  />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center">
                    <i className="ri-shield-check-fill text-white text-xs"></i>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-amber-900 text-lg">{testimonial.name}</h4>
                  <p className="text-teal-700 font-medium">{testimonial.position}</p>
                  <p className="text-amber-600 text-sm">{testimonial.company}</p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <i key={i} className="ri-star-fill text-orange-400 text-lg"></i>
                ))}
              </div>

              {/* Quote */}
              <div className="relative">
                <i className="ri-double-quotes-l text-4xl text-teal-200 absolute -top-2 -left-2"></i>
                <p className="text-amber-800/90 leading-relaxed pl-6 italic">
                  {testimonial.testimonial}
                </p>
                <i className="ri-double-quotes-r text-4xl text-teal-200 absolute -bottom-2 -right-2"></i>
              </div>

              {/* Verification badge */}
              <div className="mt-6 pt-6 border-t border-amber-100">
                <div className="flex items-center justify-between">
                  <span className="text-teal-600 text-sm font-medium flex items-center gap-2">
                    <i className="ri-verified-badge-fill"></i>
                    Verified Client
                  </span>
                  <span className="text-amber-600 text-sm">
                    {new Date().getFullYear()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
          
        {/* Testimonial indicators */}
        <div
          className={`flex justify-center gap-3 mt-12 transition-all duration-1000 delay-800 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveTestimonial(index)}
              className={`w-4 h-4 rounded-full transition-all duration-300 cursor-pointer ${
                activeTestimonial === index
                  ? 'bg-teal-600 scale-125 shadow-lg'
                  : 'bg-amber-300 hover:bg-teal-300 hover:scale-110'
              }`}
            />
          ))}
        </div>

        {/* Stats */}
        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 transition-all duration-1000 delay-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="text-center">
            <div className="text-4xl font-bold text-teal-700 mb-2">1000+</div>
            <div className="text-amber-800 font-medium">Happy Clients</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-600 mb-2">98%</div>
            <div className="text-amber-800 font-medium">Satisfaction Rate</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-teal-700 mb-2">24/7</div>
            <div className="text-amber-800 font-medium">Support Available</div>
          </div>
        </div>
      </div>
    </section>
  );
}
