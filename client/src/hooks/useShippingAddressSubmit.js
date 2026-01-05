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
  }, [user, setValue]);

  const onSubmit = async (data) => {
    try {
      const payload = {
        fullName: data.name,
        phone: data.contact,
        addressLine1: data.address,
        city: data.city,
        country: data.country,
        state: data.area,
        postalCode: data.zipCode,
        isDefault: false,
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
