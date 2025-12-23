import React from "react";
import ProductCard from "./ProductCard";

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
          <div className="flex-shrink-0 w-[260px] sm:w-[280px] md:w-[300px]">
            <ProductCard />
          </div>

          <div className="flex-shrink-0 w-[260px] sm:w-[280px] md:w-[300px]">
            <ProductCard />
          </div>

          <div className="flex-shrink-0 w-[260px] sm:w-[280px] md:w-[300px]">
            <ProductCard />
          </div>
        </div>

      </div>
    </section>
  );
};

export default TrendingProducts;
