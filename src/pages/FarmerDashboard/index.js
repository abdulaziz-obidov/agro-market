// src/pages/FarmerDashboard/index.js
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/layout/Sidebar';
import Navbar from '../../components/layout/Navbar';
import { Menu } from 'lucide-react';

const FarmerDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 overflow-y-auto w-full">
          <div className="lg:hidden p-4 border-b bg-white flex items-center gap-3">
             <button onClick={() => setSidebarOpen(true)} className="p-2 bg-gray-100 rounded-lg text-gray-600">
               <Menu className="w-5 h-5" />
             </button>
             <span className="font-semibold text-gray-800">Fermer Menyusi</span>
          </div>
          <div className="p-4 sm:p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
export default FarmerDashboard;
