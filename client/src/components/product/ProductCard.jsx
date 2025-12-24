import React from "react";









const ProductCard = ({
  image,
  title,
  price,
  originalPrice,
  discountPercent,
  rating,
  reviewCount,
  badgeText,
  showFreeGift = true,
  freeGiftText = "worth up to ₹1000 with every order.",
  onAddToCart,
}) => {
  return (
    <div className="w-[260px] sm:w-[280px] md:w-[300px] shrink-0">zx
      <div
        className="sku-card rounded-lg bg-[#F4F4F4] flex flex-col gap-4 max-w-[300px]"
        style={{ cursor: "pointer" }}
      >
        {/* IMAGE */}
        <div className="card-image w-full relative rounded-lg overflow-hidden group">

            <img
                className="group-hover:scale-105"
              alt={title}
              loading="lazy"
              width="260"
              height="300"
              src={image}
              style={{
                color: "transparent",
                width: "100%",
                height: "300px",
                objectFit: "cover",
              }}
            />
          {/* FLAG */}
          {badgeText && (
            <div className="absolute top-0 left-0">
              <div className="px-4 py-1 rounded-br-md text-white text-[12px] md:text-[16px] font-semibold bg-[#FF2952]">
                {badgeText}
              </div>
            </div>
          )}

        
        </div>

        {/* BODY */}
        <div className="flex flex-col gap-3 pb-3">
          {/* TITLE */}
          <div className="px-2 text-[12px] md:text-[14px] font-semibold">
            <h3 className="line-clamp-2">{title}</h3>
          </div>

          {/* RATINGS */}
          {rating && (
            <div className="flex items-center gap-2 px-2 text-sm">
              <div className="bg-[#6739A2] text-white px-2 rounded flex items-center gap-1">
                ⭐ {rating}
              </div>
              <span className="text-gray-600 text-xs">
                {reviewCount} reviews
              </span>
            </div>
          )}

          {/* PRICE */}
          <div className="px-2 flex items-center gap-3">
            {discountPercent && (
              <span className="text-[#FF2952] text-lg font-semibold">
                -{discountPercent}%
              </span>
            )}

            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold text-black">
                ₹{price}
              </span>

              {originalPrice && (
                <span className="line-through text-gray-400 text-sm">
                  ₹{originalPrice}
                </span>
              )}
            </div>
          </div>

          {/* FREE GIFT */}
          {showFreeGift && (
            <div className="bg-[#FFDE17] px-4 py-2 mx-2 text-xs">
              <span className="text-[#6739A2] font-extrabold italic mr-1">
                FREE GIFT
              </span>
              <span className="text-gray-900">{freeGiftText}</span>
            </div>
          )}

          {/* BUTTON */}
          <button
            onClick={onAddToCart}
            className="mx-2 mt-2 h-10 rounded-md border border-[#6739A2] text-[#6739A2] uppercase text-sm font-medium hover:bg-[#6739A2] hover:text-white transition"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
