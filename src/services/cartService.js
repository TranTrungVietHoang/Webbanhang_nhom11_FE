// API Backend base URL - Using relative path for Vite proxy
const API_BASE_URL = '';

// Lưu session ID vào localStorage
const getSessionId = () => {
  let sessionId = localStorage.getItem('sessionId');
  if (!sessionId) {
    sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('sessionId', sessionId);
  }
  return sessionId;
};

// Get headers với session id
const getHeaders = () => ({
  'Content-Type': 'application/json',
  'x-session-id': getSessionId()
});

export const cartService = {
  // Lấy giỏ hàng
  getCart: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/cart`, {
        method: 'GET',
        headers: getHeaders()
      });
      if (!response.ok) throw new Error('Failed to fetch cart');
      return await response.json();
    } catch (error) {
      console.error('Error fetching cart:', error);
      throw error;
    }
  },

  // Thêm sản phẩm vào giỏ
  addToCart: async (productId, quantity = 1) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/cart/add`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({
          productId: parseInt(productId),
          quantity: parseInt(quantity)
        })
      });
      if (!response.ok) throw new Error('Failed to add to cart');
      return await response.json();
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  },

  // Cập nhật số lượng
  updateQuantity: async (productId, quantity) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/cart/update/${productId}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify({ quantity: parseInt(quantity) })
      });
      if (!response.ok) throw new Error('Failed to update quantity');
      return await response.json();
    } catch (error) {
      console.error('Error updating quantity:', error);
      throw error;
    }
  },

  // Xóa sản phẩm
  removeFromCart: async (productId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/cart/remove/${productId}`, {
        method: 'DELETE',
        headers: getHeaders()
      });
      if (!response.ok) throw new Error('Failed to remove from cart');
      return await response.json();
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }
  },

  // Xóa toàn bộ giỏ hàng
  clearCart: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/cart/clear`, {
        method: 'DELETE',
        headers: getHeaders()
      });
      if (!response.ok) throw new Error('Failed to clear cart');
      return await response.json();
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  },

  // Checkout
  checkout: async (customerInfo) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/cart/checkout`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(customerInfo)
      });
      if (!response.ok) throw new Error('Failed to checkout');
      return await response.json();
    } catch (error) {
      console.error('Error during checkout:', error);
      throw error;
    }
  },

  // Lấy danh sách sản phẩm
  getProducts: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/products`, {
        method: 'GET'
      });
      if (!response.ok) throw new Error('Failed to fetch products');
      return await response.json();
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }
};

export default cartService;
