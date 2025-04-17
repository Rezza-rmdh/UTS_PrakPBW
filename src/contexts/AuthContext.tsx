
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { login as loginApi, register as registerApi, logout as logoutApi } from '@/services/API'; 

interface User {
  _id: string;
  email: string;
  fullName: string;
  token: string;
  status: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, fullName: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Failed to parse user data', error);
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);
  
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      const data = await loginApi(email, password);

      if (data?.data?._id) {
        const userData: User = {
          _id: data.data._id,
          email: data.data.email,
          fullName: data.data.fullName,
          token: data.data.token,
          status: true
        };

        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));

        toast({
          title: "Login successful",
          description: `Welcome back, ${userData.fullName}!`,
        });

        return true;
      } else {
        toast({
          title: "Login failed",
          description: data?.message || "Invalid email or password.",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login error",
        description: "An error occurred during login. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (fullName: string, email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      const data = await registerApi(email, fullName, password);
  
      if (data?.data?._id) {
        const userData: User = {
          _id: data.data._id,
          email: data.data.email,
          fullName: data.data.fullName,
          token: data.data.token,
          status: true
        };
  
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
  
        toast({
          title: 'Registration successful',
          description: `Welcome, ${fullName}!`,
        });
  
        return true;
      } else {
        toast({
          title: 'Registration failed',
          description: data?.message || 'Invalid registration details.',
          variant: 'destructive',
        });
        return false;
      }
    } catch (error) {
      console.error('Register error:', error);
      toast({
        title: 'Register error',
        description: 'An error occurred during registration.',
        variant: 'destructive',
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  const logout = async () => {
    try {
      if (user?.token && user?._id) {
        await logoutApi(user.token, user._id);
      }
    } catch (error) {
      console.warn("Logout API error, but proceeding to clear local data.");
    }

    setUser(null);
    localStorage.removeItem('user');

    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };
  
  const value = {
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    isLoading
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
