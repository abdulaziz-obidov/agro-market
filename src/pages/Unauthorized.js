import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-red-600 mb-2">403</h1>
      <h2 className="text-xl font-semibold mb-4 text-gray-900">Ruxsat etilmagan sahifa</h2>
      <p className="text-gray-500 mb-6 text-center max-w-md">
        Sizda bu sahifani ko'rish uchun yetarli huquqlar mavjud emas.
      </p>
      <Link to="/" className="btn-primary">
        Bosh sahifaga qaytish
      </Link>
    </div>
  );
};

export default Unauthorized;
