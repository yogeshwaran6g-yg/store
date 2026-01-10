import { useState, useEffect, useRef } from "react";
import Input from "@components/form/HomeInput";
import DeliveryDetailsForm from "./DeliveryDetailsForm";
import { MdOutlineViewInAr } from "react-icons/md";
import { FaCube, FaBook, FaStar } from "react-icons/fa";
import { notifyError } from "../../utils/toast";
import {toast } from "react-toastify"

import { useAuth } from "@context/AuthContext";

export default function Checkout() {
  const { user, refreshUser } = useAuth();
  const [step, setStep] = useState(1);
  const parallaxRef = useRef(null);
  
  const [parentInfo, setParentInfo] = useState({
    parentName: "",
    email: "",
    contact: "",
    childName: ""
  });

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  useEffect(() => {
    if (user) {
      setParentInfo(prev => ({
        ...prev,
        parentName: prev.parentName || user.username || user.name || "",
        email: prev.email || user.email || "",
        contact: prev.contact || user.phone || ""
      }));
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setParentInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContinue = () => {
    const { parentName, email, contact, childName } = parentInfo;
    
    if (!parentName || !email || !contact || !childName) {
      toast.error("All fields are required!");
      return;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address!");
      return;
    }
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(contact)) {
      toast.error("Please enter a valid phone number!");
      return;
    } 

    setStep(2);
  };

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

  if (step === 2) {
    return <DeliveryDetailsForm onBack={() => setStep(1)} parentInfo={parentInfo} />;
  }

  return (
    <div className="min-h-screen pt-28 relative overflow-hidden bg-gradient-to-br from-purple-700 to-purple-500 px-4">
      {/* GRID BACKGROUND */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/*  SPARKLES */}
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

      {/* CONTENT WRAPPER */}
      <div className="relative z-10 max-w-md mx-auto pb-24">
        {/* CHECKOUT CARD */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-10 mt-10 hover:scale-[1.02] transition-transform">
          <h2 className="text-3xl font-bold text-center text-purple-700 font-serif">
            Parent Details
          </h2>

          <p className="text-center text-gray-500 text-sm mt-2 mb-8">
            Enter your details to continue to payment
          </p>

          <form className="space-y-5">
            <Input 
              label="Parent Name" 
              placeholder="Full name" 
              name="parentName"
              value={parentInfo.parentName}
              onChange={handleInputChange}
            />
            <Input
              label="Email Address"
              type="email"
              placeholder="example@email.com"
              name="email"
              value={parentInfo.email}
              onChange={handleInputChange}
            />
            <Input
              label="Phone Number"
              type="tel"
              placeholder="+91 98765 43210"
              name="contact"
              value={parentInfo.contact}
              onChange={handleInputChange}
            />
            <Input 
              label="Child Name" 
              placeholder="Child name" 
              name="childName"
              value={parentInfo.childName}
              onChange={handleInputChange}
            />

            <button
              type="button"
              onClick={handleContinue}
              className="
                w-full mt-4
                bg-yellow-400 text-black font-bold
                py-3
                rounded-full
                shadow-[0_6px_0_#c9a200]
                hover:translate-y-[1px]
                hover:shadow-[0_4px_0_#c9a200]
                active:translate-y-[2px]
                active:shadow-[0_2px_0_#c9a200]
                transition-all
              "
            >
              Continue to Payment
            </button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-6">
            Your information is safe and secure 🔒
          </p>
        </div>
      </div>
    </div>
  );
}
