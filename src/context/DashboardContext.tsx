import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { CosmicObject, DashboardState, FilterOptions } from '../types/cosmic';

// Action types
type DashboardAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_COSMIC_OBJECTS'; payload: CosmicObject[] }
  | { type: 'SET_FILTERS'; payload: FilterOptions }
  | { type: 'SET_SELECTED_OBJECT'; payload: CosmicObject | null }
  | { type: 'SET_CATEGORIES'; payload: string[] }
  | { type: 'ADD_COSMIC_OBJECT'; payload: CosmicObject }
  | { type: 'REMOVE_COSMIC_OBJECT'; payload: string };

// Initial state
const createInitialState = (): DashboardState => ({
  cosmicObjects: [],
  loading: false,
  error: null,
  filters: {},
  selectedObject: null,
  categories: [
    'Black Holes',
    'Galaxies',
    'Nebulae',
    'Exoplanets',
    'The Sun',
    'Earth Views',
    'Hubble',
    'JWST',
    'Chandra',
    'Artemis',
    'Mars Rover'
  ]
});

const initialState = createInitialState();

// Reducer
function dashboardReducer(state: DashboardState, action: DashboardAction): DashboardState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_COSMIC_OBJECTS':
      return { ...state, cosmicObjects: action.payload };
    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case 'SET_SELECTED_OBJECT':
      return { ...state, selectedObject: action.payload };
    case 'SET_CATEGORIES':
      return { ...state, categories: action.payload };
    case 'ADD_COSMIC_OBJECT':
      return { ...state, cosmicObjects: [...state.cosmicObjects, action.payload] };
    case 'REMOVE_COSMIC_OBJECT':
      return { ...state, cosmicObjects: state.cosmicObjects.filter(obj => obj.id !== action.payload) };
    default:
      return state;
  }
}

// Context
interface DashboardContextType extends DashboardState {
  dispatch: React.Dispatch<DashboardAction>;
  updateFilters: (filters: FilterOptions) => void;
  selectObject: (cosmicObject: CosmicObject | null) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

// Provider component
export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(dashboardReducer, initialState);

  // Load initial data when provider mounts
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        // Initial data will be loaded by the CosmicDashboard component
      } catch (err) {
        console.error('Error loading initial data:', err);
        dispatch({ type: 'SET_ERROR', payload: 'Failed to load initial data' });
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };
    
    loadInitialData();
  }, []);

  const updateFilters = (filters: FilterOptions) => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
  };

  const selectObject = (cosmicObject: CosmicObject | null) => {
    dispatch({ type: 'SET_SELECTED_OBJECT', payload: cosmicObject });
  };

  const value = {
    ...state,
    dispatch,
    updateFilters,
    selectObject
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};

// Custom hook
export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};
