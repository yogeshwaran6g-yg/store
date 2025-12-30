import React, { createContext, useContext, useState, useCallback, useMemo } from "react";
import { ProductApiService } from "../../services/ProductApiService";

const ProductContext = createContext(null);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasFetchedProduct, setHasFetchedProduct] = useState(false);

  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
  });

  /**
   * Fetch all products with optional filters
   */
  const fetchProducts = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await ProductApiService.getProducts(params);
      // Based on controller: rtnRes(res, 200, "Products fetched successfully", { products, total, page, limit })
      const { products: fetchedProducts, total, page, limit } = response.data || response;
      
      setProducts(fetchedProducts || []);
      setPagination({
        total: total || 0,
        page: page || 1,
        limit: limit || 10,
      });
    } catch (err) {
      setError(err.message || "Failed to fetch products");
      console.error("Fetch products error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Fetch a single product by slug
   */
const fetchProductBySlug = useCallback(async (slug) => {
  setLoading(true);
  setError(null);

  try {
    const response = await ProductApiService.getProductBySlug(slug);
    const product = response?.data || null;

    setCurrentProduct(product);
    setHasFetchedProduct(true);
    return product;
  } catch (err) {
    setError(err.message || "Failed to fetch product details");
    setCurrentProduct(null);
    setHasFetchedProduct(true);
    return null;
  } finally {
    setLoading(false);
  }
}, []);

const fetchProductById = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await ProductApiService.getProductById(id);
      const product = response.data || response;
      setCurrentProduct(product);
      return product;
    } catch (err) {
      setError(err.message || "Failed to fetch product by ID");
      console.error("Fetch product by ID error:", err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const value = useMemo(() => ({
    products,
    currentProduct,
    loading,
    error,
    pagination,
    fetchProducts,
    fetchProductBySlug,
    fetchProductById,
    setProducts,
    setCurrentProduct,
    hasFetchedProduct,
    setHasFetchedProduct
  }), [
    products,
    currentProduct,
    loading,
    error,
    pagination,
    fetchProducts,
    fetchProductBySlug,
    fetchProductById,
    hasFetchedProduct
  ]);

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
};
