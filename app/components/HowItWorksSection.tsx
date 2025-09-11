
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export type HowItWorksStep = {
  id: number;
  icon: string;
  title: string;
  description: string;
  image: string;
  order?: number | null;
};

export default function HowItWorksSection() {
  const [steps, setSteps] = useState<HowItWorksStep[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  // ✅ Fetch data from API
  useEffect(() => {
    async function fetchSteps() {
      try {
        const res = await fetch('/api/how-it-works');
        const data = await res.json();
        setSteps(data);
      } catch (err) {
        console.error('Error fetching steps:', err);
      }
    }
    fetchSteps();
  }, []);

  // Intersection Observer
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

  // Auto-change active step
  useEffect(() => {
    if (isVisible && steps.length > 0) {
      const interval = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % steps.length);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isVisible, steps.length]);

  // ✅ Rest of your UI stays exactly the same
  if (!steps || steps.length === 0) {
    return (
      <section ref={sectionRef} className="py-24 bg-white relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">How We Serve You</h2>
            <p className="text-gray-600">No steps found.</p>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section ref={sectionRef} className="py-24 bg-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-72 h-72 bg-red-100/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-gray-100/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className={`text-center mb-16 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            How We <span className="text-red-600">Serve You</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            From consultation to delivery, experience our premium service that has satisfied over 1000 clients
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Steps */}
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`flex items-start gap-6 p-6 rounded-3xl transition-all duration-700 cursor-pointer ${activeStep === index ? 'bg-red-50 shadow-xl scale-105 border-2 border-red-200' : 'bg-gray-50 hover:bg-red-25 hover:shadow-lg'} ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
                style={{ transitionDelay: `${index * 200}ms` }}
                onClick={() => setActiveStep(index)}
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${activeStep === index ? 'bg-red-600 text-white shadow-lg' : 'bg-white text-red-600 border-2 border-red-200'}`}>
                  <i className={`${step.icon} text-2xl`}></i>
                </div>

                <div className="flex-1">
                  <h3 className={`text-2xl font-bold mb-3 transition-colors duration-300 ${activeStep === index ? 'text-red-600' : 'text-gray-900'}`}>
                    {step.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {step.description}
                  </p>
                </div>

                <div className={`text-3xl font-bold transition-colors duration-300 ${activeStep === index ? 'text-red-600' : 'text-gray-400'}`}>
                  {String(step.id).padStart(2, '0')}
                </div>
              </div>
            ))}
          </div>

          {/* Visual */}
          <div className={`relative transition-all duration-1000 delay-500 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={steps[activeStep].image}
                alt={steps[activeStep].title}
                className="w-full h-96 object-cover transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    {steps[activeStep].title}
                  </h4>
                  <p className="text-gray-700">
                    {steps[activeStep].description}
                  </p>
                </div>
              </div>
            </div>

            {/* Step indicators */}
            <div className="flex justify-center gap-3 mt-6">
              {steps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveStep(index)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 cursor-pointer ${activeStep === index ? 'bg-red-600 scale-125 shadow-lg' : 'bg-gray-300 hover:bg-red-300 hover:scale-110'}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Link href="/contact">
            <button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-12 py-5 rounded-full text-xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-2xl whitespace-nowrap cursor-pointer">
              <span className="flex items-center gap-4">
                <i className="ri-phone-line text-2xl"></i>
                Start Your Journey
                <i className="ri-arrow-right-line text-2xl"></i>
              </span>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
