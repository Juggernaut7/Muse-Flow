import React from 'react';
import { motion } from 'framer-motion';
import { useLottie } from 'lottie-react';
import { FaMusic, FaPlus } from 'react-icons/fa';
import Button from '../components/UI/Button';
import { useAuth } from '../hooks/useAuth';
import { APP_NAME } from '../utils/constants';
import musicAnimationData from '../assets/music.json';

const HomePage = ({ onNavigate, setModalMessage }) => {
  const { isAuthenticated } = useAuth();
  const { View } = useLottie({
    animationData: musicAnimationData,
    loop: true,
    autoplay: true,
  });

  return (
    <div className="min-h-[calc(100vh-160px)] flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-xl shadow-inner w-full max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-8 sm:mb-10 md:mb-12"
      >
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-indigo-800 leading-tight tracking-tighter">
          Unleash Your Inner Musician
        </h2>
        <p className="mt-3 sm:mt-4 text-lg sm:text-xl md:text-2xl text-gray-700 max-w-xl sm:max-w-2xl mx-auto">
          Explore, learn, and create beautiful music with {APP_NAME}.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="w-full max-w-xs sm:max-w-md md:max-w-lg mb-8 sm:mb-10 md:mb-12"
      >
        {View}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 md:space-x-6"
      >
        {isAuthenticated ? (
          <Button onClick={() => onNavigate('dashboard')} variant="primary">
            <FaMusic className="mr-2" /> Go to Dashboard
          </Button>
        ) : (
          <>
            <Button onClick={() => onNavigate('register')} variant="primary">
              <FaPlus className="mr-2" /> Get Started
            </Button>
            <Button onClick={() => onNavigate('login')} variant="outline">
              Login
            </Button>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default HomePage;