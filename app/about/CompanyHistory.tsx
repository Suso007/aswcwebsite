"use client";

import React, { useState, useEffect, useRef } from "react";

export type Milestone = {
  id: number;
  year: string;
  title: string;
  description: string;
  icon: string;
};

export default function CompanyHistory() {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return; // nothing to observe yet

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(node); // fire once
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [loading]);

  useEffect(() => {
    const fetchMilestones = async () => {
      try {
        const res = await fetch("/api/milestones");
        if (!res.ok) throw new Error("Failed to fetch milestones");
        const data = await res.json();
        setMilestones(data);
      } catch (error) {
        console.error("Error fetching milestones:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMilestones();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-white text-center">
        <p className="text-gray-500">Loading company history...</p>
      </section>
    );
  }

  if (milestones.length === 0) {
    return (
      <section className="py-16 bg-white text-center">
        <p className="text-gray-500">No milestones found.</p>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="py-24 bg-white/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div
          className={`text-center mb-16 transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-amber-900 mb-4">
            Our <span className="text-teal-700 font-pacifico">Journey</span>
          </h2>
          <p className="text-xl text-amber-700/80 max-w-3xl mx-auto">
            Four decades of innovation, craftsmanship, and dedication to
            precision
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-teal-300 to-orange-300 rounded-full"></div>

          <div className="space-y-16">
            {milestones.map((item) => (
              <div
                key={item.id}
                className={`flex items-center ${
                  item.id % 2 === 0 ? "flex-row" : "flex-row-reverse"
                } transition-all duration-700 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${item.id * 200}ms` }}
              >
                <div
                  className={`flex-1 ${item.id % 2 === 0 ? "pr-12" : "pl-12"}`}
                >
                  <div
                    className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 ${
                      item.id % 2 === 0 ? "text-right" : "text-left"
                    }`}
                  >
                    <div className="text-3xl font-bold text-teal-600 mb-2">
                      {item.year}
                    </div>
                    <h3 className="text-2xl font-bold text-amber-900 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-amber-700/80 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Center icon */}
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                    <i className={`${item.icon} text-2xl text-white`}></i>
                  </div>
                </div>

                <div className="flex-1"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
