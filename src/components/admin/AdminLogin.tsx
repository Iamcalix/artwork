import React, { useState } from 'react';
import { EyeIcon, CloseIcon } from '../icons/Icons';
import { supabase } from '@/lib/supabase';

type AuthMode = 'login' | 'register' | 'forgotPassword' | 'resetPassword';

interface AdminLoginProps {
  onLogin: (user: any, sessionToken: string) => void;
  onClose: () => void;
  error?: string;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin, onClose, error: externalError }) => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(externalError || '');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (mode === 'login') {
        // DEMO LOGIN BYPASS
        if (email === 'admin@demo.com' && password === 'demo123') {
          // Simulate delay
          await new Promise(resolve => setTimeout(resolve, 800));

          const demoUser = {
            id: 'demo-admin-id',
            email: 'admin@demo.com',
            name: 'Demo Admin',
            user_metadata: { name: 'Demo Admin' }
          };

          onLogin(demoUser, 'demo-token');
          return;
        }

        const { data, error } = await supabase.functions.invoke('admin-auth', {
          body: { action: 'login', email, password },
        });

        if (error || data?.error) {
          setError(data?.error || 'Login failed. Please try again.');
          return;
        }

        onLogin(data.user, data.sessionToken);
      } else if (mode === 'register') {
        if (password !== confirmPassword) {
          setError('Passwords do not match');
          return;
        }

        if (password.length < 8) {
          setError('Password must be at least 8 characters');
          return;
        }

        const { data, error } = await supabase.functions.invoke('admin-auth', {
          body: { action: 'register', email, password, name },
        });

        if (error || data?.error) {
          setError(data?.error || 'Registration failed. Please try again.');
          return;
        }

        onLogin(data.user, data.sessionToken);
      } else if (mode === 'forgotPassword') {
        const { data, error } = await supabase.functions.invoke('admin-auth', {
          body: { action: 'requestReset', email },
        });

        if (error || data?.error) {
          setError(data?.error || 'Failed to send reset email.');
          return;
        }

        setSuccess('If an account exists with this email, a reset link has been sent.');
        // For development, show the token
        if (data.resetToken) {
          setResetToken(data.resetToken);
          setMode('resetPassword');
        }
      } else if (mode === 'resetPassword') {
        if (newPassword.length < 8) {
          setError('Password must be at least 8 characters');
          return;
        }

        const { data, error } = await supabase.functions.invoke('admin-auth', {
          body: { action: 'resetPassword', token: resetToken, newPassword },
        });

        if (error || data?.error) {
          setError(data?.error || 'Failed to reset password.');
          return;
        }

        setSuccess('Password reset successfully! Please login with your new password.');
        setMode('login');
        setPassword('');
        setNewPassword('');
        setResetToken('');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderForm = () => {
    switch (mode) {
      case 'register':
        return (
          <>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                placeholder="Your name"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                placeholder="admin@example.com"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                  placeholder="Minimum 8 characters"
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <EyeIcon size={20} />
                </button>
              </div>
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                placeholder="Confirm your password"
                required
              />
            </div>
          </>
        );

      case 'forgotPassword':
        return (
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
              placeholder="Enter your email"
              required
            />
          </div>
        );

      case 'resetPassword':
        return (
          <>
            <div>
              <label htmlFor="resetToken" className="block text-sm font-medium text-gray-700 mb-2">
                Reset Token
              </label>
              <input
                type="text"
                id="resetToken"
                value={resetToken}
                onChange={(e) => setResetToken(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                placeholder="Enter reset token from email"
                required
              />
            </div>
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                  placeholder="Minimum 8 characters"
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <EyeIcon size={20} />
                </button>
              </div>
            </div>
          </>
        );

      default: // login
        return (
          <>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                placeholder="admin@example.com"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <EyeIcon size={20} />
                </button>
              </div>
            </div>
          </>
        );
    }
  };

  const getTitle = () => {
    switch (mode) {
      case 'register': return 'Create Admin Account';
      case 'forgotPassword': return 'Reset Password';
      case 'resetPassword': return 'Set New Password';
      default: return 'Admin Login';
    }
  };

  const getButtonText = () => {
    if (loading) return 'Please wait...';
    switch (mode) {
      case 'register': return 'Create Account';
      case 'forgotPassword': return 'Send Reset Link';
      case 'resetPassword': return 'Reset Password';
      default: return 'Sign In';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <CloseIcon size={20} className="text-gray-500" />
        </button>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-serif text-2xl font-bold">DP</span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-gray-900">{getTitle()}</h2>
          <p className="text-gray-500 mt-2">
            {mode === 'login' && 'Sign in to manage your artwork'}
            {mode === 'register' && 'Create your admin account'}
            {mode === 'forgotPassword' && 'Enter your email to receive a reset link'}
            {mode === 'resetPassword' && 'Enter your new password'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {renderForm()}

          {error && (
            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 text-green-600 px-4 py-3 rounded-lg text-sm">
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {getButtonText()}
          </button>
        </form>

        <div className="mt-6 text-center space-y-2">
          {mode === 'login' && (
            <>
              <button
                onClick={() => { setMode('forgotPassword'); setError(''); setSuccess(''); }}
                className="text-amber-600 hover:text-amber-700 text-sm"
              >
                Forgot your password?
              </button>
              <div className="text-gray-400 text-sm">
                Don't have an account?{' '}
                <button
                  onClick={() => { setMode('register'); setError(''); setSuccess(''); }}
                  className="text-amber-600 hover:text-amber-700 font-medium"
                >
                  Register
                </button>
              </div>
            </>
          )}
          {(mode === 'register' || mode === 'forgotPassword' || mode === 'resetPassword') && (
            <button
              onClick={() => { setMode('login'); setError(''); setSuccess(''); }}
              className="text-amber-600 hover:text-amber-700 text-sm"
            >
              Back to Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
