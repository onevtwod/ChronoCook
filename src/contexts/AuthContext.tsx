import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../models';

interface AuthContextType {
  currentUser: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, username: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (userData: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  isLoggedIn: false,
  isLoading: true,
  login: async () => {},
  signup: async () => {},
  logout: async () => {},
  updateProfile: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // In a real app, check for stored auth token and fetch user data
    // For this example, we'll simulate loading
    const checkAuth = async () => {
      try {
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // For demo purposes, we'll just set isLoading to false
        // In a real app, you would check for a stored token and fetch user data
        setIsLoading(false);
      } catch (error) {
        console.error('Auth check failed:', error);
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data for demo
      const mockUser: User = {
        id: '1',
        username: 'historyfoodie',
        email: email,
        favoriteRecipes: [],
        favoriteEras: ['Renaissance', 'Victorian'],
        createdRecipes: [],
        ratings: [],
        joinedAt: new Date(),
        lastActive: new Date(),
      };
      
      setCurrentUser(mockUser);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  const signup = async (email: string, password: string, username: string) => {
    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data for demo
      const mockUser: User = {
        id: '1',
        username: username,
        email: email,
        favoriteRecipes: [],
        favoriteEras: [],
        createdRecipes: [],
        ratings: [],
        joinedAt: new Date(),
        lastActive: new Date(),
      };
      
      setCurrentUser(mockUser);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setCurrentUser(null);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  const updateProfile = async (userData: Partial<User>) => {
    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (currentUser) {
        setCurrentUser({ ...currentUser, ...userData });
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isLoggedIn: !!currentUser,
        isLoading,
        login,
        signup,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}; 