import React from 'react';

interface AuthFormInputProps {
  id: string;
  type: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  icon: React.ReactNode;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  minLength?: number;
}

export const AuthFormInput: React.FC<AuthFormInputProps> = ({
  id,
  type,
  label,
  value,
  onChange,
  icon,
  placeholder,
  required,
  disabled,
  minLength
}) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-1">
      {label}
    </label>
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
        {icon}
      </div>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-4 py-2 bg-[#272727] border border-[#323232] rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        minLength={minLength}
      />
    </div>
  </div>
);