import React, { useEffect } from 'react';

const ProtectedRoute = ({ children, isAuthenticated, onNavigate }) => {
  useEffect(() => {
    if (!isAuthenticated) {
      onNavigate('login');
    }
  }, [isAuthenticated, onNavigate]);

  return isAuthenticated ? children : null;
};

export default ProtectedRoute;