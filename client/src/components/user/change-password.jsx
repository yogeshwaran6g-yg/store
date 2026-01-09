import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

// internal imports
import Error from "@components/form/Error";
import Dashboard from "./dashboard";
import InputArea from "@components/form/InputArea";
import AuthService from "@services/AuthService";
import { useAuth } from "@context/AuthContext";

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const onSubmit = async ({ currentPassword, newPassword }) => {
    setLoading(true);
    try {
      const res = await AuthService.changePassword({
        currentPassword,
        newPassword,
      });

      toast.success(res.message || "Password changed successfully");
      localStorage.setItem("accessToken", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setValue("phone", user?.phone);
  }, [user, setValue]);

  return (
    <Dashboard title="Change Password" description="Update account password">
      <div className="pt-4 max-w-2xl">

        {/* Header */}
        <h2 className="text-2xl font-serif font-semibold text-purple-700 mb-6">
          🔐 Change Password
        </h2>

        {/* Card */}
        <div className="rounded-2xl bg-white/70 backdrop-blur-xl border border-purple-200 shadow-xl p-6 sm:p-8">

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            {/* Phone */}
            <div>
              <InputArea
                register={register}
                label="Phone Number"
                name="phone"
                type="text"
                placeholder="Phone Number"
                readOnly
              />
              <Error errorName={errors.phone} />
            </div>

            {/* Current Password */}
            <div>
              <InputArea
                register={register}
                label="Current Password"
                name="currentPassword"
                type="password"
                placeholder="Current Password"
              />
              <Error errorName={errors.currentPassword} />
            </div>

            {/* New Password */}
            <div>
              <InputArea
                register={register}
                label="New Password"
                name="newPassword"
                type="password"
                placeholder="New Password"
                pattern={
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/
                }
                patternMessage={[
                  "Minimum 8 characters",
                  "At least one uppercase letter",
                  "At least one lowercase letter",
                  "At least one number",
                  "At least one special character",
                ]}
              />
              <Error errorName={errors.newPassword} />
            </div>

            {/* Action */}
            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="
                  flex items-center gap-2
                  px-8 py-3 rounded-full
                  font-semibold text-sm
                  text-white
                  bg-gradient-to-r from-purple-600 to-purple-500
                  shadow-[0_6px_0_#4c1d95]
                  hover:translate-y-[1px]
                  hover:shadow-[0_4px_0_#4c1d95]
                  transition-all
                  disabled:opacity-70
                "
              >
                {loading ? (
                  <>
                    <img
                      src="/loader/spinner.gif"
                      alt="Loading"
                      width={18}
                      height={18}
                    />
                    Processing
                  </>
                ) : (
                  "Update Password"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Dashboard>
  );
};

export default ChangePassword;
