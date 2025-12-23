import Header from "../components/Header";
import HeroSection from "../components/Hero";
import ShopByAge from "../components/ShopByAge";
import TrendingProducts from "../components/Product";
import FeaturesSection from "../components/Feature";
import ShopByInterest from "../components/ShopByInterest";
import Testimonials from "../components/Testimonial";
import CommunitySection from "../components/Community";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark">
      <Header />

      <main className="flex-1">
        <HeroSection />
        <ShopByAge />
        <TrendingProducts />
        <FeaturesSection />
        <ShopByInterest />
        <Testimonials />
        <CommunitySection />
      </main>

      <Footer />
    </div>
  );
};

export default Home;
