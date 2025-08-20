import React, { useState, useEffect } from 'react';
import type { CosmicObject } from '../types/cosmic';
import LoadingSpinner from './LoadingSpinner';

interface ImageGalleryProps {
  cosmicObject: CosmicObject;
  onLoadImage?: (imageUrl: string) => void;
  onError?: (error: string) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ 
  cosmicObject, 
  onLoadImage,
  onError 
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState<string | null>(null);
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  // Use the actual NASA image URL
  const imageUrls = cosmicObject.nasaImageUrl ? [cosmicObject.nasaImageUrl] : [];

  const currentImageUrl = imageUrls[currentImageIndex];

  // Handle image loading
  useEffect(() => {
    if (currentImageUrl && !loadedImages[currentImageUrl]) {
      setIsLoading(true);
      setImageError(null);
      
      // Create a new image element to handle loading
      const img = new Image();
      
      img.onload = () => {
        setIsLoading(false);
        setLoadedImages(prev => ({ ...prev, [currentImageUrl]: true }));
        onLoadImage?.(currentImageUrl);
      };
      
      img.onerror = () => {
        setIsLoading(false);
        setImageError('Failed to load NASA imagery');
        onError?.('Failed to load NASA imagery');
      };
      
      img.src = currentImageUrl;
    } else if (currentImageUrl && loadedImages[currentImageUrl]) {
      setIsLoading(false);
    }
  }, [currentImageUrl, loadedImages, onLoadImage, onError]);

  const handleNext = () => {
    if (imageUrls.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % imageUrls.length);
    }
  };

  const handlePrevious = () => {
    if (imageUrls.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + imageUrls.length) % imageUrls.length);
    }
  };

  if (imageUrls.length === 0) {
    return (
      <div className="bg-gray-900/50 rounded-lg p-8 text-center">
        <div className="text-gray-500 mb-2">
          <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <p className="text-gray-400">No NASA imagery available for this cosmic object</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900/50 rounded-lg overflow-hidden">
      {/* Image Display */}
      <div className="relative aspect-video bg-black flex items-center justify-center">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <LoadingSpinner size="md" message="Loading NASA imagery..." variant="cosmic" />
          </div>
        )}
        
        {imageError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-red-400 mb-2">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <p className="text-red-400">{imageError}</p>
            </div>
          </div>
        )}
        
        {currentImageUrl && !isLoading && !imageError && (
          <img
            src={currentImageUrl}
            alt={`${cosmicObject.name} NASA imagery`}
            className="w-full h-full object-cover"
            onError={() => {
              setIsLoading(false);
              setImageError('Failed to load NASA imagery');
              onError?.('Failed to load NASA imagery');
            }}
          />
        )}
      </div>

      {/* Image Controls */}
      {imageUrls.length > 1 && (
        <div className="flex items-center justify-between p-4 bg-gray-800/50">
          <button
            onClick={handlePrevious}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Previous image"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="flex space-x-2">
            {imageUrls.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentImageIndex ? 'bg-blue-400' : 'bg-gray-600'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Next image"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}

      {/* Image Info */}
      <div className="p-4 border-t border-gray-700/50">
        <div className="text-sm text-gray-400 mb-1">
          Image {currentImageIndex + 1} of {imageUrls.length}
        </div>
        <div className="text-xs text-gray-500">
          Source: NASA Space Telescope Imaging
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
