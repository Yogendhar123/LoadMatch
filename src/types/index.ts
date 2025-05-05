export interface User {
  id: string;
  name: string;
  email: string;
  password?: string; // Only used during registration/login, not stored in state
  userType: 'loader' | 'receiver';
  company?: string;
  phone?: string;
}

export interface Load {
  id: string;
  title: string;
  description: string;
  origin: string;
  destination: string;
  weight: number;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  deadline: string;
  status: 'pending' | 'assigned' | 'in-transit' | 'delivered';
  difficulty: number; // 1-10 score
  createdBy: string; // user ID
  assignedTo?: string; // user ID
  createdAt: string;
  price?: number;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: Omit<User, 'id'>) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
  }[];
}