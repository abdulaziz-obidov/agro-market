import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Leaf } from 'lucide-react';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { useAuthContext } from '../../context/AuthContext';
import { validators } from '../../utils/validators';

const Login = () => {
  const { register: formRegister, handleSubmit, formState: { errors } } = useForm();
  const { login, loading, error, clearError } = useAuthContext();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await login(data);
      navigate('/');
    } catch (err) {
      // Error is set in the context and displayed below
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="flex justify-center text-primary-600 mb-6 transition-transform hover:scale-105">
          <Leaf className="w-12 h-12" />
        </Link>
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Tizimga kirish
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Yoki{' '}
          <Link to="/register" onClick={clearError} className="font-medium text-primary-600 hover:text-primary-500">
            yangi akkaunt oching
          </Link>
        </p>
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
              id="email"
              type="email"
              label="Email manzilingiz"
              placeholder="Faqat test uchun"
              {...formRegister('email', validators.email)}
              error={errors.email?.message}
            />

            <Input
              id="password"
              type="password"
              label="Parol"
              placeholder="******"
              {...formRegister('password', validators.password)}
              error={errors.password?.message}
            />

            <Button type="submit" fullWidth loading={loading}>
              Kirish
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
