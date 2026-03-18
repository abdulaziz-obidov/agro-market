import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

/**
 * RoleRoute – blocks access for users without the required role.
 * @prop {string|string[]} allowedRoles – roles permitted to access this route
 */
const RoleRoute = ({ allowedRoles }) => {
  const { isAuthenticated, role } = useAuthContext();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

  if (!roles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default RoleRoute;
