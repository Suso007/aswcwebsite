"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

type Device = {
  id: number;
  name: string;
  price: string;
  originalPrice: string;
  type: "biometric" | "facial" | "smart" | "all";
  description: string;
  image: string;
  features: string[];
  capacity: string | null;
};

export default function DeviceCollection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState<
    "all" | "biometric" | "facial" | "smart"
  >("all");
  const [devices, setDevices] = useState<Device[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const filters = [
    { id: "all", label: "All Devices", icon: "ri-smartphone-fill" },
    {
      id: "biometric",
      label: "Biometric Systems",
      icon: "ri-fingerprint-fill",
    },
    { id: "facial", label: "Facial Recognition", icon: "ri-user-smile-fill" },
    { id: "smart", label: "Smart Trackers", icon: "ri-robot-fill" },
  ];

  useEffect(() => {
    let isMounted = true;
    async function load() {
      console.log("🔄 DeviceCollection: Fetching devices...");
      try {
        const res = await fetch("/api/devices");
        const data = await res.json();
        console.log("📦 DeviceCollection: Received data:", data);
        if (isMounted) setDevices(data);
      } catch (error) {
        console.error("❌ DeviceCollection: Error fetching devices:", error);
      }
    }
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredDevices =
    activeFilter === "all"
      ? devices
      : devices.filter((device) => device.type === activeFilter);

  return (
    <section ref={sectionRef} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div
          className={`text-center mb-16 transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-amber-900 mb-4">
            Device{" "}
            <span className="text-teal-700 font-pacifico">Collection</span>
          </h2>
          <p className="text-xl text-amber-700/80 max-w-3xl mx-auto">
            Cutting-edge technology solutions for modern workplace time and
            attendance management
          </p>
        </div>

        {/* Filters */}
        <div
          className={`flex flex-wrap justify-center gap-4 mb-16 transition-all duration-1000 delay-300 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() =>
                setActiveFilter(
                  filter.id as "all" | "biometric" | "facial" | "smart"
                )
              }
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer ${
                activeFilter === filter.id
                  ? "bg-teal-600 text-white shadow-xl scale-105"
                  : "bg-gray-100 text-gray-800 hover:bg-teal-50 hover:text-teal-700 hover:scale-102"
              }`}
            >
              <i className={`${filter.icon} text-lg`}></i>
              {filter.label}
            </button>
          ))}
        </div>

        {/* Device Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDevices.map((device, index) => (
            <div
              key={device.id}
              className={`bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 group cursor-pointer ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={device.image}
                  alt={device.name}
                  className="w-full h-80 object-cover object-top transition-transform duration-700 group-hover:scale-110"
                />

                {/* Capacity badge */}
                <div className="absolute top-4 left-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {device.capacity ?? ""}
                </div>

                {/* Price tag */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-teal-600 px-4 py-2 rounded-full text-lg font-bold shadow-lg">
                  {device.price}
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                  <div className="absolute bottom-4 left-4 right-4">
                    <Link href="/buy-now">
                      <button className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 whitespace-nowrap cursor-pointer">
                        <i className="ri-shopping-cart-fill mr-2"></i>
                        Get Quote
                      </button>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-amber-900 mb-2 group-hover:text-teal-700 transition-colors duration-300">
                  {device.name}
                </h3>

                <p className="text-amber-700/80 mb-4 text-sm leading-relaxed">
                  {device.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {device.features.map((feature, featureIndex) => (
                    <span
                      key={featureIndex}
                      className="px-2 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-medium"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-teal-600">
                      {device.price}
                    </span>
                    <span className="text-sm text-gray-500 line-through ml-2">
                      {device.originalPrice}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button className="w-10 h-10 bg-emerald-100 hover:bg-emerald-200 rounded-full flex items-center justify-center transition-colors duration-300 cursor-pointer">
                      <i className="ri-information-line text-emerald-600"></i>
                    </button>
                    <button className="w-10 h-10 bg-teal-100 hover:bg-teal-200 rounded-full flex items-center justify-center transition-colors duration-300 cursor-pointer">
                      <i className="ri-heart-line text-teal-600"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
