import React from "react";
// import ProductCard from "./ProductCard";
import ProductCard from "../product/ProductCard";

const TrendingProducts = () => {
  return (

    <section className="py-16">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Heading */}
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            Trending Now
          </h3>
        </div>

        {/* Slider */}
        <div
          className="flex justify-center gap-6 overflow-x-auto hide-scrollbar pb-8 -mx-4 px-4 sm:mx-0 sm:px-0 scroll-smooth place-items-center"
          style={{ marginTop: "16px" }}
        >
          
            <ProductCard
              image="https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4"
              title="Travel Toys Bundle | Learning Toy Bundle For Travels | Ages 4+"
              price={5118}
              originalPrice={6397}
              discountPercent={20}
              rating={4.6}
              reviewCount={50}
              badgeText="SuperSaver"
              onAddToCart={() => console.log("Added")}            
            />
          
            <ProductCard
              image="https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4"
              title="Travel Toys Bundle | Learning Toy Bundle For Travels | Ages 4+"
              price={5118}
              originalPrice={6397}
              discountPercent={20}
              rating={4.6}
              reviewCount={50}
              badgeText="SuperSaver"
              onAddToCart={() => console.log("Added")}
              onQuickView={() => console.log("Quick View")}
            />

           <ProductCard
              image="https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4"
              title="Travel Toys Bundle | Learning Toy Bundle For Travels | Ages 4+"
              price={5118}
              originalPrice={6397}
              discountPercent={20}
              rating={4.6}
              reviewCount={50}
              badgeText="SuperSaver"
              onAddToCart={() => console.log("Added")}
              onQuickView={() => console.log("Quick View")}
            />
      </div>          
      </div>
    </section>
  );
};

export default TrendingProducts;
