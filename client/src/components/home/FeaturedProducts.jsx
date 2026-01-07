import React, { useRef, useState, useEffect } from "react";
import ProductCard from "../product/ProductCard";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useProductContext } from "../context/ProductContext";

const TrendingProducts = ({ title = "Trending Products" }) => {
  const { products, loading, fetchProducts } = useProductContext();
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    // Only fetch if products are empty or we need a fresh set
    // This is a simple guard to prevent re-fetching on every mount if already there
    if (!products || products.length === 0) {
      if (fetchProducts) fetchProducts({ limit: 6 });
    }
  }, [fetchProducts, products]);

  // Check scroll position to show/hide arrows
  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', checkScroll);
      return () => scrollElement.removeEventListener('scroll', checkScroll);
    }
  }, [products]); // Re-check when products change

  // Scroll by one card width
  const scroll = (direction) => {
    if (scrollRef.current) {
      const cardWidth = 320 + 24; // card width + gap
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
      scrollRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative overflow-hidden py-12 md:py-16">
      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {title}
          </h2>
        </div>

        <div className="relative">

          {/* Left Arrow */}
          {canScrollLeft && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-black p-2 rounded-full shadow-lg transition-all"
              aria-label="Scroll left"
            >
              <FaArrowLeft />
            </button>
          )}

          {/* Right Arrow */}
          {canScrollRight && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-black p-2 rounded-full shadow-lg transition-all"
              aria-label="Scroll right"
            >
              <FaArrowRight />
            </button>
          )}

          {/* Products Slider */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto hide-scrollbar pb-4 scroll-smooth snap-x snap-mandatory min-h-[400px]"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {loading ? (
              <div className="flex items-center justify-center w-full min-h-[300px]">
                <p className="text-gray-500 text-lg">Loading products...</p>
              </div>
            ) : products && products.length > 0 ? (
              products.map((product) => (
                <ProductCard
                  key={product._id}
                  id={product._id}
                  slug={product.slug}
                  image={product.images && product.images.length > 0 ? product.images[0] : ""}
                  title={product.title}
                  price={product.prices?.price || 0}
                  originalPrice={product.prices?.originalPrice}
                  discountPercent={product.prices?.discountPercent}
                  rating={4.5}
                  reviewCount={10}
                  badgeText={product.status === "active" ? "New" : ""}
                  onAddToCart={() => console.log("Added", product.title)}
                />
              ))
            ) : (
              <div className="flex items-center justify-center w-full min-h-[300px]">
                <p className="text-gray-500 text-lg">No products found.</p>
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
};

export default TrendingProducts;
