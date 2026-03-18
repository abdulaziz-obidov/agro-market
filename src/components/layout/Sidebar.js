import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Package, BarChart2, ShoppingBag, Settings, X
} from 'lucide-react';

const farmerNavItems = [
  { to: '/dashboard',          icon: <LayoutDashboard className="w-5 h-5" />, label: 'Dashboard' },
  { to: '/dashboard/products', icon: <Package className="w-5 h-5" />,        label: 'Mahsulotlarim' },
  { to: '/dashboard/orders',   icon: <ShoppingBag className="w-5 h-5" />,    label: 'Buyurtmalar' },
  { to: '/dashboard/stats',    icon: <BarChart2 className="w-5 h-5" />,      label: 'Statistika' },
  { to: '/dashboard/settings', icon: <Settings className="w-5 h-5" />,       label: 'Sozlamalar' },
];

const Sidebar = ({ open, onClose }) => {
  const { pathname } = useLocation();

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Panel */}
      <aside className={`
        fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-40 flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${open ? 'translate-x-0' : '-translate-x-full'}
        lg:static lg:translate-x-0 lg:shadow-none lg:z-auto
      `}>
        <div className="flex items-center justify-between p-4 border-b border-gray-100 lg:hidden">
          <span className="font-semibold text-gray-800">Menyu</span>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {farmerNavItems.map((item) => {
            const isActive = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <span className={isActive ? 'text-primary-600' : 'text-gray-400'}>
                  {item.icon}
                </span>
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
