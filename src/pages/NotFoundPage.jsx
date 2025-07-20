import React from 'react';
import Button from '../components/UI/Button';

const NotFoundPage = () => {
  return (
    <div className="min-h-[calc(100vh-160px)] flex flex-col items-center justify-center p-8 bg-gray-50 rounded-xl shadow-inner">
      <h2 className="text-5xl font-extrabold text-red-600 mb-4">404</h2>
      <p className="text-2xl text-gray-700 mb-8">Page Not Found</p>
      <Button onClick={() => window.location.hash = '#home'}>Go to Home</Button>
    </div>
  );
};

export default NotFoundPage;