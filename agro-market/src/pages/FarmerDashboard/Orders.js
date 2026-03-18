import React, { useState, useEffect } from 'react';
import { getOrders, updateOrderStatus } from '../../services/productService';
import { formatCurrency } from '../../utils/formatCurrency';
import Badge from '../../components/common/Badge';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders().then(setOrders);
  }, []);

  const handleStatusChange = async (id, status) => {
    await updateOrderStatus(id, status);
    setOrders(orders.map(o => o.id === id ? { ...o, status } : o));
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending': return <Badge color="yellow">Kutilmoqda</Badge>;
      case 'confirmed': return <Badge color="blue">Tasdiqlangan</Badge>;
      case 'shipped': return <Badge color="green">Yo'lda (Yetkazilmoqda)</Badge>;
      case 'delivered': return <Badge color="green">Yetkazildi</Badge>;
      case 'cancelled': return <Badge color="red">Bekor qilingan</Badge>;
      default: return <Badge color="gray">{status}</Badge>;
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Mijozlardan Tushgan Buyurtmalar</h1>
      
      <div className="card overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b text-gray-500 text-sm">
              <th className="pb-3 px-4 font-medium">Buyurtma ID</th>
              <th className="pb-3 px-4 font-medium">Xaridor Ma'lumoti</th>
              <th className="pb-3 px-4 font-medium">Sotib olingan Mahsulotlar</th>
              <th className="pb-3 px-4 font-medium">Jami Summa</th>
              <th className="pb-3 px-4 font-medium">Holati (Status)</th>
              <th className="pb-3 px-4 font-medium text-right">Tezkor Amal</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.id} className="border-b last:border-0 hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4 font-medium text-gray-900 border-r border-gray-100 italic text-xs">#{o.id.slice(0,8)}<br/>{new Date(o.date).toLocaleDateString()}</td>
                <td className="py-3 px-4 text-sm text-gray-800 border-r border-gray-100">
                  <p className="font-semibold">{o.customer}</p>
                </td>
                <td className="py-3 px-4 text-xs text-gray-600 border-r border-gray-100 max-w-xs">
                  <ul className="list-disc pl-4">
                    {(Array.isArray(o.items) ? o.items : []).map((it, idx) => (
                      <li key={idx}>{it.name} ({it.quantity} birlik)</li>
                    ))}
                  </ul>
                  {o.cancel_reason && <p className="mt-2 text-red-600 font-medium whitespace-normal">Mijoz tomonidan bekor sababi: {o.cancel_reason}</p>}
                </td>
                <td className="py-3 px-4 font-bold text-primary-700 border-r border-gray-100">{formatCurrency(o.total)}</td>
                <td className="py-3 px-4 border-r border-gray-100">{getStatusBadge(o.status)}</td>
                <td className="py-3 px-4 text-right">
                  <select 
                    className="text-sm border border-gray-300 rounded p-1.5 focus:outline-none focus:ring-1 focus:ring-primary-500"
                    value={o.status}
                    onChange={(e) => handleStatusChange(o.id, e.target.value)}
                  >
                    <option value="pending">Kutilmoqda</option>
                    <option value="confirmed">Tasdiqlash</option>
                    <option value="shipped">Jo'natish</option>
                    <option value="delivered">Yetkazib berildi!</option>
                    <option value="cancelled">Bekor qilish</option>
                  </select>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr><td colSpan="6" className="py-6 text-center text-gray-500">Buyurtmalar yo'q</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Orders;
