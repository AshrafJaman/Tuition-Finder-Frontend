import React from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Spinner } from '../Spinner/Spinner';

const ProtectedRoute = ({ children }) => {
  const auth = useAuth();

  if (!auth.loading) {
    if (auth.user) {
      return <>{children}</>;
    } else {
      return <Redirect to="/login" />;
    }
  } else {
    return <Spinner />;
  }
};

export default ProtectedRoute;
