import Header from '../../components/Header';
import WallClocksHero from './WallClocksHero';
import ClockCollection from './ClockCollection';
import ClockFeatures from './ClockFeatures';
import ClockApplications from './ClockApplications';
import Footer from '../../components/Footer';

export default function WallClocksPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-teal-50">
      <Header />
      <WallClocksHero />
      <ClockCollection />
      <ClockFeatures />
      <ClockApplications />
      <Footer />
    </div>
  );
}