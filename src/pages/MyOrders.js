import React, { useState, useEffect } from 'react';
import { Package, Clock, CheckCircle, Truck, MapPin, XCircle } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { formatCurrency } from '../utils/formatCurrency';
import Badge from '../components/common/Badge';
import Loader from '../components/shared/Loader';

// Mock xotira funksiyasi orqali olamiz
import { getOrders } from '../services/productService';

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

  useEffect(() => {
    // Mahalliy user ma'lumotlarini ajratib olish
    const user = JSON.parse(localStorage.getItem('agro_user') || '{}');
    
    getOrders().then(allOrders => {
      // Hozirgi logged-in mijoz ismiga teng bo'lganlarini vizual filterlash
      const myOrders = allOrders.filter(o => o.customer === user.full_name || o.customer === 'Xaridor');
      setOrders(myOrders);
      setLoading(false);
    });
  }, []);

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
              return (
                <div key={order.id} className="card flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-card transition-shadow">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                       <span className="font-extrabold text-lg text-gray-900">Buyurtma #{order.id}</span>
                       <Badge color={config.color} className="flex items-center gap-1 px-2.5 py-1">
                          <StatusIcon className="w-3.5 h-3.5" /> {config.label}
                       </Badge>
                    </div>
                    <p className="text-sm text-gray-500">
                      Sana: {new Date(order.date).toLocaleString('uz-UZ', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute:'2-digit' })}
                    </p>
                    <p className="text-sm font-medium text-gray-700 mt-1">Savatdagi mahsulotlar tur-xili: {order.items} xil tovar</p>
                  </div>
                  
                  <div className="text-left md:text-right bg-gray-50 p-4 rounded-xl md:bg-transparent md:p-0">
                    <p className="text-sm text-gray-500 mb-1">Jami hisoblangan to'lov:</p>
                    <p className="text-2xl font-bold text-primary-700">{formatCurrency(order.total)}</p>
                  </div>
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
