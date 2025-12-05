import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { X, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login: loginFn, isLoading, error } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginFn(login, password);
      navigate('/');
    } catch (err) {
      // Error handled by store
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-gray-200 relative"
      >
        {/* Close Button */}
        <button
          onClick={() => navigate('/')}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Fermer"
        >
          <X className="w-6 h-6 text-gray-400" />
        </button>

        {/* Header with S'INSCRIRE link */}
        <div className="absolute top-4 right-16">
          <Link
            to="/register"
            className="text-sm font-bold text-blue-500 hover:text-blue-600 uppercase tracking-wide"
          >
            S'inscrire
          </Link>
        </div>

        <div className="p-12">
          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
            Connexion
          </h1>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email/Username Input */}
            <div>
              <input
                type="text"
                placeholder="E-mail ou nom d'utilisateur"
                className="
                  w-full px-4 py-4 rounded-2xl border-2 border-gray-300
                  focus:border-blue-500 focus:outline-none
                  bg-gray-700 text-white font-semibold text-base
                  placeholder:text-gray-400 placeholder:font-normal
                  transition-colors
                "
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                required
                autoComplete="username"
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Mot de passe"
                className="
                  w-full px-4 py-4 pr-24 rounded-2xl border-2 border-gray-300
                  focus:border-blue-500 focus:outline-none
                  bg-gray-700 text-white font-semibold text-base
                  placeholder:text-gray-400 placeholder:font-normal
                  transition-colors
                "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-500" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                <button
                  type="button"
                  className="text-xs font-bold text-blue-500 hover:text-blue-600 uppercase tracking-wide px-2"
                >
                  Oublié ?
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm text-center">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="
                w-full py-4 rounded-2xl font-bold text-white text-lg
                bg-blue-500 hover:bg-blue-600
                transition-colors
                disabled:opacity-50 disabled:cursor-not-allowed
                shadow-md
              "
            >
              {isLoading ? 'Connexion...' : 'SE CONNECTER'}
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 font-medium">OU</span>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="space-y-3">
              {/* Google Button */}
              <button
                type="button"
                className="
                  w-full py-4 rounded-2xl font-bold text-gray-700
                  bg-white border-2 border-gray-300
                  hover:bg-gray-50
                  transition-colors
                  flex items-center justify-center gap-3
                "
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span>GOOGLE</span>
              </button>

              {/* Facebook Button */}
              <button
                type="button"
                className="
                  w-full py-4 rounded-2xl font-bold text-gray-700
                  bg-white border-2 border-gray-300
                  hover:bg-gray-50
                  transition-colors
                  flex items-center justify-center gap-3
                "
              >
                <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span>FACEBOOK</span>
              </button>
            </div>
          </form>

          {/* Legal Text */}
          <p className="text-xs text-gray-500 text-center mt-6 leading-relaxed">
            En te connectant à Podium NIRD, tu acceptes nos{' '}
            <a href="#" className="text-blue-500 hover:underline">
              Conditions d'utilisation
            </a>{' '}
            et notre{' '}
            <a href="#" className="text-blue-500 hover:underline">
              Politique de confidentialité
            </a>
            .
          </p>

          {/* Test Accounts */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 mb-3 text-center font-semibold">
              Comptes de test :
            </p>
            <div className="space-y-2 text-xs text-center">
              <p className="text-gray-600">
                <span className="font-mono bg-gray-100 px-2 py-1 rounded">alice</span>
                {' / '}
                <span className="font-mono bg-gray-100 px-2 py-1 rounded">password123</span>
              </p>
              <p className="text-gray-600">
                <span className="font-mono bg-gray-100 px-2 py-1 rounded">bob</span>
                {' / '}
                <span className="font-mono bg-gray-100 px-2 py-1 rounded">password123</span>
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Background Overlay */}
      <div className="fixed inset-0 bg-black/10 -z-10" />
    </div>
  );
}
