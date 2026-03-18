import { useState, useEffect } from 'react';

/**
 * Persists state to localStorage.
 * @param {string} key      – localStorage key
 * @param {*} initialValue  – default value if key is absent
 */
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch {
      console.error('localStorage write error');
    }
  }, [key, storedValue]);

  const removeValue = () => {
    localStorage.removeItem(key);
    setStoredValue(initialValue);
  };

  return [storedValue, setStoredValue, removeValue];
};

export default useLocalStorage;
