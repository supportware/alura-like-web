
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  email: string;
  isLoggedIn: boolean;
  name?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (password: string) => Promise<void>;
  loading: boolean;
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user data exists in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // This is a mock implementation - would normally call an API
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const userData: User = {
        email,
        isLoggedIn: true,
      };
      
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    // This is a mock implementation - would normally call an API
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real implementation, we would not log in the user immediately
      // as they would need to verify their email first
      console.log(`User signed up: ${name}, ${email}`);
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const forgotPassword = async (email: string) => {
    // This is a mock implementation - would normally call an API
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log(`Password reset email sent to: ${email}`);
    } catch (error) {
      console.error('Password reset request failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (password: string) => {
    // This is a mock implementation - would normally call an API
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Password was reset successfully');
    } catch (error) {
      console.error('Password reset failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    login,
    signup,
    logout,
    forgotPassword,
    resetPassword,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
