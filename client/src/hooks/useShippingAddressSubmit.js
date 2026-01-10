import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import AuthService from "../services/AuthService";
import { useAuth } from "../components/context/AuthContext";

const useShippingAddressSubmit = (id) => {
  const { user, setUser } = useAuth();

  const {
    register,
    handleSubmit, // ✅ keep original
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (user?.email) {
      setValue("email", user.email);
    }
    setValue("country", "India");    
  }, [user.email, setValue]); // 

  const onSubmit = async (data) => {
    try {
      const payload = {
        name: data.name,
        lastName: data.lastName,
        contact: data.contact,
        email: data.email,
        addressLine1: data.address,
        addressLine2: data.area, // Mapping 'area' input to 'addressLine2'
        city: data.city,
        state: data.state,
        country: data.country,
        zipCode: data.zipCode,
        isDefault: true, // Force default if it's the only one, or as requested
      };

      const response = await AuthService.addShippingAddress(payload);

      if (response?.data?.user) {
        setUser(response.data.user);
      }

      toast.success("Shipping Address Added Successfully");
    } catch (err) {
      toast.error(
        err?.response?.data?.message || err.message || "Failed to add address"
      );
    }
  };

  return {
    register,
    handleSubmit, 
    onSubmit,     
    errors,
    setValue,
  };
};

export default useShippingAddressSubmit;
