import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
  variant?: 'default' | 'cosmic' | 'minimal';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md',
  message,
  variant = 'default'
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const spinnerContent = (
    <div className="relative">
      {variant === 'cosmic' ? (
        // Cosmic-themed spinner with multiple orbiting elements
        <div className={`${sizeClasses[size]} relative`}>
          <div className="absolute inset-0 rounded-full border-2 border-blue-500/30"></div>
          <div className={`absolute inset-0 rounded-full border-2 border-transparent border-t-blue-400 animate-spin`}></div>
          <div className={`absolute inset-2 rounded-full border-2 border-transparent border-t-green-400 animate-spin`}></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-1 h-1 bg-white rounded-full"></div>
          </div>
        </div>
      ) : variant === 'minimal' ? (
        // Simple minimal spinner
        <div className={`${sizeClasses[size]} border-2 border-gray-600 border-t-transparent rounded-full animate-spin`}></div>
      ) : (
        // Default spinner with gradient
        <div className={`${sizeClasses[size]} border-4 border-gray-700 border-t-blue-400 rounded-full animate-spin`}></div>
      )}
    </div>
  );

  if (!message) {
    return spinnerContent;
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {spinnerContent}
      <p className="text-gray-400 text-sm">{message}</p>
    </div>
  );
};

export default LoadingSpinner;
