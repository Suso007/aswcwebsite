import Header from '../components/Header';
import BuyNowHero from './BuyNowHero';
import ProductSelection from './ProductSelection';
import OrderForm from './OrderForm';
import Footer from '../components/Footer';

export default function BuyNowPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-teal-50">
      <Header />
      <BuyNowHero />
      <ProductSelection />
      <OrderForm />
      <Footer />
    </div>
  );
}