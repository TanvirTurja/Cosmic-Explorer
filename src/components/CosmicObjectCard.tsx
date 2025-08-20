import React, { useMemo } from 'react';
import type { CosmicObject } from '../types/cosmic';

interface CosmicObjectCardProps {
  cosmicObject: CosmicObject;
  onClick: () => void;
  variant?: 'compact' | 'detailed' | 'grid';
}

const CosmicObjectCard: React.FC<CosmicObjectCardProps> = ({ 
  cosmicObject, 
  onClick,
  variant = 'grid'
}) => {
  const formatDate = (date: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMinutes = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes} min ago`;
    if (diffHours < 24) return `${diffHours} hrs ago`;
    return `${diffDays} days ago`;
  };

  // Memoize the formatted date to prevent continuous updates
  const formattedDate = useMemo(() => {
    return formatDate(cosmicObject.dateCreated);
  }, [cosmicObject.dateCreated]);

  if (variant === 'compact') {
    return (
      <div 
        onClick={onClick}
        className="bg-gray-900/50 p-4 rounded-xl border border-gray-700/30 hover:border-gray-600/50 transition-all cursor-pointer hover:transform hover:scale-105"
      >
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-bold text-sm font-mono truncate">{cosmicObject.name}</h4>
        </div>
        <div className="text-xs text-gray-400">
          {cosmicObject.category} • {formattedDate}
        </div>
      </div>
    );
  }

  if (variant === 'detailed') {
    return (
      <div 
        onClick={onClick}
        className="bg-gray-900/50 p-6 rounded-xl border border-gray-700/30 hover:border-gray-600/50 transition-all cursor-pointer hover:transform hover:scale-105"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-lg font-mono">{cosmicObject.name}</h3>
            <p className="text-sm text-gray-400">{cosmicObject.category}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <div className="text-xs text-gray-400">Date Created</div>
            <div className="font-mono text-sm">{formattedDate}</div>
          </div>
          <div>
            <div className="text-xs text-gray-400">Category</div>
            <div className="font-mono text-sm">{cosmicObject.category}</div>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="text-xs text-gray-400">Description</div>
          <div className="text-sm text-gray-300 line-clamp-2">
            {cosmicObject.description}
          </div>
        </div>
        
        {cosmicObject.nasaImageUrl && (
          <div className="mt-4">
            <div className="text-xs text-gray-400 mb-2">NASA Imagery Available</div>
            <div className="h-20 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-lg flex items-center justify-center">
              <div className="text-xs text-gray-500">Image Preview</div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Default grid variant
  return (
    <div 
      onClick={onClick}
      className="bg-gray-900/50 p-6 rounded-xl border transition-all cursor-pointer hover:transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/10"
    >
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-bold text-lg mb-2 font-mono text-amber-50">{cosmicObject.name}</h4>
        <span className="text-xs text-gray-400">{formattedDate}</span>
      </div>
      
      <p className="text-sm text-gray-300 mb-3 line-clamp-2">{cosmicObject.description}</p>
      
      <div className="flex items-center justify-between text-xs text-gray-400">
        <span>Category: {cosmicObject.category}</span>
      </div>
    </div>
  );
};

export default CosmicObjectCard;