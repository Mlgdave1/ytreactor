import React from 'react';
import { cn } from '../../utils/cn';

interface AuthFormButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'google';
  loading?: boolean;
}

export const AuthFormButton: React.FC<AuthFormButtonProps> = ({
  children,
  variant = 'primary',
  className,
  disabled,
  loading,
  ...props
}) => (
  <button
    className={cn(
      'px-4 py-2 rounded-md transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed',
      variant === 'primary' && 'bg-red-500 text-white hover:bg-red-600',
      variant === 'google' && 'bg-white text-gray-900 hover:bg-gray-100',
      className
    )}
    disabled={disabled || loading}
    {...props}
  >
    {children}
  </button>
);