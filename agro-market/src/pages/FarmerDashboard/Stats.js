// src/pages/FarmerDashboard/Stats.js
import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, ShoppingBag, DollarSign } from 'lucide-react';
import { getFarmerStats } from '../../services/productService';
import { formatCurrency } from '../../utils/formatCurrency';
import Loader from '../../components/shared/Loader';

const StatCard = ({ title, value, icon, trend }) => (
  <div className="card flex items-center gap-4">
    <div className={`p-4 rounded-xl ${trend >= 0 ? 'bg-primary-50 text-primary-600' : 'bg-red-50 text-red-600'}`}>
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-500 font-medium mb-1">{title}</p>
      <h4 className="text-2xl font-bold text-gray-900">{value}</h4>
    </div>
  </div>
);

const Stats = () => {
  const [stats, setStats] = useState(null);
  
  useEffect(() => {
    getFarmerStats().then(setStats);
  }, []);

  if (!stats) return <Loader text="Statistika yuklanmoqda..." />;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Asosiy Ko'rsatkichlar</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Jami Daromad" value={formatCurrency(stats.revenue, true)} icon={<DollarSign className="w-6 h-6" />} trend={1} />
        <StatCard title="Sotilgan Mahsulotlar" value={stats.productsSold} icon={<ShoppingBag className="w-6 h-6" />} trend={1} />
        <StatCard title="Yangi Buyurtmalar" value={stats.newOrders} icon={<TrendingUp className="w-6 h-6" />} trend={1} />
        <StatCard title="Mijozlar" value={stats.customers} icon={<Users className="w-6 h-6" />} trend={1} />
      </div>

      <div className="card min-h-[250px] flex items-center justify-center text-gray-400 text-sm">
         <p>Savdo grafiklari oylik trendlari haqida ma'lumot shu yerda bo'ladi...</p>
      </div>
    </div>
  );
};
export default Stats;
