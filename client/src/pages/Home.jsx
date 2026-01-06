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
import ParentDetailsForm from "../components/home/ParentDetailsForm";
import DeliveryDetailsForm from "../components/home/DeliveryDetailsForm";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-transparent">

      <div
        className="fixed inset-0 -z-10 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/bg-magical-forest.png')",
        }}
      />

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

       <Navbar/>
       <Hero/>
       <TrendingProducts />
       <Features/>

       <Categories/>
       <About/>
       <Courses/>
       <HowItWorks/>

       <Testimonials/>
       <FAQ/>
       <ParentDetailsForm/>
       <DeliveryDetailsForm/>

       <Footer/>
      </main>

    </div>

  );
};

export default Home;
