export interface CosmicObject {
  id: string;
  name: string;
  category: string;
  description: string;
  dateCreated: Date;
  nasaImageUrl: string;
  metadata: Record<string, unknown>;
}

export interface ActivityData {
  objectId: string;
  timestamp: Date;
  intensity: number;
  source: string; // Which NASA telescope/mission
  confidence: number;
}

export interface FilterOptions {
  searchTerm?: string;
  category?: string;
  dateFrom?: Date;
  dateTo?: Date;
}

export interface DashboardState {
  cosmicObjects: CosmicObject[];
  loading: boolean;
  error: string | null;
  filters: FilterOptions;
  selectedObject: CosmicObject | null;
  categories: string[];
}
