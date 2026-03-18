import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginService, logout as logoutService, register as registerService } from '../services/authService';
import { STORAGE_KEYS } from '../utils/constants';

const getStoredUser = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USER);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const useAuth = () => {
  const [user, setUser]       = useState(getStoredUser);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);
  const navigate              = useNavigate();

  const login = useCallback(async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const loggedInUser = await loginService(credentials);
      setUser(loggedInUser);
      navigate('/');
      return loggedInUser;
    } catch (err) {
      const msg = err.response?.data?.message || "Login muvaffaqiyatsiz";
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const register = useCallback(async (data) => {
    setLoading(true);
    setError(null);
    try {
      const result = await registerService(data);
      return result;
    } catch (err) {
      const msg = err.response?.data?.message || "Ro'yxatdan o'tish muvaffaqiyatsiz";
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    logoutService();
    setUser(null);
    navigate('/login');
  }, [navigate]);

  return {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    role: user?.role,
    login,
    register,
    logout,
  };
};
