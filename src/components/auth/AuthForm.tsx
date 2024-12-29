import React, { useState, useCallback } from 'react';
import { Mail, Lock, Loader } from 'lucide-react';
import { signUpWithEmail, signInWithEmail, signInWithGoogle } from '../../lib/supabase';
import { AuthFormInput } from './AuthFormInput';
import { AuthFormButton } from './AuthFormButton';
import { AuthFormError } from './AuthFormError';
import { logger } from '../../services/logger';

interface AuthFormProps {
  onDebugLog?: (type: 'info' | 'error' | 'warn', message: string, data?: any) => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({ onDebugLog }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleAuthError = useCallback((error: any) => {
    const message = error.message || 'An error occurred during authentication';
    setError(message);
    logger.error('Auth', message, { error });
    onDebugLog?.('error', 'Authentication error', { error });
  }, [onDebugLog]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      onDebugLog?.('info', 'Attempting authentication', { mode, email });

      if (mode === 'signup') {
        const { error: signUpError } = await signUpWithEmail(email, password);
        if (signUpError) throw signUpError;
        setSuccessMessage('Please check your email for the confirmation link.');
      } else {
        const { error: signInError } = await signInWithEmail(email, password);
        if (signInError) throw signInError;
      }
    } catch (err: any) {
      handleAuthError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    if (loading) return;

    try {
      setLoading(true);
      setError(null);
      const { error } = await signInWithGoogle();
      if (error) throw error;
    } catch (err: any) {
      handleAuthError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto p-6 bg-[#1a1a1a] rounded-lg shadow-xl border border-[#272727]">
      <h2 className="text-2xl font-bold text-white mb-6">
        {mode === 'signin' ? 'Sign In' : 'Create Account'}
      </h2>

      {error && <AuthFormError message={error} />}
      {successMessage && (
        <div className="mb-4 p-4 bg-green-500/10 border border-green-500/20 rounded-md">
          <p className="text-green-500 text-sm">{successMessage}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <AuthFormInput
          id="email"
          type="email"
          label="Email address"
          value={email}
          onChange={setEmail}
          icon={<Mail size={16} />}
          placeholder="you@example.com"
          required
          disabled={loading}
        />

        <AuthFormInput
          id="password"
          type="password"
          label="Password"
          value={password}
          onChange={setPassword}
          icon={<Lock size={16} />}
          placeholder="••••••••"
          required
          disabled={loading}
          minLength={6}
        />

        <AuthFormButton
          type="submit"
          loading={loading}
          disabled={loading}
          className="w-full"
        >
          {loading ? (
            <Loader className="animate-spin" size={20} />
          ) : mode === 'signin' ? (
            'Sign In'
          ) : (
            'Create Account'
          )}
        </AuthFormButton>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#323232]"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-[#1a1a1a] text-gray-400">Or continue with</span>
          </div>
        </div>

        <AuthFormButton
          type="button"
          variant="google"
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Continue with Google
        </AuthFormButton>
      </form>

      <div className="mt-4 text-center">
        <button
          onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
          className="text-sm text-gray-400 hover:text-white transition-colors"
          disabled={loading}
        >
          {mode === 'signin'
            ? "Don't have an account? Sign up"
            : 'Already have an account? Sign in'}
        </button>
      </div>
    </div>
  );
};