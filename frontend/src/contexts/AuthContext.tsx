import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import apiService from '../services/api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    phone?: string;
    address?: string;
    city?: string;
    postal_code?: string;
    country?: string;
  }) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: {
    name: string;
    phone?: string;
    address?: string;
    city?: string;
    postal_code?: string;
    country?: string;
  }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user && !!token;

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('auth_token');
      const storedUser = localStorage.getItem('user');

      if (storedToken && storedUser) {
        try {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
          
          // Verify token is still valid
          const response = await apiService.getMe();
          if (response.success) {
            setUser(response.data);
            localStorage.setItem('user', JSON.stringify(response.data));
          }
        } catch (error) {
          console.error('Token verification failed:', error);
          localStorage.removeItem('auth_token');
          localStorage.removeItem('user');
          setToken(null);
          setUser(null);
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await apiService.login(email, password);
      
      if (response.success) {
        const { user: userData, token: userToken } = response.data;
        
        setUser(userData);
        setToken(userToken);
        
        localStorage.setItem('auth_token', userToken);
        localStorage.setItem('user', JSON.stringify(userData));
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      throw new Error(error.response?.data?.message || error.message || 'Login failed');
    }
  };

  const register = async (userData: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    phone?: string;
    address?: string;
    city?: string;
    postal_code?: string;
    country?: string;
  }) => {
    try {
      const response = await apiService.register(userData);
      
      if (response.success) {
        const { user: newUser, token: userToken } = response.data;
        
        setUser(newUser);
        setToken(userToken);
        
        localStorage.setItem('auth_token', userToken);
        localStorage.setItem('user', JSON.stringify(newUser));
      } else {
        throw new Error(response.message || 'Registration failed');
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      throw new Error(error.response?.data?.message || error.message || 'Registration failed');
    }
  };

  const logout = async () => {
    try {
      await apiService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setToken(null);
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
    }
  };

  const updateProfile = async (userData: {
    name: string;
    phone?: string;
    address?: string;
    city?: string;
    postal_code?: string;
    country?: string;
  }) => {
    try {
      const response = await apiService.updateProfile(userData);
      
      if (response.success) {
        setUser(response.data);
        localStorage.setItem('user', JSON.stringify(response.data));
      } else {
        throw new Error('Profile update failed');
      }
    } catch (error: any) {
      console.error('Profile update error:', error);
      throw new Error(error.response?.data?.message || error.message || 'Profile update failed');
    }
  };

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
