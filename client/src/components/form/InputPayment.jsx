import React from "react";

const InputPayment = ({ register, Icon, name, value, setShowCard }) => {
  const field = register("paymentMethod", {
    required: "Payment Method is required!",
  });

  return (
    <div className="px-3 py-4 card border border-gray-200 bg-white rounded-md">
      <label className="cursor-pointer">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-xl mr-3 text-gray-400">
              <Icon />
            </span>
            <h6 className="font-serif font-medium text-sm text-gray-600">
              {name}
            </h6>
          </div>

          <input
            type="radio"
            {...field}
            value={value}
            onChange={(e) => {
              field.onChange(e);        // ✅ updates userInfo.paymentMethod
              setShowCard(value !== "Cash");
            }}
            className="form-radio outline-none focus:ring-0 text-emerald-500"
          />
        </div>
      </label>
    </div>
  );
};

export default InputPayment;
