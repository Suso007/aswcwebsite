"use client"; // ✅ This is necessary
import Link from "next/link";
import { useEffect, useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  categoryId: number | null;
  rating: number;
  description: string;
  image: string;
  badges: string;
  bestseller: boolean;
};

type Category = {
  id: number;
  title: string;
  description: string;
  icon: string;
  image: string;
  products: Product[];
};

export default function ProductCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState(0);

  // ✅ Add custom mapping here
  const customTitles: Record<string, string> = {
    "Luxury Watches": "Premium Watches",
    "Wall Clocks": " Wall Clocks",
    "Smart Devices": "Smart Devices",
  };

  // ✅ Map category slugs to paths
  const categorySlugs: Record<string, string> = {
    "Luxury Watches": "luxury-watches",
    "Wall Clocks": "wall-clocks",
    "Smart Devices": "smart-devices",
  };

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("Failed to load categories", err);
      }
    }
    fetchCategories();
  }, []);

  if (!categories.length) {
    return <div className="text-center py-24">No categories found.</div>;
  }

  const category = categories[activeCategory];

  return (
    <section className="py-24 bg-gradient-to-br from-teal-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-amber-900 mb-4">
            Product{" "}
            <span className="text-teal-700 font-pacifico">Categories</span>
          </h2>
          <p className="text-xl text-amber-700/80 max-w-3xl mx-auto">
            Explore our comprehensive range of timepieces and time management
            solutions
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="flex bg-white rounded-full p-2 shadow-lg">
            {categories.map((cat, index) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(index)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer ${
                  activeCategory === index
                    ? "bg-teal-600 text-white shadow-lg"
                    : "text-amber-800 hover:bg-teal-50"
                }`}
              >
                <i className={`${cat.icon} text-lg`}></i>
                {/* ✅ Use custom title if available */}
                {customTitles[cat.title] || cat.title}
              </button>
            ))}
          </div>
        </div>

        {/* Active Category Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-orange-500 rounded-xl flex items-center justify-center">
                  <i className={`${category.icon} text-2xl text-white`}></i>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-amber-900">
                    {customTitles[category.title] || category.title}
                  </h3>
                  <p className="text-teal-600 font-medium">
                    {category.description}
                  </p>
                </div>
              </div>

              {/* Featured Products */}
              <div className="space-y-4 mb-8">
                <h4 className="font-semibold text-amber-900 text-lg">
                  Featured Products:
                </h4>
                {category.products.slice(0, 4).map((product, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-3 px-4 bg-gradient-to-r from-amber-50 to-teal-50 rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover"
                        onError={(e) => {
                          const target = e.currentTarget as HTMLImageElement;
                          if (target.src !== "/images/showroom1.jpg") {
                            target.src = "/images/showroom1.jpg";
                          }
                        }}
                      />
                      <div>
                        <h5 className="text-lg font-bold text-amber-900">
                          {product.name}
                        </h5>
                        <p className="text-teal-600 font-medium">
                          {product.description}
                        </p>
                      </div>
                    </div>
                    <div className="text-lg font-bold text-amber-900">
                      ₹{product.price}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-4">
                <Link
                  href={`/products/${categorySlugs[category.title] || ""}`}
                  className="flex-1 bg-gradient-to-r from-teal-600 to-orange-600 hover:from-teal-700 hover:to-orange-700 text-white py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 whitespace-nowrap cursor-pointer text-center"
                >
                  View All Products
                </Link>

                <button className="px-6 py-3 border-2 border-teal-300 text-teal-700 rounded-full font-semibold hover:bg-teal-50 transition-all duration-300 whitespace-nowrap cursor-pointer">
                  Get Quote
                </button>
              </div>
            </div>
          </div>

          {/* Right Image Panel */}
          <div className="relative overflow-hidden rounded-3xl shadow-2xl">
            <img
              src={categories[activeCategory].image}
              alt={categories[activeCategory].title}
              className="w-full h-96 object-cover transition-transform duration-700 hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent">
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4">
                  <h4 className="text-lg font-bold text-teal-700 mb-2">
                    {customTitles[categories[activeCategory].title] ||
                      categories[activeCategory].title}
                  </h4>
                  <p className="text-amber-800 text-sm">
                    Discover our premium collection of{" "}
                    {(
                      customTitles[categories[activeCategory].title] ||
                      categories[activeCategory].title
                    ).toLowerCase()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
