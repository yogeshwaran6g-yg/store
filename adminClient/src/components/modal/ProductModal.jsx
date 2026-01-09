import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineClose, AiOutlineCloudUpload, AiOutlineDelete } from "react-icons/ai";
import MDEditor from "@uiw/react-md-editor";
import { useAddProduct, useUpdateProduct } from "../../services/productService";
import { toast } from "react-toastify";

const ProductModal = ({ isOpen, onClose, product, categories }) => {
  const addMutation = useAddProduct();
  const updateMutation = useUpdateProduct();
  
  // State to manage images: { id: number, url: string, file: File | null }
  const [mediaItems, setMediaItems] = useState([]);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm();
  
  // Auto-generate slug from title
  const title = watch("title");

  useEffect(() => {
    if (isOpen) {
      if (product) {
        reset({
          title: product.title,
          slug: product.slug,
          price: product.prices.price,
          originalPrice: product.prices.originalPrice,
          stock: product.stock,
          sku: product.sku,
          categoryId: product.categoryId?._id,
          description: product.description,
          status: product.status,
        });
        
        // Load existing images
        const existingInfo = (product.images || []).map((url, idx) => ({
            id: `existing-${idx}-${Date.now()}`,
            url: url.startsWith('http') ? url : `${API_BASE_URL}${url}`,
            file: null
        }));
        setMediaItems(existingInfo);

      } else {
        reset({
            title: "",
            slug: "",
            price: "",
            originalPrice: "",
            stock: "",
            sku: "",
            categoryId: "",
            description: "**Features**\n- High quality material\n- Durable and long-lasting\n- Available in multiple colors\n\n**Specifications**\n- Material: 100% Cotton\n- Weight: 200g\n\n**Care Instructions**\n- Machine wash cold\n- Do not bleach",
            status: "ACTIVE"          
        });
        setMediaItems([]);
      }
    }
  }, [isOpen, product, reset]);

  useEffect(() => {
    if (!product && isOpen) {
      if (title) {
        setValue("slug", title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, ""));
      } else {
        setValue("slug", "");
      }
    }
  }, [title, product, setValue, isOpen]);

  // Cleanup object URLs to avoid memory leaks
  useEffect(() => {
      return () => {
          mediaItems.forEach(item => {
              if (item.file && item.url) {
                  URL.revokeObjectURL(item.url);
              }
          });
      };
  }, []);

  const handleImageSelect = (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newItems = Array.from(files).map(file => ({
        id: `new-${Date.now()}-${Math.random()}`,
        url: URL.createObjectURL(file), // Preview URL
        file: file
    }));

    setMediaItems(prev => [...prev, ...newItems]);
    
    // Reset input
    e.target.value = null; 
  };

  const removeImage = (id) => {
    setMediaItems(prev => {
        const itemToRemove = prev.find(item => item.id === id);
        if (itemToRemove?.file && itemToRemove.url) {
            URL.revokeObjectURL(itemToRemove.url); 
        }
        return prev.filter(item => item.id !== id);
    });
  };

  const onSubmit = (data) => {
    if (mediaItems.length === 0) {
        toast.error("Please add at least one image");
        return;
    }

    const formData = new FormData();

    // Append standard fields
    formData.append("title", data.title);
    formData.append("slug", data.slug);
    formData.append("stock", data.stock);
    formData.append("categoryId", data.categoryId);
    formData.append("sku", data.sku || "");
    formData.append("status", data.status);
    formData.append("description", data.description || "");

    // Append structured fields as JSON strings
    const prices = {
        price: Number(data.price),
        originalPrice: Number(data.originalPrice)
    };
    formData.append("prices", JSON.stringify(prices));

    // Append Images
    // 1. Existing images (URLs) -> key "images" (text)
    // 2. New images (Files) -> key "images" (file)
// Existing image URLs
  const existingImages = mediaItems
    .filter(item => !item.file)
    .map(item => item.url);
    
  formData.append("existingImages", JSON.stringify(existingImages));
    
  // New image files
  mediaItems
    .filter(item => item.file)
    .forEach(item => {
      formData.append("images", item.file);
    });
  
    if (product) {
      updateMutation.mutate({ id: product._id, data: formData }, { onSuccess: onClose });
    } else {
      addMutation.mutate(formData, { onSuccess: onClose });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-[#2d2d2d] w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col transition-colors">
        <div className="p-6 border-b border-gray-200 dark:border-[#404040] flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">{product ? "Edit Product" : "Add New Product"}</h2>
          <button onClick={onClose} className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"><AiOutlineClose size={24} /></button>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 overflow-y-auto space-y-4 custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm text-gray-600 dark:text-gray-400">Title</label>
              <input {...register("title", { required: true })} className="w-full bg-gray-50 dark:bg-[#363636] text-gray-900 dark:text-white p-2 rounded focus:ring-1 focus:ring-indigo-500 outline-none border border-gray-200 dark:border-gray-600" placeholder="Product Title" />
              {errors.title && <span className="text-red-500 text-xs">Required</span>}
            </div>
            <div className="space-y-1">
              <label className="text-sm text-gray-600 dark:text-gray-400">Slug</label>
              <input {...register("slug", { required: true })} className="w-full bg-gray-50 dark:bg-[#363636] text-gray-900 dark:text-white p-2 rounded focus:ring-1 focus:ring-indigo-500 outline-none border border-gray-200 dark:border-gray-600" placeholder="product-slug" />
            </div>
            <div className="space-y-1">
              <label className="text-sm text-gray-600 dark:text-gray-400">SKU (Stock Keeping Unit)</label>
              <input {...register("sku")} className="w-full bg-gray-50 dark:bg-[#363636] text-gray-900 dark:text-white p-2 rounded focus:ring-1 focus:ring-indigo-500 outline-none border border-gray-200 dark:border-gray-600" placeholder="e.g. PROD-001" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-sm text-gray-600 dark:text-gray-400">Price (₹)</label>
              <input type="number" {...register("price", { required: true, min: 0 })} className="w-full bg-gray-50 dark:bg-[#363636] text-gray-900 dark:text-white p-2 rounded focus:ring-1 focus:ring-indigo-500 outline-none border border-gray-200 dark:border-gray-600" />
            </div>
            <div className="space-y-1">
              <label className="text-sm text-gray-600 dark:text-gray-400">Original Price (₹)</label>
              <input type="number" {...register("originalPrice", { required: true, min: 0 })} className="w-full bg-gray-50 dark:bg-[#363636] text-gray-900 dark:text-white p-2 rounded focus:ring-1 focus:ring-indigo-500 outline-none border border-gray-200 dark:border-gray-600" />
            </div>
            <div className="space-y-1">
              <label className="text-sm text-gray-600 dark:text-gray-400">Stock</label>
              <input type="number" {...register("stock", { required: true, min: 0 })} className="w-full bg-gray-50 dark:bg-[#363636] text-gray-900 dark:text-white p-2 rounded focus:ring-1 focus:ring-indigo-500 outline-none border border-gray-200 dark:border-gray-600" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm text-gray-600 dark:text-gray-400">Category</label>
              <select {...register("categoryId", { required: true })} className="w-full bg-gray-50 dark:bg-[#363636] text-gray-900 dark:text-white p-2 rounded focus:ring-1 focus:ring-indigo-500 outline-none border border-gray-200 dark:border-gray-600">
                <option value="">Select Category</option>
                {categories?.map(cat => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-sm text-gray-600 dark:text-gray-400">Status</label>
              <select {...register("status")} className="w-full bg-gray-50 dark:bg-[#363636] text-gray-900 dark:text-white p-2 rounded focus:ring-1 focus:ring-indigo-500 outline-none border border-gray-200 dark:border-gray-600">
                <option value="ACTIVE">Active</option>
                <option value="OUT_OF_STOCK">Out of Stock</option>
                <option value="INACTIVE">Inactive</option>
              </select>
            </div>
          </div>

            <label className="text-sm text-gray-600 dark:text-gray-400">Description</label>
            <div data-color-mode="light">
                <MDEditor
                    value={watch("description") || ""}
                    onChange={(val) => setValue("description", val)}
                    preview="edit"
                    height={200}
                    className="w-full"
                />
            </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-600 dark:text-gray-400">Product Images</label>
            
            {/* Image List */}
            <div className="flex flex-wrap gap-4 mb-2">
                {mediaItems.map((item) => (
                    <div key={item.id} className="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600 group">
                        <img src={item.url} alt="Product" className="w-full h-full object-cover" />
                        <button 
                            type="button"
                            onClick={() => removeImage(item.id)}
                            className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white"
                        >
                            <AiOutlineDelete />
                        </button>
                    </div>
                ))}
                
                {/* Upload Button */}
                <label className="w-20 h-20 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors">
                    <AiOutlineCloudUpload className="text-2xl text-gray-400 dark:text-gray-500" />
                    <span className="text-[10px] text-gray-400 dark:text-gray-500 mt-1">Upload</span>
                    <input type="file" className="hidden" accept="image/*" multiple onChange={handleImageSelect} />
                </label>
            </div>
          </div>

        </form>

        <div className="p-6 border-t border-gray-200 dark:border-[#404040] flex justify-end gap-3 bg-gray-50 dark:bg-[#2d2d2d]">
          <button onClick={onClose} className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Cancel</button>
          <button 
            onClick={handleSubmit(onSubmit)} 
            disabled={addMutation.isPending || updateMutation.isPending}
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors disabled:opacity-50"
          >
            {addMutation.isPending || updateMutation.isPending ? "Saving..." : product ? "Update Product" : "Create Product"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
