import { createContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType } from '../types';

// Default context state
export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: () => Promise.resolve(false),
  register: () => Promise.resolve(false),
  logout: () => {},
  loading: false,
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Check for stored user on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Mock login function
  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      // In a real app, this would be an API call
      const mockUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const foundUser = mockUsers.find(
        (u: User) => u.email === email && u.password === password
      );
      
      if (foundUser) {
        // Remove password before storing in state
        const { password, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        localStorage.setItem('user', JSON.stringify(userWithoutPassword));
        setLoading(false);
        return true;
      }
      setLoading(false);
      return false;
    } catch (error) {
      console.error('Login error:', error);
      setLoading(false);
      return false;
    }
  };

  // Mock register function
  const register = async (userData: Omit<User, 'id'>): Promise<boolean> => {
    setLoading(true);
    try {
      // In a real app, this would be an API call
      const mockUsers = JSON.parse(localStorage.getItem('users') || '[]');
      // Check if user already exists
      const userExists = mockUsers.some((u: User) => u.email === userData.email);
      
      if (userExists) {
        setLoading(false);
        return false;
      }
      
      // Create new user with ID
      const newUser = {
        ...userData,
        id: Date.now().toString(),
      };
      
      // Add to mock database
      mockUsers.push(newUser);
      localStorage.setItem('users', JSON.stringify(mockUsers));
      
      // Auto-login the user (without the password)
      const { password, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      
      setLoading(false);
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      setLoading(false);
      return false;
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};