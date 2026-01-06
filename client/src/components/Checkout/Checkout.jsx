import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  IoReturnUpBackOutline,
  IoArrowForward,
  IoBagHandle,
  IoWalletSharp,
} from "react-icons/io5";
import { ImCreditCard } from "react-icons/im";
import { useRef } from "react";

// internal imports
import Label from "../form/Label";
import Error from "../form/Error";
import CartItem from "../cart/CartItem";
import InputArea from "../form/InputArea";
import InputShipping from "../form/InputShipping";
import InputPayment from "../form/InputPayment";
import SwitchToggle from "../form/SwitchToggle";
import { useCartContext } from "../context/CartContext"; 
import { useAuth } from "../context/AuthContext"; 
import useCheckout from "../../hooks/useCheckout";
import { toast } from 'react-toastify';


// Mock Data and Helpers
const useTranslation = () => {
  return {
    t: (key) => {
        if(key === "common:cashOnDelivery") return "Cash On Delivery";
        if(key === "common:creditCard") return "Credit Card";
        if(key === "common:processing") return "Processing";
        if(key === "common:couponCode") return "Coupon Code";
        return key;
    },
  };
};

const useGetSetting = () => {
  return {
    storeCustomizationSetting: {
      checkout: {
        personal_details: { en: "Personal Details" },
        first_name: { en: "First Name" },
        last_name: { en: "Last Name" },
        email_address: { en: "Email Address" },
        checkout_phone: { en: "Phone Number" },
        shipping_details: { en: "Shipping Details" },
        street_address: { en: "Street Address" },
        city: { en: "City" },
        country: { en: "Country" },
        zip_code: { en: "Zip Code" },
        shipping_cost: { en: "Shipping Cost" },
        shipping_name_two: { en: "Express Delivery" },
        shipping_one_desc: { en: "Delivery within 24 hours" },
        shipping_two_desc: { en: "Delivery within 7 days" },
        payment_method: { en: "Payment Method" },
        continue_button: { en: "Continue Shopping" },
        confirm_button: { en: "Confirm Order" },
        order_summary: { en: "Order Summary" },
        apply_button: { en: "Apply" },
        sub_total: { en: "Subtotal" },
        discount: { en: "Discount" },
        total_cost: { en: "Total Cost" },
      },
    },
  };
};
const useUtilsFunction = () => {
    return {
        showingTranslateValue: (data) => data?.en || data,
    }
}

const Checkout = () => {
  const { t } = useTranslation();
  let currency = "$"
  const [isEmpty, setIsEmpty] =  useState(false);
  const { storeCustomizationSetting } = useGetSetting();
  const { showingTranslateValue } = useUtilsFunction();
  const navigate = useNavigate();
  const { handleCheckout, loading, error: checkoutError } = useCheckout();
  
  // Cart Context
  const { cartState } = useCartContext();
  const { hasShippingAddress } = useAuth();
  const { items, cartTotal } = cartState;
  

  // State
  const [showCard, setShowCard] = useState(false);
  const [shippingCost, setShippingCost] = useState(100); 
  const discountAmount = 0.00;
  
  // User Info State
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "", 
    contact: "",
    address: "",
    city: "",
    country: "", 
    zipCode: "",
    paymentMethod: "",
  });

  const [errors, setErrors] = useState({});
  const total = cartTotal + shippingCost - discountAmount;
  const couponInfo = { couponCode: null };
  const storeSetting = {
      cod_status: true, 
      stripe_status: false, 
      razorpay_status: true, 
  };

  // Redirect if empty
  useEffect(() => {
    if (items.length === 0) {
      navigate("/");
    }
  }, [items, navigate]);

  // Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({ ...prev, [name]: value }));
    if(value) {
        setErrors(prev => ({...prev, [name]: undefined}));
    }
  };

  // Custom register to work with InputArea
  const register = (name) => {
      return {
          name,
          onChange: handleChange,
          value: userInfo[name] || "",          
      };
  };

  const handleShippingCost = (cost) => {
      setShippingCost(Number(cost));
  };

  const validate = () => {
      const newErrors = {};
      if (!userInfo.firstName) newErrors.firstName = "First Name is required";
      if (!userInfo.address) newErrors.address = "Address is required";
      if (!userInfo.city) newErrors.city = "City is required";
      if (!userInfo.country) newErrors.country = "Country is required";
      if (!userInfo.zipCode) newErrors.zipCode = "Zip Code is required";
      if (!userInfo.contact) newErrors.contact = "Phone is required";
      // Email is readOnly in UI often, but check if needed. Assuming it's coming from session or user input.
      // if (!userInfo.email) newErrors.email = "Email is required"; 
      if (!userInfo.paymentMethod) newErrors.paymentMethod = "Payment method is required";
      
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!validate()) {
      console.log(userInfo);
        toast.error("Please fill all required fields");
        return;
    }

    try {
        const res = await handleCheckout({ 
            user_info: userInfo, 
            shippingOption: shippingCost === 100 ? "EXPRESS" : "STANDARD" 
        });
        
        if (res.success) {
            toast.success("Order processed successfully!");
             // Redirect handled in useCheckout or here
             // if (res.method === 'url') window.location.href = res.url;
        } else {
            toast.error(res.error || "Checkout failed");
        }
    } catch (err) {
        toast.error("An error occurred");
    }
  };

  const handleDefaultShippingAddress = () => {};
  const useExistingAddress = false;
  const couponRef = useRef(null);
  const handleCouponCode = (e) => { e.preventDefault(); };

  useEffect(() => {
  setIsEmpty(items.length === 0);
}, [items]);


  return (
    <>
        
        <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
          <div className="py-10 lg:py-12 px-0 2xl:max-w-screen-2xl w-full xl:max-w-screen-xl flex flex-col md:flex-row lg:flex-row">
            <div className="md:w-full lg:w-3/5 flex h-full flex-col order-2 sm:order-1 lg:order-1">
              <div className="mt-5 md:mt-0 md:col-span-2">
                <form onSubmit={submitHandler}>
                  {hasShippingAddress && (
                    <div className="flex justify-end my-2">
                      <SwitchToggle
                        id="shipping-address"
                        title="Use Default Shipping Address"
                        processOption={useExistingAddress}
                        handleProcess={handleDefaultShippingAddress}
                      />
                    </div>
                  )}
                  <div className="form-group">
                    <h2 className="font-semibold font-serif text-base text-gray-700 pb-3">
                      01.{" "}
                      {showingTranslateValue(
                        storeCustomizationSetting?.checkout?.personal_details
                      )}
                    </h2>

                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <InputArea
                          register={register}
                          label={showingTranslateValue(
                            storeCustomizationSetting?.checkout?.first_name
                          )}
                          name="firstName"
                          type="text"
                          placeholder="John"
                        />
                        <Error errorName={errors.firstName} />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <InputArea
                          register={register}
                          label={showingTranslateValue(
                            storeCustomizationSetting?.checkout?.last_name
                          )}
                          name="lastName"
                          type="text"
                          placeholder="Doe"
                          required={false}
                        />
                        <Error errorName={errors.lastName} />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <InputArea
                          register={register}
                          label={showingTranslateValue(
                            storeCustomizationSetting?.checkout?.email_address
                          )}
                          name="email"
                          type="email"
                          readOnly={true}
                          placeholder="youremail@gmail.com"
                        />
                        <Error errorName={errors.email} />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <InputArea
                          register={register}
                          label={showingTranslateValue(
                            storeCustomizationSetting?.checkout?.checkout_phone
                          )}
                          name="contact"
                          type="tel"
                          placeholder="+062-6532956"
                        />

                        <Error errorName={errors.contact} />
                      </div>
                    </div>
                  </div>

                  <div className="form-group mt-12">
                    <h2 className="font-semibold font-serif text-base text-gray-700 pb-3">
                      02.{" "}
                      {showingTranslateValue(
                        storeCustomizationSetting?.checkout?.shipping_details
                      )}
                    </h2>

                    <div className="grid grid-cols-6 gap-6 mb-8">
                      <div className="col-span-6">
                        <InputArea
                          register={register}
                          label={showingTranslateValue(
                            storeCustomizationSetting?.checkout?.street_address
                          )}
                          name="address"
                          type="text"
                          placeholder="123 Boulevard Rd, Beverley Hills"
                        />
                        <Error errorName={errors.address} />
                      </div>

                      <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                        <InputArea
                          register={register}
                          label={showingTranslateValue(
                            storeCustomizationSetting?.checkout?.city
                          )}
                          name="city"
                          type="text"
                          placeholder="Los Angeles"
                        />
                        <Error errorName={errors.city} />
                      </div>

                      <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                        <InputArea
                          register={register}
                          label={showingTranslateValue(
                            storeCustomizationSetting?.checkout?.country
                          )}
                          name="country"
                          type="text"
                          placeholder="India" // Default India as implicit context
                        />
                        <Error errorName={errors.country} />
                      </div>

                      <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                        <InputArea
                          register={register}
                          label={showingTranslateValue(
                            storeCustomizationSetting?.checkout?.zip_code
                          )}
                          name="zipCode"
                          type="text"
                          placeholder="234567"
                        />
                        <Error errorName={errors.zipCode} />
                      </div>
                    </div>

                    <Label
                      label={showingTranslateValue(
                        storeCustomizationSetting?.checkout?.shipping_cost
                      )}
                    />
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <InputShipping
                          currency={currency}
                          handleShippingCost={handleShippingCost}
                          register={register}
                          value={showingTranslateValue(
                            storeCustomizationSetting?.checkout
                              ?.shipping_name_two
                          )}
                          description={showingTranslateValue(
                            storeCustomizationSetting?.checkout
                              ?.shipping_one_desc
                          )}
                          cost={100} // Fixed 100
                          checked={shippingCost === 100}
                        />
                        <Error errorName={errors.shippingOption} />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <InputShipping
                          currency={currency}
                          handleShippingCost={handleShippingCost}
                          register={register}
                          value={showingTranslateValue(
                            storeCustomizationSetting?.checkout
                              ?.shipping_name_two
                          )}
                          description={showingTranslateValue(
                            storeCustomizationSetting?.checkout
                              ?.shipping_two_desc
                          )}
                          cost={50} // Fixed 50
                          checked={shippingCost === 50}
                        />
                        <Error errorName={errors.shippingOption} />
                      </div>
                    </div>
                  </div>
                  <div className="form-group mt-12">
                    <h2 className="font-semibold text-base text-gray-700 pb-3">
                      03.{" "}
                      {showingTranslateValue(
                        storeCustomizationSetting?.checkout?.payment_method
                      )}
                    </h2>
                  {showCard && checkoutError && (
  <div className="mb-3">
    <p className="text-red-400 text-sm mt-1">
      {checkoutError}
    </p>
  </div>
)}

                    <div className="grid sm:grid-cols-3 grid-cols-1 gap-4">
                      {storeSetting?.cod_status && (
                        <div className="pointer-events-none opacity-50"> 
                          <InputPayment
                            setShowCard={setShowCard}
                            register={register}
                            name={t("common:cashOnDelivery")}
                            value="Cash"
                            Icon={IoWalletSharp}
                            checked={userInfo.paymentMethod === "Cash"}
                          />
                          <Error errorMessage={errors.paymentMethod} />
                        </div>
                      )}

                      {/* Cashfree (Renamed from Razorpay) */}
                      <div className="">
                        <InputPayment
                          setShowCard={setShowCard}
                          register={register}
                          name="Cashfree"
                          value="Cashfree"
                          Icon={ImCreditCard}
                          checked={userInfo.paymentMethod === "Cashfree"}
                        />
                        <Error errorMessage={errors.paymentMethod} />
                      </div>
                      
                    </div>
                  </div>

                  <div className="grid grid-cols-6 gap-4 lg:gap-6 mt-10">
                    <div className="col-span-6 sm:col-span-3">
                      <Link
                        to="/"
                        className="bg-indigo-50 border border-indigo-100 rounded py-3 text-center text-sm font-medium text-gray-700 hover:text-gray-800 hover:border-gray-300 transition-all flex justify-center font-serif w-full"
                      >
                        <span className="text-xl mr-2">
                          <IoReturnUpBackOutline />
                        </span>
                        {showingTranslateValue(
                          storeCustomizationSetting?.checkout?.continue_button
                        )}
                      </Link>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <button
                        type="submit"
                        disabled={items.length === 0 || loading}
                        className="bg-emerald-500 hover:bg-emerald-600 border border-emerald-500 transition-all rounded py-3 text-center text-sm font-serif font-medium text-white flex justify-center w-full"
                      >
                        {loading ? (
                          <span className="flex justify-center text-center">
                            {" "}
                            <img
                              src="/loader/spinner.gif"
                              alt="Loading"
                              width={20}
                              height={10}
                            />{" "}
                            <span className="ml-2">
                              {t("common:processing")}
                            </span>
                          </span>
                        ) : (
                          <span className="flex justify-center text-center">
                            {showingTranslateValue(
                              storeCustomizationSetting?.checkout
                                ?.confirm_button
                            )}
                            <span className="text-xl ml-2">
                              {" "}
                              <IoArrowForward />
                            </span>
                          </span>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className="md:w-full lg:w-2/5 lg:ml-10 xl:ml-14 md:ml-6 flex flex-col h-full md:sticky lg:sticky top-28 md:order-2 lg:order-2">
              <div className="border p-5 lg:px-8 lg:py-8 rounded-lg bg-white order-1 sm:order-2">
                <h2 className="font-semibold font-serif text-lg pb-4">
                  {showingTranslateValue(
                    storeCustomizationSetting?.checkout?.order_summary
                  )}
                </h2>

                <div className="overflow-y-scroll flex-grow scrollbar-hide w-full max-h-64 bg-gray-50 block">
                  {items.map((item) => (
                    <CartItem key={item.id} item={item} currency={currency} />
                  ))}

                  {isEmpty && (
                    <div className="text-center py-10">
                      <span className="flex justify-center my-auto text-gray-500 font-semibold text-4xl">
                        <IoBagHandle />
                      </span>
                      <h2 className="font-medium font-serif text-sm pt-2 text-gray-600">
                        No Item Added Yet!
                      </h2>
                    </div>
                  )}
                </div>

                <div className="flex items-center mt-4 py-4 lg:py-4 text-sm w-full font-semibold text-heading last:border-b-0 last:text-base last:pb-0">
                  <form className="w-full">
                    {couponInfo.couponCode ? (
                      <span className="bg-emerald-50 px-4 py-3 leading-tight w-full rounded-md flex justify-between">
                        {" "}
                        <p className="text-emerald-600">Coupon Applied </p>{" "}
                        <span className="text-red-500 text-right">
                          {couponInfo.couponCode}
                        </span>
                      </span>
                    ) : (
                      <div className="flex flex-col sm:flex-row items-start justify-end">
                        <input
                          disabled
                          ref={couponRef}
                          type="text"
                          placeholder={t("common:couponCode")}
                          className="opacity-50 cursor-not-allowed form-input py-2 px-3 md:px-4 w-full appearance-none transition ease-in-out border text-input text-sm rounded-md h-12 duration-200 bg-white border-gray-200 focus:ring-0 focus:outline-none focus:border-emerald-500 placeholder-gray-500 placeholder-opacity-75"
                        />
                        <button
                            disabled
                            onClick={handleCouponCode}
                            className="opacity-50 cursor-not-allowed md:text-sm leading-4 inline-flex items-center transition ease-in-out duration-300 font-semibold text-center justify-center border border-gray-200 rounded-md placeholder-white focus-visible:outline-none focus:outline-none px-5 md:px-6 lg:px-8 py-3 md:py-3.5 lg:py-3 mt-3 sm:mt-0 sm:ml-3 md:mt-0 md:ml-3 lg:mt-0 lg:ml-3 hover:text-white hover:bg-emerald-500 h-12 text-sm lg:text-base w-full sm:w-auto"
                        >
                        {showingTranslateValue(
                            storeCustomizationSetting?.checkout?.apply_button
                        )}
                        </button>
                      </div>
                    )}
                  </form>
                </div>
                <div className="flex items-center py-2 text-sm w-full font-semibold text-gray-500 last:border-b-0 last:text-base last:pb-0">
                  {showingTranslateValue(
                    storeCustomizationSetting?.checkout?.sub_total
                  )}
                  <span className="ml-auto flex-shrink-0 text-gray-800 font-bold">
                    {currency}
                    {cartTotal?.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center py-2 text-sm w-full font-semibold text-gray-500 last:border-b-0 last:text-base last:pb-0">
                  {showingTranslateValue(
                    storeCustomizationSetting?.checkout?.shipping_cost
                  )}
                  <span className="ml-auto flex-shrink-0 text-gray-800 font-bold">
                    {currency}
                    {shippingCost?.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center py-2 text-sm w-full font-semibold text-gray-500 last:border-b-0 last:text-base last:pb-0">
                  {showingTranslateValue(
                    storeCustomizationSetting?.checkout?.discount
                  )}
                  <span className="ml-auto flex-shrink-0 font-bold text-orange-400">
                    {currency}
                    {discountAmount.toFixed(2)}
                  </span>
                </div>
                <div className="border-t mt-4">
                  <div className="flex items-center font-bold font-serif justify-between pt-5 text-sm uppercase">
                    {showingTranslateValue(
                      storeCustomizationSetting?.checkout?.total_cost
                    )}
                    <span className="font-serif font-extrabold text-lg">
                      {currency}
                      {parseFloat(total).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  );
};

export default Checkout;



/**
 * 
 * 
 * shipping cost
 * hasShippingAddress
 * coupon 
 * discount
 * default address
 */