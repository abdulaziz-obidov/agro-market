import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, Leaf, User, LogOut, LayoutDashboard, Shield } from 'lucide-react';
import { useAuthContext } from '../../context/AuthContext';
import { useCartContext } from '../../context/CartContext';
import { ROLES } from '../../utils/constants';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, user, logout, role } = useAuthContext();
  const { totalItems } = useCartContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-primary-700 font-bold text-xl">
            <Leaf className="w-6 h-6 text-primary-500" />
            <span>AgroMarket</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/"        className="text-gray-600 hover:text-primary-600 font-medium transition-colors">Bosh sahifa</Link>
            <Link to="/catalog" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">Katalog</Link>
            {role === ROLES.FARMER && (
              <Link to="/dashboard" className="text-gray-600 hover:text-primary-600 font-medium transition-colors flex items-center gap-1">
                <LayoutDashboard className="w-4 h-4" /> Dashboard
              </Link>
            )}
            {role === ROLES.ADMIN && (
              <Link to="/admin" className="text-gray-600 hover:text-primary-600 font-medium transition-colors flex items-center gap-1">
                <Shield className="w-4 h-4" /> Admin
              </Link>
            )}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* Orders and Cart */}
            {isAuthenticated && (
              <Link to="/my-orders" className="text-gray-600 hover:text-primary-600 font-medium transition-colors mr-2">
                Buyurtmalarim
              </Link>
            )}
            <Link to="/cart" className="relative text-gray-600 hover:text-primary-600 transition-colors">
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-700 font-medium">{user?.name}</span>
                <button onClick={handleLogout} className="btn-secondary flex items-center gap-1 text-sm py-1.5">
                  <LogOut className="w-4 h-4" /> Chiqish
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login"    className="btn-secondary text-sm py-1.5">Kirish</Link>
                <Link to="/register" className="btn-primary text-sm py-1.5">Ro'yxat</Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-3">
            {isAuthenticated && (
              <Link to="/my-orders" className="text-gray-600 text-sm font-medium">
                Buyurtmalar
              </Link>
            )}
            <Link to="/cart" className="relative text-gray-600">
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-primary-500 text-white text-xs font-bold w-4 h-4 flex items-center justify-center rounded-full text-[10px]">
                  {totalItems}
                </span>
              )}
            </Link>
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-600">
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden py-3 border-t border-gray-100 space-y-2">
            <Link to="/"        onClick={() => setMenuOpen(false)} className="block px-3 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg">Bosh sahifa</Link>
            <Link to="/catalog" onClick={() => setMenuOpen(false)} className="block px-3 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg">Katalog</Link>
            {role === ROLES.FARMER && (
              <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="block px-3 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg">Dashboard</Link>
            )}
            {role === ROLES.ADMIN && (
              <Link to="/admin" onClick={() => setMenuOpen(false)} className="block px-3 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg">Admin</Link>
            )}
            {isAuthenticated ? (
              <button onClick={handleLogout} className="block w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg">Chiqish</button>
            ) : (
              <>
                <Link to="/login"    onClick={() => setMenuOpen(false)} className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">Kirish</Link>
                <Link to="/register" onClick={() => setMenuOpen(false)} className="block px-3 py-2 text-primary-600 font-medium hover:bg-primary-50 rounded-lg">Ro'yxatdan o'tish</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
