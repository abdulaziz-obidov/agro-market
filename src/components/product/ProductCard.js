import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, MapPin } from 'lucide-react';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { formatCurrency } from '../../utils/formatCurrency';
import { useCartContext } from '../../context/CartContext';

const CATEGORY_COLORS = {
  vegetables: 'green',
  fruits:     'yellow',
  grains:     'gray',
  dairy:      'blue',
  meat:       'red',
  herbs:      'green',
};

const ProductCard = ({ product }) => {
  const { addItem } = useCartContext();

  const {
    _id, name, price, unit, category,
    images, farmer, rating, reviewCount, stock,
  } = product;

  const imageUrl = images?.[0] || `https://placehold.co/400x300/e8f5e9/16a34a?text=${encodeURIComponent(name)}`;

  return (
    <div className="card flex flex-col group hover:shadow-lg transition-shadow duration-300">
      {/* Image */}
      <Link to={`/catalog/${_id}`} className="block overflow-hidden rounded-lg mb-3 aspect-[4/3]">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </Link>

      {/* Category Badge */}
      <Badge color={CATEGORY_COLORS[category] || 'gray'} className="self-start mb-2 capitalize">
        {category}
      </Badge>

      {/* Name */}
      <Link to={`/catalog/${_id}`}>
        <h3 className="font-semibold text-gray-900 text-sm mb-1 hover:text-primary-600 transition-colors line-clamp-2">
          {name}
        </h3>
      </Link>

      {/* Rating */}
      {rating !== undefined && (
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-3.5 h-3.5 fill-earth-400 text-earth-400" />
          <span className="text-xs text-gray-600">{rating?.toFixed(1)} ({reviewCount ?? 0})</span>
        </div>
      )}

      {/* Farmer location */}
      {farmer?.region && (
        <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
          <MapPin className="w-3 h-3" />
          <span>{farmer.region}</span>
        </div>
      )}

      {/* Spacer */}
      <div className="mt-auto">
        {/* Price + Stock */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="font-bold text-primary-700">{formatCurrency(price)}</span>
            <span className="text-xs text-gray-500 ml-1">/ {unit}</span>
          </div>
          {stock <= 10 && stock > 0 && (
            <span className="text-xs text-orange-600 font-medium">Kam qoldi!</span>
          )}
          {stock === 0 && (
            <span className="text-xs text-red-600 font-medium">Tugagan</span>
          )}
        </div>

        {/* Add to Cart */}
        <Button
          variant="primary"
          size="sm"
          fullWidth
          disabled={stock === 0}
          onClick={() => addItem({ ...product, quantity: 1 })}
        >
          <ShoppingCart className="w-3.5 h-3.5" />
          {stock === 0 ? 'Tugagan' : "Savatga qo'shish"}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
