import React from 'react';
import type { CosmicObject, ActivityData } from '../types/cosmic';

interface DataTableProps {
  cosmicObject: CosmicObject;
  activityData?: ActivityData | null;
  className?: string;
}

const DataTable: React.FC<DataTableProps> = ({ 
  cosmicObject, 
  activityData,
  className = '' 
}) => {
  const formatDate = (date: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMinutes = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    return `${diffDays} days ago`;
  };

  const dataRows = [
    { label: 'Name', value: cosmicObject.name },
    { label: 'Category', value: cosmicObject.category },
    { label: 'Date Created', value: formatDate(cosmicObject.dateCreated) },
    { label: 'Object ID', value: cosmicObject.id },
  ];

  if (activityData) {
    dataRows.push(
      { label: 'Activity Source', value: activityData.source },
      { label: 'Detection Timestamp', value: activityData.timestamp.toLocaleString() },
      { label: 'Signal Intensity', value: `${activityData.intensity.toFixed(2)}` },
      { label: 'Confidence Level', value: `${(activityData.confidence * 100).toFixed(1)}%` }
    );
  }

  // Add any additional metadata from the cosmic object
  if (cosmicObject.metadata) {
    Object.entries(cosmicObject.metadata).forEach(([key, value]) => {
      // Skip some common metadata fields that we've already displayed
      if (!['title', 'nasa_id', 'date_created'].includes(key)) {
        dataRows.push({ 
          label: key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()), 
          value: typeof value === 'string' ? value : JSON.stringify(value) 
        });
      }
    });
  }

  return (
    <div className={`bg-gray-900/50 rounded-lg border border-gray-700/30 ${className}`}>
      <div className="overflow-hidden">
        <table className="w-full">
          <tbody className="divide-y divide-gray-700/30">
            {dataRows.map((row, index) => (
              <tr key={index} className="hover:bg-white/5 transition-colors">
                <td className="px-4 py-3 text-sm font-medium text-gray-300 whitespace-nowrap">
                  {row.label}
                </td>
                <td className="px-4 py-3 text-sm text-white font-mono">
                  {row.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {dataRows.length === 0 && (
        <div className="p-8 text-center text-gray-500">
          No data available
        </div>
      )}
    </div>
  );
};

export default DataTable;
