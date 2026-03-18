import { useState, useEffect, useCallback, useRef } from 'react';
import api from '../services/api';

/**
 * Generic data-fetching hook with loading / error / refetch support.
 * @param {string} url – API endpoint path (e.g. '/products')
 * @param {object} [params] – Query parameters
 * @param {boolean} [immediate=true] – Fetch on mount
 */
const useFetch = (url, params = {}, immediate = true) => {
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError]     = useState(null);
  const paramsRef             = useRef(params);
  paramsRef.current           = params;

  const fetchData = useCallback(async (overrideParams) => {
    if (!url) return;
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(url, { params: overrideParams ?? paramsRef.current });
      setData(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Ma'lumot olishda xatolik");
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    if (immediate) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, immediate]);

  return { data, loading, error, refetch: fetchData };
};

export default useFetch;
