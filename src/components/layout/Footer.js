import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Facebook, Instagram, Twitter, Phone, Mail } from 'lucide-react';

const Footer = () => (
  <footer className="bg-gray-900 text-gray-300 mt-auto">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="col-span-1 md:col-span-2">
          <Link to="/" className="flex items-center gap-2 text-white font-bold text-xl mb-3">
            <Leaf className="w-6 h-6 text-primary-400" />
            AgroMarket
          </Link>
          <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
            O'zbekiston fermerlarini va xaridorlarni to'g'ridan-to'g'ri bog'laydigan
            raqamli qishloq xo'jaligi platformasi.
          </p>
          <div className="flex gap-4 mt-4">
            <a href="#" className="hover:text-primary-400 transition-colors"><Facebook className="w-5 h-5" /></a>
            <a href="#" className="hover:text-primary-400 transition-colors"><Instagram className="w-5 h-5" /></a>
            <a href="#" className="hover:text-primary-400 transition-colors"><Twitter className="w-5 h-5" /></a>
          </div>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-white font-semibold mb-3">Sahifalar</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/"        className="hover:text-primary-400 transition-colors">Bosh sahifa</Link></li>
            <li><Link to="/catalog" className="hover:text-primary-400 transition-colors">Mahsulotlar</Link></li>
            <li><Link to="/login"   className="hover:text-primary-400 transition-colors">Kirish</Link></li>
            <li><Link to="/register" className="hover:text-primary-400 transition-colors">Ro'yxat</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold mb-3">Aloqa</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> +998 90 123 45 67</li>
            <li className="flex items-center gap-2"><Mail  className="w-4 h-4" /> info@agromarket.uz</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} AgroMarket. Barcha huquqlar himoyalangan.
      </div>
    </div>
  </footer>
);

export default Footer;
