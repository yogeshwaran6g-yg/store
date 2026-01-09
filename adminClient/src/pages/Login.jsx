import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiPhone, FiLock } from "react-icons/fi";
import { FaCube, FaBook, FaStar } from "react-icons/fa";
import { MdOutlineViewInAr } from "react-icons/md";
import { useAuthContext } from "@/context/AuthContext";

// Simple Input Component inline to match design requirements without extra files
const InputArea = ({ label, name, type, placeholder, Icon, value, onChange }) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-gray-700 block">{label}</label>
    <div className="relative">
      {Icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400" />
        </div>
      )}
      <input
        name={name}
        type={type}
        className={`block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${Icon ? 'pl-10' : 'pl-3'}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  </div>
);

const Login = () => {
  const { loginUser } = useAuthContext();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({ phone: "", password: "" });
  const [loading, setLoading] = useState(false);
  const parallaxRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const success = await loginUser(formData.phone, formData.password);
    setLoading(false);
    if (success) {
      navigate("/orders");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* 🌌 PARALLAX EFFECT */
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (window.innerWidth < 768) return;

      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 20;
      const y = (clientY / window.innerHeight - 0.5) * 20;

      if(parallaxRef.current) {
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
          className="sparkle absolute w-1 h-1 bg-white rounded-full opacity-0 animate-pulse"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: '3s'
          }}
        />
      ))}

      {/* 🧩 FLOATING ICONS */}
      <div ref={parallaxRef} className="absolute inset-0 pointer-events-none hidden md:block">
        <MdOutlineViewInAr className="absolute top-24 left-10 text-yellow-400 text-4xl animate-bounce drop-shadow-[0_0_12px_rgba(250,204,21,0.8)]" />
        <FaCube className="absolute top-1/3 right-20 text-white/80 text-3xl animate-pulse" />
        <FaBook className="absolute bottom-24 left-20 text-yellow-300 text-3xl" />
        <FaStar className="absolute bottom-1/3 right-24 text-white/70 text-2xl animate-ping" />
      </div>

  
      {/* LOGIN CARD */}
      <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-8 sm:p-10 w-full max-w-md hover:scale-[1.02] transition-transform">
        <h2 className="text-3xl font-bold text-center text-purple-700 font-serif">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 text-sm mt-2">
          Admin Dashboard Login
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-5"
        >
          <InputArea
            name="phone"
            label="Phone"
            type="text"
            placeholder="Enter your phone"
            value={formData.phone}
            onChange={handleChange}
            Icon={FiPhone} 
          />
          {/* Using FiMail as temp placeholder or should import FiPhone? I'll import FiPhone */}
          
          <InputArea
            name="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            Icon={FiLock}
          />
          
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
                mt-4
              "
            >
            {loading ? "Processing..." : "Login"}
          </button>
        </form>

      </div>
    </div>
  );
};


export default Login;
