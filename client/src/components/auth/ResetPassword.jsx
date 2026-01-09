import React from "react";
import { Link } from "react-router-dom";
import { FiLock } from "react-icons/fi";

// internal imports
import Error from "@components/form/Error";
import InputArea from "@components/form/InputArea";
import useLoginSubmit from "../../hooks/useAuthSubmit";

const ResetPassword = () => {
  const { handleSubmit, submitHandler, register, errors, loading, validationRules } =
    useLoginSubmit("reset-password");

  return (
    <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
      <div className="py-4 flex flex-col lg:flex-row w-full">
        <div className="w-full sm:p-5 lg:p-8">
          <div className="mx-auto text-left justify-center rounded-md w-full max-w-lg px-4 py-8 sm:p-10 overflow-hidden align-middle transition-all transform bg-white shadow-xl rounded-2x">
            <div className="overflow-hidden mx-auto">
              <div className="text-center mb-6">
                <Link to="/" className="text-3xl font-bold font-serif">
                  Reset Password
                </Link>
                <p className="text-sm md:text-base text-gray-500 mt-2 mb-8 sm:mb-10">
                  Enter your phone, OTP and new password
                </p>
              </div>

              <form
                onSubmit={handleSubmit(submitHandler)}
                className="flex flex-col justify-center"
              >
                <div className="grid grid-cols-1 gap-5">
                  <div className="form-group">
                    <InputArea
                      register={register}
                      label="Phone"
                      name="phone"
                      type="text"
                      placeholder="Your Phone Number"
                      rules={validationRules.phone}
                    />
                    <Error errorName={errors?.phone} />
                  </div>

                  <div className="form-group">
                    <InputArea
                      register={register}
                      label="OTP"
                      name="otp"
                      type="text"
                      placeholder="6-digit OTP"
                      rules={validationRules.otp}
                      maxLength={6}
                    />
                    <Error errorName={errors?.otp} />
                  </div>

                  <div className="form-group">
                    <InputArea
                      register={register}
                      label="New Password"
                      name="newPassword"
                      type="password"
                      placeholder="New Password"
                      rules={validationRules.password}
                      Icon={FiLock}
                    />
                    <Error errorName={errors?.newPassword} />
                  </div>

                  <div className="form-group">
                    <InputArea
                      register={register}
                      label="Confirm Password"
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm Password"
                      rules={validationRules.confirmPassword}
                      Icon={FiLock}
                    />
                    <Error errorName={errors?.confirmPassword} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex ms-auto">
                      <Link
                        to="/auth/login"
                        className="text-end text-sm text-heading ps-3 underline hover:no-underline focus:outline-none"
                      >
                        Login?
                      </Link>
                    </div>
                  </div>

                  {loading ? (
                    <button
                      disabled
                      type="submit"
                      className="md:text-sm leading-5 inline-flex items-center cursor-not-allowed transition ease-in-out duration-300 font-medium text-center justify-center rounded-md bg-emerald-500 text-white px-5 md:px-6 lg:px-8 py-2 md:py-3 lg:py-3 h-12 mt-1 text-sm lg:text-sm w-full sm:w-auto"
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
                      type="submit"
                      className="w-full text-center py-3 rounded bg-emerald-500 text-white hover:bg-emerald-600 transition-all focus:outline-none my-1"
                    >
                      Reset password
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
