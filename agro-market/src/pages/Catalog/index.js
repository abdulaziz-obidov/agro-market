// src/pages/Catalog/index.js
import React, { useState, useEffect, useReducer } from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import FilterBar from '../../components/product/FilterBar';
import ProductGrid from '../../components/product/ProductGrid';
import { getProducts } from '../../services/productService';
import { PAGE_SIZE } from '../../utils/constants';

const initialFilters = { search: '', category: '', minPrice: '', maxPrice: '', sort: 'newest' };

const filterReducer = (state, action) => {
  if (action.type === 'SET') return { ...state, [action.key]: action.value };
  if (action.type === 'RESET') return initialFilters;
  return state;
};

const Catalog = () => {
  const [filters, dispatch] = useReducer(filterReducer, initialFilters);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    getProducts({ ...filters, page, limit: PAGE_SIZE }).then(res => {
      setProducts(res.products);
      setTotalPages(res.totalPages || 1);
      setLoading(false);
    });
  }, [filters, page]);

  const handleFilterChange = ({ key, value }) => {
    dispatch({ type: 'SET', key, value });
    setPage(1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 page-container">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Mahsulotlar katalogi</h1>

        <FilterBar
          filters={filters}
          onChange={handleFilterChange}
          onSearch={(q) => handleFilterChange({ key: 'search', value: q })}
        />

        <ProductGrid products={products} loading={loading} />

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                  page === p
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'bg-white border border-gray-300 hover:bg-gray-50 text-gray-700'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};
export default Catalog;
