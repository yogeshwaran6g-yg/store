import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FiChevronRight, FiMinus, FiPlus } from "react-icons/fi";
import { productDummy } from "../../config/constants";
import ShippingCard from "./ShippingCard";
import { useCartContext } from "../context/CartContext";
import FAQ from "../faq/Faq";
import {faqData} from "../../config/constants";
import ProductFeature from "../home/Product";

const ProductScreen = () => { 
  const { slug } = useParams();

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [img, setImg] = useState("");
  const [isReadMore, setIsReadMore] = useState(true);
  const {addItem}=useCartContext();

  // simulate API fetch
  useEffect(() => {
    if (slug === productDummy.slug) {
      setProduct(productDummy);
      setImg(productDummy.image[0]);
    }
  }, [slug]);

  if (!product) return <p>Loading...</p>;

  const discount = Math.round(
    ((product.prices.originalPrice - product.prices.price) / 
      product.prices.originalPrice) *
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
        <span className="text-gray-500">{product.title}</span>
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
                alt={product.title}
                className="w-full rounded-lg"
              />
            </div>

            <div className="flex gap-3 mt-4">
              {product.image.map((i, idx) => (
                <img
                  key={idx}
                  src={i}
                  alt="thumb"
                  onClick={() => setImg(i)}
                  className="w-20 h-20 object-cover rounded cursor-pointer border"
                />
              ))}
            </div>
          </div>
{/* 2 */}
          {/* DETAILS */}
          <div className="md:col-span-7 md:px-4 md:py-4 xl:col-span-5 xl:px-3 xl:py-3">
            <h1 className="text-2xl font-semibold mb-1">
              {product.title}
            </h1>

            <p className="text-sm text-gray-500 mb-2">
              SKU: <span className="font-medium">{product.sku}</span>
            </p>

            <div className="mb-4">
              <span className="text-xl font-bold tracking-tight">
                ₹{product.prices.price}
              </span>
              <span className="line-through text-gray-400 ml-3">
                ₹{product.prices.originalPrice}
              </span>
            </div>

            {/* DESCRIPTION */}
            <p className="text-gray-500 text-sm mb-3 leading-6 md:leading-7">
              {isReadMore
                ? product.description.slice(0, 150)
                : product.description}
              {product.description.length > 150 && (
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
                onClick={() => addItem(product, qty)}
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
        <ProductFeature/>
      </div>
    </div>
  );
};

export default ProductScreen;
