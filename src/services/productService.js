import api from './api';

const mapProductToFrontend = (p) => ({
  ...p,
  _id: p.id,
  name: p.title,
  stock: p.quantity,
  description: p.desc,
  images: [p.imageUrl || "https://placehold.co/400x300/e8f5e9/16a34a"],
});

export const getProducts = async (params = {}) => {
  const response = await api.get('/products', { params });
  return { 
    products: response.data.products.map(mapProductToFrontend), 
    totalPages: response.data.totalPages || 1 
  };
};

export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return mapProductToFrontend(response.data);
};

export const getMyProducts = async () => {
  const response = await api.get('/products');
  const user = JSON.parse(localStorage.getItem('agro_user') || '{}');
  // Haqiqiy ishda backend filterlaydi, mock tarzda client da filter qildik
  const myProducts = response.data.products.filter(p => p.farmer_id === user.id);
  return { products: myProducts.map(mapProductToFrontend) };
};

export const createProduct = async (data) => {
  const imageUrl = "https://placehold.co/400x300/e8f5e9/16a34a?text=" + encodeURIComponent(data.name);
  const payload = { ...data, title: data.name, imageUrl, quantity: data.stock, desc: data.description };
  const response = await api.post('/products', payload);
  return mapProductToFrontend(response.data);
};

export const placeOrder = async (items, total) => {
  const formattedItems = items.map(i => ({ 
    productId: i._id || i.id, 
    name: i.name || i.title, 
    quantity: i.quantity, 
    price: i.price 
  }));
  const payload = { items: formattedItems, total_price: total };
  const response = await api.post('/orders', payload);
  return response.data;
};

export const getOrders = async () => {
  const response = await api.get('/orders');
  return response.data.map(o => ({
     ...o,
     customer: o.buyer?.full_name || 'Noma\'lum',
     date: o.createdAt,
     total: o.total_price
  }));
};

export const getMyOrders = async () => {
  const response = await api.get('/orders/myorders');
  return response.data.map(o => ({
     ...o,
     customer: o.buyer?.full_name || 'Siz',
     date: o.createdAt,
     total: o.total_price
  }));
};

export const updateOrderStatus = async (id, status, cancel_reason = null) => {
  const payload = { status };
  if (cancel_reason) payload.cancel_reason = cancel_reason;
  const response = await api.put(`/orders/${id}/status`, payload);
  return response.data;
};

export const getFarmerStats = async () => {
  try {
     const response = await api.get('/products/stats/farmer');
     return response.data;
  } catch (e) {
     return { revenue: 0, productsSold: 0, newOrders: 0, customers: 0 };
  }
};
