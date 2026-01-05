// import { Link } from "react-router-dom";
// import { FiLock, FiMail } from "react-icons/fi";

// // internal imports (adjust relative paths if needed)
// import Error from "../form/Error";
// import useLoginSubmit from "../../hooks/useAuthSubmit";
// import InputArea from "../form/InputArea";

// const Login = () => {
//   const { handleSubmit, submitHandler, register, errors, loading } =
//     useLoginSubmit();

//   return (    
//       <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
//         <div className="py-4 flex flex-col lg:flex-row w-full">
//           <div className="w-full sm:p-5 lg:p-8">
//             <div className="mx-auto text-left justify-center rounded-md w-full max-w-lg px-4 py-8 sm:p-10 overflow-hidden align-middle transition-all transform bg-white shadow-xl rounded-2x">
//               <div className="overflow-hidden mx-auto">
//                 <div className="text-center mb-6">
//                   <h2 className="text-3xl font-bold font-serif">Login</h2>
//                   <p className="text-sm md:text-base text-gray-500 mt-2 mb-8 sm:mb-10">
//                     Login with your email and password
//                   </p>
//                 </div>

//                 <form
//                   onSubmit={handleSubmit(submitHandler)}
//                   className="flex flex-col justify-center"
//                 >
//                   <div className="grid grid-cols-1 gap-5">
//                     {/* EMAIL */}
//                     <div className="form-group">
//                       <InputArea
//                         register={register}
//                         defaultValue="justin@gmail.com"
//                         label="Email"
//                         name="email"
//                         type="email"
//                         placeholder="Email"
//                         Icon={FiMail}
//                         autocomplete="email"
//                       />
//                       <Error errorName={errors.email} />
//                     </div>
//                     {/* FORGOT PASSWORD */}
//                     <div className="flex items-center justify-between">
//                       <div className="flex ms-auto">
//                         <Link
//                           to="/auth/forget-password"
//                           className="text-end text-sm text-gray-600 ps-3 underline hover:no-underline focus:outline-none"
//                         >
//                           Forgot password?
//                         </Link>
//                       </div>
//                     </div>



//                     {/* PASSWORD */}
//                     <div className="form-group">
//                       <InputArea
//                         register={register}
//                         defaultValue="12345678"
//                         label="Password"
//                         name="password"
//                         type="password"
//                         placeholder="Password"
//                         Icon={FiLock}
//                         autocomplete="current-password"
//                       />
//                       <Error errorName={errors.password} />
//                     </div>

      
//                     <div className="flex items-center justify-between">
//                                           <div className="flex ms-auto">
//                                             <Link
//                                               to="/auth/signup"
//                                               className="text-end text-sm text-heading ps-3 underline hover:no-underline focus:outline-none"
//                                             >
//                                               Don't have an account?
//                                             </Link>
//                                           </div>
//                                         </div>
//                     {/* SUBMIT */}
//                     {loading ? (
//                       <button
//                         disabled
//                         type="submit"
//                         className="md:text-sm leading-5 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-medium text-center justify-center border-0 rounded-md focus:outline-none bg-emerald-500 text-white px-5 py-3 hover:bg-emerald-600 h-12 mt-1 w-full"
//                       >
//                         <img
//                           src="/loader/spinner.gif"
//                           alt="Loading"
//                           width={20}
//                           height={10}
//                         />
//                         <span className="font-serif ml-2 font-light">
//                           Processing
//                         </span>
//                       </button>
//                     ) : (
//                       <button
//                         type="submit"
//                         className="w-full py-3 rounded bg-emerald-500 text-white hover:bg-emerald-600 transition-all focus:outline-none my-1"
//                       >
//                         Login
//                       </button>
//                     )}
//                   </div>
//                 </form>

               
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//   );
// };
// export default Login;


import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FiMail, FiLock } from "react-icons/fi";
import { FaCube, FaBook, FaStar } from "react-icons/fa";
import { MdOutlineViewInAr } from "react-icons/md";
import Lottie from "lottie-react";

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

      parallaxRef.current.style.transform = `translate(${x}px, ${y}px)`;
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
        <h2 className="text-3xl font-bold text-center text-purple-700 font-serif">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 text-sm mt-2">
          Continue learning with ARBook
        </p>

        <form
          onSubmit={handleSubmit(submitHandler)}
          className="mt-6 space-y-5"
        >
          <InputArea
            register={register}
            name="email"
            label="Email"
            type="email"
            placeholder="Enter your email"
            Icon={FiMail}
          />
          <Error errorName={errors.email} />

          <InputArea
            register={register}
            name="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            Icon={FiLock}
          />
          <Error errorName={errors.password} />

          <div className="flex justify-end">
            <Link
              to="/auth/forget-password"
              className="text-sm text-purple-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded-full shadow-lg hover:scale-105 transition"
          >
            {loading ? "Processing..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?
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

