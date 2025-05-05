import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Package, TruckIcon, CheckCircle, Filter } from 'lucide-react';
import LoadCard from './LoadCard';
import LoadChart from './LoadChart';
import { Load } from '../../types';
import { getAvailableLoads, getAssignedLoads, assignLoad } from '../../services/loadService';

const ReceiverDashboard = () => {
  const { user } = useAuth();
  const [availableLoads, setAvailableLoads] = useState<Load[]>([]);
  const [assignedLoads, setAssignedLoads] = useState<Load[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('available');
  const [statsFilter, setStatsFilter] = useState('week');
  
  // Change page title on component mount
  useEffect(() => {
    document.title = 'Receiver Dashboard - LoadMatch';
    
    // Load data
    const loadData = async () => {
      setIsLoading(true);
      try {
        if (user?.id) {
          const [available, assigned] = await Promise.all([
            getAvailableLoads(),
            getAssignedLoads(user.id)
          ]);
          
          setAvailableLoads(available);
          setAssignedLoads(assigned);
        }
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [user]);
  
  const handleAssignLoad = async (loadId: string) => {
    if (!user?.id) return;
    
    try {
      const updatedLoad = await assignLoad(loadId, user.id);
      
      // Remove from available loads
      setAvailableLoads(availableLoads.filter(load => load.id !== loadId));
      
      // Add to assigned loads
      setAssignedLoads([updatedLoad, ...assignedLoads]);
    } catch (error) {
      console.error('Error assigning load:', error);
    }
  };
  
  // Get loads based on active tab
  const displayedLoads = activeTab === 'available' ? availableLoads : assignedLoads;
  
  // Calculate statistics
  const completedLoads = assignedLoads.filter(load => load.status === 'delivered').length;
  const inTransitLoads = assignedLoads.filter(load => load.status === 'in-transit').length;
  const assignedCount = assignedLoads.filter(load => load.status === 'assigned').length;
  
  // Calculate average load difficulty
  const avgDifficulty = assignedLoads.length > 0 
    ? (assignedLoads.reduce((sum, load) => sum + load.difficulty, 0) / assignedLoads.length).toFixed(1)
    : '0.0';
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Receiver Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back, {user?.name}</p>
      </div>
      
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-gray-500 text-sm">Available Loads</h3>
              <p className="text-2xl font-semibold">{availableLoads.length}</p>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            <span className="text-green-600 font-medium">↑ 8%</span> from last week
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center mb-4">
            <div className="bg-yellow-100 p-3 rounded-full">
              <TruckIcon className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-gray-500 text-sm">Assigned Loads</h3>
              <p className="text-2xl font-semibold">{assignedCount + inTransitLoads}</p>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            <span className="text-green-600 font-medium">↑ 4%</span> from last week
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center mb-4">
            <div className="bg-green-100 p-3 rounded-full">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-gray-500 text-sm">Completed Loads</h3>
              <p className="text-2xl font-semibold">{completedLoads}</p>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            <span className="text-green-600 font-medium">↑ 12%</span> from last month
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center mb-4">
            <div className="bg-purple-100 p-3 rounded-full">
              <Filter className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-gray-500 text-sm">Avg. Difficulty</h3>
              <p className="text-2xl font-semibold">{avgDifficulty}</p>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            <span className="text-yellow-600 font-medium">↓ 2%</span> from last month
          </div>
        </div>
      </div>
      
      {/* Chart Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-8 p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Load Activity</h2>
          <div className="mt-4 sm:mt-0">
            <select
              value={statsFilter}
              onChange={(e) => setStatsFilter(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
              <option value="quarter">Last 90 Days</option>
            </select>
          </div>
        </div>
        <div className="h-80">
          <LoadChart 
            data={assignedLoads} 
            period={statsFilter}
            type="receiver"
          />
        </div>
      </div>
      
      {/* Load List Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'available'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('available')}
            >
              Available Loads
            </button>
            <button
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'assigned'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('assigned')}
            >
              My Loads
            </button>
          </nav>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : displayedLoads.length === 0 ? (
          <div className="text-center py-12">
            <Package className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No loads found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {activeTab === 'available' 
                ? "There are no available loads matching your criteria at the moment." 
                : "You haven't been assigned any loads yet."}
            </p>
            {activeTab === 'available' && (
              <div className="mt-6">
                <button
                  onClick={() => window.location.reload()}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Refresh Loads
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {displayedLoads.map((load) => (
              <LoadCard 
                key={load.id} 
                load={load} 
                userType="receiver"
                onAssign={activeTab === 'available' ? handleAssignLoad : undefined}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReceiverDashboard;