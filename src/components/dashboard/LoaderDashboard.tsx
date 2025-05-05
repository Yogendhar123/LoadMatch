import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Plus, Package, Truck, BarChart4, Filter } from 'lucide-react';
import LoadForm from './LoadForm';
import LoadCard from './LoadCard';
import LoadChart from './LoadChart';
import { Load } from '../../types';
import { getLoads, createLoad } from '../../services/loadService';

const LoaderDashboard = () => {
  const { user } = useAuth();
  const [loads, setLoads] = useState<Load[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('active');
  const [statsFilter, setStatsFilter] = useState('week');
  
  // Change page title on component mount
  useEffect(() => {
    document.title = 'Loader Dashboard - LoadMatch';
    
    // Load user's loads
    const loadData = async () => {
      setIsLoading(true);
      try {
        if (user?.id) {
          const userLoads = await getLoads(user.id);
          setLoads(userLoads);
        }
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [user]);
  
  const handleCreateLoad = async (loadData: Omit<Load, 'id' | 'createdBy' | 'createdAt' | 'status'>) => {
    if (!user?.id) return;
    
    try {
      const newLoad = await createLoad({
        ...loadData,
        createdBy: user.id,
      });
      
      setLoads([newLoad, ...loads]);
      setIsFormOpen(false);
    } catch (error) {
      console.error('Error creating load:', error);
    }
  };
  
  // Filter loads based on active tab
  const filteredLoads = loads.filter(load => {
    if (activeTab === 'active') {
      return ['pending', 'assigned', 'in-transit'].includes(load.status);
    } else if (activeTab === 'delivered') {
      return load.status === 'delivered';
    }
    return true;
  });
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Loader Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back, {user?.name}</p>
        </div>
        
        <button
          onClick={() => setIsFormOpen(true)}
          className="mt-4 md:mt-0 flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus size={18} className="mr-2" />
          Post New Load
        </button>
      </div>
      
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-gray-500 text-sm">Active Loads</h3>
              <p className="text-2xl font-semibold">
                {loads.filter(l => ['pending', 'assigned', 'in-transit'].includes(l.status)).length}
              </p>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            <span className="text-green-600 font-medium">↑ 12%</span> from last month
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center mb-4">
            <div className="bg-green-100 p-3 rounded-full">
              <Truck className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-gray-500 text-sm">Delivered Loads</h3>
              <p className="text-2xl font-semibold">
                {loads.filter(l => l.status === 'delivered').length}
              </p>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            <span className="text-green-600 font-medium">↑ 8%</span> from last month
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center mb-4">
            <div className="bg-yellow-100 p-3 rounded-full">
              <BarChart4 className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-gray-500 text-sm">Average Score</h3>
              <p className="text-2xl font-semibold">
                {loads.length > 0 
                  ? (loads.reduce((sum, load) => sum + load.difficulty, 0) / loads.length).toFixed(1) 
                  : '0.0'}
              </p>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            <span className="text-yellow-600 font-medium">↓ 3%</span> from last month
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center mb-4">
            <div className="bg-purple-100 p-3 rounded-full">
              <Filter className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-gray-500 text-sm">Match Rate</h3>
              <p className="text-2xl font-semibold">
                {loads.length > 0 
                  ? Math.round((loads.filter(l => l.status !== 'pending').length / loads.length) * 100) + '%'
                  : '0%'}
              </p>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            <span className="text-green-600 font-medium">↑ 5%</span> from last month
          </div>
        </div>
      </div>
      
      {/* Chart Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-8 p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Load Performance</h2>
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
            data={loads} 
            period={statsFilter} 
            type="loader"
          />
        </div>
      </div>
      
      {/* Load List Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'active'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('active')}
            >
              Active Loads
            </button>
            <button
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'delivered'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('delivered')}
            >
              Delivered Loads
            </button>
          </nav>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredLoads.length === 0 ? (
          <div className="text-center py-12">
            <Package className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No loads found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {activeTab === 'active' 
                ? "You don't have any active loads at the moment." 
                : "You don't have any delivered loads yet."}
            </p>
            <div className="mt-6">
              <button
                onClick={() => setIsFormOpen(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Plus size={16} className="mr-2" />
                Post a New Load
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {filteredLoads.map((load) => (
              <LoadCard key={load.id} load={load} userType="loader" />
            ))}
          </div>
        )}
      </div>
      
      {/* Create Load Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Post a New Load</h2>
                <button 
                  onClick={() => setIsFormOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <LoadForm onSubmit={handleCreateLoad} onCancel={() => setIsFormOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoaderDashboard;