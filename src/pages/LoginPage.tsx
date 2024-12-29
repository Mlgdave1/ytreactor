import React from 'react';
import { Navigate } from 'react-router-dom';
import { AuthForm } from '../components/auth/AuthForm';
import { AuthDebugWindow } from '../components/debug/AuthDebugWindow';
import { useAuthDebug } from '../hooks/useAuthDebug';
import { useAuth } from '../context/AuthContext';

export const LoginPage: React.FC = () => {
  const { user } = useAuth();
  const { logs, addLog, clearLogs } = useAuthDebug();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
            <p className="mt-2 text-gray-400">Sign in to your account to continue</p>
          </div>
          <AuthForm onDebugLog={addLog} />
        </div>
      </div>
      <AuthDebugWindow logs={logs} onClear={clearLogs} />
    </div>
  );
};