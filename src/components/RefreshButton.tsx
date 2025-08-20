import React, { useState } from 'react';

interface RefreshButtonProps {
  onRefresh: () => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'minimal' | 'icon-only';
}

const RefreshButton: React.FC<RefreshButtonProps> = ({ 
  onRefresh,
  disabled = false,
  size = 'md',
  variant = 'default'
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const sizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  const handleRefresh = async () => {
    if (disabled || isRefreshing) return;
    
    setIsRefreshing(true);
    try {
      await onRefresh();
    } finally {
      setIsRefreshing(false);
    }
  };

  const iconSize = size === 'sm' ? 'w-4 h-4 text-white' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5';

  const refreshIcon = (
    <svg 
      className={`${iconSize} ${isRefreshing ? 'animate-spin' : ''}`} 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
      />
    </svg>
  );

  if (variant === 'icon-only') {
    return (
      <button
        onClick={handleRefresh}
        disabled={disabled || isRefreshing}
        className={`p-2 rounded-full hover:bg-white/10 transition-colors ${
          disabled || isRefreshing ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/20'
        }`}
        title="Refresh data"
      >
        {refreshIcon}
      </button>
    );
  }

  if (variant === 'minimal') {
    return (
      <button
        onClick={handleRefresh}
        disabled={disabled || isRefreshing}
        className={`inline-flex items-center space-x-1 ${sizeClasses[size]} font-medium text-blue-400 hover:text-blue-300 transition-colors ${
          disabled || isRefreshing ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {refreshIcon}
        <span>Refresh</span>
      </button>
    );
  }

  // Default variant
  return (
    <button
      onClick={handleRefresh}
      disabled={disabled || isRefreshing}
      className={`inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all ${
        sizeClasses[size]
      } ${disabled || isRefreshing ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {refreshIcon}
    </button>
  );
};

export default RefreshButton;
