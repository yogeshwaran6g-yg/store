import { useSearchParams } from "react-router-dom";

// internal imports
import Dashboard from "./dashboard";
import Error from "@components/form/Error";
import InputArea from "@components/form/InputArea";
import useShippingAddressSubmit from "@hooks/useShippingAddressSubmit";

const AddShippingAddress = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const {
    register,
    onSubmit,
    errors,
    handleSubmit,
    isSubmitting,
  } = useShippingAddressSubmit(id);

  return (
    <Dashboard
      title="Add Shipping Address"
      description="Add a new shipping address"
    >
      <div className="max-w-screen-xl mx-auto pt-6">

        {/* ===== Header ===== */}
        <div className="mb-8">
          <h2 className="text-2xl font-serif font-semibold text-purple-700">
            Add Shipping Address
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Please provide accurate delivery details
          </p>
        </div>

        {/* ===== Card ===== */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-2xl bg-white/70 backdrop-blur-xl border border-purple-200 shadow-xl p-6 sm:p-8">

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

              {/* Full Name */}
              <div>
                <InputArea
                  register={register}
                  rules={{ required: "Full Name is required" }}
                  label="Full Name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                />
                <Error errorName={errors.name} />
              </div>

              {/* Phone */}
              <div>
                <InputArea
                  register={register}
                  rules={{ required: "Phone number is required" }}
                  label="Phone"
                  name="contact"
                  type="tel"
                  placeholder="Phone / Mobile"
                />
                <Error errorName={errors.contact} />
              </div>

              {/* Email */}
              <div>
                <InputArea
                  register={register}
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  readOnly
                />
                <Error errorName={errors.email} />
              </div>

              {/* Country */}
              <div>
                <InputArea
                  register={register}
                  label="Country"
                  name="country"
                  type="text"
                  defaultValue="India"
                  readOnly
                />
                <Error errorName={errors.country} />
              </div>

              {/* City */}
              <div>
                <InputArea
                  register={register}
                  rules={{ required: "City is required" }}
                  label="City"
                  name="city"
                  type="text"
                  placeholder="Enter your city"
                />
                <Error errorName={errors.city} />
              </div>

              {/* Area */}
              <div>
                <InputArea
                  register={register}
                  rules={{ required: "Area is required" }}
                  label="Area"
                  name="area"
                  type="text"
                  placeholder="Enter your area"
                />
                <Error errorName={errors.area} />
              </div>

              {/* Zip Code */}
              <div>
                <InputArea
                  register={register}
                  rules={{
                    required: "Zip Code is required",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Zip Code must be numeric",
                    },
                  }}
                  maxLength={6}
                  label="Zip Code"
                  name="zipCode"
                  type="text"
                  placeholder="Zip Code"
                />
                <Error errorName={errors.zipCode} />
              </div>

              {/* Full Address */}
              <div className="sm:col-span-2">
                <InputArea
                  register={register}
                  rules={{
                    required: "Full Address is required",
                    minLength: {
                      value: 15,
                      message: "Address must be at least 15 characters",
                    },
                  }}
                  label="Full Address"
                  name="address"
                  type="text"
                  placeholder="House no, street, landmark"
                />
                <Error errorName={errors.address} />
              </div>
            </div>

            {/* ===== Action ===== */}
            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="
                  w-full sm:w-auto
                  px-8 py-3
                  rounded-full
                  bg-purple-600 hover:bg-purple-700
                  text-white font-semibold
                  shadow-md
                  transition
                  active:scale-95
                  disabled:opacity-60
                "
              >
                {isSubmitting ? "Processing..." : "Add Shipping Address"}
              </button>
            </div>

          </div>
        </form>
      </div>
    </Dashboard>
  );
};

export default AddShippingAddress;
