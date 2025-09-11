"use client";

import { useState, useEffect, useRef } from "react";

export default function WatchTestimonials() {
  const [isVisible, setIsVisible] = useState(false);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    fetch("/api/watchTestimonial")
      .then((res) => res.json())
      .then((data) => setTestimonials(data));
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Heading */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-amber-900 mb-4">
            Customer{" "}
            <span className="text-teal-700 font-pacifico">Reviews</span>
          </h2>
          <p className="text-xl text-amber-700/80 max-w-3xl mx-auto">
            Hear from our satisfied customers who have experienced Swiss
            excellence
          </p>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`bg-gradient-to-br from-amber-50 to-teal-50 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 cursor-pointer ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <div>
                  <h4 className="font-bold text-amber-900 text-lg">
                    {testimonial.name}
                  </h4>
                  <p className="text-teal-700 font-medium">
                    {testimonial.position}
                  </p>
                  <p className="text-orange-600 text-sm font-medium">
                    {testimonial.watch}
                  </p>
                </div>
              </div>

              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <i
                    key={i}
                    className="ri-star-fill text-orange-400 text-lg"
                  ></i>
                ))}
              </div>

              <div className="relative">
                <i className="ri-double-quotes-l text-4xl text-teal-300 absolute -top-2 -left-2"></i>
                <p className="text-amber-800/90 leading-relaxed pl-6 italic">
                  {testimonial.testimonial}
                </p>
                <i className="ri-double-quotes-r text-4xl text-teal-300 absolute -bottom-2 -right-2"></i>
              </div>

              <div className="mt-6 pt-6 border-t border-amber-200">
                <div className="flex items-center justify-center">
                  <span className="text-teal-600 text-sm font-medium flex items-center gap-2">
                    <i className="ri-verified-badge-fill"></i>
                    Verified Purchase
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
