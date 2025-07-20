import React from 'react';
import { motion } from 'framer-motion';
import { FaUserCircle, FaSignOutAlt, FaMusic } from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';
import Button from './Button';
import { APP_NAME } from '../../utils/constants';

const Navbar = ({ onNavigate }) => {
  const { isAuthenticated, username, logout } = useAuth();

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 14 }}
      className="bg-white shadow-md p-4 sticky top-0 z-40 rounded-b-xl"
    >
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-indigo-700">
          <button onClick={() => onNavigate('home')} className="focus:outline-none">
            {APP_NAME}
          </button>
        </h1>
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 md:space-x-6">
          {isAuthenticated ? (
            <>
              <span className="text-gray-700 text-base sm:text-lg font-medium flex items-center">
                <FaUserCircle className="mr-2 text-indigo-500" /> Hello, {username}
              </span>
              <Button onClick={() => onNavigate('dashboard')} variant="outline">
                <FaMusic className="mr-2" /> Dashboard
              </Button>
              <Button onClick={logout} variant="secondary">
                <FaSignOutAlt className="mr-2" /> Logout
              </Button>
            </>
          ) : (
            <>
              <Button onClick={() => onNavigate('login')} variant="outline">
                Login
              </Button>
              <Button onClick={() => onNavigate('register')}>
                Register
              </Button>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;