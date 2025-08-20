import React, { useState, useCallback, useEffect } from 'react';
import type { FilterOptions } from '../types/cosmic';
import RefreshButton from './RefreshButton';

interface SearchFilterProps {
  onFilterChange: (filters: FilterOptions) => void;
  onRefresh: () => void;
  initialFilters?: FilterOptions;
  categories?: string[];
  disabled?: boolean;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ 
  onFilterChange,
  onRefresh,
  initialFilters = {},
  categories = [],
  disabled = false
}) => {
  const [searchTerm, setSearchTerm] = useState(initialFilters.searchTerm || '');
  const [category, setCategory] = useState(initialFilters.category || '');

  // Apply filters when search term or category changes
  useEffect(() => {
    // Clear timeout if it exists
    const timeoutId = setTimeout(() => {
      const filters: FilterOptions = {
        ...initialFilters,
        searchTerm: searchTerm || undefined,
        category: category || undefined
      };
      onFilterChange(filters);
    }, 300);

    // Cleanup function to clear timeout
    return () => clearTimeout(timeoutId);
  }, [searchTerm, category]); // Only depend on searchTerm and category

  const handleReset = useCallback(() => {
    setSearchTerm('');
    setCategory('');
  }, []);

  const hasActiveFilters = 
    searchTerm !== '' || 
    category !== '';

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
        {/* Search Input */}
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Search Cosmic Objects
          </label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Name, category, or description..."
            disabled={disabled}
            className="w-full px-3 py-2 bg-gray-900/50 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
          />
        </div>

        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            disabled={disabled}
            className="w-full px-3 py-2 bg-gray-900/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Empty space for alignment */}
        <div></div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-between mt-4 gap-2">
        <div className="flex items-center space-x-2">
          <RefreshButton 
            onRefresh={onRefresh} 
            disabled={disabled}
            variant="minimal"
          />
          {hasActiveFilters && (
            <button
              onClick={handleReset}
              disabled={disabled}
              className="text-sm text-gray-400 hover:text-white transition-colors disabled:opacity-50"
            >
              Clear Filters
            </button>
          )}
        </div>
        
        <div className="text-sm text-gray-400">
          {hasActiveFilters ? 'Filters applied' : 'Showing all cosmic objects'}
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
