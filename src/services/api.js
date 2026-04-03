import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const dashboardService = {
  getStats: () => api.get('/dashboard/stats'),
  getChart: () => api.get('/dashboard/chart'),
  getRecentOrders: () => api.get('/dashboard/recent-orders'),
};

export const productService = {
  getProducts: () => api.get('/products'),
};

export default api;
