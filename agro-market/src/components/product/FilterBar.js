import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { CATEGORIES } from '../../utils/constants';

/**
 * FilterBar – search, category tabs, price range, sort.
 * @param {object}   filters   – current filter state
 * @param {function} onChange  – called with { key, value } on any change
 * @param {function} onSearch  – called with search string on submit
 */
const FilterBar = ({ filters = {}, onChange, onSearch }) => {
  const handleSearch = (e) => {
    e.preventDefault();
    onSearch?.(filters.search || '');
  };

  return (
    <div className="bg-white rounded-xl shadow-card p-4 mb-6 space-y-4">
      {/* Search Row */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Mahsulot qidiring..."
            value={filters.search || ''}
            onChange={(e) => onChange?.({ key: 'search', value: e.target.value })}
            className="input-field pl-9"
          />
        </div>
        <button type="submit" className="btn-primary px-5">
          Qidirish
        </button>
      </form>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        <button
          onClick={() => onChange?.({ key: 'category', value: '' })}
          className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
            !filters.category
              ? 'bg-primary-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Hammasi
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onChange?.({ key: 'category', value: cat.id })}
            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              filters.category === cat.id
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Price + Sort Row */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-600">Narx:</span>
          <input
            type="number"
            placeholder="Min"
            value={filters.minPrice || ''}
            onChange={(e) => onChange?.({ key: 'minPrice', value: e.target.value })}
            className="w-24 input-field py-1.5 text-xs"
          />
          <span className="text-gray-400">—</span>
          <input
            type="number"
            placeholder="Max"
            value={filters.maxPrice || ''}
            onChange={(e) => onChange?.({ key: 'maxPrice', value: e.target.value })}
            className="w-24 input-field py-1.5 text-xs"
          />
        </div>

        <select
          value={filters.sort || 'newest'}
          onChange={(e) => onChange?.({ key: 'sort', value: e.target.value })}
          className="ml-auto input-field w-auto py-1.5 text-sm"
        >
          <option value="newest">Yangi</option>
          <option value="price_asc">Arzon birinchi</option>
          <option value="price_desc">Qimmat birinchi</option>
          <option value="rating">Reyting</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
