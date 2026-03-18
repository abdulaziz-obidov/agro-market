// src/pages/FarmerDashboard/MyProducts.js
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { getMyProducts, createProduct } from '../../services/productService';
import { formatCurrency } from '../../utils/formatCurrency';
import { useToast } from '../../components/shared/Toast';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Modal from '../../components/shared/Modal';
import Loader from '../../components/shared/Loader';
import { CATEGORIES } from '../../utils/constants';

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const { toast } = useToast();
  const { register: formRegister, handleSubmit, reset, formState: { errors } } = useForm();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await getMyProducts();
      setProducts(res.products);
    } catch {
      toast.error('Guruhlanishda xato');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const onSubmit = async (data) => {
    try {
      await createProduct(data);
      alert("Yangi mahsulot tizimga ulandi!");
      setModalOpen(false);
      reset();
      fetchProducts();
    } catch {
      alert("Xatolik yuz berdi");
    }
  };

  if (loading) return <Loader />;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Mening Mahsulotlarim</h1>
        <Button onClick={() => setModalOpen(true)} className="flex items-center gap-2">
          <Plus className="w-4 h-4" /> Yangi qo'shish
        </Button>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b text-gray-500 text-sm">
              <th className="pb-3 px-4 font-medium">Mahsulot nomi</th>
              <th className="pb-3 px-4 font-medium">Kategoriya</th>
              <th className="pb-3 px-4 font-medium">Narx</th>
              <th className="pb-3 px-4 font-medium">Zaxira (omborda)</th>
              <th className="pb-3 px-4 font-medium text-right">Amallar</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p._id} className="border-b last:border-0 hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4 flex items-center gap-3">
                  <img src={p.images?.[0]} alt="" className="w-10 h-10 rounded bg-gray-100 object-cover" />
                  <span className="font-medium text-gray-900">{p.name}</span>
                </td>
                <td className="py-3 px-4 text-sm text-gray-600 capitalize">{p.category}</td>
                <td className="py-3 px-4 text-sm font-semibold text-primary-700">{formatCurrency(p.price)} / {p.unit}</td>
                <td className="py-3 px-4 text-sm">
                   {p.stock > 0 ? <span className="text-green-600 font-medium">{p.stock} ta bor</span> : <span className="text-red-500 font-medium">Tugagan</span>}
                </td>
                <td className="py-3 px-4 flex items-center justify-end gap-2">
                  <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"><Edit2 className="w-4 h-4" /></button>
                  <button className="p-1.5 text-red-600 hover:bg-red-50 rounded"><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr><td colSpan="5" className="py-8 text-center text-gray-500">Hech qanday mahsulot topilmadi. "Yangi qo'shish" tugmasini bosing.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Yangi mahsulotlarni vitrinaga qo'shish" size="lg">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input 
            label="Mahsulot nomi" 
            placeholder="Masalan: Farg'ona Gilosi"
            {...formRegister('name', { required: true })} 
            error={errors.name && "Majburiy maydon"} 
          />
          
          <div className="grid grid-cols-2 gap-4">
             <Input 
               type="number" 
               label="Narxi (so'm)" 
               placeholder="M: 45000"
               {...formRegister('price', { required: true })} 
               error={errors.price && "Majburiy maydon"} 
             />
             <div className="w-full">
               <label className="block text-sm font-medium text-gray-700 mb-1">O'lchov birligi</label>
               <select className="input-field bg-white" {...formRegister('unit', { required: true })}>
                 <option value="kg">Kg</option>
                 <option value="dona">Dona</option>
                 <option value="litr">Litr</option>
               </select>
             </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="w-full">
               <label className="block text-sm font-medium text-gray-700 mb-1">Kategoriyasi</label>
               <select className="input-field bg-white" {...formRegister('category', { required: true })}>
                  {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
               </select>
            </div>
            <Input 
              type="number" 
              label="Zaxiradan ajratiladi (miqdori)" 
              placeholder="100"
              {...formRegister('stock', { required: true })} 
              error={errors.stock && "Majburiy maydon"} 
            />
          </div>

          <div className="w-full">
             <label className="block text-sm font-medium text-gray-700 mb-1">Qisqacha ta'rif va afzalliklari</label>
             <textarea className="input-field h-24 bg-white" placeholder="Mahsulot haqida ko'proq ma'lumot..." {...formRegister('description')}></textarea>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t mt-4">
            <Button type="button" variant="secondary" onClick={() => setModalOpen(false)}>Bekor qilish</Button>
            <Button type="submit">Saqlash va Chop etish</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
export default MyProducts;
