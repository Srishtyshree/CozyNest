// src/utils/helpers.js

/**
 * Transform API product to app product format
 * @param {Object} apiProduct - Product from API
 * @returns {Object} Transformed product
 */
export const transformApiProduct = (apiProduct) => {
  return {
    id: apiProduct.sku,
    sku: apiProduct.sku,
    name: apiProduct.name,
    price: apiProduct.discount_price || apiProduct.price,
    originalPrice: apiProduct.discount_price ? apiProduct.price : null,
    rating: (Math.random() * (5 - 4) + 4).toFixed(1), // API doesn't provide ratings
    image: apiProduct.image_path,
    category: apiProduct.category,
    description: apiProduct.description,
    woodType: apiProduct.wood_type,
    finish: apiProduct.finish,
    dimensions: apiProduct.dimensions,
    weight: apiProduct.weight,
    stock: apiProduct.stock,
    status: apiProduct.status,
    featured: apiProduct.featured,
    isNew: isProductNew(apiProduct.created_at),
    isFavorite: false, // Will be managed by local state
    tags: apiProduct.tags,
  };
};

/**
 * Check if product is new (created within last 30 days)
 * @param {string} createdAt - ISO date string
 * @returns {boolean} Is product new
 */
export const isProductNew = (createdAt) => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  return new Date(createdAt) > thirtyDaysAgo;
};

/**
 * Map app category names to API category names
 * @param {string} categoryName - App category name
 * @returns {string} API category name
 */
export const mapCategoryToApi = (categoryName) => {
  const categoryMap = {
    'Living Room': 'sofa',
    'Bedroom': 'matress',
    'Kitchen': 'kitchen',
    'Dining': 'table',
    'Office': 'desk',
    'Outdoor': 'garden',
  };
  return categoryMap[categoryName] || categoryName.toLowerCase();
};

/**
 * Format price with currency
 * @param {number} price - Price value
 * @returns {string} Formatted price
 */
export const formatPrice = (price) => {
  return `$${price.toFixed(2)}`;
};

/**
 * Calculate discount percentage
 * @param {number} originalPrice - Original price
 * @param {number} discountPrice - Discounted price
 * @returns {number} Discount percentage
 */
export const calculateDiscount = (originalPrice, discountPrice) => {
  if (!originalPrice || !discountPrice) return 0;
  return Math.round(((originalPrice - discountPrice) / originalPrice) * 100);
};

/**
 * Debounce function for search
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in ms
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Get available API categories
 * @returns {Array<string>} List of categories
 */
export const getApiCategories = () => {
  return [
    'sofa',
    'chair',
    'stool',
    'table',
    'desk',
    'kitchen',
    'vanitory',
    'matress',
    'mirror',
    'wardrove',
    'lamp',
    'tv table',
    'garden',
  ];
};

/**
 * Get available wood types
 * @returns {Array<string>} List of wood types
 */
export const getWoodTypes = () => {
  return [
    'walnut',
    'maple',
    'oak',
    'pine',
    'eucalyptus',
    'bamboo',
    'teak',
    'cedar',
  ];
};

/**
 * Get available finishes
 * @returns {Array<string>} List of finishes
 */
export const getFinishes = () => {
  return ['dark', 'medium', 'light', 'natural'];
};

/**
 * Get available sort options
 * @returns {Array<Object>} List of sort options
 */
export const getSortOptions = () => {
  return [
    { label: 'Newest', value: 'newest' },
    { label: 'Oldest', value: 'oldest' },
    { label: 'Price: Low to High', value: 'price_asc' },
    { label: 'Price: High to Low', value: 'price_desc' },
    { label: 'Name: A to Z', value: 'name_asc' },
    { label: 'Name: Z to A', value: 'name_desc' },
  ];
};