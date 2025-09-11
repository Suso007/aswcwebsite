"use client";

import { useState, useEffect } from "react";

type Product = {
  id: string | number;
  name: string;
  price: string;
  image: string;
};

type ProductsResponse = {
  watches: Product[];
  clocks: Product[];
  systems: Product[];
};

export default function ProductSelection() {
  const [selectedCategory, setSelectedCategory] = useState("watches");
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [products, setProducts] = useState<ProductsResponse>({
    watches: [],
    clocks: [],
    systems: [],
  });
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/buyproducts");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to load products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Limit to 3 if showAll = false
  const visibleProducts =
    products[selectedCategory as keyof ProductsResponse]?.slice(
      0,
      showAll ? undefined : 3
    ) || [];

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-amber-900 mb-4">
            Choose Your{" "}
            <span className="text-teal-700 font-pacifico">Perfect Match</span>
          </h2>
        </div>

        {/* Category Selector */}
        <div className="flex justify-center gap-4 mb-12">
          {[
            { id: "watches", label: "Primium Watches", icon: "ri-time-fill" },
            { id: "clocks", label: "Wall Clocks", icon: "ri-home-2-fill" },
            {
              id: "systems",
              label: "Attendance Systems",
              icon: "ri-smartphone-fill",
            },
          ].map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setSelectedCategory(category.id);
                setShowAll(false); // reset when switching category
              }}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 cursor-pointer ${
                selectedCategory === category.id
                  ? "bg-teal-600 text-white shadow-lg"
                  : "bg-white text-amber-800 hover:bg-teal-50 shadow-md"
              }`}
            >
              <i className={`${category.icon} text-lg`}></i>
              {category.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleProducts.map((product) => (
            <div
              key={product.id}
              className={`bg-white rounded-3xl overflow-hidden shadow-lg transition-all duration-300 cursor-pointer ${
                selectedProduct === String(product.id)
                  ? "ring-4 ring-teal-300 scale-105 shadow-2xl"
                  : "hover:shadow-xl hover:scale-102"
              }`}
              onClick={() => setSelectedProduct(String(product.id))}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-amber-900 mb-2">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-teal-600">
                    {product.price}
                  </span>
                  <div
                    className={`w-6 h-6 rounded-full border-2 ${
                      selectedProduct === String(product.id)
                        ? "bg-teal-500 border-teal-500"
                        : "border-gray-300"
                    }`}
                  >
                    {selectedProduct === String(product.id) && (
                      <i className="ri-check-line text-white text-sm flex items-center justify-center"></i>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show More / Show Less */}
        {products[selectedCategory as keyof ProductsResponse]?.length > 3 && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-6 py-3 bg-teal-600 text-white font-semibold rounded-full shadow-md hover:bg-teal-700 transition-all duration-300 cursor-pointer"
            >
              {showAll ? "Show Less" : "Show More"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
