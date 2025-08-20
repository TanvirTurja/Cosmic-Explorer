import type { CosmicObject, ActivityData } from '../types/cosmic';

// NASA Images API base URL (no API key required)
const NASA_IMAGES_BASE_URL = 'https://images-api.nasa.gov';

// Fixed category search mappings - DON'T pre-encode, let encodeURIComponent handle it
const CATEGORY_QUERIES: Record<string, string> = {
  'Black Holes': 'black hole',
  'Galaxies': 'galaxy',
  'Nebulae': 'nebula',
  'Exoplanets': 'exoplanet',
  'The Sun': 'sun',
  'Earth Views': 'earth',
  'Hubble': 'hubble',
  'JWST': 'JWST',
  'Chandra': 'chandra',
  'Artemis': 'artemis',
  'Mars Rover': 'mars rover' // Fixed: removed manual encoding
};

// Alternative queries if primary ones don't work
const ALTERNATIVE_QUERIES: Record<string, string[]> = {
  'Black Holes': ['supermassive', 'sagittarius a', 'event horizon'],
  'Mars Rover': ['mars surface', 'curiosity', 'perseverance', 'mars exploration']
};

// Simulate API delay for better UX
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to get the best available image URL
const getBestImageUrl = (item: any): string => {
  // Try to get the highest quality image available
  if (item.links && item.links.length > 0) {
    // Look for medium or large images first
    for (const link of item.links) {
      if (link.href && (link.href.includes('~medium.jpg') || link.href.includes('~orig.jpg') || link.href.includes('~large.jpg'))) {
        return link.href;
      }
    }
    // Fallback to the first available image
    return item.links[0].href;
  }
  return '';
};

// Improved category detection function
const getCategoryFromTitle = (title: string): string => {
  const titleLower = title.toLowerCase();
  
  // More comprehensive black hole detection
  if (titleLower.includes('black hole') || 
      (titleLower.includes('black') && titleLower.includes('hole')) ||
      titleLower.includes('supermassive') ||
      titleLower.includes('sagittarius a') ||
      titleLower.includes('event horizon')) return 'Black Holes';
      
  if (titleLower.includes('galaxy') || titleLower.includes('galaxies')) return 'Galaxies';
  if (titleLower.includes('nebula') || titleLower.includes('nebulae')) return 'Nebulae';
  if (titleLower.includes('exoplanet') || titleLower.includes('exoplanets')) return 'Exoplanets';
  if (titleLower.includes('sun') || titleLower.includes('solar')) return 'The Sun';
  if (titleLower.includes('earth') || titleLower.includes('planet')) return 'Earth Views';
  if (titleLower.includes('hubble')) return 'Hubble';
  if (titleLower.includes('jwst') || titleLower.includes('webb')) return 'JWST';
  if (titleLower.includes('chandra')) return 'Chandra';
  if (titleLower.includes('artemis')) return 'Artemis';
  
  // More comprehensive Mars rover detection
  if (titleLower.includes('mars') || 
      titleLower.includes('curiosity') || 
      titleLower.includes('rover') ||
      titleLower.includes('perseverance') ||
      titleLower.includes('opportunity') ||
      titleLower.includes('spirit')) return 'Mars Rover';
  
  return 'Space';
};

// Fixed fetchCosmicData function with better filtering logic
export const fetchCosmicData = async (searchTerm: string = '', category: string = ''): Promise<CosmicObject[]> => {
  try {
    // Build the query based on search term or category
    let query = 'space'; // Default query
    
    if (searchTerm) {
      query = searchTerm;
    } else if (category && CATEGORY_QUERIES[category]) {
      query = CATEGORY_QUERIES[category];
    } else if (category) {
      query = category.toLowerCase().replace(/\s+/g, ' '); // Fixed: don't manually encode spaces
    }
    
 
    
    // Fetch data from NASA Images API
    const response = await fetch(`${NASA_IMAGES_BASE_URL}/search?q=${encodeURIComponent(query)}&media_type=image&page=1&page_size=50`);
    
    if (!response.ok) {
      throw new Error(`NASA Images API error: ${response.status} ${response.statusText}`);
    }
    
    const imageData = await response.json();
   
    
    if (!imageData?.collection?.items) {
      
      throw new Error('Invalid response from NASA Images API');
    }
    
    
    
    // Transform NASA Images API data into our CosmicObject format
    let cosmicObjects: CosmicObject[] = imageData.collection.items
      .map((item: any, index: number) => {
        const title = item.data?.[0]?.title || `Cosmic Object ${index + 1}`;
        const dateCreated = item.data?.[0]?.date_created ? new Date(item.data[0].date_created) : new Date();
        const imageUrl = getBestImageUrl(item);
        const nasaId = item.data?.[0]?.nasa_id || `co-${index}`;
        const description = item.data?.[0]?.description || 'No description available';
        
        // Skip items without images
        if (!imageUrl) return null;
        
        // Determine category from title
        const determinedCategory = getCategoryFromTitle(title);
        
        return {
          id: nasaId,
          name: title,
          category: determinedCategory,
          description: description,
          dateCreated: dateCreated,
          nasaImageUrl: imageUrl,
          metadata: item.data?.[0] || {}
        };
      })
      .filter((obj: CosmicObject | null): obj is CosmicObject => obj !== null);
    

    
    // FIXED: Better category filtering logic
    if (category) {
      if (CATEGORY_QUERIES[category]) {
        // We searched specifically for this category, so assign it to generic "Space" items
        cosmicObjects = cosmicObjects.map(obj => {
          if (obj.category === 'Space') {
            return { ...obj, category: category };
          }
          return obj;
        });
        
        // Then filter to only show items in the requested category
        cosmicObjects = cosmicObjects.filter(obj => obj.category === category);
      } else {
        // Generic category filter (not using predefined queries)
        cosmicObjects = cosmicObjects.filter(obj => obj.category === category);
      }
    }
    
    // Limit to 100 items for performance
    cosmicObjects = cosmicObjects.slice(0, 100);
    
  
    
    return cosmicObjects;
  } catch (error) {
    console.error('Error fetching cosmic data from NASA Images API:', error);
    
    // Enhanced fallback data with more variety
    await delay(800);
    
    const mockCosmicObjects: CosmicObject[] = [
      {
        id: 'black-hole-1',
        name: 'Sagittarius A*',
        category: 'Black Holes',
        description: 'Supermassive black hole at the center of the Milky Way galaxy',
        dateCreated: new Date(),
        nasaImageUrl: 'https://images-assets.nasa.gov/image/PIA23370/PIA23370~medium.jpg',
        metadata: {}
      },
      {
        id: 'black-hole-2',
        name: 'M87 Black Hole',
        category: 'Black Holes',
        description: 'First black hole ever photographed by Event Horizon Telescope',
        dateCreated: new Date(),
        nasaImageUrl: 'https://images-assets.nasa.gov/image/PIA23371/PIA23371~medium.jpg',
        metadata: {}
      },
      {
        id: 'mars-rover-1',
        name: 'Curiosity Rover Self Portrait',
        category: 'Mars Rover',
        description: 'Curiosity rover on the surface of Mars',
        dateCreated: new Date(),
        nasaImageUrl: 'https://images-assets.nasa.gov/image/PIA23372/PIA23372~medium.jpg',
        metadata: {}
      },
      {
        id: 'mars-rover-2',
        name: 'Perseverance Landing',
        category: 'Mars Rover',
        description: 'Perseverance rover landing sequence on Mars',
        dateCreated: new Date(),
        nasaImageUrl: 'https://images-assets.nasa.gov/image/PIA23373/PIA23373~medium.jpg',
        metadata: {}
      },
      {
        id: 'galaxy-1',
        name: 'Andromeda Galaxy',
        category: 'Galaxies',
        description: 'The nearest major galaxy to the Milky Way',
        dateCreated: new Date(),
        nasaImageUrl: 'https://images-assets.nasa.gov/image/PIA23374/PIA23374~medium.jpg',
        metadata: {}
      },
      {
        id: 'nebula-1',
        name: 'Orion Nebula',
        category: 'Nebulae',
        description: 'Diffuse nebula and stellar nursery located in the constellation Orion',
        dateCreated: new Date(),
        nasaImageUrl: 'https://images-assets.nasa.gov/image/PIA23375/PIA23375~medium.jpg',
        metadata: {}
      }
    ];
    
    // Filter mock data by category if requested
    let filteredMockObjects = mockCosmicObjects;
    if (category) {
      filteredMockObjects = mockCosmicObjects.filter(obj => obj.category === category);
    }
    
    return filteredMockObjects;
  }
};

export const getActivityStatus = async (objectId: string): Promise<ActivityData | null> => {
  try {
    await delay(300); // Simulate network delay
    
    // Mock activity data that would come from NASA's real-time monitoring
    const mockActivityData: ActivityData[] = [
      {
        objectId: 'black-hole-1',
        timestamp: new Date(),
        intensity: 8.7,
        source: 'Chandra X-ray Observatory',
        confidence: 0.95
      },
      {
        objectId: 'galaxy-1',
        timestamp: new Date(),
        intensity: 7.2,
        source: 'Hubble Space Telescope',
        confidence: 0.88
      },
      {
        objectId: 'mars-rover-1',
        timestamp: new Date(),
        intensity: 6.1,
        source: 'Mars Reconnaissance Orbiter',
        confidence: 0.92
      }
    ];
    
    return mockActivityData.find(data => data.objectId === objectId) || null;
  } catch (error) {
    console.error('Error fetching activity status from NASA API:', error);
    return null;
  }
};

export const loadNASAImagery = async (imageUrl: string): Promise<string> => {
  try {
    await delay(500); // Simulate image loading delay
    // In a real implementation, this would fetch and process the image from NASA
    return imageUrl;
  } catch (error) {
    console.error('Error loading NASA imagery:', error);
    throw new Error('Failed to load NASA imagery');
  }
};

export const updateActivityFeed = async (searchTerm: string = '', category: string = ''): Promise<CosmicObject[]> => {
  try {
    await delay(1000); // Simulate network delay
    // This would make real API calls to NASA's monitoring systems
    const cosmicObjects = await fetchCosmicData(searchTerm, category);
    return cosmicObjects;
  } catch (error) {
    console.error('Error updating activity feed from NASA API:', error);
    throw new Error('Failed to update activity feed');
  }
};

export const getFilteredCosmicObjects = async (filters: NASAFilterOptions): Promise<CosmicObject[]> => {
  try {
    await delay(200); // Simulate network delay
    
    // Use the filters to make a targeted API call instead of filtering client-side
    const searchTerm = filters.searchTerm || '';
    const category = filters.category || '';
    
    const cosmicObjects = await fetchCosmicData(searchTerm, category);
    
    // Apply date filters if provided (client-side filtering for date range)
    let filteredObjects = cosmicObjects;
    
    if (filters.dateFrom) {
      filteredObjects = filteredObjects.filter(obj => 
        obj.dateCreated >= filters.dateFrom!
      );
    }
    
    if (filters.dateTo) {
      filteredObjects = filteredObjects.filter(obj => 
        obj.dateCreated <= filters.dateTo!
      );
    }
    
    return filteredObjects;
  } catch (error) {
    console.error('Error filtering cosmic objects from NASA API:', error);
    throw new Error('Failed to apply filters');
  }
};

// Update the filter options type
export interface NASAFilterOptions {
  searchTerm?: string;
  category?: string;
  dateFrom?: Date;
  dateTo?: Date;
}

// Function to make direct NASA Images API calls (no API key required)
export const makeNASAAPICall = async (endpoint: string, params: Record<string, any> = {}) => {
  try {
    const url = new URL(`${NASA_IMAGES_BASE_URL}${endpoint}`);
    
    // Add any additional parameters
    Object.keys(params).forEach(key => {
      url.searchParams.append(key, params[key].toString());
    });
    
    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`NASA Images API error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('NASA Images API call failed:', error);
    throw error;
  }
};

// DEBUG FUNCTION - Add this temporarily to test your API calls
export const debugCategoryFilter = async (category: string) => {

  
  try {
    const results = await fetchCosmicData('', category);

    return results;
  } catch (error) {
    console.error(`❌ Error testing category "${category}":`, error);
    return [];
  }
};

// Test all problematic categories
export const testAllCategories = async () => {
  const problematicCategories = ['Black Holes', 'Mars Rover', 'Galaxies'];
  
  for (const category of problematicCategories) {
    await debugCategoryFilter(category);
    await delay(1000); // Don't overwhelm the API
  }
};