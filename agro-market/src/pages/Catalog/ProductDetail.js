// src/pages/Catalog/ProductDetail.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, Star, MapPin } from 'lucide-react';
import { getProductById } from '../../services/productService';
import Loader from '../../components/shared/Loader';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { formatCurrency } from '../../utils/formatCurrency';
import { useCartContext } from '../../context/CartContext';

const CATEGORY_COLORS = {
  vegetables: 'green', fruits: 'yellow', grains: 'gray', dairy: 'blue', meat: 'red', herbs: 'green',
};

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCartContext();

  useEffect(() => {
    getProductById(id).then(res => {
      setProduct(res);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <div className="min-h-screen bg-gray-50"><Navbar/><Loader fullScreen /></div>;
  if (!product) return <div className="p-8 text-center text-red-500 font-bold">Mahsulot topilmadi!</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="page-container flex-1 max-w-5xl">
        <Link to="/catalog" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary-600 mb-6 font-medium transition-colors">
          <ArrowLeft className="w-4 h-4" /> Katalogga qaytish
        </Link>
        
        <div className="bg-white rounded-2xl shadow-card overflow-hidden flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 min-h-[300px] md:min-h-[400px]">
            <img src={product.images?.[0]} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="p-6 md:p-8 flex-1 flex flex-col">
            <Badge color={CATEGORY_COLORS[product.category] || 'gray'} className="self-start mb-3 capitalize">
              {product.category}
            </Badge>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-6 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-earth-500 fill-earth-500" />
                <span>{product.rating?.toFixed(1) || 0} ({product.reviewCount || 0} sharhlar)</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span>{product.farmer?.region || 'O\'zbekiston fermeridan'}</span>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl mb-6">
              <p className="text-3xl font-bold text-primary-700">{formatCurrency(product.price)} <span className="text-base text-gray-500 font-normal">/ {product.unit}</span></p>
              <p className="text-sm mt-1 font-medium text-gray-600">Omborda: <span className={product.stock > 0 ? "text-green-600" : "text-red-500"}>{product.stock > 0 ? `${product.stock} ta bor` : "Qolmagan"}</span></p>
            </div>

            <h3 className="font-semibold text-gray-900 mb-2">Ta'rif va Qo'shimcha Ma'lumotlar:</h3>
            <p className="text-gray-600 mb-8 leading-relaxed">{product.description || "Ushbu mahsulot uchun batafsil ta'rif fermer tomonidan kiritilmagan."}</p>

            <div className="mt-auto pt-6 border-t border-gray-100">
              <Button 
                size="lg" 
                fullWidth 
                disabled={product.stock === 0} 
                onClick={() => addItem({ ...product, quantity: 1 })}
                className="text-lg shadow-lg flex justify-center items-center gap-2"
              >
                <ShoppingCart className="w-6 h-6" /> {product.stock === 0 ? "Sotuvda yo'q" : "Savatga joylash"}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default ProductDetail;
