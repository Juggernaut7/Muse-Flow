import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import Footer from './components/UI/Footer';
import Modal from './components/UI/Modal';
import HomePage from './pages/HomePage';
import LoginForm from './pages/Auth/LoginForm';
import RegisterForm from './pages/Auth/RegisterForm';
import DashboardPage from './pages/DashboardPage';
import LearningPage from './pages/LearningPage';
import CreationPage from './pages/CreationPage';
import NotFoundPage from './pages/NotFoundPage';
import { useAuth } from './hooks/useAuth';
import ProtectedRoute from './Shared/ProtectedRoute';
import Navbar from './components/UI/NavBar';

function App() {
  const { isAuthenticated } = useAuth();
  const [currentPage, setCurrentPage] = useState('home');
  const [modalMessage, setModalMessage] = useState(null);

  const handleNavigate = useCallback((page) => {
    setCurrentPage(page);
    window.location.hash = page;
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      setCurrentPage(hash || 'home');
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} setModalMessage={setModalMessage} />;
      case 'login':
        return <LoginForm onNavigate={handleNavigate} setModalMessage={setModalMessage} />;
      case 'register':
        return <RegisterForm onNavigate={handleNavigate} setModalMessage={setModalMessage} />;
      case 'dashboard':
        return (
          <ProtectedRoute isAuthenticated={isAuthenticated} onNavigate={handleNavigate}>
            <DashboardPage onNavigate={handleNavigate} />
          </ProtectedRoute>
        );
      case 'learning':
        return (
          <ProtectedRoute isAuthenticated={isAuthenticated} onNavigate={handleNavigate}>
            <LearningPage />
          </ProtectedRoute>
        );
      case 'creation':
        return (
          <ProtectedRoute isAuthenticated={isAuthenticated} onNavigate={handleNavigate}>
            <CreationPage />
          </ProtectedRoute>
        );
      default:
        return <NotFoundPage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-inter text-gray-900 flex flex-col">
      <Navbar onNavigate={handleNavigate} />
      <main className="flex-grow container mx-auto p-4 my-8">
        <AnimatePresence mode="wait">
          {renderPage()}
        </AnimatePresence>
      </main>
      <Footer />
      <Modal
        isOpen={!!modalMessage}
        onClose={() => setModalMessage(null)}
        title={modalMessage?.type === 'success' ? 'Success!' : 'Error!'}
      >
        <p className={modalMessage?.type === 'success' ? 'text-green-600' : 'text-red-600'}>
          {modalMessage?.message}
        </p>
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => setModalMessage(null)}
            className="px-6 py-3 rounded-xl font-semibold bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default App;