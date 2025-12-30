import { api } from "../util/axios";

const BASE_PATH_URL = "/api/v1/product";

export const ProductApiService = {
  /**
   * Get all products with filters and pagination
   * @param {Object} params - Query parameters like search, category, status, price, page, limit
   */
  getProducts: (params = {}) => api.get(`${BASE_PATH_URL}/getProduct`, params),

  /**
   * Get product by slug
   * @param {string} slug
   */
  getProductBySlug: (slug) => api.get(`${BASE_PATH_URL}/getProduct/${slug}`),

  /**
   * Get product by ID
   * @param {string} id
   */
  getProductById: (id) => api.get(`${BASE_PATH_URL}/getProduct/id/${id}`),

  /**
   * Add a single product
   * @param {Object} data
   */
  addProduct: (data) => api.post(`${BASE_PATH_URL}/addProduct`, data),

  /**
   * Bulk add products
   * @param {Array} data
   */
  addAllProducts: (data) => api.post(`${BASE_PATH_URL}/addProduct/bulk`, data),

  /**
   * Update product by ID
   * @param {string} id
   * @param {Object} data
   */
  updateProduct: (id, data) => api.put(`${BASE_PATH_URL}/updateProduct/${id}`, data),

  /**
   * Update product status
   * @param {string} id
   * @param {string} status
   */
  updateStatus: (id, status) => api.patch(`${BASE_PATH_URL}/updateProduct/${id}/status`, { status }),

  /**
   * Delete product by ID
   * @param {string} id
   */
  deleteProduct: (id) => api.delete(`${BASE_PATH_URL}/deleteProduct/${id}`),

  /**
   * Bulk delete products
   * @param {Array} ids
   */
  deleteManyProducts: (ids) => api.delete(`${BASE_PATH_URL}/deleteProduct`, { ids }),
};