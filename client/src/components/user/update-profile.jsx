import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";

//internal import
import Label from "@components/form/Label";
import Error from "@components/form/Error";
import Dashboard from "./dashboard";
import InputArea from "@components/form/InputArea";
import AuthService from "@services/AuthService";
import Uploader from "@components/image-uploader/Uploader";
import { notifySuccess, notifyError } from "@utils/toast";
import { useAuth } from "@context/AuthContext";

const UpdateProfile = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useAuth(); // Assuming setUser is available or we use AuthService directly

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);

    const userData = {
      name: data.name,
      email: data.email,
      address: data.address,
      phone: data.phone,
      image: imageUrl,
    };
    try {
      const res = await AuthService.updateProfile(userData);
      setLoading(false);
      
      // Update local user state in context
      if (setUser) {
          setUser(res.user || { ...user, ...userData });
      }
      
      notifySuccess("Profile Updated Successfully!");
    } catch (err) {
      setLoading(false);
      notifyError(err?.response?.data?.message || err?.message);
    }
  };

  useEffect(() => {
    if (user) {
      setValue("name", user?.name);
      setValue("email", user?.email);
      setValue("address", user?.address);
      setValue("phone", user?.phone);
      setImageUrl(user?.image);
    }
  }, [user, setValue]);

  return (
    <Dashboard
      title="Update Profile"
      description="This is edit profile page"
    >
      <div className="max-w-screen-2xl">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h2 className="text-xl font-serif font-semibold mb-5">
                Update Profile
              </h2>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <div className="bg-white space-y-6">
              <div>
                <Label label="Photo" />
                <div className="mt-1 flex items-center">
                  <Uploader imageUrl={imageUrl} setImageUrl={setImageUrl} />
                </div>
              </div>
            </div>

            <div className="mt-10 sm:mt-0">
              <div className="md:grid-cols-6 md:gap-6">
                <div className="mt-5 md:mt-0 md:col-span-2">
                  <div className="lg:mt-6 mt-4 bg-white">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <InputArea
                          register={register}
                          label="Full Name"
                          name="name"
                          type="text"
                          placeholder="Full Name"
                        />
                        <Error errorName={errors.name} />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <InputArea
                          register={register}
                          label="Address"
                          name="address"
                          type="text"
                          placeholder="Address"
                        />
                        <Error errorName={errors.address} />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <InputArea
                          register={register}
                          label="Phone Number"
                          name="phone"
                          type="tel"
                          placeholder="Phone Number"
                        />
                        <Error errorName={errors.phone} />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <InputArea
                          register={register}
                          name="email"
                          type="email"
                          readOnly={true}
                          defaultValue={user?.email}
                          label="Email Address"
                          placeholder="Email Address"
                        />
                        <Error errorName={errors.email} />
                      </div>
                    </div>
                    <div className="col-span-6 sm:col-span-3 mt-5 text-right">
                      {loading ? (
                        <button
                          disabled={loading}
                          type="submit"
                          className="md:text-sm leading-5 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-medium text-center justify-center border-0 border-transparent rounded-md placeholder-white focus-visible:outline-none focus:outline-none bg-emerald-500 text-white px-5 md:px-6 lg:px-8 py-2 md:py-3 lg:py-3 hover:text-white hover:bg-emerald-600 h-12 mt-1 text-sm lg:text-sm w-full sm:w-auto"
                        >
                          <img
                            src="/loader/spinner.gif"
                            alt="Loading"
                            width={20}
                            height={10}
                          />
                          <span className="font-serif ml-2 font-light">
                            Processing
                          </span>
                        </button>
                      ) : (
                        <button
                          disabled={loading}
                          type="submit"
                          className="md:text-sm leading-5 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-medium text-center justify-center border-0 border-transparent rounded-md placeholder-white focus-visible:outline-none focus:outline-none bg-emerald-500 text-white px-5 md:px-6 lg:px-8 py-2 md:py-3 lg:py-3 hover:text-white hover:bg-emerald-600 h-12 mt-1 text-sm lg:text-sm w-full sm:w-auto"
                        >
                          Update Profile
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

export default UpdateProfile;
