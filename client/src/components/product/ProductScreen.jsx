import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { FiChevronRight, FiMinus, FiPlus } from "react-icons/fi";
import { useProductContext } from "../context/ProductContext";
import ShippingCard from "./ShippingCard";
import { useCartContext } from "../context/CartContext";
import FAQ from "../faq/Faq";
import {faqData} from "../../config/constants";
import ProductFeature from "../home/FeaturedProducts";

const ProductScreen = () => { 
  const { slug } = useParams();
  const { currentProduct, loading, hasFetchedProduct, fetchProductBySlug } = useProductContext();

  const [qty, setQty] = useState(1);
  const [img, setImg] = useState("https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600");
  const [isReadMore, setIsReadMore] = useState(true);
  const { addItem } = useCartContext();
  
  // Use a ref to prevent double fetching in React Strict Mode (dev)
  const isMounted = useRef(false);

  useEffect(() => {
    if (slug) {
      if (!isMounted.current || currentProduct?.slug !== slug) {
        fetchProductBySlug(slug);
        isMounted.current = true;
      }
    }
  }, [slug, fetchProductBySlug, currentProduct?.slug]);

  // Sync image when product loads
  useEffect(() => {
    if (currentProduct?.images?.length > 0) {
      setImg(currentProduct.images[0]);
    } else if (currentProduct?.image) {
      setImg(Array.isArray(currentProduct.image) ? currentProduct.image[0] : currentProduct.image);
    }
  }, [currentProduct?._id]);

  if (loading || !currentProduct) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        {hasFetchedProduct && !currentProduct ? (
          <p className="text-xl font-semibold text-red-500">Product not found.</p>
        ) : (
          <p className="text-xl font-semibold">Loading Product...</p>
        )}
      </div>
    );
  }



  const discount = Math.round(
    ((currentProduct.prices.originalPrice - currentProduct.prices.price) / 
      currentProduct.prices.originalPrice) *
      100
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* BREADCRUMB */}
      <div className="flex items-center text-sm mb-4">
        <Link to="/" className="font-semibold hover:text-emerald-600">
          Home
        </Link>
        <FiChevronRight className="mx-2" />
        <span className="text-gray-500">{currentProduct.title}</span>
      </div>

      <div className="bg-white rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
     {/* 1 */}
          {/* IMAGE */}
          <div className="md:col-span-12 xl:col-span-4">
            <div className="relative">
              <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                -{discount}%
              </span>

              <img
                src={img}
                alt={currentProduct.title}
                className="w-full rounded-lg"
              />
            </div>

            <div className="flex gap-3 mt-4">
              {(currentProduct.images || currentProduct.image || []).map((i, idx) => (
                <img
                  key={idx}
                  src={i}
                  alt="thumb"
                  onClick={() => setImg(i)}
                  className={`w-20 h-20 object-cover rounded cursor-pointer border ${img === i ? 'border-emerald-500 ring-2 ring-emerald-500/20' : 'border-gray-200'}`}
                />
              ))}
            </div>
          </div>
{/* 2 */}
          {/* DETAILS */}
          <div className="md:col-span-7 md:px-4 md:py-4 xl:col-span-5 xl:px-3 xl:py-3">
            <h1 className="text-2xl font-semibold mb-1">
              {currentProduct.title}
            </h1>

            <p className="text-sm text-gray-500 mb-2">
              SKU: <span className="font-medium">{currentProduct.sku}</span>
            </p>

            <div className="mb-4">
              <span className="text-xl font-bold tracking-tight">
                ₹{currentProduct.prices.price}
              </span>
              <span className="line-through text-gray-400 ml-3">
                ₹{currentProduct.prices.originalPrice}
              </span>
            </div>

            {/* DESCRIPTION */}
            <p className="text-gray-500 text-sm mb-3 leading-6 md:leading-7">
              {isReadMore
                ? currentProduct.description.slice(0, 150)
                : currentProduct.description}
              {currentProduct.description.length > 150 && (
                <span
                  onClick={() => setIsReadMore(!isReadMore)}
                  className="text-blue-600 cursor-pointer ml-1"
                >
                  {isReadMore ? "Read more" : "Show less"}
                </span>
              )}
            </p>

            {/* QTY + CART */}
            <div className="flex items-center gap-4 mt-6">
              <div className="flex border border-gray-200 rounded h-12">
                <button
                  onClick={() => setQty(qty - 1)}
                  disabled={qty === 1}
                  className="w-12 flex items-center justify-center"
                >
                  <FiMinus />
                </button>
                <span className="w-12 flex items-center justify-center font-semibold">
                  {qty}
                </span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="w-12 flex items-center justify-center"
                >
                  <FiPlus />
                </button>
              </div>

              <button
                onClick={() => addItem(currentProduct, qty)}
                className="bg-gray-800 text-white px-6 py-3 rounded-[5px]   hover:bg-gray-900 w-full"
              >
                Add To Cart
                
              </button>
            </div>

            <p className="text-sm mt-6">
              Call Us To Order By Mobile Number :{" "}
              <span className="font-semibold text-emerald-600">
                +91 98765 43210
              </span>
            </p>
          </div>
{/* 3 */}
          <div className="md:col-span-5 xl:col-span-3 md:px-4 md:py-4 xl:px-3 xl:py-3">
            <ShippingCard />
          </div>
        </div>


          {/* 4 */}
          <div className="min-h-screen  py-12">
            <FAQ items={faqData} title="Frequently Asked Questions" />
        </div>
        <ProductFeature
          title="Featured Products"
        />
      </div>
    </div>
  );
};

export default ProductScreen;
