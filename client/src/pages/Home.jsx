import HeroSection from "../components/home/Hero";
import ShopByAge from "../components/home/ShopByAge";
import TrendingProducts from "../components/home/Product";
import FeaturesSection from "../components/home/Feature";
import ShopByInterest from "../components/home/ShopByInterest";
import Testimonials from "../components/home/Testimonial";
import CommunitySection from "../components/home/Community";
import StickyCart from "../components/cart/StickyCart";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark">
      

      <main className="flex-1">
        <StickyCart />        
        <HeroSection />
        <ShopByAge />
        <TrendingProducts />
        <FeaturesSection />
        <ShopByInterest />
        <Testimonials />
        <CommunitySection />
      </main>

      
    </div>
  );
};

export default Home;
