import React from 'react';
import Navbar from '../../components/layout/Navbar';

const Admin = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-900">Admin Boshqaruvi</h1>
        <div className="card">
          <p className="text-gray-500">Admin sahifasi ishlab chiqilmoqda...</p>
        </div>
      </main>
    </div>
  );
};

export default Admin;
