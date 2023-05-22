import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';

const PrivateRoute = ({ element, ...rest }) => {
  const { isAuthenticated } = useContext(AuthProvider);

  return isAuthenticated ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/" replace />
  );
};

export default PrivateRoute;
