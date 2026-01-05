import React, { useState } from "react";
import { useCartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const ProductCard = ({
  id,
  slug,
  image,
  title,
  price,
  originalPrice,
  discountPercent,
  rating,
  reviewCount,
  badgeText,
  showFreeGift = false,
  freeGiftText = "worth up to ₹1000 with every order.",
}) => {
  const navigate = useNavigate();
  const { addItem } = useCartContext();

  const [loading, setLoading] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  const addToCart = () => {
    setLoading(true);

    setTimeout(() => {
      addItem({
        id,
        title,
        price,
        image: Array.isArray(image) ? image[0] : image,
        quantity: 1,
      });
      setLoading(false);
    }, 600);
  };

  return (
    <div className="w-[260px] sm:w-[280px] md:w-[300px] shrink-0">
      <div
        className="
          group relative
          rounded-2xl bg-white
          border border-gray-200
          shadow-sm hover:shadow-lg
          transition
          overflow-hidden
        "
      >
        {/* IMAGE */}
        <div
          className="relative h-[260px] cursor-pointer"
          onClick={() => navigate(`/product/${slug}`)}
        >
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* BADGE */}
          {badgeText && (
            <span className="absolute top-3 left-3 bg-[#FF2952] text-white text-xs font-bold px-3 py-1 rounded-full">
              {badgeText}
            </span>
          )}

          {/* WISHLIST */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setWishlisted(!wishlisted);
            }}
            className="
              absolute top-3 right-3
              h-10 w-10
              flex items-center justify-center
              rounded-full
              bg-white
              shadow
              text-[#FF2952]
              hover:scale-110
              transition
            "
          >
            {wishlisted ? <FaHeart /> : <FaRegHeart />}
          </button>

          {/* ADD TO CART (HOVER / MOBILE) */}
       <div className="absolute inset-x-0 bottom-2 flex justify-center">
  <button
    onClick={(e) => {
      e.stopPropagation();
      addToCart();
    }}
    disabled={loading}
    className="
      w-[70%]
      bg-yellow-400 text-black
      font-bold
      px-4 py-1.5
      text-xs
      rounded-full
      shadow-[0_6px_0_#d9a400]
      hover:translate-y-0.5
      hover:shadow-[0_3px_0_#d9a400]
      transition-all
      disabled:opacity-70
    "
  >
    {loading ? "Adding..." : "Add to Cart"}
  </button>
</div>

        </div>

        {/* BODY */}
        <div className="p-4 flex flex-col gap-2">

          {/* TITLE */}
          <h3 className="text-sm md:text-base font-semibold text-gray-900 line-clamp-2">
            {title}
          </h3>

          {/* RATING */}
          {rating && (
            <div className="flex items-center gap-2 text-xs">
              <span className="bg-[#FFD84D] text-black px-2 py-0.5 rounded-full font-bold">
                ⭐ {rating}
              </span>
              <span className="text-gray-500">
                ({reviewCount})
              </span>
            </div>
          )}

          {/* PRICE */}
          <div className="flex items-center gap-2">
            {discountPercent && (
              <span className="text-[#FF2952] font-bold text-sm">
                -{discountPercent}%
              </span>
            )}
            <span className="text-lg font-extrabold text-gray-900">
              ₹{price}
            </span>
            {originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                ₹{originalPrice}
              </span>
            )}
          </div>

          {/* FREE GIFT */}
          {showFreeGift && (
            <div className="bg-[#FFF6C2] text-xs px-3 py-2 rounded-xl">
              <span className="text-[#6739A2] font-extrabold mr-1">
                FREE GIFT
              </span>
              <span className="text-gray-700">
                {freeGiftText}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
