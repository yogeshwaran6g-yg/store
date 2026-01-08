import React, { useState } from "react";
import { AiOutlinePlus, AiOutlineEdit, AiOutlineDelete, AiOutlineSearch } from "react-icons/ai";
import { useProducts, useDeleteProduct } from "../services/productService";
import { useCategories } from "../services/categoryService";
import ProductModal from "../components/modal/ProductModal";

const ProductDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const PRODUCT_CLIENT_URL = import.meta.env.VITE_PRODUCT_CLIENT_URL;
  const { data: productsData, isLoading } = useProducts({ page, limit, search });
  const { data: categoriesData } = useCategories();
  
  const deleteMutation = useDeleteProduct();

  const openModal = (product = null) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingProduct(null);
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteMutation.mutate(id);
    }
  };

  const products = productsData?.products || [];
  const totalPages = productsData ? Math.ceil(productsData.total / limit) : 1;

  return (
    <div className="p-6 bg-gray-50 dark:bg-[#1e1e1e] min-h-screen text-gray-900 dark:text-gray-200 font-sans transition-colors">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Products</h1>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <AiOutlinePlus /> Add Product
        </button>
      </div>

      <div className="flex justify-between items-center mb-4 bg-white dark:bg-[#2d2d2d] p-3 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors">
        <div className="flex items-center gap-2 w-full max-w-md bg-gray-50 dark:bg-[#363636] px-3 py-2 rounded-lg">
          <AiOutlineSearch className="text-gray-400 text-xl" />
          <input
            type="text"
            placeholder="Search products..."
            className="bg-transparent border-none outline-none text-gray-900 dark:text-white w-full placeholder-gray-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white dark:bg-[#2d2d2d] rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 transition-colors">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 dark:bg-[#363636] text-gray-600 dark:text-gray-400 uppercase text-xs">
              <tr>
                <th className="p-4"></th>
                <th className="p-4">Product Name</th>
                <th className="p-4">SKU</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-[#404040]">
              {isLoading ? (
                <tr><td colSpan="7" className="p-6 text-center text-gray-400">Loading products...</td></tr>
              ) : products.length === 0 ? (
                <tr><td colSpan="7" className="p-6 text-center text-gray-400">No products found.</td></tr>
              ) : (
                products.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50 dark:hover:bg-[#323232] transition-colors group">
                    <td className="p-4">
                      <a 
                        href={`${PRODUCT_CLIENT_URL}/product/${product._id}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block w-12 h-12 bg-gray-200 dark:bg-gray-600 rounded overflow-hidden hover:ring-2 hover:ring-indigo-500 transition-all"
                      >
                        {product.images?.[0] ? 
                          <img src={`${API_BASE_URL}${product.images[0]}`} alt="" className="w-full h-full object-cover" 
                            title="view product"
                           /> : 
                          <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-500"
                            title="view product"
                          >No Img</div>
                        }
                      </a>
                    </td>
                    <td className="p-4">
                        <a 
                            href={`${PRODUCT_CLIENT_URL}/product/${product._id}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            title="view product"
                            className="font-medium text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors underline decoration-dotted underline-offset-4"
                        >
                            {product.title}
                        </a>
                    </td>
                    <td className="p-4 text-xs font-mono text-gray-500 dark:text-gray-400">{product.sku || "-"}</td>
                    <td className="p-4 text-gray-600 dark:text-gray-400">{product.categoryId?.name || "Uncategorized"}</td>
                    <td className="p-4 font-mono">
                      <div className="text-indigo-600 dark:text-indigo-300">₹{product.prices?.price}</div>
                      {product.prices?.originalPrice && (
                        <div className="text-xs text-gray-400 line-through dark:text-gray-500">₹{product.prices.originalPrice}</div>
                      )}
                    </td>
                    <td className="p-4 text-gray-700 dark:text-gray-300">{product.stock}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                        product.status === "ACTIVE" ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300" :
                        product.status === "OUT_OF_STOCK" ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300" :
                        "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300"
                      }`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center gap-2">
                        <button 
                            onClick={() => openModal(product)} 
                            className="p-1.5 text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-colors"
                            title="Edit Product"
                        >
                                <AiOutlineEdit className="w-4 h-4" />
                        </button>
                        <button 
                            onClick={() => handleDelete(product._id)} 
                            className="p-1.5 text-red-600 bg-red-50 dark:bg-red-900/20 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
                            title="Delete Product"
                        >
                                <AiOutlineDelete className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-4 border-t border-gray-200 dark:border-[#404040] flex justify-end gap-2">
           <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="px-3 py-1 bg-gray-100 dark:bg-[#363636] rounded hover:bg-gray-200 dark:hover:bg-[#454545] disabled:opacity-50 text-sm text-gray-700 dark:text-gray-300">Prev</button>
           <span className="px-3 py-1 text-gray-600 dark:text-gray-400 text-sm">Page {page} of {totalPages}</span>
           <button disabled={page >= totalPages} onClick={() => setPage(p => p + 1)} className="px-3 py-1 bg-gray-100 dark:bg-[#363636] rounded hover:bg-gray-200 dark:hover:bg-[#454545] disabled:opacity-50 text-sm text-gray-700 dark:text-gray-300">Next</button>
        </div>
      </div>

      <ProductModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        product={editingProduct} 
        categories={categoriesData} 
      />
    </div>
  );
};

export default ProductDashboard;
