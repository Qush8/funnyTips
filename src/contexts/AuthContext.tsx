import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { User } from '../types';
import { UserRole } from '../types';
import { authService } from '../lib/auth';
import { showToast } from '../utils/toast';
import { authorization } from '../lib/api';

interface AuthContextType {
  currentUser: User | null;
  userData: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, username: string, displayName: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateUserData: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = () => {
      const user = authService.getUser();
      const token = authService.getToken();

      if (token && user) {
        setCurrentUser(user);
        setUserData(user);
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      // Real API call
      const response = await authorization.loginUser(email, password);
      
      // Extract token and user data from response
      const token = (response as any).token || (response as any).data?.token || (response as any).access_token;
      const user = (response as any).user || (response as any).data?.user || response;
      
      // Store token and user data
      authService.setToken(token);
      authService.setUser(user);
      setCurrentUser(user);
      setUserData(user);
      
      showToast.success('Login successful!');
    } catch (error) {
      console.error('Sign in failed:', error);
      showToast.error('Login failed. Please check your credentials.');
      throw error;
    }
  };

  const signUp = async (
    email: string,
    _password: string,
    username: string,
    displayName: string
  ) => {
    try {
      // Mock authentication - backend-ის გარეშე
      // TODO: Replace with real API call when backend is ready
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock user data
      const mockUser: User = {
        id: Date.now().toString(),
        email,
        username,
        displayName,
        role: UserRole.FAN,
        verified: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Mock token
      const mockToken = 'mock-jwt-token-' + Date.now();
      
      authService.setToken(mockToken);
      authService.setUser(mockUser);
      setCurrentUser(mockUser);
      setUserData(mockUser);
      
      showToast.success('Account created successfully!');
    } catch (error) {
      console.error('Sign up failed:', error);
      showToast.error('Registration failed. Please try again.');
      throw error;
    }
  };

  const signOut = async () => {
    authService.removeToken();
    setCurrentUser(null);
    setUserData(null);
    showToast.success('Logged out successfully!');
  };

  const updateUserData = async (data: Partial<User>) => {
    if (!currentUser) return;
    
    try {
      // Mock update - backend-ის გარეშე
      const updatedUser = { ...currentUser, ...data };
      setUserData(updatedUser);
      setCurrentUser(updatedUser);
      authService.setUser(updatedUser);
      showToast.success('Profile updated!');
    } catch (error) {
      console.error('Failed to update user data:', error);
      showToast.error('Failed to update profile.');
      throw error;
    }
  };

  const value: AuthContextType = {
    currentUser,
    userData,
    loading,
    signIn,
    signUp,
    signOut,
    updateUserData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
