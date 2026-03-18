// API Base URL
export const API_BASE_URL = 'http://localhost:5000/api';

// User Roles
export const ROLES = {
  ADMIN: 'admin',
  FARMER: 'farmer',
  BUYER: 'buyer',
};

// Product Categories
export const CATEGORIES = [
  { id: 'vegetables', label: "Sabzavotlar" },
  { id: 'fruits', label: "Mevalar" },
  { id: 'grains', label: "Don mahsulotlari" },
  { id: 'dairy', label: "Sut mahsulotlari" },
  { id: 'meat', label: "Go'sht" },
  { id: 'herbs', label: "O'tlar va ziravorlar" },
];

// Order Statuses
export const ORDER_STATUS = {
  PENDING:   'pending',
  CONFIRMED: 'confirmed',
  SHIPPED:   'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
};

// Pagination
export const PAGE_SIZE = 12;

// Local Storage Keys
export const STORAGE_KEYS = {
  TOKEN: 'agro_token',
  USER:  'agro_user',
  CART:  'agro_cart',
};
