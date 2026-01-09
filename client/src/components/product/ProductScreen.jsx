import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { FiChevronRight, FiMinus, FiPlus, FiHeart } from "react-icons/fi";
import { motion } from "framer-motion";
import { useProductContext } from "../context/ProductContext";
import { useCartContext } from "../context/CartContext";
import ShippingCard from "./ShippingCard";
import FAQ from "../faq/Faq";
import { faqData } from "../../config/constants";
import ProductFeature from "../home/FeaturedProducts";
import ProductDescription from "./ProductDescription";

const ProductScreen = () => {
  const { slug } = useParams();
  const { currentProduct, loading, fetchProductBySlug } = useProductContext();
  const { addItem } = useCartContext();

  const [qty, setQty] = useState(1);
  const [img, setImg] = useState("");
  const [wish, setWish] = useState(false);
  const isMounted = useRef(false);

  /* FETCH PRODUCT */
  useEffect(() => {
    if (slug && !isMounted.current) {
      fetchProductBySlug(slug);
      isMounted.current = true;
    }
  }, [slug, fetchProductBySlug]);

  /* SET IMAGE */
  useEffect(() => {
    if (currentProduct?.images?.length) {
      setImg(currentProduct.images[0]);
    }
  }, [currentProduct?._id]);

  /* SKELETON LOADER */
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10 animate-pulse">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4 h-96 bg-gray-200 rounded-2xl" />
          <div className="md:col-span-5 space-y-4">
            <div className="h-6 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/3" />
            <div className="h-5 bg-gray-200 rounded w-1/2" />
            <div className="h-20 bg-gray-200 rounded" />
            <div className="h-12 bg-gray-200 rounded w-full" />
          </div>
          <div className="md:col-span-3 h-60 bg-gray-200 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (!currentProduct) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg font-semibold">
        Product not found.
      </div>
    );
  }

  const discount = Math.round(
    ((currentProduct.prices.originalPrice -
      currentProduct.prices.price) /
      currentProduct.prices.originalPrice) *
      100
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 pb-28">
      {/* BREADCRUMB */}
      <div className="flex items-center text-sm mb-6">
        <Link to="/" className="font-semibold hover:text-purple-600">
          Home
        </Link>
        <FiChevronRight className="mx-2" />
        <span className="text-gray-500">{currentProduct.title}</span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="
          relative
          bg-gradient-to-br from-purple-400 via-blue-50 to-yellow-500
          rounded-[32px]
          p-8
          shadow-[0_30px_80px_rgba(100,80,200,0.18)]
          overflow-hidden
        "
      >
        {/* GLOW */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-purple-50 via-blue-50 to-yellow-50 rounded-full blur-3xl pointer-events-none" />

        <div className="grid md:grid-cols-12 gap-10 relative">
          {/* IMAGE CARD */}
          <div className="md:col-span-4">
            <div className="relative bg-white rounded-3xl p-4 shadow-[0_20px_60px_rgba(80,60,150,0.15)]">
              {/* OFFER */}
              <div className="absolute -top-4 left-4 px-4 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 shadow-md z-10">
                SAVE {discount}%
              </div>

              {/* WISHLIST */}
              <button
                onClick={() => setWish(!wish)}
                className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white shadow-md flex items-center justify-center hover:scale-110 transition z-10"
              >
                <FiHeart
                  className={`text-lg ${
                    wish ? "text-red-500 fill-red-500" : "text-gray-600"
                  }`}
                />
              </button>

              {/* IMAGE */}
              <div className="overflow-hidden rounded-2xl group">
                <img
                  src={img}
                  alt={currentProduct.title}
                  className="w-full transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* THUMBS */}
              <div className="flex gap-3 mt-4 justify-center">
                {currentProduct.images?.map((i, idx) => (
                  <img
                    key={idx}
                    src={i}
                    onClick={() => setImg(i)}
                    className={`w-16 h-16 rounded-xl object-cover cursor-pointer border ${
                      img === i
                        ? "border-purple-500 ring-2 ring-purple-400/30"
                        : "border-gray-200"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* DETAILS */}
          <div className="md:col-span-5">
            <h1 className="text-2xl font-extrabold mb-2">
              {currentProduct.title}
            </h1>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl font-extrabold text-purple-700">
                ₹{currentProduct.prices.price}
              </span>
              <span className="line-through text-gray-400">
                ₹{currentProduct.prices.originalPrice}
              </span>
            </div>

            <ProductDescription 
              description={currentProduct.description} 
              className="text-gray-600 text-sm leading-7 mb-6"
            />

            {/* QTY + CART */}
            <div className="flex gap-4">
              <div className="flex items-center bg-white rounded-full px-2 h-12 shadow">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="h-8 w-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center"
                >
                  <FiMinus />
                </button>
                <span className="w-10 text-center font-bold">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="h-8 w-8 rounded-full bg-yellow-400 flex items-center justify-center"
                >
                  <FiPlus />
                </button>
              </div>

              <button
                onClick={() => addItem(currentProduct, qty)}
                className="flex-1 bg-gradient-to-r from-purple-400 to-yellow-300 text-black font-bold py-3 rounded-full shadow-[0_6px_0_#d9a400] hover:translate-y-1 hover:shadow-[0_3px_0_#d9a400] transition-all"
              >
                Add To Cart
              </button>
            </div>
          </div>

          {/* SHIPPING */}
          <div className="md:col-span-3">
            <ShippingCard />
          </div>
        </div>

        {/* FAQ */}
        <div className="py-16">
          <FAQ items={faqData} title="Frequently Asked Questions" />
        </div>

        <ProductFeature title="Featured Products" />
      </motion.div>

      {/* MOBILE STICKY BAR */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t px-4 py-3 flex gap-4 items-center md:hidden z-40">
        <div>
          <p className="text-xs text-gray-500">Price</p>
          <p className="font-bold text-purple-700">
            ₹{currentProduct.prices.price}
          </p>
        </div>

        <button
          onClick={() => addItem(currentProduct, qty)}
          className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-300 text-black font-bold py-3 rounded-full shadow-[0_6px_0_#d9a400]"
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default ProductScreen;
