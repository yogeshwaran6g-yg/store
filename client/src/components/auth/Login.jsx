import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FiLock, FiMail } from "react-icons/fi";
import { FaCube, FaBook, FaStar } from "react-icons/fa";
import { MdOutlineViewInAr } from "react-icons/md";

// internal imports
import Error from "../form/Error";
import InputArea from "../form/InputArea";
import useLoginSubmit from "../../hooks/useAuthSubmit";

const Login = () => {
  const { handleSubmit, submitHandler, register, errors, loading } =
    useLoginSubmit();

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

      {/* LOGIN CARD */}
      <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-8 sm:p-10 w-full max-w-md hover:scale-[1.02] transition-transform">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold font-serif text-purple-700">
            Welcome Back
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Login to continue your learning journey
          </p>
        </div>

        <form
          onSubmit={handleSubmit(submitHandler)}
          className="flex flex-col space-y-5"
        >
          <div className="form-group">
            <InputArea
              register={register}
              defaultValue="admin@gmail.com"
              label="Email"
              name="email"
              type="email"
              placeholder="Your Email"
              Icon={FiMail}
            />
            <Error errorName={errors.email} />
          </div>

          <div className="form-group">
            <InputArea
              register={register}
              defaultValue="12345678"
              label="Password"
              name="password"
              type="password"
              placeholder="Your Password"
              Icon={FiLock}
            />
            <Error errorName={errors.password} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link
                to="/auth/forget-password"
                className="font-medium text-purple-600 hover:text-purple-500"
              >
                Forgot password?
              </Link>
            </div>
          </div>

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
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-8">
          Don't have an account?
          <Link
            to="/auth/signup"
            className="ml-1 text-purple-600 font-semibold hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
