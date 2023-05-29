import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRouting = () => {
  const { userData } = useSelector((state) => state.dataReducers);

  return userData ? <Outlet /> : <Navigate to="/" />;
};