"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

type Product = {
  id: number;
  name: string;
  description: string;
  image: string;
  price: string;
  featured?: boolean;
  tags?: string[];
  category?: { title?: string };
};

export default function ProductsShowcase() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const sectionRef = useRef<HTMLElement>(null);

  // IntersectionObserver for animation
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
  }, [loading, isVisible]);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filters aligned with DB categories
  const filters = [
    { id: "all", label: "All Products", icon: "ri-dashboard-fill" },
    { id: "Luxury Watches", label: "Primium Watches", icon: "ri-time-fill" },
    { id: "Wall Clocks", label: "Wall Clocks", icon: "ri-time-line" },
    {
      id: "Smart Devices",
      label: "Attendance Systems",
      icon: "ri-fingerprint-fill",
    },
  ];

  // Filtering logic + limit
  const filteredProducts = (() => {
    if (activeFilter === "all") {
      // Take 4 from each category
      const categories = ["Luxury Watches", "Wall Clocks", "Smart Devices"];
      let selected = categories.flatMap((cat) =>
        products.filter((p) => p.category?.title === cat).slice(0, 4)
      );

      // Shuffle the combined array
      for (let i = selected.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [selected[i], selected[j]] = [selected[j], selected[i]];
      }

      return selected;
    } else {
      // Show only 4 from the active category
      return products
        .filter((p) => p.category?.title === activeFilter)
        .slice(0, 4);
    }
  })();

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-32 left-20 w-40 h-40 bg-red-100/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-32 right-20 w-56 h-56 bg-gray-200/20 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-red-50/30 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Heading */}
        <div
          className={`text-center mb-12 transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-4">
            Featured <span className="text-red-600">Timepieces</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Discover our premium collection of Swiss watches, elegant clocks,
            and cutting-edge attendance solutions
          </p>
        </div>

        {/* Filters */}
        <div className="relative mb-12">
          <div
            className={`flex md:flex-wrap md:justify-center overflow-x-auto gap-3 pb-4 transition-all duration-1000 delay-300 ease-out ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
              scrollBehavior: "smooth",
            }}
          >
            <style jsx>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex items-center flex-shrink-0 gap-1.5 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-full font-bold transition-all duration-300 whitespace-nowrap cursor-pointer ${
                  activeFilter === filter.id
                    ? "bg-red-600 text-white shadow-xl scale-105"
                    : "bg-white text-gray-800 hover:bg-red-50 hover:text-red-700 shadow-lg hover:shadow-xl hover:scale-102"
                }`}
              >
                <i className={`${filter.icon} text-base sm:text-xl`}></i>
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className={`bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 group cursor-pointer ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden">
                {product.image && (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-72 object-cover object-top transition-transform duration-700 group-hover:scale-110"
                  />
                )}

                {product.featured && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold animate-pulse">
                    <i className="ri-star-fill mr-1"></i>
                    Featured
                  </div>
                )}

                {/* Price tag */}
                {product.price && (
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-red-600 px-4 py-2 rounded-full text-lg font-bold shadow-lg">
                    ₹{product.price}
                  </div>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                  <div className="absolute bottom-4 left-4 right-4">
                    <Link href="/buy-now">
                      <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-full font-bold transition-all duration-300 hover:scale-105 whitespace-nowrap cursor-pointer">
                        <i className="ri-shopping-cart-fill mr-2"></i>
                        Buy Now
                      </button>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors duration-300">
                  {product.name}
                </h3>

                {product.description && (
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {product.description}
                  </p>
                )}

                <div className="flex flex-wrap gap-2">
                  {product.tags?.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-semibold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div
          className={`text-center mt-16 transition-all duration-1000 delay-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Link href="/products">
            <button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-12 py-5 rounded-full text-xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-2xl whitespace-nowrap cursor-pointer">
              <span className="flex items-center gap-4">
                <i className="ri-eye-line text-2xl"></i>
                View Complete Collection
                <i className="ri-arrow-right-line text-2xl"></i>
              </span>
            </button>
          </Link>
        </div>

        {!loading && filteredProducts.length === 0 && (
          <p className="text-center text-gray-500 mt-6">No products found.</p>
        )}
      </div>
    </section>
  );
}
