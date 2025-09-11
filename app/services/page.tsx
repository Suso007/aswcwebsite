import Header from '../components/Header';
import ServicesHero from './ServicesHero';
import AttendanceSolutions from './AttendanceSolutions';
import SupportServices from './SupportServices';
import Footer from '../components/Footer';
import ServiceCategories from './ServiceCategories';
import ServicesForm from './ServicesForm';
import ServicePhotos from './ServicePhotos';

export default async function ServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-teal-50">
      <Header />
      <ServicesHero />
      <div className="grid lg:grid-cols-2 gap-0">
      <ServicesForm />
      <div className="space-y-0">
      <ServicePhotos />
      </div>
      </div>
      <ServiceCategories />
      <AttendanceSolutions />
      <SupportServices />
      <Footer />
    </div>
  );
}