import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FiLock, FiMail, FiUser, FiPhone } from "react-icons/fi";
import { FaCube, FaBook, FaStar, FaShieldAlt } from "react-icons/fa";
import { MdOutlineViewInAr } from "react-icons/md";
import { toast } from "react-toastify";

import Error from "../form/Error";
import InputArea from "../form/InputArea";
import useLoginSubmit from "../../hooks/useAuthSubmit";

const SignUp = () => {
  const { handleSubmit, submitHandler, register, errors, loading, showOtpInput, resendOtp, phone ,validationRules} =
    useLoginSubmit("signup");

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

      {/* SIGNUP CARD */}
      <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-8 sm:p-10 w-full max-w-md hover:scale-[1.02] transition-transform">
        <h2 className="text-3xl font-bold text-center text-purple-700 font-serif">
          Create Account
        </h2>
        <p className="text-center text-gray-500 text-sm mt-2">
          Join ARBook and start learning
        </p>

        <form
          onSubmit={handleSubmit(submitHandler)}
          className="mt-6 space-y-5"
        >
          {!showOtpInput ? (
            <>
              {/* NAME */}
              <InputArea
                register={register}
                label="Name"
                name="name"
                type="text"
                placeholder="Full Name"
                rules={validationRules.name}
                Icon={FiUser}
              />
              <Error errorName={errors.name} />

              {/* PHONE */}
              <InputArea
                register={register}
                label="Phone"
                name="phone"
                type="text"
                placeholder="Enter your phone number"
                rules={validationRules.phone}
                Icon={FiPhone}
              />
              <Error errorName={errors.phone} />

              {/* PASSWORD */}
              <InputArea
                register={register}
                label="Password"
                name="password"
                type="password"
                placeholder="Create a password"
                rules={validationRules.password}
                Icon={FiLock}
                pattern={
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/
                }
                patternMessage={[
                  "1. Minimum 8 characters",
                  "2. One uppercase letter",
                  "3. One lowercase letter",
                  "4. One number",
                  "5. One special character",
                ]}
              />
              <Error errorName={errors.password} />
            </>
          ) : (
            <>
              {/* OTP */}
              <div className="text-center mb-4">
                <p className="text-sm text-gray-600">OTP sent to <span className="font-bold">{phone}</span></p>
              </div>
              <InputArea
  register={register}
  label="OTP"
  name="otp"
  type="text"
  rules={validationRules.otp}
  Icon={FaShieldAlt}
  inputMode="numeric"
  maxLength={6}
/>

              <Error errorName={errors.otp} />

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
    w-full
    bg-yellow-400 text-black font-bold
    py-3
    rounded-full
    shadow-[0_6px_0_#c9a200]
    hover:translate-y-[1px]
    hover:shadow-[0_4px_0_#c9a200]
    active:translate-y-[2px]
    active:shadow-[0_2px_0_#c9a200]
    transition-all
    disabled:opacity-60
    disabled:cursor-not-allowed
  "
>
            {loading ? "Processing..." : showOtpInput ? "Verify OTP" : "Register"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?
          <Link
            to="/auth/login"
            className="ml-1 text-purple-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
