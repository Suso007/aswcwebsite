"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

type AttendanceSolution = {
  id: number;
  title: string;
  description: string;
  icon: string;
  features: string[];
  pricing: string;
  image: string;
};

export default function AttendanceSolutions() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [solutions, setSolutions] = useState<AttendanceSolution[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  // Intersection Observer for animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [activeTab, solutions.length]);

  // Fetch data from API
  useEffect(() => {
    let isMounted = true;
    async function fetchSolutions() {
      try {
        console.log("🔄 Fetching attendance solutions...");
        const res = await fetch("/api/attendance-solutions");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        console.log("📦 Received attendance solutions:", data);
        if (isMounted) setSolutions(data);
      } catch (err) {
        console.error("❌ Error fetching attendance solutions:", err);
      }
    }
    fetchSolutions();
    return () => {
      isMounted = false;
    };
  }, []);

  if (!solutions.length) {
    return (
      <section className="py-24 bg-gradient-to-br from-teal-50 to-orange-50 text-center">
        <p className="text-gray-500">Loading attendance solutions...</p>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-gradient-to-br from-teal-50 to-orange-50"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Heading */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-amber-900 mb-4">
            Attendance{" "}
            <span className="text-teal-700 font-pacifico">Solutions</span>
          </h2>
          <p className="text-xl text-amber-700/80 max-w-3xl mx-auto">
            Tailored solutions for every business size and industry requirement
          </p>
        </div>

        {/* Tabs */}
        <div
          className={`flex justify-center mb-12 transition-all duration-1000 delay-300 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex flex-wrap bg-white rounded-full p-1 sm:p-2 shadow-lg">
            {solutions.map((solution, index) => (
              <button
                key={solution.id}
                onClick={() => setActiveTab(index)}
                className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 text-xs sm:text-base rounded-full font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer ${
                  activeTab === index
                    ? "bg-teal-600 text-white shadow-lg"
                    : "text-amber-800 hover:bg-teal-50"
                }`}
              >
                <i className={`${solution.icon} text-sm sm:text-lg`}></i>
                {solution.title}
              </button>
            ))}
          </div>
        </div>

        {/* Active Tab Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div
            className={`transition-all duration-700 ease-out ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-orange-500 rounded-xl flex items-center justify-center">
                  <i
                    className={`${solutions[activeTab].icon} text-2xl text-white`}
                  ></i>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-amber-900">
                    {solutions[activeTab].title}
                  </h3>
                  <p className="text-teal-600 font-medium">
                    {solutions[activeTab].description}
                  </p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {solutions[activeTab].features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <i className="ri-check-line text-teal-600 text-sm"></i>
                    </div>
                    <span className="text-amber-800">{feature}</span>
                  </div>
                ))}
              </div>

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

          {/* Right Image */}
          <div
            className={`transition-all duration-700 ease-out ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-8"
            }`}
          >
            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              <img
                src={solutions[activeTab].image}
                alt={solutions[activeTab].title}
                className="w-full h-96 object-cover transition-transform duration-700 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent">
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4">
                    <h4 className="text-lg font-bold text-teal-700 mb-2">
                      {solutions[activeTab].title} Solution
                    </h4>
                    <p className="text-amber-800 text-sm">
                      Designed specifically for your business requirements
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
