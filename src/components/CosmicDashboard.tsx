import React, { useState, useEffect, useCallback } from 'react';
import { useDashboard } from '../context/DashboardContext';
import { fetchCosmicData, getFilteredCosmicObjects, updateActivityFeed } from '../services/nasaApi';
import CosmicObjectCard from './CosmicObjectCard';
import SearchFilter from './SearchFilter';
import LoadingSpinner from './LoadingSpinner';
import CosmicObjectModal from './CosmicObjectModal';
import RefreshButton from './RefreshButton';
import type { CosmicObject } from '../types/cosmic';

const CosmicDashboard: React.FC = () => {
  const { 
    cosmicObjects, 
    loading, 
    error, 
    filters, 
    categories,
    dispatch,
    updateFilters,
    selectObject
  } = useDashboard();
  
  const [selectedObject, setSelectedObject] = useState<CosmicObject | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        const data = await fetchCosmicData();
        dispatch({ type: 'SET_COSMIC_OBJECTS', payload: data });
        dispatch({ type: 'SET_LOADING', payload: false });
      } catch (err) {
        console.error('Error loading initial data:', err);
        dispatch({ type: 'SET_ERROR', payload: 'Failed to load cosmic data' });
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };
    
    loadInitialData();
  }, [dispatch]);

  const handleFilterChange = useCallback((newFilters: any) => {
    updateFilters(newFilters);
    
    // Apply filters by making a new API call with the search parameters
    const applyFilters = async () => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        const filteredData = await getFilteredCosmicObjects(newFilters);
        dispatch({ type: 'SET_COSMIC_OBJECTS', payload: filteredData });
        dispatch({ type: 'SET_LOADING', payload: false });
      } catch (err) {
        console.error('Error applying filters:', err);
        dispatch({ type: 'SET_ERROR', payload: 'Failed to apply filters' });
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    applyFilters();
  }, [dispatch, updateFilters]);

  const handleRefresh = useCallback(async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Use the updateActivityFeed function which now supports search parameters
      const searchTerm = filters.searchTerm || '';
      const category = filters.category || '';
      const data = await updateActivityFeed(searchTerm, category);
      
      dispatch({ type: 'SET_COSMIC_OBJECTS', payload: data });
      dispatch({ type: 'SET_LOADING', payload: false });
    } catch (err) {
      console.error('Error refreshing data:', err);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to refresh cosmic data' });
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [dispatch, filters]);

  const handleCardClick = useCallback((cosmicObject: CosmicObject) => {
    setSelectedObject(cosmicObject);
    setIsModalOpen(true);
    selectObject(cosmicObject);
  }, [selectObject]);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedObject(null);
    selectObject(null);
  }, [selectObject]);

  const handleModalRefresh = useCallback(async () => {
    if (selectedObject) {
      await handleRefresh();
    }
  }, [selectedObject, handleRefresh]);

  if (loading && cosmicObjects.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <LoadingSpinner size="lg" message="Loading cosmic data..." variant="cosmic" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-900/20 border border-red-800/30 rounded-xl p-8 text-center">
            <div className="text-red-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Error Loading Data</h2>
            <p className="text-red-400 mb-6">{error}</p>
            <button
              onClick={handleRefresh}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black">
      {/* Header */}
      <div className="border-b border-gray-700/50 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Cosmic Phenomena Explorer</h1>
              <p className="text-gray-400 mt-1">Explore the wonders of our universe through NASA's archives</p>
            </div>
            <div className="flex items-center space-x-4">
              <RefreshButton onRefresh={handleRefresh} />
              <div className="text-sm text-gray-400">
                {cosmicObjects.length} cosmic objects discovered
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <SearchFilter 
          onFilterChange={handleFilterChange}
          onRefresh={handleRefresh}
          initialFilters={filters}
          categories={categories}
        />

        {/* Cosmic Objects Grid */}
        {cosmicObjects.length === 0 ? (
          <div className="bg-gray-900/50 rounded-xl p-12 text-center border border-gray-700/30">
            <div className="text-gray-500 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.467-.881-6.08-2.33" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No Cosmic Objects Found</h3>
            <p className="text-gray-400 mb-6">Try adjusting your search filters or check back later</p>
            <button
              onClick={() => updateFilters({})}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cosmicObjects.map((cosmicObject) => (
              <CosmicObjectCard
                key={cosmicObject.id}
                cosmicObject={cosmicObject}
                onClick={() => handleCardClick(cosmicObject)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Cosmic Object Modal */}
      {selectedObject && (
        <CosmicObjectModal
          cosmicObject={selectedObject}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onRefresh={handleModalRefresh}
          getActivityData={async (id: string) => {
            // Mock implementation for now
            return null;
          }}
        />
      )}
    </div>
  );
};

export default CosmicDashboard;