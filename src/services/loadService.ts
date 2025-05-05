import { Load } from '../types';

// Simulated database
let mockLoads: Load[] = [];

// Initialize mock data
const initializeMockData = () => {
  if (mockLoads.length === 0) {
    // Create sample loads
    const currentDate = new Date();
    
    // Create 10 sample loads with different statuses and dates
    for (let i = 0; i < 10; i++) {
      const date = new Date();
      date.setDate(currentDate.getDate() - Math.floor(Math.random() * 14)); // Random date within last 2 weeks
      
      const statuses = ['pending', 'assigned', 'in-transit', 'delivered'] as const;
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      
      mockLoads.push({
        id: `load-${i + 1}`,
        title: `Load Shipment #${i + 1}`,
        description: `This is a sample load shipment with various goods that need to be transported from one location to another.`,
        origin: `Origin City ${i + 1}`,
        destination: `Destination City ${i + 1}`,
        weight: Math.floor(Math.random() * 5000) + 100, // Random weight between 100 and 5100 kg
        dimensions: {
          length: Math.floor(Math.random() * 300) + 50, // Random length between 50 and 350 cm
          width: Math.floor(Math.random() * 200) + 50, // Random width between 50 and 250 cm
          height: Math.floor(Math.random() * 200) + 50, // Random height between 50 and 250 cm
        },
        deadline: new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate() + Math.floor(Math.random() * 30) + 1
        ).toISOString(), // Random deadline within next 30 days
        status,
        difficulty: Math.floor(Math.random() * 10) + 1, // Random difficulty between 1 and 10
        createdBy: i % 2 === 0 ? 'user-1' : 'user-2', // Alternate between two users
        assignedTo: status !== 'pending' ? 'receiver-1' : undefined,
        createdAt: date.toISOString(),
        price: Math.floor(Math.random() * 5000) + 500, // Random price between $500 and $5500
      });
    }
  }
};

// Get loads for a specific user
export const getLoads = async (userId: string): Promise<Load[]> => {
  initializeMockData();
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return mockLoads.filter(load => load.createdBy === userId);
};

// Get available loads (pending loads)
export const getAvailableLoads = async (): Promise<Load[]> => {
  initializeMockData();
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return mockLoads.filter(load => load.status === 'pending');
};

// Get loads assigned to a specific receiver
export const getAssignedLoads = async (receiverId: string): Promise<Load[]> => {
  initializeMockData();
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return mockLoads.filter(load => load.assignedTo === receiverId);
};

// Create a new load
export const createLoad = async (loadData: Omit<Load, 'id' | 'createdAt' | 'status'>): Promise<Load> => {
  initializeMockData();
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const newLoad: Load = {
    id: `load-${Date.now()}`,
    ...loadData,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };
  
  mockLoads.unshift(newLoad);
  return newLoad;
};

// Assign a load to a receiver
export const assignLoad = async (loadId: string, receiverId: string): Promise<Load> => {
  initializeMockData();
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const loadIndex = mockLoads.findIndex(load => load.id === loadId);
  
  if (loadIndex === -1) {
    throw new Error('Load not found');
  }
  
  const updatedLoad: Load = {
    ...mockLoads[loadIndex],
    status: 'assigned',
    assignedTo: receiverId,
  };
  
  mockLoads[loadIndex] = updatedLoad;
  return updatedLoad;
};

// Update a load's status
export const updateLoadStatus = async (loadId: string, status: 'in-transit' | 'delivered'): Promise<Load> => {
  initializeMockData();
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const loadIndex = mockLoads.findIndex(load => load.id === loadId);
  
  if (loadIndex === -1) {
    throw new Error('Load not found');
  }
  
  const updatedLoad: Load = {
    ...mockLoads[loadIndex],
    status,
  };
  
  mockLoads[loadIndex] = updatedLoad;
  return updatedLoad;
};