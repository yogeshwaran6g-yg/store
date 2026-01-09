import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiMail, FiPhone, FiLock } from "react-icons/fi";
import { MdOutlineViewInAr } from "react-icons/md";
import { FaCube, FaBook, FaStar, FaShieldAlt } from "react-icons/fa";
import { toast } from "react-toastify";

// internal imports
import Error from "@components/form/Error";
import InputArea from "@components/form/InputArea";
import useLoginSubmit from "../../hooks/useAuthSubmit";

const ForgetPassword = () => {
  const { handleSubmit, submitHandler, register, errors, loading, showOtpInput, resendOtp, phone, validationRules } =
    useLoginSubmit("forget-password");

  const parallaxRef = useRef(null);

  /* 🌌 PARALLAX EFFECT */
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (window.innerWidth < 768) return;

      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 20;
      const y = (clientY / window.innerHeight - 0.5) * 20;

      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-purple-700 to-purple-500 px-4">
      {/* GRID */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* ✨ SPARKLES */}
      {[...Array(15)].map((_, i) => (
        <span
          key={i}
          className="sparkle"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}

      {/* 🧩 FLOATING ICONS */}
      <div ref={parallaxRef} className="absolute inset-0 pointer-events-none">
        <MdOutlineViewInAr className="absolute top-24 left-10 text-yellow-400 text-4xl animate-float drop-shadow-[0_0_12px_rgba(250,204,21,0.8)]" />
        <FaCube className="absolute top-1/3 right-20 text-white/80 text-3xl animate-float-slow" />
        <FaBook className="absolute bottom-24 left-20 text-yellow-300 text-3xl animate-float" />
        <FaStar className="absolute bottom-1/3 right-24 text-white/70 text-2xl animate-float" />
      </div>

      {/* CARD */}
      <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-8 sm:p-10 w-full max-w-md hover:scale-[1.02] transition-transform">
        <div className="text-center mb-6">
          <Link to="/" className="text-3xl font-bold font-serif text-purple-700">
            Forget Password
          </Link>
          <p className="text-sm md:text-base text-gray-500 mt-2 mb-8 sm:mb-10">
            Reset Your Password
          </p>
        </div>

        <form
          onSubmit={handleSubmit(submitHandler)}
          className="flex flex-col justify-center space-y-5"
        >
          {!showOtpInput ? (
            <div className="form-group">
              <InputArea
                register={register}
                label="Phone"
                name="phone"
                type="text"
                placeholder="Your Registered Phone"
                rules={validationRules.phone}
                Icon={FiPhone}
              />
              <Error errorName={errors?.phone} />
            </div>
          ) : (
            <>
              <div className="text-center mb-4">
                <p className="text-sm text-gray-600">OTP sent to <span className="font-bold">{phone}</span></p>
              </div>
              <div className="form-group">
                <InputArea
                  register={register}
                  label="OTP"
                  name="otp"
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  rules={validationRules.otp}
                  Icon={FaShieldAlt}
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

              <div className="text-right mt-1">
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      await resendOtp({ phone });
                      toast.success("OTP resent successfully");
                    } catch (err) {
                      toast.error(err.message || "Failed to resend OTP");
                    }
                  }}
                  className="text-sm text-purple-600 font-semibold hover:underline"
                >
                  Resend OTP?
                </button>
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="
              w-full py-3
              bg-yellow-400 text-black font-bold
              rounded-full
              shadow-[0_6px_0_#c9a200]
              hover:translate-y-[1px]
              hover:shadow-[0_4px_0_#c9a200]
              active:translate-y-[2px]
              active:shadow-[0_2px_0_#c9a200]
              transition-all
              disabled:opacity-60 disabled:cursor-not-allowed
            "
          >
            {loading ? "Processing..." : showOtpInput ? "Reset Password" : "Get OTP"}
          </button>

          <div className="flex items-center justify-center mt-4">
            <Link
              to="/auth/login"
              className="text-sm text-purple-600 font-semibold hover:underline"
            >
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
