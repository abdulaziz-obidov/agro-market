import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus, ArrowLeft, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import { useCartContext } from '../context/CartContext';
import { formatCurrency } from '../utils/formatCurrency';
import Navbar from '../components/layout/Navbar';
import Button from '../components/common/Button';
import { placeOrder } from '../services/productService';

const Cart = () => {
  const { items, updateQty, removeItem, clearCart, totalPrice } = useCartContext();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    try {
      setLoading(true);
      await placeOrder(items, totalPrice);
      alert("Tabriklaymiz! Buyurtmangiz muvaffaqiyatli qabul qilindi. Endi fermer uni tayyorlaydi.");
      clearCart();
    } catch (error) {
      alert("Xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 page-container max-w-6xl">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <ShoppingBag className="w-6 h-6 text-primary-600" /> Savatcha
        </h1>

        {items.length === 0 ? (
          <div className="card text-center py-16">
            <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-medium text-gray-900 mb-2">Savatchangiz bo'sh</h2>
            <p className="text-gray-500 mb-6">Hozircha hech qanday mahsulot qo'shilmagan. Mahsulotlarni qidirish qismidan tanlashingiz mumkin.</p>
            <Link to="/catalog">
              <Button>Katalogga o'tish</Button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* List */}
            <div className="flex-1 space-y-4">
              {items.map(item => (
                <div key={item._id} className="card flex flex-col sm:flex-row items-center gap-4">
                  <img src={item.images?.[0]} alt={item.name} className="w-24 h-24 object-cover rounded-lg bg-gray-100" />
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-500">{formatCurrency(item.price)} / {item.unit}</p>
                  </div>
                  
                  {/* Quantity Control */}
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => updateQty(item._id, Math.max(1, item.quantity - 1))} 
                      className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-6 text-center font-medium">{item.quantity}</span>
                    <button 
                      onClick={() => updateQty(item._id, item.quantity + 1)} 
                      className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="w-28 text-center sm:text-right font-bold text-primary-700">
                    {formatCurrency(item.price * item.quantity)}
                  </div>
                  
                  <button onClick={() => removeItem(item._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
              <div className="flex justify-start mt-4">
                <button onClick={clearCart} className="text-red-500 font-medium text-sm hover:underline px-2 py-1">
                  Barcha narsani o'chirish
                </button>
              </div>
            </div>

            {/* Summary Panel */}
            <div className="w-full lg:w-80">
              <div className="card sticky top-24">
                <h3 className="text-lg font-semibold mb-4 border-b pb-4">Xarid ma'lumoti</h3>
                <div className="flex justify-between mb-2 text-gray-600">
                  <span>Mahsulotlar soni:</span>
                  <span>{items.reduce((acc, i) => acc + i.quantity, 0)} ta</span>
                </div>
                <div className="flex justify-between mb-4 text-gray-600">
                  <span>Yetkazib berish:</span>
                  <span className="text-green-600 font-medium tracking-wide">Bepul</span>
                </div>
                <div className="flex justify-between mb-6 font-bold text-xl border-t border-gray-100 pt-4">
                  <span>Jami tolov:</span>
                  <span className="text-primary-700">{formatCurrency(totalPrice)}</span>
                </div>
                <Button fullWidth onClick={handleCheckout} disabled={loading}>
                  {loading ? 'Iltimos, kuting...' : 'Buyurtmani rasmiylashtirish'}
                </Button>
                <Link to="/catalog">
                  <Button variant="secondary" fullWidth className="mt-3">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Xaridni davom etish
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Cart;
