import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { STORAGE_KEYS } from '../utils/constants';
import useLocalStorage from '../hooks/useLocalStorage';

const CartContext = createContext(null);

// ─── Reducer ────────────────────────────────────────────────────────────────
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.find(i => i._id === action.payload._id);
      if (existing) {
        return state.map(i =>
          i._id === action.payload._id
            ? { ...i, quantity: i.quantity + (action.payload.quantity || 1) }
            : i
        );
      }
      return [...state, { ...action.payload, quantity: action.payload.quantity || 1 }];
    }
    case 'REMOVE_ITEM':
      return state.filter(i => i._id !== action.payload);
    case 'UPDATE_QUANTITY':
      return state.map(i =>
        i._id === action.payload.id ? { ...i, quantity: action.payload.quantity } : i
      );
    case 'CLEAR_CART':
      return [];
    default:
      return state;
  }
};

// ─── Provider ────────────────────────────────────────────────────────────────
export const CartProvider = ({ children }) => {
  const [savedCart, setSavedCart] = useLocalStorage(STORAGE_KEYS.CART, []);
  const [items, dispatch] = useReducer(cartReducer, savedCart);

  // Persist cart to localStorage on every change
  React.useEffect(() => {
    setSavedCart(items);
  }, [items, setSavedCart]);

  const addItem     = useCallback((product) => dispatch({ type: 'ADD_ITEM',        payload: product }), []);
  const removeItem  = useCallback((id)      => dispatch({ type: 'REMOVE_ITEM',     payload: id }), []);
  const updateQty   = useCallback((id, qty) => dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity: qty } }), []);
  const clearCart   = useCallback(()        => dispatch({ type: 'CLEAR_CART' }), []);

  const totalItems  = items.reduce((acc, i) => acc + i.quantity, 0);
  const totalPrice  = items.reduce((acc, i) => acc + i.price * i.quantity, 0);

  const value = { items, addItem, removeItem, updateQty, clearCart, totalItems, totalPrice };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCartContext = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCartContext must be used inside <CartProvider>');
  return ctx;
};

export default CartContext;
