# Cosmic Explorer - NASA Space Data Visualization

Cosmic Explorer is a React-based web application that visualizes cosmic phenomena using NASA's public data APIs. Explore black holes, galaxies, nebulae, and other celestial wonders through an interactive dashboard with real-time data from NASA's space telescopes.

![Cosmic Explorer Dashboard](https://images-assets.nasa.gov/image/PIA23370/PIA23370~medium.jpg)

## Features

- **Real-time Cosmic Data**: Access live data from NASA's space telescopes
- **Interactive Dashboard**: Browse cosmic objects with filtering capabilities
- **Detailed Object Information**: View high-resolution imagery and descriptions
- **Category Filtering**: Filter by cosmic object types (Black Holes, Galaxies, Nebulae, etc.)
- **Search Functionality**: Find specific cosmic objects by name or keywords
- **Responsive Design**: Works on all device sizes
- **NASA Data Integration**: Direct data feeds from multiple NASA observatories

## Tech Stack

- React 19 with TypeScript
- Vite for fast development and building
- Tailwind CSS v4 for styling
- React Router v7 for navigation
- NASA Images API for data

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/cosmic-explorer.git
   ```

2. Navigate to the project directory:
   ```bash
   cd cosmic-explorer
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`.

## Project Structure

```
src/
├── components/       # Reusable UI components
├── context/          # React context for state management
├── router/           # Application routing
├── services/         # API integration services
├── types/            # TypeScript type definitions
├── view/             # Page components
└── App.tsx          # Main application component
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Application Pages

### Home Page
The landing page features:
- Hero section with animated cosmic visualization
- Feature highlights of the application
- Live cosmic object preview cards
- Data source information
- Statistics about monitored cosmic objects
- Call-to-action to explore the dashboard

### Explorer Dashboard
The main dashboard includes:
- Real-time cosmic object listings
- Advanced filtering by category and search terms
- Detailed object cards with descriptions
- Modal views for in-depth object information
- Refresh functionality for updated data
- Responsive grid layout

## Data Sources

This project uses NASA's public APIs:
- [NASA Images API](https://images.nasa.gov/)
- Data from Chandra X-ray Observatory, Hubble Space Telescope, and James Webb Space Telescope

The application fetches real imagery and metadata directly from NASA's archives without requiring an API key.

## Components

### Core Components
- `CosmicDashboard` - Main dashboard interface
- `CosmicObjectCard` - Individual cosmic object display
- `SearchFilter` - Filtering and search controls
- `CosmicObjectModal` - Detailed object information view
- `LoadingSpinner` - Loading state visualization
- `RefreshButton` - Data refresh control

### Navigation
- `Nav` - Main navigation bar
- `Footer` - Page footer with additional information

## State Management

The application uses React Context API with useReducer for state management:
- `DashboardContext` - Manages cosmic objects, filters, loading states, and errors
- Custom hooks for accessing dashboard state throughout the application

## Data Models

### CosmicObject
```typescript
interface CosmicObject {
  id: string;
  name: string;
  category: string;
  description: string;
  dateCreated: Date;
  nasaImageUrl: string;
  metadata: Record<string, any>;
}
```

### FilterOptions
```typescript
interface FilterOptions {
  searchTerm?: string;
  category?: string;
  dateFrom?: Date;
  dateTo?: Date;
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project uses NASA data and imagery, which are in the public domain. The code is licensed under the MIT License.
