import Header from "../../components/Header";
import LuxuryWatchesHeroServer from "./LuxuryWatchesHeroServer";
import WatchCollection from "./WatchCollection";
import WatchFeatures from "./WatchFeatures";
import WatchTestimonials from "./WatchTestimonials";
import Footer from "../../components/Footer";

export default async function LuxuryWatchesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-teal-50">
      <Header />
      <LuxuryWatchesHeroServer />
      <WatchCollection />
      <WatchFeatures />
      <WatchTestimonials />
      <Footer />
    </div>
  );
}
