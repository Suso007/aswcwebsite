import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ProductsGallery from './components/ProductsShowcase';
import StoriesSection from './components/StoriesSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import MouseTrailsClient from './components/MouseTrailsClient';
import HowItWorksSection from './components/HowItWorksSection';

export default async function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-teal-50 relative overflow-x-hidden">
      <Header />
      <div id="hero">
        <HeroSection />
      </div>
      <div id="products">
        <ProductsGallery />
      </div>
            <div id="how-it-works">
        <HowItWorksSection />
      </div>
      <div id="testimonials">
        <StoriesSection />
      </div>
      <CTASection />
      <Footer />
    </div>
  );
}