"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Product = {
  id: number;
  name: string;
  price: number;
  originalPrice?: number | null;
  category: string;
  rating?: number | null;
  description?: string | null;
  image?: string | null;
  badges?: string | null;
  bestseller?: boolean | null;
};

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: any[] = await res.json();

        // normalize for UI
        const normalized: Product[] = data.map((p) => ({
          id: p.id,
          name: p.name ?? "",
          price: typeof p.price === "number" ? p.price : Number(p.price) || 0,
          originalPrice: p.originalPrice ?? null,
          category:
            typeof p.category === "string"
              ? p.category
              : (p.category && p.category.title) || "",
          rating: typeof p.rating === "number" ? p.rating : 0,
          description: p.description ?? "",
          image: p.image ?? "",
          badges: p.badges ?? "",
          bestseller: !!p.bestseller,
        }));

        if (isMounted) {
          // Shuffle products
          const shuffled = [...normalized].sort(() => 0.5 - Math.random());

          // Take only 6
          setProducts(shuffled.slice(0, 6));
        }
      } catch (e: any) {
        if (isMounted) setError(e.message || "Failed to load products");
      }
    }

    load();
    return () => {
      isMounted = false;
    };
  }, []);

  if (error) {
    return (
      <div className="text-center py-24 text-red-600">
        Failed to load products: {error}
      </div>
    );
  }

  if (!products) {
    // skeleton loader
    return (
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <div className="h-8 w-64 bg-gray-200 rounded mx-auto animate-pulse" />
            <div className="h-4 w-96 bg-gray-100 rounded mx-auto mt-4 animate-pulse" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl shadow-lg p-6 animate-pulse h-96"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-amber-900 mb-4">
            Featured{" "}
            <span className="text-teal-700 font-pacifico">Products</span>
          </h2>
          <p className="text-xl text-amber-700/80 max-w-3xl mx-auto">
            Handpicked selection of our most popular and innovative timepieces
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => {
            const ratingCount = Math.max(0, product.rating ?? 0);
            const badgesArray = (product.badges?.split(",") || [])
              .map((b) => b.trim())
              .filter(Boolean);

            return (
              <div
                key={product.id}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 group cursor-pointer"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.image || "/assets/default.jpg"}
                    alt={product.name}
                    className="w-full h-64 object-cover object-top transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Badges */}
                  <div className="absolute top-4 left-4">
                    {product.bestseller && (
                      <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-2">
                        <i className="ri-fire-fill mr-1"></i>
                        Best Seller
                      </div>
                    )}
                    <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Sale
                    </div>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                    <div className="absolute bottom-4 left-4 right-4">
                      <Link href="/buy-now">
                        <button className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 whitespace-nowrap cursor-pointer">
                          <i className="ri-shopping-cart-fill mr-2"></i>
                          Buy Now
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-teal-600 font-medium text-sm">
                      {product.category || "Uncategorized"}
                    </span>
                    <div className="flex gap-1">
                      {[...Array(ratingCount)].map((_, i) => (
                        <i
                          key={i}
                          className="ri-star-fill text-orange-400 text-sm"
                        ></i>
                      ))}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-amber-900 mb-2 group-hover:text-teal-700 transition-colors duration-300">
                    {product.name}
                  </h3>

                  <p className="text-amber-700/80 mb-4 text-sm leading-relaxed">
                    {product.description || "No description available."}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {badgesArray.length === 0 ? (
                      <span className="px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium">
                        No tags
                      </span>
                    ) : (
                      badgesArray.map((badge, badgeIndex) => (
                        <span
                          key={badgeIndex}
                          className="px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium"
                        >
                          {badge}
                        </span>
                      ))
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-teal-600">
                        ₹{product.price}
                      </span>
                      {typeof product.originalPrice === "number" && (
                        <span className="text-sm text-gray-500 line-through ml-2">
                          ₹{product.originalPrice}
                        </span>
                      )}
                    </div>
                    <button className="w-10 h-10 bg-teal-100 hover:bg-teal-200 rounded-full flex items-center justify-center transition-colors duration-300 cursor-pointer">
                      <i className="ri-heart-line text-teal-600"></i>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Products Button */}
        <div className="text-center mt-16">
          <Link href="/buy-now">
            <button className="bg-gradient-to-r from-orange-500 to-teal-500 hover:from-orange-600 hover:to-teal-600 text-white px-12 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl whitespace-nowrap cursor-pointer">
              <span className="flex items-center gap-3">
                <i className="ri-shopping-bag-fill"></i>
                Shop All Products
                <i className="ri-arrow-right-line"></i>
              </span>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
