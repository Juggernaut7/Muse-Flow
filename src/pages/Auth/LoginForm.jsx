import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';
import { APP_NAME } from '../../utils/constants';

const LoginForm = ({ onNavigate, setModalMessage }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(username, password);
    if (result.success) {
      setModalMessage({ type: 'success', message: 'Login successful!' });
      onNavigate('dashboard');
    } else {
      setModalMessage({ type: 'error', message: result.message || 'Login failed. Please check your credentials.' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 sm:p-8 rounded-xl shadow-xl max-w-md mx-auto mt-6 sm:mt-8 md:mt-10 w-full"
    >
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">Login to {APP_NAME}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Username"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <Input
          label="Password"
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
      <p className="mt-4 sm:mt-6 text-center text-gray-600 text-sm sm:text-base">
        Don't have an account?{' '}
        <button onClick={() => onNavigate('register')} className="text-indigo-600 hover:underline font-semibold">
          Register here
        </button>
      </p>
    </motion.div>
  );
};

export default LoginForm;