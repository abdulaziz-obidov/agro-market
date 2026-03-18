import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import RoleRoute from './RoleRoute';
import { ROLES } from '../utils/constants';
import Loader from '../components/shared/Loader';

// ─── Lazy-loaded Pages ───────────────────────────────────────────────────────
const Home            = lazy(() => import('../pages/Home'));
const Login           = lazy(() => import('../pages/Auth/Login'));
const Register        = lazy(() => import('../pages/Auth/Register'));
const Catalog         = lazy(() => import('../pages/Catalog'));
const ProductDetail   = lazy(() => import('../pages/Catalog/ProductDetail'));
const FarmerDashboard = lazy(() => import('../pages/FarmerDashboard'));
const FarmerDashboardStats = lazy(() => import('../pages/FarmerDashboard/Stats'));
const FarmerDashboardMyProducts = lazy(() => import('../pages/FarmerDashboard/MyProducts'));
const FarmerDashboardOrders = lazy(() => import('../pages/FarmerDashboard/Orders'));
const Admin           = lazy(() => import('../pages/Admin'));
const Unauthorized    = lazy(() => import('../pages/Unauthorized'));
const NotFound        = lazy(() => import('../pages/NotFound'));
const Cart            = lazy(() => import('../pages/Cart'));
const MyOrders        = lazy(() => import('../pages/MyOrders'));

const AppRoutes = () => (
  <Suspense fallback={<Loader fullScreen />}>
    <Routes>
      {/* ── Public Routes ─────────────────────────────────── */}
      <Route path="/"          element={<Home />} />
      <Route path="/catalog"   element={<Catalog />} />
      <Route path="/catalog/:id" element={<ProductDetail />} />
      <Route path="/login"     element={<Login />} />
      <Route path="/register"  element={<Register />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* ── Private Routes (any authenticated user) ────────── */}
      <Route element={<PrivateRoute />}>
        <Route path="/cart" element={<Cart />} />
        <Route path="/my-orders" element={<MyOrders />} />
      </Route>

      {/* ── Farmer Routes ─────────────────────────────────── */}
      <Route element={<RoleRoute allowedRoles={ROLES.FARMER} />}>
        <Route path="/dashboard" element={<FarmerDashboard />}>
          <Route index element={<FarmerDashboardStats />} />
          <Route path="products" element={<FarmerDashboardMyProducts />} />
          <Route path="orders" element={<FarmerDashboardOrders />} />
        </Route>
      </Route>

      {/* ── Admin Routes ──────────────────────────────────── */}
      <Route element={<RoleRoute allowedRoles={ROLES.ADMIN} />}>
        <Route path="/admin" element={<Admin />} />
      </Route>

      {/* ── Catch-all ─────────────────────────────────────── */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Suspense>
);

export default AppRoutes;
