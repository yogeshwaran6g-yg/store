import React, { useState } from "react";
import {
  AiOutlinePlus,
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineSearch,
} from "react-icons/ai";
import { useProducts, useDeleteProduct } from "../services/productService";
import { useCategories } from "../services/categoryService";
import ProductModal from "../components/modal/ProductModal";

const ProductDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [previewImage, setPreviewImage] = useState(null);

  const limit = 10;
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const PRODUCT_CLIENT_URL = import.meta.env.VITE_PRODUCT_CLIENT_URL;

  const { data: productsData, isLoading } = useProducts({ page, limit, search });
  const { data: categoriesData } = useCategories();
  const deleteMutation = useDeleteProduct();

  const products = productsData?.products || [];
  const totalPages = productsData ? Math.ceil(productsData.total / limit) : 1;

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

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-purple-50 via-purple-50 to-white text-gray-900">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-purple-900">Products</h1>

        <button
          onClick={() => openModal()}
          className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl shadow-sm transition"
        >
          <AiOutlinePlus />
          Add Product
        </button>
      </div>

      {/* SEARCH */}
      <div className="mb-4">
        <div className="flex items-center gap-2 max-w-md bg-white border border-purple-200 rounded-xl px-3 py-2 shadow-sm">
          <AiOutlineSearch className="text-purple-400 text-lg" />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full bg-transparent outline-none text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* ================= MOBILE VIEW (CARDS) ================= */}
      <div className="sm:hidden space-y-5">
        {isLoading ? (
          <div className="text-center text-gray-400">Loading products…</div>
        ) : products.length === 0 ? (
          <div className="text-center text-gray-400">No products found.</div>
        ) : (
          products.map((product) => (
            <div
              key={product._id}
              className="rounded-2xl overflow-hidden bg-white shadow border border-purple-100"
            >
              {/* CARD HEADER */}
              <div className="bg-gradient-to-r from-purple-600 via-purple-500 to-amber-400 px-4 py-3 flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-lg bg-white overflow-hidden cursor-zoom-in"
                  onClick={() =>
                    product.images?.[0] &&
                    setPreviewImage(`${API_BASE_URL}${product.images[0]}`)
                  }
                >
                  {product.images?.[0] ? (
                    <img
                      src={`${API_BASE_URL}${product.images[0]}`}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[10px] text-purple-600">
                      No Img
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold text-white text-sm leading-tight">
                    {product.title}
                  </h3>
                  <p className="text-xs text-purple-100">
                    {product.categoryId?.name || "Uncategorized"}
                  </p>
                </div>
              </div>

              {/* CARD BODY */}
              <div className="p-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Price</span>
                  <span className="font-semibold text-purple-700">
                    ₹{product.prices?.price}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Stock</span>
                  <span className="text-gray-700">{product.stock}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                      product.status === "ACTIVE"
                        ? "bg-green-100 text-green-700"
                        : product.status === "OUT_OF_STOCK"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {product.status}
                  </span>

                  <div className="flex gap-2">
                    <button
                      onClick={() => openModal(product)}
                      className="p-2 rounded-lg bg-purple-100 text-purple-700"
                    >
                      <AiOutlineEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="p-2 rounded-lg bg-red-100 text-red-600"
                    >
                      <AiOutlineDelete />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ================= TABLE VIEW ================= */}
      <div className="hidden sm:block bg-white rounded-2xl shadow-sm border border-purple-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-purple-100 text-purple-700 uppercase text-xs">
              <tr>
                <th className="p-4"></th>
                <th className="p-4">Product</th>
                <th className="p-4">SKU</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-100">
              {products.map((product) => (
                <tr key={product._id} className="hover:bg-purple-50">
                  <td className="p-4">
                    <div
                      className="w-12 h-12 rounded-lg bg-purple-100 overflow-hidden cursor-zoom-in"
                      onClick={() =>
                        product.images?.[0] &&
                        setPreviewImage(`${API_BASE_URL}${product.images[0]}`)
                      }
                    >
                      {product.images?.[0] && (
                        <img
                          src={`${API_BASE_URL}${product.images[0]}`}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                  </td>
                  <td className="p-4 font-medium text-purple-900">
                    {product.title}
                  </td>
                  <td className="p-4 font-mono text-xs text-gray-500">
                    {product.sku || "-"}
                  </td>
                  <td className="p-4 text-gray-600">
                    {product.categoryId?.name || "Uncategorized"}
                  </td>
                  <td className="p-4 font-semibold text-purple-700">
                    ₹{product.prices?.price}
                  </td>
                  <td className="p-4">{product.stock}</td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                      {product.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => openModal(product)}
                        className="p-2 rounded-lg bg-purple-100 text-purple-700"
                      >
                        <AiOutlineEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="p-2 rounded-lg bg-red-100 text-red-600"
                      >
                        <AiOutlineDelete />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="flex justify-end items-center gap-2 p-4 border-t border-purple-100">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-3 py-1 rounded-lg bg-purple-100 text-purple-700 disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-sm text-gray-600">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1 rounded-lg bg-purple-100 text-purple-700 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      <ProductModal
        isOpen={isModalOpen}
        onClose={closeModal}
        product={editingProduct}
        categories={categoriesData}
      />

      {/* ================= IMAGE PREVIEW ================= */}
      {previewImage && (
        <div
          className="fixed inset-0 z-[999] bg-black/70 flex items-center justify-center p-4"
          onClick={() => setPreviewImage(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-3 right-3 bg-black/60 text-white rounded-full px-3 py-1"
            >
              ✕
            </button>
            <img
              src={previewImage}
              alt="Preview"
              className="w-full max-h-[80vh] object-contain bg-black"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDashboard;
