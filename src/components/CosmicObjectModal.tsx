import React, { useState, useEffect } from 'react';
import type { CosmicObject, ActivityData } from '../types/cosmic';
import RefreshButton from './RefreshButton';

interface CosmicObjectModalProps {
  cosmicObject: CosmicObject;
  isOpen: boolean;
  onClose: () => void;
  onRefresh: () => void;
  getActivityData: (id: string) => Promise<ActivityData | null>;
}

const CosmicObjectModal: React.FC<CosmicObjectModalProps> = ({ 
  cosmicObject, 
  isOpen, 
  onClose,
  onRefresh,
  getActivityData
}) => {
  const [activityData, setActivityData] = useState<ActivityData | null>(null);
  const [loadingActivity, setLoadingActivity] = useState(false);

  useEffect(() => {
    if (isOpen && cosmicObject) {
      const fetchActivityData = async () => {
        setLoadingActivity(true);
        try {
          const data = await getActivityData(cosmicObject.id);
          setActivityData(data);
        } catch (error) {
          console.error('Error fetching activity data:', error);
        } finally {
          setLoadingActivity(false);
        }
      };
      
      fetchActivityData();
    }
  }, [isOpen, cosmicObject, getActivityData]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div 
            className="absolute inset-0 bg-gray-900/90 backdrop-blur-sm"
            onClick={onClose}
          ></div>
        </div>

        {/* Modal container */}
        <div className="inline-block align-bottom bg-gray-900/90 backdrop-blur-lg rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full border border-gray-700/50">
          <div className="absolute top-4 right-4">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-700/50"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="px-6 py-8 sm:px-8 sm:py-10">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Left column - Image */}
              <div className="md:w-1/2">
                <div className="bg-gray-800/50 rounded-xl overflow-hidden aspect-square flex items-center justify-center">
                  {cosmicObject.nasaImageUrl ? (
                    <img 
                      src={cosmicObject.nasaImageUrl} 
                      alt={cosmicObject.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjMzMzIi8+CjxwYXRoIGQ9Ik0yNSAyNUg1VjM5SDI1VjI1WiIgZmlsbD0iIzY2NiIvPgo8cGF0aCBkPSJNMzkgMjVIMjVWMzVIMzlWMjVaIiBmaWxsPSIjNjY2Ii8+CjxwYXRoIGQ9Ik01NSAyNUgzOVYzNUg1NVYyNVoiIGZpbGw9IiM2NjYiLz4KPHBhdGggZD0iTTI1IDM5SDVWNTEySDI1VjM5WiIgZmlsbD0iIzY2NiIvPgo8cGF0aCBkPSJNMzkgMzlIMjVWNTEySDM5VjM5WiIgZmlsbD0iIzY2NiIvPgo8cGF0aCBkPSJNNTUgMzlIMzlWNTEySDU1VjM5WiIgZmlsbD0iIzY2NiIvPgo8L3N2Zz4K';
                      }}
                    />
                  ) : (
                    <div className="text-gray-500">
                      <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="mt-2 text-sm">No image available</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Right column - Details */}
              <div className="md:w-1/2">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold font-mono text-white mb-2">
                      {cosmicObject.name}
                    </h2>
                    <div className="inline-block px-3 py-1 bg-blue-900/30 text-blue-400 rounded-full text-sm font-medium">
                      {cosmicObject.category}
                    </div>
                  </div>
                  <RefreshButton onRefresh={onRefresh} size="sm" />
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Description</h3>
                    <p className="text-gray-300">
                      {cosmicObject.description || 'No description available for this cosmic object.'}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-400">Date Created</div>
                      <div className="font-mono text-white">
                        {cosmicObject.dateCreated.toLocaleDateString()}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Object ID</div>
                      <div className="font-mono text-white text-sm">
                        {cosmicObject.id}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">NASA Metadata</h3>
                    <div className="bg-gray-800/30 rounded-lg p-4 max-h-40 overflow-y-auto">
                      {Object.keys(cosmicObject.metadata).length > 0 ? (
                        <div className="grid grid-cols-1 gap-2 text-sm">
                          {Object.entries(cosmicObject.metadata).map(([key, value]) => (
                            <div key={key} className="flex">
                              <span className="text-gray-400 w-1/3">{key}:</span>
                              <span className="text-gray-300 w-2/3 break-words">
                                {typeof value === 'string' ? value : JSON.stringify(value)}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 text-sm">No additional metadata available</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CosmicObjectModal;