import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Leaf } from 'lucide-react';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { useAuthContext } from '../../context/AuthContext';
import { validators } from '../../utils/validators';
import { ROLES } from '../../utils/constants';

const Register = () => {
  const { register: formRegister, handleSubmit, formState: { errors } } = useForm();
  const { register, loading, error, clearError } = useAuthContext();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await register(data);
      alert("Muvaffaqiyatli ro'yxatdan o'tdingiz! Endi akkauntga kiring.");
      navigate('/login');
    } catch (err) {
      // Error handled in hook/context
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="flex justify-center text-primary-600 mb-6 transition-transform hover:scale-105">
          <Leaf className="w-12 h-12" />
        </Link>
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Ro'yxatdan o'tish
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {error && (
              <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm text-center font-medium">
                {error}
              </div>
            )}

            <Input 
              id="name" 
              label="Ism va Familiya" 
              {...formRegister('name', validators.required())} 
              error={errors.name?.message} 
            />
            
            <Input 
              id="email" 
              type="email" 
              label="Email" 
              {...formRegister('email', validators.email)} 
              error={errors.email?.message} 
            />
            
            <Input 
              id="password" 
              type="password" 
              label="Parol xavfsizligi" 
              {...formRegister('password', validators.password)} 
              error={errors.password?.message} 
            />
            
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">Kim sifatida kiryapsiz?</label>
              <select 
                className={`
                  w-full px-3 py-2 border rounded-lg text-sm bg-white
                  focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200
                  ${errors.role ? 'border-red-400' : 'border-gray-300'}
                `}
                {...formRegister('role', validators.required("Rolni tanlash shart"))}
              >
                <option value={ROLES.BUYER}>Xaridor (Buyurtma berish uchun)</option>
                <option value={ROLES.FARMER}>Fermer (Sotuvchi)</option>
              </select>
            </div>

            <Button type="submit" fullWidth loading={loading}>Ro'yxatdan o'tish</Button>
          </form>
          
          <div className="mt-6 text-center text-sm">
            Ro'yxatdan o'tganmisiz?{' '}
            <Link to="/login" onClick={clearError} className="text-primary-600 font-medium hover:text-primary-500">
              Kirish
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;
