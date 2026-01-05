// import HeroSection from "../components/home/Hero";
// import ShopByAge from "../components/home/ShopByAge";
import TrendingProducts from "../components/home/FeaturedProducts";
// import FeaturesSection from "../components/home/Feature";
// import ShopByInterest from "../components/home/ShopByInterest";
// import Testimonials from "../components/home/Testimonial";
// import CommunitySection from "../components/home/Community";
// import StickyCart from "../components/cart/StickyCart";

import NewAbout from "../components/home/NewAbout";
import NewCategories from "../components/home/NewCategories";
import NewCourses from "../components/home/NewCourses";
import NewFAQ from "../components/home/NewFAQ";
import NewFeatures from "../components/home/NewFeatures";
import NewFooter from "../components/home/NewFooter";
import NewHero from "../components/home/newHero";
import NewHowItWorks from "../components/home/NewHowItWorks";
import NewNavbar from "../components/home/NewNavbar";
import NewTestimonials from "../components/home/NewTestimonials";
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
        <CommunitySection /> */}
       <NewNavbar/>
       <NewHero/>
        <TrendingProducts />
       <NewFeatures/>
       <NewCategories/>
       <NewAbout/>
       <NewCourses/>
       <NewHowItWorks/>
       <NewTestimonials/>
       <NewFAQ/>
       <ParentDetailsForm/>
       <DeliveryDetailsForm/>
       <NewFooter/>
      </main>

    </div>

  );
};

export default Home;
