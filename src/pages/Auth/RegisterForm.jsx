import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';
import { APP_NAME } from '../../utils/constants';

const RegisterForm = ({ onNavigate, setModalMessage }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { register } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setModalMessage({ type: 'error', message: 'Passwords do not match!' });
      return;
    }
    const result = register(username, password);
    if (result.success) {
      setModalMessage({ type: 'success', message: 'Registration successful! You are now logged in.' });
      onNavigate('dashboard');
    } else {
      setModalMessage({ type: 'error', message: result.message || 'Registration failed.' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 sm:p-8 rounded-xl shadow-xl max-w-md mx-auto mt-6 sm:mt-8 md:mt-10 w-full"
    >
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">Register for {APP_NAME}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Username"
          id="reg-username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <Input
          label :

"Password"
          id="reg-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Input
          label="Confirm Password"
          id="confirm-password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <Button type="submit" className="w-full">
          Register
        </Button>
      </form>
      <p className="mt-4 sm:mt-6 text-center text-gray-600 text-sm sm:text-base">
        Already have an account?{' '}
        <button onClick={() => onNavigate('login')} className="text-indigo-600 hover:underline font-semibold">
          Login here
        </button>
      </p>
    </motion.div>
  );
};

export default RegisterForm;