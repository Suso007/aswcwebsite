import Header from "@/components/Header";
import ProductsHero from "./ProductsHero";
import ProductCategories from "./ProductCategories";
import ProductSpecs from "./ProductSpecs";
import Footer from "@/components/Footer";
import FeaturedProducts from "./FeaturedProducts";

export default async function ProductsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-teal-50">
      <Header />
      <ProductsHero />
      <ProductCategories />
      <FeaturedProducts />
      <ProductSpecs />
      <Footer />
    </div>
  );
}
