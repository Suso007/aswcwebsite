import Header from '../components/Header';
import AboutHero from './AboutHero';
import CompanyHistory from './CompanyHistory';
import TeamSection from './TeamSection';
import Values from './Values';
import Footer from '../components/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-teal-50">
      <Header />
      <AboutHero />
      <CompanyHistory />
      <Values />
      <TeamSection />
      <Footer />
    </div>
  );
}