import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import AppRoutes from './routes/AppRoutes';
import { ToastContainer, useToast } from './components/shared/Toast';

const App = () => {
  const { toasts, removeToast } = useToast();

  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <AppRoutes />
          <ToastContainer toasts={toasts} onRemove={removeToast} />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
