import React from 'react';

interface AuthFormErrorProps {
  message: string;
}

export const AuthFormError: React.FC<AuthFormErrorProps> = ({ message }) => (
  <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-md">
    <p className="text-red-500 text-sm">{message}</p>
  </div>
);