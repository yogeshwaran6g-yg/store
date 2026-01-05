import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { useAuth } from "@/components/context/AuthContext";

const useAuthSubmit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { path, token } = useParams();
  const [loading, setLoading] = useState(false);
  const { login, signup, forgetPassword, resetPassword } = useAuth();

  const redirectUrl = new URLSearchParams(location.search).get("redirectUrl");

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = useCallback(async ({ name, email, password, newPassword, confirmPassword }) => {
    setLoading(true);

    try {
      // SIGN UP
      console.log({"path" : path, "location.pathname": location.pathname});

      if (path === "signup" || location.pathname === "/auth/signup") {
        const res = await signup({
          name,
          email,
          password,
        });

        toast.success(res.message || "Signup successful");
        return;
      }

      // FORGET PASSWORD
      if (path === "forget-password" || location.pathname === "/auth/forget-password") {
        const res = await forgetPassword({ email });

        toast.success(res.message || "Password reset email sent");
        return;
      }

      // RESET PASSWORD
      if (path === "reset-password") {
        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            setLoading(false);
            return;
        }
        const res = await resetPassword({ 
            token, 
            password: newPassword 
        });

        toast.success(res.message || "Password reset successful");
        navigate("/auth/login");
        return;
      }

      // LOGIN
      await login({ email, password });

      toast.success("Login successful");

      const redirect = redirectUrl ? "/" : "/auth/login";
      navigate(redirect, { replace: true });

    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }, [path, location.pathname, redirectUrl, navigate, token, signup, forgetPassword, resetPassword, login]);
  return {
    register,
    errors,
    loading,
    control,
    handleSubmit,
    submitHandler,
  };
};

export default useAuthSubmit;
