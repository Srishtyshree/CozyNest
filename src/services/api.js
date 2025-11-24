// src/services/api.js
const BASE_URL = 'https://furniture-api.fly.dev/v1';

class FurnitureAPI {
  constructor() {
    this.baseURL = BASE_URL;
  }

  /**
   * Fetch products with filters
   * @param {Object} params - Query parameters
   * @returns {Promise<Object>} API response with products
   */
  async getProducts(params = {}) {
    try {
      const queryString = this.buildQueryString(params);
      const url = `${this.baseURL}/products${queryString}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  /**
   * Fetch single product by SKU
   * @param {string} sku - Product SKU
   * @returns {Promise<Object>} Product details
   */
  async getProductBySku(sku) {
    try {
      const response = await fetch(`${this.baseURL}/products/${sku}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  }

  /**
   * Search products by name
   * @param {string} query - Search query
   * @param {Object} additionalParams - Additional filters
   * @returns {Promise<Object>} Search results
   */
  async searchProducts(query, additionalParams = {}) {
    return this.getProducts({
      name: query,
      ...additionalParams,
    });
  }

  /**
   * Get featured products
   * @param {number} limit - Number of products to fetch
   * @returns {Promise<Object>} Featured products
   */
  async getFeaturedProducts(limit = 10) {
    return this.getProducts({
      featured: true,
      limit,
      sort: 'newest',
    });
  }

  /**
   * Get products by category
   * @param {string} category - Category name
   * @param {Object} additionalParams - Additional filters
   * @returns {Promise<Object>} Products in category
   */
  async getProductsByCategory(category, additionalParams = {}) {
    return this.getProducts({
      category: category.toLowerCase(),
      ...additionalParams,
    });
  }

  /**
   * Get products with discount
   * @param {number} limit - Number of products to fetch
   * @returns {Promise<Object>} Discounted products
   */
  async getDiscountedProducts(limit = 20) {
    // The API doesn't have a direct discount filter, so we fetch products
    // and filter on the client side, or fetch more and filter
    const response = await this.getProducts({ limit: 50 });
    if (response.success && response.data) {
      const discounted = response.data.filter(p => p.discount_price);
      return {
        ...response,
        data: discounted.slice(0, limit),
        count: discounted.length,
      };
    }
    return response;
  }

  /**
   * Build query string from params object
   * @param {Object} params - Parameters object
   * @returns {string} Query string
   */
  buildQueryString(params) {
    const cleanParams = Object.entries(params)
      .filter(([_, value]) => value !== undefined && value !== null && value !== '')
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&');
    
    return cleanParams ? `?${cleanParams}` : '';
  }
}

// Export singleton instance
export default new FurnitureAPI();