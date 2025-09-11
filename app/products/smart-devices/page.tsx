import Header from '../../components/Header';
import SmartDevicesHero from './SmartDevicesHero';
import DeviceCollection from './DeviceCollection';
import TechnologyFeatures from './TechnologyFeatures';
import IntegrationSupport from './IntegrationSupport';
import Footer from '../../components/Footer';

export default function SmartDevicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-teal-50">
      <Header />
      <SmartDevicesHero />
      <DeviceCollection />
      <TechnologyFeatures />
      <IntegrationSupport />
      <Footer />
    </div>
  );
}