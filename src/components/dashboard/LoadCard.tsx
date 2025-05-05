import { useState } from 'react';
import { Package, MapPin, Calendar, ArrowRight, TruckIcon, BarChart4, DollarSign } from 'lucide-react';
import { Load } from '../../types';
import { updateLoadStatus } from '../../services/loadService';

interface LoadCardProps {
  load: Load;
  userType: 'loader' | 'receiver';
  onAssign?: (loadId: string) => void;
}

const LoadCard = ({ load, userType, onAssign }: LoadCardProps) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(load.status);
  
  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'assigned':
        return 'bg-blue-100 text-blue-800';
      case 'in-transit':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Get difficulty badge color
  const getDifficultyColor = (difficulty: number) => {
    if (difficulty <= 3) return 'bg-green-100 text-green-800';
    if (difficulty <= 6) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };
  
  // Update load status
  const handleStatusUpdate = async (newStatus: 'in-transit' | 'delivered') => {
    setIsUpdating(true);
    try {
      await updateLoadStatus(load.id, newStatus);
      setCurrentStatus(newStatus);
    } catch (error) {
      console.error('Error updating load status:', error);
    } finally {
      setIsUpdating(false);
    }
  };
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="border-b border-gray-100 bg-gray-50 px-4 py-3 flex justify-between items-center">
        <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getStatusColor(currentStatus)}`}>
          {currentStatus.charAt(0).toUpperCase() + currentStatus.slice(1)}
        </span>
        <span className={`flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full ${getDifficultyColor(load.difficulty)}`}>
          <BarChart4 size={12} className="mr-1" />
          Difficulty: {load.difficulty}/10
        </span>
      </div>
      
      <div className="p-5">
        <h3 className="text-lg font-semibold mb-2 text-gray-900">{load.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{load.description}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-start">
            <MapPin size={16} className="mt-0.5 mr-2 text-gray-400 flex-shrink-0" />
            <div className="flex-grow">
              <p className="text-sm text-gray-600">
                <span className="font-medium">From:</span> {load.origin}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">To:</span> {load.destination}
              </p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Calendar size={16} className="mr-2 text-gray-400 flex-shrink-0" />
            <p className="text-sm text-gray-600">
              <span className="font-medium">Deadline:</span> {formatDate(load.deadline)}
            </p>
          </div>
          
          <div className="flex items-center">
            <Package size={16} className="mr-2 text-gray-400 flex-shrink-0" />
            <p className="text-sm text-gray-600">
              <span className="font-medium">Weight:</span> {load.weight} kg
            </p>
          </div>
          
          {load.price && (
            <div className="flex items-center">
              <DollarSign size={16} className="mr-2 text-gray-400 flex-shrink-0" />
              <p className="text-sm text-gray-600">
                <span className="font-medium">Price:</span> ${load.price.toFixed(2)}
              </p>
            </div>
          )}
        </div>
        
        {/* Action buttons based on user type and status */}
        {userType === 'receiver' && (
          <div className="pt-3 border-t border-gray-100">
            {currentStatus === 'pending' && onAssign && (
              <button
                onClick={() => onAssign(load.id)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md flex items-center justify-center transition-colors"
              >
                <TruckIcon size={16} className="mr-2" />
                Accept Load
              </button>
            )}
            
            {currentStatus === 'assigned' && (
              <button
                onClick={() => handleStatusUpdate('in-transit')}
                disabled={isUpdating}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md flex items-center justify-center transition-colors disabled:opacity-50"
              >
                {isUpdating ? (
                  <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <ArrowRight size={16} className="mr-2" />
                )}
                Start Transit
              </button>
            )}
            
            {currentStatus === 'in-transit' && (
              <button
                onClick={() => handleStatusUpdate('delivered')}
                disabled={isUpdating}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md flex items-center justify-center transition-colors disabled:opacity-50"
              >
                {isUpdating ? (
                  <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <TruckIcon size={16} className="mr-2" />
                )}
                Mark as Delivered
              </button>
            )}
            
            {currentStatus === 'delivered' && (
              <div className="text-center text-green-600 font-medium py-2">
                ✓ Completed
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoadCard;