import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import AuthService from "../services/AuthService";
import { notifySuccess, notifyError } from "../utils/toast";
import { useAuth } from "../components/context/AuthContext";

const useShippingAddressSubmit = (id) => {
  const { user, setUser } = useAuth();
  const [selectedValue, setSelectedValue] = useState({
    country: "",
    city: "",
    area: "",
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  // Populate email from user context
  useEffect(() => {
    if (user?.email) {
      setValue("email", user.email);
    }
  }, [user, setValue]);

  const handleInputChange = useCallback((name, value) => {
    setSelectedValue((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Also set value for react-hook-form if needed
    setValue(name, value);
  }, [setValue]);

  const onSubmit = async (data) => {
    try {
        // Map frontend fields to match backend schema:
        // fullName, phone, addressLine1, addressLine2, city, state, postalCode, country, isDefault
        const payload = {
            fullName: data.name,
            phone: data.contact,
            addressLine1: data.address,
            city: selectedValue.city,
            country: selectedValue.country,
            state: selectedValue.area, // Mapping area to state as a placeholder
            postalCode: data.zipCode,
            isDefault: false
        };

        const response = await AuthService.addShippingAddress(payload);
        
        // Update global user state with the new data from backend
        if (response?.data?.user) {
            setUser(response.data.user);
        }

        notifySuccess("Shipping Address Added Successfully");
    } catch (err) {
        notifyError(err?.response?.data?.message || err.message || "Failed to add address");
    }
  };

  return {
    register,
    onSubmit,
    errors,
    cities: [
        { name: "New York" },
        { name: "London" },
        { name: "Toronto" },
        { name: "Mumbai" },
        { name: "Dhaka" }
    ], 
    areas: [
        "Down Town",
        "Avenue 1",
        "Sector 4",
        "High Street"
    ],
    handleSubmit,
    selectedValue,
    isSubmitting,
    handleInputChange,
  };
};

export default useShippingAddressSubmit;
