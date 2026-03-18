import React, { useState, useEffect } from 'react';
import { Package, Clock, CheckCircle, Truck, MapPin, XCircle } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { formatCurrency } from '../utils/formatCurrency';
import Badge from '../components/common/Badge';
import Loader from '../components/shared/Loader';
import Button from '../components/common/Button';

// Haqiqiy backenddagi userga xos o'z buyurtmalarini olish
import { getMyOrders, updateOrderStatus } from '../services/productService';

const STATUS_CONFIG = {
  pending: { label: "Kutilmoqda", color: "yellow", icon: Clock },
  confirmed: { label: "Tasdiqlangan", color: "blue", icon: CheckCircle },
  shipped: { label: "Yetkazilmoqda", color: "orange", icon: Truck },
  delivered: { label: "Yetkazib berilgan", color: "green", icon: MapPin },
  cancelled: { label: "Bekor qilingan", color: "red", icon: XCircle }
};

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = () => {
    setLoading(true);
    getMyOrders().then(res => {
      setOrders(res);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCancel = async (id) => {
    const reason = window.prompt("Iltimos, bekor qilish sababini qisqacha yozing:");
    if (reason) {
      try {
        await updateOrderStatus(id, 'cancelled', reason);
        fetchOrders();
      } catch (e) {
        alert("Xatolik yuz berdi");
      }
    }
  };

  if (loading) return <div className="min-h-screen bg-gray-50"><Navbar/><Loader fullScreen /></div>;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 page-container max-w-5xl">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Package className="w-6 h-6 text-primary-600" /> Mening Buyurtmalarim
        </h1>

        {orders.length === 0 ? (
          <div className="card text-center py-16">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-medium text-gray-900 mb-2">Hozircha buyurtmalar yo'q</h2>
            <p className="text-gray-500">Siz hali hech qanday xaridni amalga oshirmagansiz.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map(order => {
              const config = STATUS_CONFIG[order.status] || STATUS_CONFIG.pending;
              const StatusIcon = config.icon;
              const items = Array.isArray(order.items) ? order.items : [];
              return (
                <div key={order.id} className="card hover:shadow-card transition-shadow">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b pb-4 mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                         <span className="font-extrabold text-lg text-gray-900">Buyurtma #{order.id.slice(0,8)}</span>
                         <Badge color={config.color} className="flex items-center gap-1 px-2.5 py-1">
                            <StatusIcon className="w-3.5 h-3.5" /> {config.label}
                         </Badge>
                      </div>
                      <p className="text-sm text-gray-500">
                        Sana: {new Date(order.date).toLocaleString('uz-UZ', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute:'2-digit' })}
                      </p>
                    </div>
                    <div className="text-left md:text-right">
                      <p className="text-sm text-gray-500 mb-1">Jami hisoblangan to'lov:</p>
                      <p className="text-2xl font-bold text-primary-700">{formatCurrency(order.total)}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Buyurtma qilingan mahsulotlar:</h4>
                    <ul className="space-y-1">
                       {items.map((it, idx) => (
                         <li key={idx} className="text-sm text-gray-600 flex justify-between bg-gray-50 p-2 rounded">
                           <span>{it.name} x {it.quantity} birlik</span>
                           <span className="font-medium">{formatCurrency(it.price * it.quantity)}</span>
                         </li>
                       ))}
                    </ul>
                  </div>

                  {order.status === 'cancelled' && order.cancel_reason && (
                    <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm mb-4">
                       <strong>Bekor qilish sababi:</strong> {order.cancel_reason}
                    </div>
                  )}

                  {order.status === 'pending' && (
                    <div className="flex justify-end pt-2">
                       <Button variant="secondary" className="text-red-600 hover:bg-red-50 border-red-200" onClick={() => handleCancel(order.id)}>
                          Buyurtmani bekor qilish
                       </Button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};
export default MyOrders;
