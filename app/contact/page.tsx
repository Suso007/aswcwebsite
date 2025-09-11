import Header from "../components/Header";
import ContactHero from "./ContactHero";
import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";
import Footer from "../components/Footer";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-teal-50">
      <Header />
      <ContactHero />
      <div className="grid lg:grid-cols-2 gap-0">
        <ContactForm />
        <div className="space-y-0">
          <ContactInfo />
        </div>
      </div>
      <Footer />
    </div>
  );
}
