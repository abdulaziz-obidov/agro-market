// src/pages/Home/index.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, ShieldCheck, Truck } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import ProductGrid from '../../components/product/ProductGrid';
import { getProducts } from '../../services/productService';

const FEATURES = [
  { icon: <Leaf className="w-6 h-6 text-primary-600" />,      title: "100% Tabiiy",             desc: "To'g'ridan-to'g'ri fermerdan toza mahsulotlar" },
  { icon: <ShieldCheck className="w-6 h-6 text-blue-600" />,   title: "Sifat kafolati",           desc: "Har bir mahsulot tekshirilgan va sertifikatlangan" },
  { icon: <Truck className="w-6 h-6 text-orange-500" />,       title: "Tez yetkazib berish",      desc: "24 soat ichida eshigingizgacha" },
];

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts({ limit: 8 }).then(res => {
      setProducts(res.products);
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* ── Hero ────────────────────────────────────────── */}
        <section className="bg-gradient-to-br from-primary-700 via-primary-600 to-primary-500 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
            <div className="max-w-2xl">
              <h1 className="text-4xl lg:text-5xl font-extrabold mb-5 leading-tight">
                Fermer bozori —{' '}
                <span className="text-earth-300">endi raqamda</span>
              </h1>
              <p className="text-lg text-primary-100 mb-8">
                O'zbekiston fermerlari bilan to'g'ridan-to'g'ri ulaning. Yangi,
                sifatli qishloq-xo'jalik mahsulotlarini oson va qulay sotib oling.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/catalog" className="bg-white text-primary-700 hover:bg-primary-50 font-semibold px-6 py-3 rounded-lg transition-colors flex items-center gap-2">
                  Mahsulotlarni ko'rish <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/register" className="border-2 border-white text-white hover:bg-white/10 font-semibold px-6 py-3 rounded-lg transition-colors">
                  Fermer sifatida qo'shil
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Features ─────────────────────────────────────── */}
        <section className="bg-gray-50 py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {FEATURES.map((f) => (
                <div key={f.title} className="card flex gap-4 items-start">
                  <div className="p-3 bg-gray-100 rounded-xl shrink-0">{f.icon}</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{f.title}</h3>
                    <p className="text-sm text-gray-500">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Featured Products ─────────────────────────────── */}
        <section className="page-container">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Yangi mahsulotlar</h2>
            <Link to="/catalog" className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center gap-1">
              Barchasini ko'rish <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <ProductGrid products={products} loading={loading} />
        </section>
      </main>

      <Footer />
    </div>
  );
};
export default Home;
