import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-6xl font-bold text-primary-600 mb-2">404</h1>
      <h2 className="text-2xl font-semibold mb-4 text-gray-900">Sahifa topilmadi!</h2>
      <p className="text-gray-500 mb-6 text-center max-w-md">
        Siz qidirayotgan sahifa o'chirilgan yoki umuman mavjud emas.
      </p>
      <Link to="/" className="btn-primary">
        Bosh sahifaga qaytish
      </Link>
    </div>
  );
};

export default NotFound;
