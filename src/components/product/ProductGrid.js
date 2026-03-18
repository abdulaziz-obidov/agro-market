import React from 'react';
import ProductCard from './ProductCard';
import Loader from '../shared/Loader';

/**
 * ProductGrid – renders a responsive grid of ProductCards.
 * @param {Array}   products
 * @param {boolean} loading
 * @param {string}  emptyMessage
 */
const ProductGrid = ({ products = [], loading = false, emptyMessage = "Mahsulot topilmadi" }) => {
  if (loading) return <Loader text="Mahsulotlar yuklanmoqda..." />;

  if (!products.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400">
        <span className="text-5xl mb-4">🌾</span>
        <p className="text-lg font-medium">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
