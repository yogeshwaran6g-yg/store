import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { useAuth } from "@/components/context/AuthContext";

const useAuthSubmit = (defaultPath) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { path: paramPath, token } = useParams();
  
  // Use defaultPath if provided, otherwise fallback to URL param
  const path = defaultPath || paramPath;
  
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const { login, signup, verifyOtp, resendOtp, forgetPassword, resetPassword } = useAuth();

  const redirectUrl = new URLSearchParams(location.search).get("redirectUrl");

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const validationRules = {
  name: {
    required: "Name is required",
    minLength: {
      value: 3,
      message: "Name must be at least 3 characters",
    },
  },

  email: {
    required: "Email is required",
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Enter a valid email address",
    },
  },

  phone: {
    required: "Phone number is required",
    pattern: {
      value: /^[6-9]\d{9}$/,
      message: "Enter a valid 10-digit Indian mobile number",
    },
  },

  password: {
  required: "Password is required",
  pattern: {
    value:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
    message:
      "Password must be at least 8 characters, include uppercase, lowercase, number, and special character",
  },
},


  otp: {
    required: "OTP is required",
    pattern: {
      value: /^\d{6}$/,
      message: "OTP must be exactly 6 digits",
    },
  },

  newPassword: {
    required: "New password is required",
    minLength: {
      value: 6,
      message: "Password must be at least 6 characters",
    },
  },

  confirmPassword: {
    required: "Confirm password is required",
  },
};



  const submitHandler = useCallback(async ({ name, email, phone: inputPhone, password, otp, newPassword, confirmPassword }) => {
    setLoading(true);

    try {
      console.log("Current Auth Path:", path, "Show OTP:", showOtpInput);

      switch (path) {
        // ========================
        // 1. SIGNUP FLOW
        // ========================
        case "signup":
          if (showOtpInput) {
            // Step 2: Verify OTP
            const res = await verifyOtp({ phone, otp });
            toast.success(res.message || "Signup successful");
            navigate("/");
          } else {
            // Step 1: Register (Send OTP)
            const res = await signup({
              name,
              phone: inputPhone,
              password,
            });
            setPhone(inputPhone);
            setShowOtpInput(true);
            toast.success(res.message || "OTP sent to your phone");
          }
          break;

        // ========================
        // 2. FORGOT PASSWORD FLOW
        // ========================
        case "forget-password":
          if (showOtpInput) {
            // Step 2: Reset Password (Verify OTP + Reset)
            if (newPassword !== confirmPassword) {
              toast.error("Passwords do not match");
              setLoading(false);
              return;
            }
            const res = await resetPassword({ 
                phone,
                otp, 
                password: newPassword 
            });
            toast.success(res.message || "Password reset successful");
            navigate("/auth/login");
          } else {
             // Step 1: Request OTP
             const res = await forgetPassword({ phone: inputPhone });
             setPhone(inputPhone);
             setShowOtpInput(true);
             toast.success(res.message || "OTP sent to your phone");
          }
          break;

        // ========================
        // 3. RESET PASSWORD (Direct)
        // ========================
        case "reset-password":
           if (newPassword !== confirmPassword) {
              toast.error("Passwords do not match");
              setLoading(false);
              return;
          }
          const res = await resetPassword({ 
              phone,
              otp, 
              password: newPassword 
          });
          toast.success(res.message || "Password reset successful");
          navigate("/auth/login");
          break;

        // ========================
        // 4. LOGIN FLOW
        // ========================
        case "login":
          if (showOtpInput) {
             // Login with OTP Verification
             const res = await verifyOtp({ phone, otp });
             toast.success(res.message || "Login successful");
             navigate("/");
          } else {
             // Standard Login
             try {
                await login({ phone: inputPhone, password });
                toast.success("Login successful");
                // Fix redirect logic: use redirectUrl if present, else home
                const redirect = redirectUrl || "/"; 
                navigate(redirect, { replace: true });
             } catch (error) {
                if (error?.response?.data?.needsVerification) {
                  setPhone(inputPhone);
                  setShowOtpInput(true);
                  toast.info(error.response.data.message || "Please verify your phone number");
                  return; // Don't throw, just switch to OTP mode
                }
                throw error;
             }
          }
          break;

        default:
          console.warn("Unknown auth path:", path);
          break;
      }

    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }, [path, location.pathname, redirectUrl, navigate, token, signup, forgetPassword, resetPassword, login, showOtpInput]);
  return {
    register,
    errors,
    loading,
    control,
    handleSubmit,
    submitHandler,
    showOtpInput,
    setShowOtpInput,
    resendOtp,
    phone,
    validationRules 
  };
};

export default useAuthSubmit;
