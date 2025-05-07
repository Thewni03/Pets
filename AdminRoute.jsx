import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import React from 'react';

const AdminRoute = () => {
  const { user } = useAuth();

  return user?.user?.role === 'admin' ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
};

export default AdminRoute;