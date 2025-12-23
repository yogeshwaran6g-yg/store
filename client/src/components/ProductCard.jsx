const ProductCard = () => {
  return (
    <div
      className="sku-card rounded-lg bg-[#F4F4F4] flex flex-col gap-4 w-full"
      style={{ cursor: "pointer" }}
    >
      {/* IMAGE */}
      <div className="card-image w-full relative rounded-lg cursor-pointer overflow-hidden group">
        <div className="relative overflow-hidden">
          <div className="transition-transform duration-500 ease-in-out translate-x-0">
            <img
              alt="Travel Toys Bundle"
              loading="lazy"
              width="600"
              height="600"
              sizes="(max-width: 768px) 50vw, 33vw"
              src="https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&q=80&w=600&h=600"
              style={{
                color: "transparent",
                width: "100%",
                height: "auto",
              }}
            />
          </div>
        </div>

        {/* FLAG */}
        <div className="absolute top-0 left-0">
          <div className="flag-tag px-4 py-1 rounded-br-md text-[#FFFFFF] text-[12px] md:text-[16px] font-semibold bg-[#FF2952]">
            SuperSaver
          </div>
        </div>

        {/* QUICK VIEW */}
        <div className="hidden absolute bottom-4 w-full justify-center items-center gap-4 opacity-0 group-hover:opacity-100 md:flex transition-opacity">
          <div className="relative group/icon bg-white p-1 rounded-full border custom-box-shadow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-eye !w-[20px] md:!w-[26px]"
            >
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
              <circle cx="12" cy="12" r="3" />
            </svg>

            <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max px-2 py-1 text-sm text-white bg-black rounded opacity-0 group-hover/icon:opacity-100 transition-opacity pointer-events-none">
              Quick View
            </div>
          </div>
        </div>
      </div>

      {/* BODY */}
      <div className="card-body flex flex-col gap-2 md:gap-3 pb-[1rem] md:pb-[0.75rem]">
        <div className="sku-title text-[12px] md:text-[14px] font-semibold text-left px-2">
          <h1 className="line-clamp-2 h-fit md:h-fit">
            Travel Toys Bundle | Learning Toy Bundle For Travels | Ages 4+
          </h1>
        </div>

        {/* RATINGS */}
        <div className="ratings flex items-center gap-2 md:gap-4 text-[#090909] px-2">
          <a
            href="#review_parent_section"
            className="flex items-center justify-center px-2 rounded-md bg-[#6739A2] text-white gap-1"
          >
            <img
              alt="*"
              loading="lazy"
              width="13"
              height="12"
              className="h-3 w-3 md:h-4 md:w-4"
              src="/_next/static/media/star.a871de54.svg"
              style={{ color: "transparent" }}
            />
            <div className="py-[2px] text-[12px] md:text-[14px] font-bold">
              4.6
            </div>
          </a>

          <div className="ratings__count flex gap-2 text-[10px] md:text-[12px]">
            <p>50 reviews</p>
          </div>
        </div>

        {/* PRICE */}
        <div>
          <div className="flex gap-2 md:gap-4 items-center px-2">
            <div className="text-[#FF2952] text-[18px] md:text-[26px]">
              -20%
            </div>
            <div className="flex gap-1 md:gap-2 items-center">
              <div className="text-[#090909] text-[16px] md:text-[20px] font-semibold">
                ₹5118
              </div>
              <div className="line-through text-[#C1C1C1] text-[10px] md:text-[16px]">
                ₹6397
              </div>
            </div>
          </div>
        </div>

        {/* FREE GIFT */}
        <div className="bg-[#FFDE17] px-4 py-2 flex items-center gap-3 w-full max-w-lg">
          <div className="flex-shrink-0 hidden md:block">
            <img
              alt="Free Gift"
              loading="lazy"
              width="52"
              height="52"
              src="/_next/static/media/FreeGiftLogo.8fa188fc.svg"
              style={{ color: "transparent" }}
            />
          </div>

          <div className="flex-1 leading-tight md:leading-4">
            <span className="text-[#6739A2] font-extrabold italic text-[12px] mr-1">
              FREE GIFT
            </span>
            <span className="text-gray-900 text-[12px] font-medium">
              worth up to ₹1000 with every order.
            </span>
          </div>
        </div>

        {/* BUTTON */}
        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium h-10 px-4 py-2 mt-[0.5rem] md:mt-[0rem] mx-2 uppercase bg-[#FFFFFD] border border-[#6739A2] text-[#6739A2] hover:bg-[#6739A2] hover:text-[#FFFFFD] transition-colors">
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
