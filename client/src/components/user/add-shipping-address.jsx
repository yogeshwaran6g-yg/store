import { useSearchParams } from "react-router-dom";

//internal imports
import Dashboard from "./dashboard";
import Error from "@components/form/Error";
import { countries } from "@config/constants";
import InputArea from "@components/form/InputArea";
import SelectOption from "@components/form/SelectOption";
import useShippingAddressSubmit from "@hooks/useShippingAddressSubmit";

const AddShippingAddress = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  //   console.log("id", id);

  const {
    register,
    onSubmit,
    errors,
    cities,
    areas,
    handleSubmit,
    selectedValue,
    isSubmitting,
    handleInputChange,
  } = useShippingAddressSubmit(id);

  //   console.log("selectedValues", selectedValue);

  return (
    <Dashboard
      title="add-shipping-address"
      description="This is my account page"
    >
      <div className="max-w-screen-2xl">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h2 className="text-xl font-semibold mb-5">
                Add Shipping Address
              </h2>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <div className="mt-10 sm:mt-0">
              <div className="md:grid-cols-6 md:gap-6">
                <div className="mt-5 md:mt-0 md:col-span-2">
                  <div className="lg:mt-6 mt-4 bg-white">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <InputArea
                          register={register}
                          rules={{ required: "First Name is required" }}
                          label="First Name"
                          name="name"
                          type="text"
                          placeholder="First Name"
                        />

                        <Error errorName={errors.name} />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <InputArea
                          register={register}
                          rules={{ required: "Last Name is required" }}
                          label="Last Name"
                          name="lastName"
                          type="text"
                          placeholder="Last Name"
                        />
                        <Error errorName={errors.lastName} />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <InputArea
                          register={register}
                          rules={{
                            required: "Full Address is required",
                            minLength: {
                              value: 15,
                              message: "Address must be at least 15 characters long",
                            },
                          }}
                          label="Full Address"
                          name="address"
                          type="text"
                          placeholder="Input your full address"
                        />

                        <Error errorName={errors.address} />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <InputArea
                          register={register}
                          rules={{ required: "Phone number is required" }}
                          label="Phone"
                          name="contact"
                          type="tel"
                          placeholder="Phone/Mobile"
                        />

                        <Error errorName={errors.contact} />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <InputArea
                          register={register}
                          label="Email"
                          name="email"
                          type="email"
                          placeholder="Email"
                          readOnly={false}
                        />

                        <Error errorName={errors.email} />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <InputArea
                          register={register}
                          label="Country"
                          name="country"
                          type="text"
                          placeholder="Country"
                          defaultValue="India"
                          readOnly={true}
                        />
                        <Error errorName={errors.country} />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
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
                      <div className="col-span-6 sm:col-span-3">
                        <InputArea
                          register={register}
                          rules={{ required: "Area / Locality is required" }}
                          label="Area / Locality"
                          name="area"
                          type="text"
                          placeholder="Enter your area"
                        />
                        <Error errorName={errors.area} />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <InputArea
                          register={register}
                          rules={{ required: "State is required" }}
                          label="State"
                          name="state"
                          type="text"
                          placeholder="Enter your state"
                        />
                        <Error errorName={errors.state} />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <InputArea
                          register={register}
                          rules={{
                            required: "Zip Code is required",
                            pattern: {
                              value: /^[0-9]+$/,
                              message: "Zip Code must be a number",
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
                    </div>
                    <div className="col-span-6 sm:col-span-3 mt-5 text-right">
                      {isSubmitting ? (
                        <button
                          disabled={isSubmitting}
                          type="submit"
                          className="cursor-progress md:text-sm leading-5 inline-flex items-center transition ease-in-out duration-300 font-medium text-center justify-center border-0 border-transparent rounded-md placeholder-white focus-visible:outline-none focus:outline-none bg-cyan-600 text-white px-5 md:px-6 lg:px-8 py-2 md:py-3 lg:py-3 hover:text-white hover:bg-cyan-700 h-12 mt-1 text-sm lg:text-sm w-full sm:w-auto"
                        >
                          <img
                            src="/loader/spinner.gif"
                            alt="Loading"
                            width={20}
                            height={10}
                          />
                          <span className=" ml-2 font-light">Processing</span>
                        </button>
                      ) : (
                        <button
                          disabled={isSubmitting}
                          type="submit"
                          className="md:text-sm leading-5 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-medium text-center justify-center border-0 border-transparent rounded-md placeholder-white focus-visible:outline-none focus:outline-none bg-cyan-600 text-white px-5 md:px-6 lg:px-8 py-2 md:py-3 lg:py-3 hover:text-white hover:bg-cyan-700 h-12 mt-1 text-sm lg:text-sm w-full sm:w-auto"
                        >
                          Add Shipping Address
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Dashboard>
  );
};

export default AddShippingAddress;
