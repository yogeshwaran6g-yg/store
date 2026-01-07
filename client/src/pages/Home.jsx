// import HeroSection from "../components/home/Hero";
// import ShopByAge from "../components/home/ShopByAge";
import TrendingProducts from "../components/home/FeaturedProducts";
// import FeaturesSection from "../components/home/Feature";
// import ShopByInterest from "../components/home/ShopByInterest";
// import StickyCart from "../components/cart/StickyCart";

import About from "../components/home/About";
import Categories from "../components/home/Categories";
import Courses from "../components/home/Courses";
import FAQ from "../components/home/FAQ";
import Features from "../components/home/Features";
import Footer from "../components/home/OldFooter";
import Hero from "../components/home/Hero";
import HowItWorks from "../components/home/HowItWorks";
import Navbar from "../components/home/Navbar";
import Testimonials from "../components/home/Testimonials";
// import ParentDetailsForm from "../components/home/ParentDetailsForm";
// import DeliveryDetailsForm from "../components/home/DeliveryDetailsForm";

const Home = () => {
  return (
    <div
      className="min-h-screen flex flex-col bg-fixed bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/sky.png')" }}
    >

      <div />

      <main className="flex-1 ">

        {/* 
        <StickyCart />
        <HeroSection />
        <ShopByAge />
        <TrendingProducts />
        <FeaturesSection />
        <ShopByInterest />
        <Testimonials />
      */}

        <Navbar />
        <div id="home"><Hero /></div>

        <div className="bg-white">
          <TrendingProducts />
          <Features />
          <Categories />
        </div>

        <div className="bg-linear-to-b from-yellow-50 via-purple-50 to-blue-50">
          <div id="about"><About /></div>
          <div id="programs"><Courses /></div>
          <HowItWorks />

          <Testimonials />
          <FAQ />
        </div>
        {/* <ParentDetailsForm/>
       <DeliveryDetailsForm/> */}

        <div id="contact"><Footer /></div>
      </main>

    </div>

  );
};

export default Home;
