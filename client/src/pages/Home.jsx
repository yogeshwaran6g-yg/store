import Header from "../components/home/Header";
import HeroSection from "../components/home/Hero";
import ShopByAge from "../components/home/ShopByAge";
import TrendingProducts from "../components/home/Product";
import FeaturesSection from "../components/home/Feature";
import ShopByInterest from "../components/home/ShopByInterest";
import Testimonials from "../components/home/Testimonial";
import CommunitySection from "../components/home/Community";
import Footer from "../components/home/Footer";

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
